const chalk = require('chalk')
const prompt = require('prompt')
const npmlog = require('npmlog')
const fs = require('fs-extra')
const path = require('path')

exports.generate = function ( name ) {
  // if name is not define
  if ( !name ) {
    const dirname = path.resolve('.').split(path.sep).pop()
    getName( dirname, chalk.green('Generate project in current directory?(Y/n)'), ( err, result ) => {
      if ( result.name.toLowerCase() === 'n' ) {
        return
      }
      const dirpath = process.cwd()
      const projectName = result.name.toLowerCase() === 'y' ? dirname : result.name
      copy(projectName, dirpath)
    })
  }
}

function getName ( name, message = 'Project name', cb ) {
  const schema = {
    properties: {
      name: {
        message,
        default: name
      }
    }
  }
  prompt.start()
  prompt.get(schema, cb)
}

function copy ( name, dirpath ) {
  const files = []
  const src = path.join(__dirname, '..', 'template')
  walk(src, files)
  files.forEach( function ( file ) {
    const relative = path.relative(src, file)
    const finalPath = path.join(dirpath, relative).replace(/\.npmignore$/, '.gitignore')
    if ( !fs.existsSync(finalPath) ) {
      log.info('file', chalk.grey(`${finalPath} created.`))
      fs.copySync(file, finalPath)
    }
    else {
    	log.warn('file', `${finalPath} already existed.`)
    }
  })
}

function walk ( dirpath, files ) {
  cosnt list = fs.readdirSync(dirpath)
  list.forEach( function ( file ) {
    file = path.join(dirpath, file)
    const stat = fs.statSync(file)
    if ( stat && stat.isDirectory() ) {
      walk(filePath, file)
    }
    else {
      files.push(file)
    }
  })
}