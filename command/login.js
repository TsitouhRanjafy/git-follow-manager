import { fetch_code_verification, fetch_token } from "../github-api/oauth.js";
import inquirer from "inquirer";
import { exec } from "node:child_process";
import chalk from "chalk";
import { set_env } from "../helper/env.access.js";


export default {
    command: 'login',
    description: 'S\'indentifier \n',
    builder: (yargs) => {
        return yargs
    },
    handler: async (argv) => {
        try {
            const code_verification = await fetch_code_verification()
            if (!code_verification) {
                console.info(chalk.hex('#FFA500')("✖ login failed"))
                return
            }
            
            // redirection to navigator
            console.log(chalk.bold('  authentification code:') + chalk.green.bold(code_verification.user_code))
            const res = await confirm(`redirection à ${code_verification.verification_uri}`, 'redirection');
            if (!res.redirection) {
                console.info(chalk.hex('#FFA500')('✖ authentification annuler'));
                return
            }
            open_url(code_verification.verification_uri);
            let authentified_confirmation = await confirm(`Avez-vous entrer le code ci-dessus`,'authentifier');
            while (!authentified_confirmation.authentifier) {
                console.log(chalk.hex('#FFA500')('  !Entrer le code s\'il vous plait!'))
                open_url(code_verification.verification_uri);
                authentified_confirmation = await confirm(`Avez-vous entrer le code ci-dessus`,'authentifier')
            }

            // handle token
            const token = await fetch_token(code_verification.device_code)
            if (!token) {
                console.info(chalk.hex('#FFA500')("✖ login failed"))
                return
            }
            set_env('my_token', token.access_token)
            console.info(chalk.green("✔ login successfull"))
        } catch (error) {
            console.error(chalk.hex('#FFA500')(" !Internal error, cmd: login "));
            return;
        }
    },
    middleware: undefined
}


async function confirm(question, name, d = false) {
    return await inquirer.prompt([
                {
                    type: 'confirm',
                    message: question,
                    name: name,
                    default: d
                }
    ])
}

function open_url(url){
    exec(`open ${url}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error`);
            return
        }
    })
}

