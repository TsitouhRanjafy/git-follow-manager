import { base_url } from "../helper/env.access.js";
import chalk from "chalk";

const follow_or_unfollow_user = async (token, user_name, is_follow = true) => {
    try {
        const res = await fetch(`${base_url}/user/following/${user_name}`,{
            method: is_follow ? 'PUT' : 'DELETE',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        if (res.status == 401) {
            console.info(chalk.hex('#FFA500')(" !Vous n'est pas authentifier, execute: ./index.js login"));
            return false
        }

        if (res.status == 304) {
            console.info(chalk.hex('#FFA500')(` !Utilisateur déjà ${is_follow ? '': 'non'} suivie: ${user_name}`));
            return false
        }

        if (res.status == 404) {
            console.info(chalk.hex('#FFA500')(` !Utilisateur non trouvé: ${user_name}`));
            return false
        }

        return true
    } catch (error) {
        console.error(chalk.hex('#FFA500')(` !Internal error, Reference: follow_or_unfollow_user`));
        return false
    }
}

export {
    follow_or_unfollow_user
}