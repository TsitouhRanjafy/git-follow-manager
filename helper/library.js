import { fetch_followers } from "../github-api/user-relation.js";
import { fetch_following } from "../github-api/user-relation.js";
import chalk from "chalk";


/**
 * 
 * @param {string} token 
 * @returns Map (key = user_name: string, value: boolean)
 */
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

/**
 * 
 * @param {string} token 
 * @returns array of { user_name: string, profil_url: string}
 */
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

export {
    fetch_all_following,
    fetch_all_follower
}