const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const puppeteer = require("puppeteer");

const DIRECTORY = path.join(__dirname, "../", "output");
const URL = "https://localhost:44397/SportsBook/Home";
const PORT = 5500;

function startServer(dir) {
  const app = express();

  // CORS middleware
  app.use(cors());

  // Serve static files from 'output' directory
  app.use("/partners", express.static(dir));

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

async function openBrowser(port, data) {
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ["--enable-automation"],
    headless: false,
    defaultViewport: null,
    args: [
      "--window-size=1920,1080",
      "--window-position=1920,0",
      "--test-type",
      "--disable-infobars"
    ],
  });

  // Open a new page
  const pages = await browser.pages();
  const page = pages[0];

  await page.goto(URL);

  await page.waitForSelector("#calcBtn");

  // Return a Promise that resolves once the browser is closed
  return new Promise((resolve) => {
    page.exposeFunction("onCustomButtonClick", async () => {
      console.log(`Button clicked! Closing the browser for partner ${id}...`);
      await browser.close();
      resolve(); // Resolve the Promise here
    });

    // Attach an event listener to the button for the 'click' event
    page.evaluate(
      (port, data) => {
        let current = 0;
        const head = document.getElementsByTagName("head")[0];

        function setCSSOverride(p, id) {
          console.log("Current partner:", id);
          let link = document.getElementById("partnerStyleCssLink");
          if (link) {
            link.href = `http://127.0.0.1:${p}/partners/${id}`;
          } else {
            link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = `http://127.0.0.1:${p}/partners/${id}`;
            link.media = "all";
            link.id = "partnerStyleCssLink";
            head.appendChild(link);
            console.log("CSS link created");
          }

          console.log(current, data);
        }

        document.addEventListener("keyup", function (event) {
          if (event.key === "ArrowLeft") {
            if (current < 0) {
              current = data.length;
            }
            setCSSOverride(port, data[--current]);
          }
        });
        document.addEventListener("keyup", function (event) {
          if (event.key === "ArrowRight") {
            if (current > data.length) {
              current = 0;
            }
            setCSSOverride(port, data[++current]);
          }
        });

        console.log(current, data);

        setCSSOverride(port, data[current]);
      },
      port,
      data
    );
  });
}

const partners = fs.readdir(DIRECTORY, (err, data) => {
  startServer(DIRECTORY);
  openBrowser(PORT, data);
});
