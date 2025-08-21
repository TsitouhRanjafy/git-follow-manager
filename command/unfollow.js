import chalk from "chalk";
import { get_env } from "../helper/env.access.js";
import { follow_or_unfollow_user } from "../github-api/user-action.js";
import { readFileSync } from "node:fs";
import ora from "ora";

export default {
    command: 'unfollow',
    description: 'Se désabonner à utilisateur\n',
    builder: (yargs) => {
        return yargs
            .option('username', {
                alias: 'u',
                type: 'string',
                describe: 'Indiqué le nom d\'utilisateur à désabonner'
            })
            .option('json', {
                alias: 'j',
                type: 'string',
                describe: `Indiqué le chemin vers un fichier JSON contenant les noms des utilisateurs à désabonner
                Le format json doit être un tableau qui contient l'object { user_name: string }
                `
            })
            .check((argv) => {
                if ((!argv.username && !argv.json) || (argv.username && argv.json)) {
                    throw new Error(chalk.hex('#FFA500')(" !Vous devez spécifier --username ou --json"));
                }

                return true
            })
    },
    handler: async (argv) => {
        try {
            const token = await get_env("my_token");
            
            if (argv.json) {
                unfollow_user_in_json(token, argv.json)
                return
            }

            const status = await follow_or_unfollow_user(token, argv.username, false)
            
            if (status) {
                console.info(chalk.green(` Utilisateur désabonné avec succès: ${argv.username}`));
            }
        } catch (error) {
          console.error(chalk.hex('#FFA500')(` !Internal error, cmd: unfollow`, error))
        }
    },
    middleware: undefined
}

async function unfollow_user_in_json(token, json_path) {
    const spinner = ora().start()
    try {
        let data = readFileSync(json_path, 'utf-8');
        data = JSON.parse(data);
        for (const user of data) {
            await follow_or_unfollow_user(token, user.user_name, false)
        }
        spinner.succeed(chalk.green(` Finished`))
    } catch (error) {
        spinner.fail(chalk.hex('#FFA500')(` !Internal error, Reference: unfollow_user_in_json\n  `, error.message))
    } 
}