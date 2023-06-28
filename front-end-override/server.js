const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const puppeteer = require("puppeteer");

const dirPath = path.join(__dirname, "../", "output");

const app = express();

// CORS middleware
app.use(cors());

function fileList(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      const fileNames = files.map((file) => path.parse(file).name);
      resolve(fileNames);
    });
  });
}

// serve static files from 'output' directory
app.use("/partners", express.static(dirPath));

app.get("/directories", async (req, res) => {
  console.log(dirPath);

  try {
    const files = await fileList(dirPath);
    res.send(files);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(5500, () => console.log("Server listening on port 5500"));


async function openBrowser(id) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--window-size=1920,1080", '--window-position=1920,0'],
  });

  // Open a new page
  const pages = await browser.pages();
  const page = pages[0];
  // Navigate to the desired URL
  // await page.goto(
  //   "https://sportiframe.tst-digi.com/SportsBook/Home?token=-&d=d&l=hy&tz=&of=0&ofl=&parent=sport.tst-digi.com&customCssUrl=&sportsBookView=&clearSiteStyles=false&resetAllStyles=false&theme="
  // );
await page.goto(
    "https://localhost:44397/SportsBook/Home"
  );

  const cssContent = await fs.readFile(cssPath, "utf-8");

  await page.waitForSelector("#calcBtn");

  // Return a Promise that resolves once the browser is closed
  return new Promise((resolve) => {
    page.exposeFunction("onCustomButtonClick", async () => {
      console.log(`button clicked! Closing the browser for partner ${id}...`);
      await browser.close();
      resolve(); // Resolve the Promise here
    });

    // Attach an event listener to the button for the 'click' event
    page.evaluate((cssContentInBrowser) => {
      document.querySelector(".tg__subhead").addEventListener("click", () => {
        onCustomButtonClick();
      });
      let styleTag = document.getElementById("partnerStyleCssLink");
      styleTag.remove();
      const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(cssContentInBrowser));
  document.head.appendChild(style);
    }, cssContent);
  });
}


