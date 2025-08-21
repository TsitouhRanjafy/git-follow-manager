import { get_env } from "../helper/env.access.js";
import chalk from "chalk";
import { fetch_all_follower, fetch_all_following } from "../helper/library.js";
import ora from "ora";


export default {
    command: 'not-follow-back',
    description: 'Afficher tout l\'utilisateur qui vous suivie mais pas en retour',
        builder: (yargs) => {
        return yargs
    },
    handler: async (argv) => {

        try {
            const token = await get_env("my_token");
            not_follow_back_handler(token)
        } catch (error) {
            console.error(chalk.hex('#FFA500')(` !Internal error, cmd: not-follow-back`))
        }
    },
    middleware: undefined
}

async function not_follow_back_handler(token) {
    const spinner = ora("Loading").start()
    try {
        const all_followers = await fetch_all_follower(token);
        const all_following = await fetch_all_following(token);

        for (const user_followed of all_following) {
            all_followers.set(user_followed.user_name, false);
        }

        let user_not_follow_back = []
        for (let [key, value] of all_followers) {
            if (value) user_not_follow_back.push(key)
        }

        console.log("\n");
        console.table(user_not_follow_back)

        spinner.succeed(chalk.green(` Finished`))
    } catch (error) {
        console.error(chalk.hex('#FFA500')(` !Internal error, reference: not_follow_back_handler`))
    }
}