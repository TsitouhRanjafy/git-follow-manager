export default {
    command: 'auto-unfollow',
    description: 'Se désabonner tout les utilisateurs qui n\'est pas abonné à vous',
    builder: (yargs) => {
        return yargs
            .option('ignore', {
                alias: 'ig',
                type: 'string',
                describe: 'Indiqué le\'utilisateur à ignorer'
            })
            .option('json', {
                alias: 'j',
                type: 'string',
                describe: 'Indiqué le chemin vers un fichier JSON contenant les noms des utilisateurs à ignorer'
            })
    },
    handler: (argv) => {
      console.log('commend auto-unfollow executer avec ',argv);
    },
    middleware: undefined
}