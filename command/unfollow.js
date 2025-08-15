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
                describe: 'Indiqué le chemin vers un fichier JSON contenant les noms des utilisateurs à désabonner'
            })
    },
    handler: (argv) => {
      console.log('commend unfollow executer avec ',argv);
    },
    middleware: undefined
}