#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { readFile } from 'node:fs';

import commands from './command/index.js';

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]');

readFile('./package.json', 'utf-8',(err, data) => {
    if (err) throw err;
    argv.version(JSON.parse(data).version)
})

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
  .alias('v','version')
  .alias('h','help')
  .epilog('copyright 2025')
  .parse();
