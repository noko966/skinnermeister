const puppeteer = require('puppeteer');

(async () => {
  // Launch a headful browser so you can see the window
  const browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: null,
    args: ['--window-size=1920,1080'] });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to the desired URL
  await page.goto('https://sportiframe.tst-digi.com/SportsBook/Home?token=-&d=d&l=hy&tz=&of=0&ofl=&parent=sport.tst-digi.com&customCssUrl=&sportsBookView=&clearSiteStyles=false&resetAllStyles=false&theme=');

//   await page.setViewport({width: 1920, height: 1080});
  // Inject a script into the page
  await page.addScriptTag({ content: 'console.log("Script Injected!");' });

  // Optionally, you can wait for a specific amount of time before closing the browser.
  // This line waits for 5 seconds (5000 milliseconds).
//   await new Promise(resolve => setTimeout(resolve, 5000));

  // Close the browser
//   await browser.close();
})();