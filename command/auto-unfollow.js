import { get_env } from "../helper/env.access.js";
import chalk from "chalk";
import ora from "ora";
import { fetch_followers } from "../github-api/user-relation.js";
import { fetch_following } from "../github-api/user-relation.js";
import { follow_or_unfollow_user } from "../github-api/user-action.js";

export default {
    command: 'auto-unfollow',
    description: 'Se désabonner tout les utilisateurs qui n\'est pas abonné à vous',
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
            auto_unfollow_handler(token)
        } catch (error) {
            console.error(chalk.hex('#FFA500')(` !Internal error, cmd: auto-unfollow`))
        }
    },
    middleware: undefined
}

async function auto_unfollow_handler(token) {
    const spinner = ora("Loading fetch").start()

    try {
        const all_followers = await fetch_all_follower(token);
        const all_following = await fetch_all_following(token)

        for (const user_followed of all_following) {
            if (!all_followers.has(user_followed.user_name)) {
                spinner.text = "Fetch unfollow: "+user_followed.user_name;
                await follow_or_unfollow_user(token, user_followed.user_name, false);
            }
        }

        spinner.succeed(chalk.green(` Finished`))
    } catch (error) {
        console.error(chalk.hex('#FFA500')(` !Internal error, reference: auto_unfollow_handler`, error))
    }
   
}

async function fetch_all_follower(token) {
    let all_followers = new Map()
    let count_one_fetch = 100;
    let page = 1

    try {
        while (true) {
            let followers = await fetch_followers(token, count_one_fetch, page);

            for (let index = 0; index < followers.length; index++) {
                all_followers.set(followers[index].user_name, true)
            }

            if (followers.length < count_one_fetch) break;
            page += 1
        }

        return all_followers
    } catch (error) {
        console.error(chalk.hex('#FFA500')(` !Internal error, reference: fetch_all_follower`))
    }
}

async function fetch_all_following(token) {
    let all_following = []
    let count_one_fetch = 100;
    let page = 1

    try {
        while (true) {
            let following = await fetch_following(token, count_one_fetch, page)
            all_following.push(...following);  

            if (following.length < count_one_fetch) break;
            page += 1
        }

        return all_following
    } catch (error) {
        console.error(chalk.hex('#FFA500')(` !Internal error, reference: fetch_all_following`))
    }
}