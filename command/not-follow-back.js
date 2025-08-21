import { get_env } from "../helper/env.access.js";
import chalk from "chalk";
import { fetch_all_follower, fetch_all_following } from "../helper/library.js";
import ora from "ora";
import { create_file } from "../helper/library.js";

export default {
    command: 'not-follow-back',
    description: 'Afficher tout l\'utilisateur qui vous suivie mais pas en retour',
        builder: (yargs) => {
        return yargs
            .option('export', {
                alias: 'e',
                type: 'string',
                describe: 'Exporter en json, indiqué le chemin',
            })
    },
    handler: async (argv) => {
        const spinner = ora("Loading").start()

        try {
            const token = await get_env("my_token");
            const user_not_follow = await not_follow_back_handler(token, spinner);

            console.log("\n");
            console.table(user_not_follow)

            if (argv.e) {
                const status = await create_file("not-follow-back.json", JSON.stringify(user_not_follow), argv.e)
                if (status) spinner.succeed(chalk.green(" json exported in: ",argv.e))
                else spinner.fail(chalk.red(" json exportation fail, path: ",argv.e))
            }

            spinner.succeed(chalk.green(` Finished`))
        } catch (error) {
            console.error(chalk.hex('#FFA500')(` !Internal error, cmd: not-follow-back`))
        }
    },
    middleware: undefined
}

/**
 * 
 * @param {string} token 
 * @returns array of { user_name: string }  
 */
async function not_follow_back_handler(token, spinner) {
    try {
        const all_followers = await fetch_all_follower(token);
        const all_following = await fetch_all_following(token);

        for (const user_followed of all_following) {
            all_followers.set(user_followed.user_name, false);
        }

        let user_not_follow_back = []
        for (let [key, value] of all_followers) {
            if (value) {
                user_not_follow_back.push({ user_name: key });
                spinner.text = "Find user: "+key;
            }
        }

        return user_not_follow_back;
    } catch (error) {
        console.error(chalk.hex('#FFA500')(` !Internal error, reference: not_follow_back_handler`))
    }
}