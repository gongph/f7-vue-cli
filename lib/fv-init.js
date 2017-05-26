const argv = require('yargs').argv
const generator = require('./generator')
generator.generate(argv._[0])