const postcss = require("postcss");
const fs = require("fs").promises;
const fse = require("fs-extra");
const path = require("path");
const pluginAnalyze = require("./js/plugins/analyze");
const pluginTransform = require("./js/plugins/transform");

const pluginCleanSelector = require("./js/plugins/cleanSelector");

// import getFileNames from "./js/output/output";

let loggedData = [];

const logFilePath = path.resolve(__dirname, "logs", "log.txt");

// const SPORT_PARTNERS_PATH = path.resolve(__dirname, "starter");

const SPORT_PARTNERS_PATH = path.resolve(
  "D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners"
);

fse.emptyDir(path.resolve(__dirname, "output"));

async function processFiles(files) {
  for (const file of files) {
    await processFile(file);
  }
}

async function processFile(file) {
  const inputPath = path.resolve(
    SPORT_PARTNERS_PATH,
    file,
    "Styles",
    "web.css"
  );

  const outputPath = path.resolve(__dirname, "output", `${file}.css`);
  // const outputPath = path.resolve(`D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners\\${file}\\Styles\\web.css`);

  try {
    const css = await fs.readFile(inputPath, "utf8");
    // Process the CSS with PostCSS
    const result = await postcss([
      // pluginCleanSelector({ partnerID: file }),
      pluginAnalyze({ partnerID: file }),
      pluginTransform({ partnerID: file }),
    ]).process(css, { from: undefined });

    const modifiedCSS = result.css;
    const messages = result.messages;
    // Write the modified CSS to a file
    await fs.writeFile(outputPath, modifiedCSS, "utf8");
    for (const message of messages) {
      if (message.type === "selector") {
        await loggedData.push({
          id: file,
          occurrences: message.matchedSelectors.length,
          active: true,
        });
      }
      if (message.type === "custom" && message.plugin === "analyzer") {
        await fs.appendFile(logFilePath, message.text, "utf8");
      }
    }

    // console.log(`File ${file} processed successfully.`);
  } catch (error) {
    loggedData.push({
      id: file,
      occurrences: 0,
      active: false,
    });
    const message = `${file}--------------------------

${file} partner doesn't exist"

..................................
`;  
    await fs.appendFile(logFilePath, message, "utf8");
    console.error(`Error processing file ${file}:`, error);
  }
}

let filesArray;

(async () => {
  try {
    filesArray = await fs.readdir(SPORT_PARTNERS_PATH);
    await fs.writeFile(logFilePath, "new log file\n", "utf8");
    await processFiles(filesArray);
  } catch (error) {
    console.error("Error reading directory:", error);
  }
})().then(() => {
  let empty = loggedData.filter((a) => {
    return !a.active;
  });
  let active = loggedData.filter((a) => {
    return a.active;
  });
  console.log(`${empty.length} partners has no css file`);
  empty.forEach((p) => {
    console.log(p.id);
  });
  console.log("done");
});
