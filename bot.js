const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ headless: true, args: ['--disable-dev-shm-usage', '--no-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);
  await page.goto('https://www.hitbox.io', { waitUntil: 'domcontentloaded' });

  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'landing.png', fullPage: true });

  const guestButton = page.locator('text=Play as guest');
  await guestButton.waitFor();
  await guestButton.click();

  const nameInput = page.locator('input[placeholder*="name" i], input[name*="name" i]');
  await nameInput.waitFor();
  await nameInput.fill('Kimi');

  const continueButton = page.locator('button:has-text("Continue"), button:has-text("Play")');
  if (await continueButton.count()) {
    await continueButton.first().click();
  } else {
    await page.keyboard.press('Enter');
  }

  await page.waitForTimeout(2000);
  const customGameButton = page.locator('text=Custom Game');
  await customGameButton.waitFor();
  await customGameButton.click();

  await page.waitForTimeout(2000);
  const targetLobby = page.locator('text=OK Computer Lobby');
  await targetLobby.waitFor();
  await targetLobby.first().click();

  await page.waitForTimeout(2000);
  await page.keyboard.press('Enter');
  await page.keyboard.type("yo it's kimi");
  await page.keyboard.press('Enter');

  await page.waitForTimeout(5000);
  await browser.close();
}

main().catch(async (err) => {
  console.error(err);
  process.exit(1);
});
