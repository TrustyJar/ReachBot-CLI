const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const readlineSync = require('readline-sync')
const pm2 = require('./configs/pm2')

const configFile = path.resolve(__dirname, 'configs/configs.json')
const options = ['Start Cycle', 'End Cycle', 'Set username', 'Set password']

console.clear()
console.log(chalk.red.bold(`Welcome to ${chalk.underline('ReachAIO V0.1.3')}`))

async function run() {
  if(!fs.existsSync(configFile)) {
    fs.writeFileSync(configFile, JSON.stringify({}))
  }
  const selected = readlineSync.keyInSelect(options, 'Please select an option')
  if(selected != -1) {
    if(selected == 0) { // Start cycle function
      // Configs check
      const credentials = require(configFile)
      if(!credentials.username) {
        console.log(chalk.red.bold('No username found, please add a username'))
        process.exit(0)
      }
      if(!credentials.password) {
        console.log(chalk.red.bold('No password found, please add a password'))
        process.exit(0)
      }
      if(!credentials.discordWebhook) {
        console.log(chalk.red.bold('No webhook found, please add a webhook'))
        process.exit(0)
      }
      try {
        await pm2.connect() // Configs passed, starting pm2
        const fileName = path.resolve(__dirname, 'configs/cron.js')
        await pm2.start(fileName, 'cyrusnaficy_ReachAIO')
        await pm2.disconnect()
        console.log(chalk.green.bold('Cycle enabled and running successfully'))
      }
      catch(e) {
        console.log(chalk.red.underline('Got error'))
        console.log(e)
      }
    }

    if(selected == 1) { // End cycle
      try {
        await pm2.connect() // Configs passed, starting pm2
        await pm2.deleteCont('cyrusnaficy_ReachAIO')
        await pm2.disconnect()
        console.log(chalk.green.bold('Cycle disabled successfully'))
      }
      catch(e) {
        console.log(chalk.red.underline('Got error'))
        console.log(e)
      }
    }

    if(selected == 2) { // set username
      let username = readlineSync.question(chalk.green.underline('Please enter a username:') + " ")
      let configs = require(configFile)
      configs.username = username
      fs.writeFileSync(configFile, JSON.stringify(configs))
      console.log(chalk.green.bold('Username setted successfully'))
    }

    if(selected == 3) { // set password
      let password = readlineSync.question(chalk.green.underline('Please enter a password:') + " ")
      let configs = require(configFile)
      configs.password = password
      fs.writeFileSync(configFile, JSON.stringify(configs))
      console.log(chalk.green.bold('Password setted successfully'))
    }
    }
  }

run()



// const path = require('path')
// const pm2 = require('pm2')

// pm2.connect(function(err) {
//   if (err) {
//     console.error(err)
//     process.exit(2)
//   }
//   console.log('connected') //16656
//   pm2.stop('test', (err, proc) => { console.log(err); console.log(proc); console.log('done') })
// })
