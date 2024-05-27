const { Given, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser, page;

Given('the user opens the Crypto App', async function () {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('http://localhost:3001');
});

Then('the user should see the Crypto App title', async function () {
  const title = await page.$eval('h1', el => el.textContent);
  const chai = await import('chai'); // Importação dinâmica
  chai.expect(title).to.equal('Crypto');
});

Then('the user should see cryptocurrency data', async function () {
  const cryptoData = await page.$$eval('ul li', lis => lis.length);
  const chai = await import('chai'); // Importação dinâmica
  chai.expect(cryptoData).to.be.above(0);
});
