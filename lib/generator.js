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