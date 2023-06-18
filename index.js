const postcss = require("postcss");
const fs = require("fs").promises;
const path = require("path");
const postCSSPlugin = require("./js/plugins/addToRoot");

const logFilePath = path.resolve(__dirname, "logs", "log.txt");

// const SPORT_PARTNER_SPATH = path.resolve(
//   "D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners"
// );

const SPORT_PARTNER_SPATH = path.resolve(__dirname, "starter");

async function processFiles(files) {
  for (const file of files) {
    await processFile(file);
  }
}

async function processFile(file) {
  const inputPath = path.resolve(SPORT_PARTNER_SPATH, `${file}`);
  const outputPath = path.resolve(__dirname, "output", `${file}`);
  // await fs.appendFile(logFilePath, `\n-----------${file}-----------\n`, "utf8");
  try {
    const css = await fs.readFile(inputPath, "utf8");

    // Process the CSS with PostCSS
    const result = await postcss([postCSSPlugin({partnerId: file})]).process(css, { from: undefined });
    const modifiedCss = result.css;
    const messages = result.messages;

    // Write the modified CSS to a file
    await fs.writeFile(outputPath, modifiedCss, "utf8");

    for (const message of messages) {
      if (message.type === "custom" && message.plugin === "plugin_nik") {
        console.log("Custom message:", message.text);
        await fs.appendFile(logFilePath, message.text, "utf8");
      }
    }
    console.log(`File ${file} processed successfully.`);
  } catch (error) {
    console.error(`Error processing file ${file}:`, error);
  }
}

(async () => {
  try {
    const filesArray = await fs.readdir(SPORT_PARTNER_SPATH);
    await fs.writeFile(logFilePath, 'new log file\n', "utf8");
    await processFiles(filesArray);
  } catch (error) {
    console.error("Error reading directory:", error);
  }
})().then(() => {
  console.log("done");
});