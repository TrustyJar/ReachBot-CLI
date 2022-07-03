const path = require('path')
const puppeteer = require('puppeteer')
const discord = require('./discord')
const credentials = require(path.resolve(__dirname, 'configs.json'))
const colors = require('colors')
const product_url = "<MYSCHOOLURL>";

async function givePage(){
  const browser = await puppeteer.launch({headless: true, executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'});
  const page = await browser.newPage();
  return { page, browser };
}

console.log('Parsing Login...'.yellow);

async function login(page){
    await page.goto(product_url);
    await page.waitForSelector("input[id='username']");
    await page.click("input[id='username']", elem => elem.click());
    await page.type("input[id='username']", credentials.username);
    await page.waitFor(100);
    await page.type("input[id='password']", credentials.password);
    await page.click("button[class='btn btn-reach-red sign-in-btn']", elem => elem.click());

}

console.log('Successfully Logged In'.cyan);

async function execute(page, browser){
    await page.waitFor(1000);
    await page.waitForSelector("button[data-locid='24']");
    await page.click("button[data-locid='24']", elem => elem.click(), {clickCount: 2});
    await page.waitFor(1000);
    console.log('Clicking SISO Button'.yellow);
    await page.click("button[data-locid='24']", elem => elem.click(), {clickCount: 2});
    await page.waitFor(1000);
    await browser.close()
}

console.log('Successful SISO'.green);

async function checkout(){
  let error = false
  try {
      var { page, browser} = await givePage();
      await login(page);
      await execute(page, browser);
  }
  catch(e) {
    error = e
  }
  discord.sendEmbeded(error)
}

//checkout()

module.exports = { checkout }
