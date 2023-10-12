const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const puppeteer = require("puppeteer");


const SPORTCONFIG = {
  DIRECTORY: path.join(__dirname, "../", "output", "esport"),
  URL: "https://localhost:44397/SportsBook/Home",
  PORT: 5500,
}

const ESPORTCONFIG = {
  DIRECTORY: path.join(__dirname, "../", "output", "esport"),
  URL: "http://dev.tst-digi.com:3000/#/",
  PORT: 5500,
}

function startServer(config) {
  const app = express();

  // CORS middleware
  app.use(cors());

  // Serve static files from 'output' directory
  app.use("/partners", express.static(config.DIRECTORY));

  app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}`));
}

async function openBrowser(config, data) {


  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ["--enable-automation"],
    headless: false,
    defaultViewport: null,
    args: [
      "--window-size=1920,1080",
      "--window-position=0,0",
      "--test-type",
      "--disable-infobars",
      "--ignore-certificate-errors"
    ],
  });

  // Open a new page
  const pages = await browser.pages();
  const page = pages[0];


  await page.goto(config.URL);

  // await page.waitForSelector("#calcBtn");

  // Return a Promise that resolves once the browser is closed
  return new Promise((resolve) => {
    page.exposeFunction("onCustomButtonClick", async () => {
      console.log(`Button clicked! Closing the browser for partner ${id}...`);
      await browser.close();
      resolve(); // Resolve the Promise here
    });

    // Attach an event listener to the button for the 'click' event
    page.evaluate(
      (config, data) => {

        function createTestingUI(){
          const container = document.createElement('div');
          container.style.position = 'fixed';
          container.style.width = '40px';
          container.style.height = '40px';
          container.style.top = '0';
          container.style.right = '0';
          container.style.background = '#dedede';
          container.style.color = '#000';
          container.style.fontSize = '10px';
          container.style.display = 'flex';
          container.style.alignItems = 'center';
          container.style.justifyContent = 'center';
          container.style.zIndex = '100';
          container.style.borderRadius = '30px';

          document.body.appendChild(container);

          return container;

        }

        const TESTUIELEMENT = createTestingUI();

        let current = 0;
        const head = document.getElementsByTagName("head")[0];

        function setCSSOverride(p, id) {
          console.log("Current partner:", id);
          TESTUIELEMENT.innerText = id.split('.')[0];
          let link = document.getElementById("partnerStyleCssLink");
          if (link) {
            link.href = `http://127.0.0.1:${p}/partners/${id}?v=${Date.now()}`;
          } else {
            link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = `http://127.0.0.1:${p}/partners/${id}?v=${Date.now()}`;
            link.media = "all";
            link.id = "partnerStyleCssLink";
            head.appendChild(link);
            console.log("CSS link created");
          }

        }

        document.addEventListener("keyup", function (event) {
          if (event.key === "ArrowLeft") {
            if (current < 0) {
              current = data.length;
            }
            setCSSOverride(config.PORT, data[--current]);
          }
        });
        document.addEventListener("keyup", function (event) {
          if (event.key === "ArrowRight") {
            if (current > data.length) {
              current = 0;
            }
            setCSSOverride(config.PORT, data[++current]);
          }
        });


        setCSSOverride(config.PORT, data[current]);
      },
      config,
      data
    );
  });
}


async function startTesting(config){
  await fs.readdir(config.DIRECTORY, (err, data) => {
    startServer(config);
    openBrowser(config, data);
  });
}


startTesting(ESPORTCONFIG)

