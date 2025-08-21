import { get_env } from "../helper/env.access.js";
import chalk from "chalk";
import ora from "ora";
import { fetch_all_follower, fetch_all_following } from "../helper/library.js";
import { follow_or_unfollow_user } from "../github-api/user-action.js";
import { readFileSync } from "node:fs";

export default {
    command: 'auto-unfollow',
    description: 'Se désabonner tout les utilisateurs qui n\'est pas abonné à vous',
    builder: (yargs) => {
        return yargs
            .option('ignore', {
                alias: 'i',
                describe: 'Indiqué l\'utilisateur à ignorer'
            })
            .option('json', {
                alias: 'j',
                type: 'string',
                describe: 'Indiqué le chemin vers un fichier JSON contenant les noms des utilisateurs à ignorer, format array of { user_name: string }'
            })
    },
    handler: async (argv) => {

        let user_to_ignore = new Map()
        try {
            const token = await get_env("my_token");
            if (argv.ignore && argv.json) {
                const users = JSON.parse(readFileSync(argv.json, 'utf-8'));
                for (const user of users) user_to_ignore.set(user.user_name, true);
            }
            
            auto_unfollow_handler(token, user_to_ignore)
        } catch (error) {
            console.error(chalk.hex('#FFA500')(` !Internal error, cmd: auto-unfollow`))
        }
    },
    middleware: undefined
}

/**
 * 
 * @param {string} token 
 * @param {Map} user_to_ignore 
 */
async function auto_unfollow_handler(token, user_to_ignore) {
    const spinner = ora("Loading fetch").start()

    try {
        const all_followers = await fetch_all_follower(token);
        const all_following = await fetch_all_following(token);

        for (const user_followed of all_following) {
            if (!all_followers.has(user_followed.user_name) && !user_to_ignore.has(user_followed.user_name)) {
                spinner.text = "Fetch unfollow: "+user_followed.user_name;
                await follow_or_unfollow_user(token, user_followed.user_name, false);
            }
        }

        spinner.succeed(chalk.green(` Finished`))
    } catch (error) {
        console.error(chalk.hex('#FFA500')(` !Internal error, reference: auto_unfollow_handler`,error))
    }
}
