export default {
    command: 'follow',
    description: 'S\'abonner à utilisateur',
    builder: (yargs) => {
        return yargs
            .option('username', {
                alias: 'u',
                type: 'string',
                describe: 'Indiqué le nom d\'utilisateur à suivre'
            })
            .option('json', {
                alias: 'j',
                type: 'string',
                describe: 'Indiqué le chemin vers un fichier JSON contenant les noms des utilisateurs à suivre'
            })
    },
    handler: (argv) => {
      console.log('commend follow executer avec ',argv);
    },
    middleware: undefined
}