export default {
    command: 'auto-follow',
    description: 'S\'abonner tout les utilisateurs qui vous abonne',
    builder: (yargs) => {
        return yargs
    },
    handler: (argv) => {
      console.log('commend auto-follow executer avec ',argv);
    },
    middleware: undefined
}