import {readFileSync, writeFileSync} from 'fs'

const Bar = require('progress-barjs')

type Opts = {
  encoding: 'utf8'
}

export async function minimization(files: string[], opts: Opts) {
  const {encoding = 'utf8', ...transformOpts} = opts
  // @ts-ignore
  const options = Object.keys(transformOpts).length > 0 ? transformOpts : {minify: true}
  const filesFiltered = files.filter((f) => f.endsWith('.json'));
  const bar = Bar({
    label: 'Minimize JSON',
    info: 'Processing',
    total: filesFiltered.length,
  })
  let i = 0
  let timer = setInterval(async () => {
    const file = filesFiltered[i]
    if (file) {
      const content = readFileSync(file, {encoding});
      const contentMinified = JSON.stringify(JSON.parse(content));
      writeFileSync(file, contentMinified, {encoding})
    }
    bar.tick('Tick number ' + i)
    if (bar.complete) {
      clearInterval(timer)
      console.log(`🎉 JSON files have been minimized with success. 🎉`)
    }
    i++
  }, 100)
}
