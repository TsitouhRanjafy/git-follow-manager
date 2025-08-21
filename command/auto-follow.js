import { follow_or_unfollow_user } from "../github-api/user-action.js";
import { fetch_followers } from "../github-api/user-relation.js";
import { get_env } from "../helper/env.access.js";
import chalk from "chalk";
import ora from "ora";
import { readFileSync } from "node:fs";

export default {
    command: 'auto-follow',
    description: 'S\'abonner tout les utilisateurs qui vous abonne',
        builder: (yargs) => {
        return yargs
            .option('ignore', {
                alias: 'i',
                describe: 'Indiqué l\'utilisateur à ignorer'
            })
            .option('json', {
                alias: 'j',
                type: 'string',
                describe: 'Indiqué le chemin vers un fichier JSON contenant les noms des utilisateurs à ignorer'
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

            auto_follow_handler(token, user_to_ignore);
        } catch (error) {
            console.error(chalk.hex('#FFA500')(` !Internal error, cmd: auto-follow`))
        }
    },
    middleware: undefined
}

/**
 * 
 * @param {string} token 
 * @param {Map} user_to_ignore 
 */
async function auto_follow_handler(token, user_to_ignore) {
    let count_one_fetch = 100
    let page = 1
    const spinner = ora("Loading fetch").start()

    while (true) {
        try {
            var followers = await fetch_followers(token, count_one_fetch, page);

            for (let index = 0; index < followers.length; index++) {
                if (!user_to_ignore.has(followers[index].user_name)) {
                    await follow_or_unfollow_user(token, followers[index].user_name, true)
                }
                spinner.text = (`Fetch follow: ${followers[index].user_name}`);
            }
            if (followers.length < count_one_fetch) {
                spinner.succeed(chalk.green(` Finished`))
                break;
            };
            page += 1
        } catch (error) {
            console.error(chalk.hex('#FFA500')(` !Internal error, reference: auto_follow_handler`))
        }
    }
}

