import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.QA_BASE_URL || 'http://localhost:3107';
const browser = await chromium.launch({headless:true, executablePath:process.env.QA_CHROMIUM_PATH});
const page = await browser.newPage();
const results=[];
await mkdir('docs/truck-qa',{recursive:true});
let payload;
await page.route('https://api.web3forms.com/**', async route => { payload=route.request().postDataJSON(); await route.fulfill({json:{success:true}}); });
try {
for(const path of ['/', '/pricing']) {
 for(const width of [320,360,375,390,430,768,1440]) {
  await page.setViewportSize({width,height:950}); await page.goto(base+path,{waitUntil:'networkidle'});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${path} overflow ${width}`);
  await page.getByRole('button',{name:'Select Big Truck'}).click();
  assert.equal(await page.locator('#selectedTruck').inputValue(),'big');
  await page.locator('#selectedTruck').selectOption('small');
  assert.equal(await page.locator('input[name="truckPreference"][value="small"]').isChecked(),true);
  assert.equal(await page.locator('input[name="preferredTeam"]:checked').inputValue(),'Not Sure');
  await page.locator('#selectedTruck').blur();
  await page.locator('.truck-section').screenshot({style:'.ca-header,.ca-actionbar,.ca-skip-link{visibility:hidden!important}',path:`docs/truck-qa/${path==='/'?'home':'pricing'}-${width}.png`});
  results.push({path,width,selection:true,overflow:false});
 }
}
await page.locator('#fullName').fill('QA Mock'); await page.locator('#phone').fill('0400000000'); await page.locator('#movingFrom').fill('Adelaide'); await page.locator('#movingTo').fill('Norwood');
await page.locator('input[name="preferredTeam"]').first().locator('..').click();
await page.getByRole('button',{name:'Submit Quote Request'}).click();
await page.getByText('Thank You, QA Mock!').waitFor();
assert.equal(payload.selectedTruck,'Small Truck'); assert.equal(payload.preferredTeam,'2 Movers + Truck');
await writeFile('docs/truck-qa/results.json',JSON.stringify({results,mockedPayload:{selectedTruck:payload.selectedTruck,preferredTeam:payload.preferredTeam}},null,2));
console.log('PASS: responsive selection and mocked enquiry');
} finally { await browser.close(); }
