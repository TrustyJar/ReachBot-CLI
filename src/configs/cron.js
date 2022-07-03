const cron = require('node-cron')
const { checkout } = require('./script')

cron.schedule('0 0 20 * * *', () => {
  console.log('Starting');
  checkout()
})