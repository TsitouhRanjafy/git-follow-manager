export default {
    command: 'login',
    description: 'S\'indentifier avec le code d\'authentification\n',
    builder: (yargs) => {
        return yargs
    },
    handler: (argv) => {
      console.log('commend login executer avec ',argv);
    },
    middleware: undefined
}