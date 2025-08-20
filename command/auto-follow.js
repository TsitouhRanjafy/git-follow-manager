import { follow_or_unfollow_user } from "../github-api/user-action.js";
import { fetch_followers } from "../github-api/user-relation.js";
import { get_env } from "../helper/env.access.js";
import chalk from "chalk";
import ora from "ora";


export default {
    command: 'auto-follow',
    description: 'S\'abonner tout les utilisateurs qui vous abonne',
        builder: (yargs) => {
        return yargs
            .option('ignore', {
                alias: 'ig',
                describe: 'Indiqué l\'utilisateur à ignorer'
            })
            .option('json', {
                alias: 'j',
                type: 'string',
                describe: 'Indiqué le chemin vers un fichier JSON contenant les noms des utilisateurs à ignorer'
            })
    },
    handler: async (argv) => {

        try {
            const token = await get_env("my_token");
            auto_follow_hander(token);
        } catch (error) {
            console.error(chalk.hex('#FFA500')(` !Internal error, cmd: auto-follow`))
        }
    },
    middleware: undefined
}

async function auto_follow_hander(token) {
    let count_one_fetch = 100
    let page = 1
    const spinner = ora("Loading fetch").start()

    while (true) {
        try {
            var followers = await fetch_followers(token, count_one_fetch, page);

            for (let index = 0; index < followers.length; index++) {
                await follow_or_unfollow_user(token, followers[index].user_name, true)
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

