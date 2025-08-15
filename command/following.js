import { fetch_following } from "../github-api/subscribe.js";
import { get_env } from "../helper/env.access.js";
import chalk from "chalk";

export default {
    command: 'following',
    description: 'Affiche l\'utilisateur que vous avez suivie\n',
    builder: (yargs) => {
        return yargs
            .option('limite', {
                alias: 'l',
                type: 'number',
                describe: 'Le nombre d\'utilisateurs à afficher',
                default: 30
            })
            .option('page', {
                alias: 'p',
                type: 'number',
                describe: 'Indique le numéro de page',
                default: 1,
            })
            .example('$0 following -l 8 -p 1','Affiche le 8 utilisateur que vous avez suivie dans page 1')
            .demandCommand(0)
    },
    handler: async (argv) => {
        try {
            const token = await get_env("my_token");
            const list = await fetch_following(token, argv.limite, argv.page)
            console.table(list);
        } catch (error) {
            console.error(chalk.hex('#FFA500')(" !Internal error, cmd: following"));
        }
    },
    middleware: undefined
}