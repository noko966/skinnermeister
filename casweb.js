const path = require("path");
const plugin = require("./js/plugins/addSkinnerVariablesCasWeb");

const CSSProcessor = require("./js/Processor.js");

const config = {
  inputFolder: path.resolve("casWeb", "partners"),
  inputFilePath: (id) => {
    return path.resolve("casWeb", "partners", `${id}.css`);
  },
  inputFolder2: path.resolve("casWeb", "partners"),
  inputFilePath2: (id) => {
    return path.resolve("casWeb", "partners", `${id}.css`);
  },
  outputPath: path.resolve("output", "casWeb"),
  outputFilePath: (id) => {
    return path.resolve("output", "casWeb", `${id}.css`);
  },
  // outputFilePath: (id) => {
  //   return path.resolve('D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners', id, 'Styles', 'web.css')
  // },
  plugins: [plugin],
  essencesToLook: [
    {
      from: "--bg-level-1",
      to: "body",
    },
    {
      from: "--primary",
      to: "accent",
    },
  ],
  essencesToGenerate: [
    "body",
    "dominant",
    "accent",
    "button",
    "input",
    "header",
    "navbar",
    "subHeader",
    "modal",
    "tab",
    "tabActive",
    "tooltip",
  ],
  prompt: false,
};

const p = new CSSProcessor(config);

p.run().then(() => p.report());
