const chalk = require('chalk')
const prompt = require('prompt')
const log = require('npmlog')
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
      replace(projectName, dirpath)
    })
  }
  else {
    getName( name, chalk.green('Init your project'), ( err, result ) => {
      if ( err ) {
        return
      }
      let projectName = result.name
      const dirpath = path.join(process.cwd(), projectName)
      createProject(projectName, dirpath)
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

function createProject ( name, dirpath ) {
  fs.mkdir(dirpath, 484, err => {
    if ( err ) {
      if ( err.code === 'EEXIST' ) {
        return log.error('EXIST', chalk.red(`the folder ${name} exists! Please rename your project.`))
      }
      else {
        return err
      }
    }
    else {
      copy(name, dirpath)
      replace(name, dirpath)
    }
  })
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

function replace ( name, dirpath ) {
  const files = ['package.json', 'README.md']
  files.forEach( file => {
    let filePath = path.join(dirpath, file)
    var content = fs.readFileSync( filePath, {
      encoding: 'utf-8'
    })
    content = content.replace(/{{\s*(.+)\s*}}/ig, function ( defaultName ) {
      return name || defaultName
    })
    fs.writeFileSync(filePath, content)
  })
}

function walk ( dirpath, files ) {
  const list = fs.readdirSync(dirpath)
  list.forEach( function ( file ) {
    file = path.join(dirpath, file)
    const stat = fs.statSync(file)
    if ( stat && stat.isDirectory() ) {
      walk(file, files)
    }
    else {
      files.push(file)
    }
  })
}