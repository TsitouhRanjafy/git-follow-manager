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
    handler: (argv) => {
      console.log('commend auto-follow executer avec ',argv);
    },
    middleware: undefined
}