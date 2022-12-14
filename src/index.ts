#!/usr/bin/env node
import {Command} from 'commander'
import {glob} from 'glob'
import {minimization} from './minimization'

const encoding = 'utf8'
const program = new Command()

async function getFiles(directory: string) {
  const options = program.opts()
  if (directory) {
    const files = glob.sync(`${directory}/**`, {})
    await minimization(files, {encoding, ...options})
  }
}

async function run() {
  program.argument('<directory>', 'your files directory').action(getFiles)
  await program.parseAsync()
}

run()
