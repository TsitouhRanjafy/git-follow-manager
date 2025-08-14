export default {
    command: 'following',
    description: 'Affiche tout l\'utilisateur qui vous suit\n',
    builder: (yargs) => {
        return yargs
         .option('all', {
                alias: 'a',
                type: 'boolean',
                describe: "Afficher tous les utilisateurs"
            })
            .option('limite', {
                alias: 'l',
                type: 'number',
                describe: 'Limiter le nombre d\'utilisateurs affichés'
            })
            .option('paging', {
                alias: 'p',
                type: 'number',
                describe: 'Indique le numéro de page pour la pagination'
            })
    },
    handler: (argv) => {
      console.log('commend following executer avec ',argv);
    },
    middleware: undefined
}