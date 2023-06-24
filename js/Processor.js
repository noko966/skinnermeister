const fs = require("fs").promises;
const path = require("path");
const fse = require("fs-extra");
const postcss = require("postcss");
const pluginSkinner = require("./plugins/addSkinnerVariables");
// const pluginAnalyze = require('plugin-analyze');
// const pluginTransform = require('plugin-transform');

// const config = {
//     inputFolder: path.resolve('D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners'),
//     inputFilePath: (id) => {path.resolve(this.SPORT_PARTNERS_PATH, id, 'Styles', 'web.css')},
//     outputFilePath: (id) => {path.resolve(__dirname, 'output', `${id}.css`)},
//     plugins: [pluginSkinner]
// }

const config = {
  inputFolder: path.resolve(__dirname, "..", "input"),
  inputFilePath: (id) => {
    return path.resolve(__dirname, "..", "input", `${id}.css`);
  },
  outputFilePath: (id) => {
    return path.resolve(__dirname, "..", "output", `${id}.css`);
  },
  plugins: [pluginSkinner],
};

class CSSProcessor {
  constructor(config) {
    this.loggedData = [];
    this.logFilePath = path.resolve(__dirname, "..", "logs", "log.txt");

    fse.emptyDir(path.resolve(__dirname, "output"));

    this.config = config;

  }

  async processFiles(files) {
    for (const file of files) {
      await this.processFile(file);
    }
  }

  async processFile(file) {
    const f = file.split('.')[0];
    const inputPath = this.config.inputFilePath(f);
    const outputPath = this.config.outputFilePath(f);

    try {
      const css = await fs.readFile(inputPath, "utf8");
      const result = await postcss(this.config.plugins.map((p) => p({id:f}))).process(
        css,
        { from: undefined }
      );

      const modifiedCSS = result.css;
      const messages = result.messages;
      await fs.writeFile(outputPath, modifiedCSS, "utf8");

      for (const message of messages) {
        if (message.type === "selector") {
          this.loggedData.push({
            id: file,
            occurrences: message.matchedSelectors.length,
            active: true,
          });
        }

        if (message.type === "custom" && message.plugin === "analyzer") {
          await fs.appendFile(this.logFilePath, message.text, "utf8");
        }
      }
    } catch (error) {
      this.loggedData.push({
        id: file,
        occurrences: 0,
        active: false,
      });
      const message = `${file}--------------------------

${file} partner doesn't exist"

..................................`;
      await fs.appendFile(this.logFilePath, message, "utf8");
      console.error(`Error processing file ${file}:`, error);
    }
  }

  async run() {
    try {
      const filesArray = await fs.readdir(this.config.inputFolder);
      await fs.writeFile(this.logFilePath, "new log file\n", "utf8");
      await this.processFiles(filesArray);
    } catch (error) {
      console.error("Error reading directory:", error);
    }
  }

  report() {
    const empty = this.loggedData.filter((a) => !a.active);
    const active = this.loggedData.filter((a) => a.active);

    console.log(`${empty.length} partners have no css file`);
    empty.forEach((p) => {
      console.log(p.id);
    });
    console.log("done");
  }
}

const processor = new CSSProcessor(config);
processor.run().then(() => processor.report());
