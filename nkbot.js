console.log('Ejecutando el Bot mas shidori tercer mundista.\nComenzando ejecucion del script UwU...')
let { spawn } = require('child_process')
let path = require('path')
let fs = require('fs')
let package = require('./package.json')
const CFonts  = require('cfonts')
CFonts.say('Ejecutando...', {
  font: 'tiny',
    color: 'candy',
    align: 'center',
  gradient: ['red', 'yellow']
})
CFonts.say(`${package.name}`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
})
function start(file) {
  let args = [path.join(file), ...process.argv.slice(2)]
  CFonts.say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  })
  let p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  })
  .on('message', data => {
    console.log('[RECIVIDO]', data)
    switch (data) {
      case 'resetear':
        p.kill()
        start.apply(this, arguments)
        break
      case 'actividad':
        p.send(process.uptime())
        break
    }
  })
  .on('error', e => {
    console.error(e)
    fs.watchFile(args[0], () => {
      start()
      fs.unwatchFile(args[0])
    })
  })
  // console.log(p)
}
start('teslagod.js')