#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import commands from './command/index.js';

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]');

argv.version("0.0.1")

commands.forEach(cmd => {
  argv.command(
    cmd.command,
    cmd.description,
    cmd.builder,
    cmd.handler
  )
});

argv
  .help('h')
  .alias('h','help')
  .epilog('copyright 2025')
  .parse();
