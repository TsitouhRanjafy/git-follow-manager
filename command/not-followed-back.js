import { get_env } from "../helper/env.access.js";
import chalk from "chalk";
import { fetch_all_follower, fetch_all_following } from "../helper/library.js";
import ora from "ora";


export default {
    command: 'not-followed-back',
    description: 'Afficher tout l\'utilisateur que vous avez suivie mais pas en retour',
        builder: (yargs) => {
        return yargs
    },
    handler: async (argv) => {

        try {
            const token = await get_env("my_token");
            not_followed_back_handler(token)
        } catch (error) {
            console.error(chalk.hex('#FFA500')(` !Internal error, cmd: not-followed-back`))
        }
    },
    middleware: undefined
}

async function not_followed_back_handler(token) {
    const spinner = ora("Loading").start()
    
    try {
        const all_followers = await fetch_all_follower(token);
        const all_following = await fetch_all_following(token);


        let user_not_followed_back = []

        for (const user_followed of all_following) {
            if (!all_followers.has(user_followed.user_name)) {
                spinner.text = "Find user: "+user_followed.user_name;
                user_not_followed_back.push(user_followed.user_name);
            }
        }
        console.log("\n");
        console.table(user_not_followed_back);

        spinner.succeed(chalk.green(` Finished`))
    } catch (error) {
        console.error(chalk.hex('#FFA500')(` !Internal error, reference: not_followed_back_handler`))
    }
}