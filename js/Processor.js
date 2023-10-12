const inquirer = require("@inquirer/prompts");
const fs = require("fs").promises;
const path = require("path");
const fse = require("fs-extra");
// const puppeteer = require("puppeteer");

const postcss = require("postcss");
const pluginSkinner = require("./plugins/addSkinnerVariables");
const pluginAddDesiredVariable = require("./plugins/addDesiredVariable");

const pluginCleanShit = require("./plugins/cutShitPasteInVars");
const pluginClean = require("./plugins/cleanSelector");
const pluginMerge = require("./plugins/mergeCss");
const pluginRestoreEsport = require("./plugins/restoreEsport");

const pluginCollectData = require("./plugins/collectData");

const pluginPrettier = require("postcss-prettify");
// const pluginAnalyze = require('plugin-analyze');

const sportTopMatches = {
  inputFolder: path.resolve("C:\\FE\\top-matches\\src\\skinning"),
  inputFilePath: (id) => {
    return path.resolve("C:\\FE\\top-matches\\src\\skinning", `${id}.css`);
  },
  outputFilePath: (id) => {
    return path.resolve("C:\\FE\\top-matches\\src\\skinning", `${id}.css`);
  },
  // outputFilePath: (id) => {
  //   return path.resolve(__dirname, "..", "output", "topMatches", `${id}.css`);
  // },
  plugins: [pluginAddDesiredVariable],
  prompt: false,
};

const sportConfig = {
  inputFolder: path.resolve("D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners"),
  inputFilePath: (id) => {
    return path.resolve(
      "D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners",
      id,
      "Styles",
      "web.css"
    );
  },
  // outputFilePath: (id) => {
  //   return path.resolve(__dirname, "..", "output", `${id}.css`);
  // },
  outputFilePath: (id) => {
    return path.resolve(
      "D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners",
      id,
      "Styles",
      "web.css"
    );
  },
  plugins: [pluginClean],
  prompt: false,
};

const esportConfig = {
  inputFolder: path.resolve("C:\\FE\\e-sport\\src\\partner-styles"),
  inputFilePath: (id) => {
    return path.resolve("C:\\FE\\e-sport\\src\\partner-styles", `${id}.css`);
  },
  outputFilePath: (id) => {
    return path.resolve(__dirname, "..", "output", "esport", `${id}.css`);
  },
  // outputFilePath: (id) => {
  //   return path.resolve('D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners', id, 'Styles', 'web.css')
  // },
  plugins: [pluginRestoreEsport],
  prompt: false,
};

const latinConfig = {
  type: "latino",
  inputFolder: path.resolve(
    "C:\\FE\\latino-view\\latino-view\\src\\assets\\styles\\partners"
  ),
  inputFilePath: (id) => {
    return path.resolve(
      "C:\\FE\\latino-view\\latino-view\\src\\assets\\styles\\partners",
      `${id}.css`
    );
  },
  outputFilePath: (id) => {
    return path.resolve(__dirname, "..", "output", "latino", `${id}.css`);
  },
  // outputFilePath: (id) => {
  //   return path.resolve('D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners', id, 'Styles', 'web.css')
  // },
  plugins: [pluginSkinner],
  prompt: false,
};

module.exports = class CSSProcessor {
  constructor(config) {
    this.loggedData = [];
    this.logFilePath = path.resolve(__dirname, "..", "logs", "log.txt");
    this.config = config;

    this.essencesToLook = this.config.essencesToLook;
    this.essencesToGenerate = this.config.essencesToGenerate;

    fse.emptyDir(this.config.outputPath);
  }

  async processFiles(files, files2) {
    for (const file of files) {
      if (this.config.prompt) {
        const prompt = await inquirer.confirm({
          message: `Should I process file ${file}?`,
        });
        if (prompt) {
          await this.processFile(file);
        } else {
          console.log(`Skipping file ${file}`);
        }
      } else {
        let file2;
        if (files2.length > 0) {
          file2 = files2.filter((f2) => f2 === file)[0];
        }

        // await new Promise(resolve => this.processFile(file));
        await this.processFile(file, file2);
        // await this.processFile(file).then(
        //   await openBrowser(
        //     file,
        //     path.resolve(__dirname, "..", "output", `${file}.css`)
        //   )
        // );
      }
    }
  }

  async processFile(file, file2) {
    let prompt = false;
    if (this.config.prompt) {
      prompt = await inquirer.checkbox({
        message: "Select desired Skinner essences",
        choices: [
          {
            name: "body",
            value: "body",
            checked: true,
            // disabled: 'this one is mandatory'
          },
          {
            name: "accent",
            value: "accent",
            checked: true,
            // disabled: 'this one is mandatory'
          },
          new inquirer.Separator(),
          {
            name: "dominant",
            value: "dominant",
            checked: true,
          },
          {
            name: "button",
            value: "button",
            checked: true,
          },
          {
            name: "buttonSecondary",
            value: "buttonSecondary",
            checked: true,
          },
          {
            name: "navbar",
            value: "navbar",
            checked: true,
          },
          {
            name: "slider",
            value: "slider",
            checked: true,
          },
          {
            name: "header",
            value: "header",
            checked: true,
          },
          {
            name: "subHeader",
            value: "subHeader",
            checked: true,
          },
          {
            name: "event",
            value: "event",
            checked: true,
          },
          {
            name: "eventLive",
            value: "eventLive",
            checked: true,
          },
          {
            name: "odd",
            value: "odd",
            checked: true,
          },
          {
            name: "oddActive",
            value: "oddActive",
            checked: true,
          },
          {
            name: "showMore",
            value: "showMore",
            checked: true,
          },
          {
            name: "marketHeader",
            value: "marketHeader",
            checked: true,
          },
          {
            name: "collapse",
            value: "collapse",
            checked: true,
          },
          {
            name: "tab",
            value: "tab",
            checked: true,
          },
          {
            name: "tabActive",
            value: "tabActive",
            checked: true,
          },
          {
            name: "tabSecondaryActive",
            value: "tabSecondaryActive",
            checked: true,
          },
          {
            name: "menu_1",
            value: "menu_1",
            checked: true,
          },
          {
            name: "menu_2",
            value: "menu_2",
            checked: true,
          },
          {
            name: "menu_3",
            value: "menu_3",
            checked: true,
          },
          {
            name: "input",
            value: "input",
            checked: true,
          },
          {
            name: "inputSecondary",
            value: "inputSecondary",
            checked: true,
          },
          {
            name: "filter",
            value: "filter",
            checked: true,
          },
          {
            name: "tooltip",
            value: "tooltip",
            checked: true,
          },
          {
            name: "modal",
            value: "modal",
            checked: true,
          },
        ],
      });
    }

    const f = file.split(".")[0];

    let inputPath = this.config.inputFilePath(f);
    let outputPath = this.config.outputFilePath(f);
    let inputPath2, f2;

    try {
      const css = await fs.readFile(inputPath, "utf8");
      const result = await postcss(
        this.config.plugins.map((p) =>
          p({
            id: f,
            essencesToLook: this.essencesToLook,
            essencesToGenerate: this.essencesToGenerate,
          })
        )
      ).process(css, { from: undefined });

      // const modifiedCSS = result.css;
      const messages = result.messages;

      const newRule = messages.filter(
        (message) => message.type === "new-rule"
      )[0];


      if (file2) {
        f2 = file2.split(".")[0];
        inputPath2 = this.config.inputFilePath2(f2);
        const css2 = await fs.readFile(inputPath2, "utf8");
        const result2 = await postcss(
          pluginMerge({
            id: f,
            add: newRule.rule,
          })
        ).process(css2, { from: undefined });
        await fs.writeFile(outputPath, result2.css, "utf8");
      } else {

        const result3 = await postcss(
          pluginMerge({
            id: f,
            add: newRule.rule,
          })
        ).process('', { from: undefined });

        await fs.writeFile(outputPath, result3.css, "utf8");
      }

      for (const message of messages) {
        if (message.type === "collector") {
          // this.loggedData.push({
          //   id: file,
          //   occurrences: message.matchedSelectors.length,
          //   active: true,
          // });
        }

        // if (message.type === "custom" && message.plugin === "analyzer") {
        // await fs.appendFile(this.logFilePath, message.text, "utf8");
        // }
      }
    } catch (error) {
      this.loggedData.push({
        id: file,
        occurrences: 0,
        active: false,
      });
      const message = `${file}---------------------
${file} partner doesn't exist
.............................`;
      await fs.appendFile(this.logFilePath, message, "utf8");
      console.error(`Error processing file ${file}:`, error);
    }
  }

  async run() {
    try {
      let filesArray = await fs.readdir(this.config.inputFolder);
      let filesArray2;
      if (this.config.inputFolder2) {
        filesArray2 = await fs.readdir(this.config.inputFolder2);
      }
      await fs.writeFile(this.logFilePath, "new log file\n", "utf8");

      await this.processFiles(filesArray, filesArray2);
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
};

// const processor = new CSSProcessor(esportConfig);
// processor.run().then(() => processor.report());
