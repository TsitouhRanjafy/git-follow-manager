#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import followers from './command/followers.js';
import follow from './command/follow.js';

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')

  .command(
    followers.command, 
    followers.description,
    followers.builder,
    followers.handler
  )

  .command(
    follow.command, 
    follow.description,
    follow.builder,
    follow.handler
  )
  .help('h')
  .alias('h','help')
  .epilog('copyright 2025')
  .parse()
