const inquirer = require("@inquirer/prompts");
const fs = require("fs").promises;
const path = require("path");
const fse = require("fs-extra");
// const puppeteer = require("puppeteer");

const postcss = require("postcss");
const pluginSkinner = require("./plugins/addSkinnerVariables");
const pluginCleanShit = require("./plugins/cutShitPasteInVars");

const pluginPrettier = require("postcss-prettify");
// const pluginAnalyze = require('plugin-analyze');

const config = {
  inputFolder: path.resolve("D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners"),
  inputFilePath: (id) => {
    return path.resolve(
      "D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners",
      id,
      "Styles",
      "web.css"
    );
  },
  outputFilePath: (id) => {
    return path.resolve(__dirname, "..", "output", `${id}.css`);
  },
  // outputFilePath: (id) => {
  //   return path.resolve('D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners', id, 'Styles', 'web.css')
  // },
  plugins: [pluginPrettier, pluginCleanShit],
  prompt: false,
};

class CSSProcessor {
  constructor(config) {
    this.loggedData = [];
    this.logFilePath = path.resolve(__dirname, "..", "logs", "log.txt");

    fse.emptyDir(path.resolve(__dirname, "..", "output"));

    this.config = config;
  }

  async processFiles(files) {
    for (const file of files) {
      if (config.prompt) {
        const prompt = await inquirer.confirm({
          message: `Should I process file ${file}?`,
        });
        if (prompt) {
          await this.processFile(file);
        } else {
          console.log(`Skipping file ${file}`);
        }
      } else {
        // await new Promise(resolve => this.processFile(file));
        await this.processFile(file)
        // await this.processFile(file).then(
        //   await openBrowser(
        //     file,
        //     path.resolve(__dirname, "..", "output", `${file}.css`)
        //   )
        // );
      }
    }
  }

  async processFile(file) {
    let prompt = false;
    if (config.prompt) {
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
    const inputPath = this.config.inputFilePath(f);
    const outputPath = this.config.outputFilePath(f);

    try {
      const css = await fs.readFile(inputPath, "utf8");
      const result = await postcss(
        this.config.plugins.map((p) => p({ id: f, essences: prompt }))
      ).process(css, { from: undefined });

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

        // if (message.type === "custom" && message.plugin === "analyzer") {
        await fs.appendFile(this.logFilePath, message.text, "utf8");
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
