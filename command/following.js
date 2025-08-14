export default {
    command: 'following',
    description: 'Affiche tout l\'utilisateur qui vous suit',
    builder: (yargs) => {
        return yargs
    },
    handler: (argv) => {
      console.log('commend following executer avec ',argv);
    },
    middleware: undefined
}