const path = require('path')
const Discord = require('discord.js')
const chalk = require('chalk')
const credentials = require(path.resolve(__dirname, 'configs.json'))

const clientOptions = Discord.ClientOptions = {
  intents: new Discord.Intents(),
};

const sendEmbeded = (error) => {
  const embed = new Discord.MessageEmbed().setTitle('🎉Successful SISO🎉').setDescription('😭Now time for study hall😭').setColor('#52b788').setTimestamp()
  embed.addField('User', credentials.username)
  let status = (!error) ? "Success" : "Error"
  embed.addField('Status', status, true)
  if(error) {
    embed.addField('Error', error.message, true)
  }
  embed.setTimestamp()
  const {id, token} = getIdAndToken(credentials.discordWebhook)
  const client = new Discord.WebhookClient({id, token})
  client.send({
    content: null,
    embeds: [embed],
    username: 'ReachAIO',
  }).then(resp => {
    console.log(chalk.green.bold(`Notification sent`))
  })
}

function getIdAndToken(webhook) {
  const match = /.*\/webhooks\/(\d+)\/(.+)/.exec(webhook)

  if (!match) {
    throw new Error('could not get discord webhook');
  }

  return {
    id: match[1],
    token: match[2],
  };
}

module.exports = { sendEmbeded }
