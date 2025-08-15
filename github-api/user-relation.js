import chalk from "chalk";
import { base_url } from "../helper/env.access.js";

const fetch_followers =  async (token, limite = 30, page = 1) => {
    try {
        const res = await fetch(`${base_url}/user/followers?per_page=${limite}&page=${page}`, {
            method: 'GET',

            headers: {
                'Accept': ' application/vnd.github+json',
                'Authorization': `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        if (res.status == 401) {
            console.info(chalk.hex('#FFA500')(" !Vous n'est pas authentifier, execute: ./index.js login"));
            return []
        }
        if (res.status != 200) {
            console.info(chalk.hex('#FFA500')(" !Essayer de vous authentifier à nouveau"));
            return
        }
        const data = await res.json()
        data.forEach((e,i) => {
            data[i] = {
                user_name: e.login,
                profil_url: e.html_url
            }
        });
        return data
    } catch (error) {
        console.error(chalk.hex('#FFA500')(" !Internal server error"));
        return []
    }
};


const fetch_following = async (token, limite = 30, page = 1) => {
    try {
        const res = await fetch(`${base_url}/user/following?per_page=${limite}&page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': ' application/vnd.github+json',
                'Authorization': `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        if (res.status == 401) {
            console.info(chalk.hex('#FFA500')(" !Vous n'est pas authentifier, execute: ./index.js login"));
            return []
        }
        if (res.status != 200) {
            console.info(chalk.hex('#FFA500')(" !Essayer de vous authentifier à nouveau"));
            return
        }
        const data = await res.json()
        data.forEach((e,i) => {
            data[i] = {
                user_name: e.login,
                profil_url: e.html_url
            }
        });
        return data
    } catch (error) {
        console.error(chalk.hex('#FFA500')(" !Internal server error"));
        return []
    }
}

export {
    fetch_followers,
    fetch_following
}