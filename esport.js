const path = require("path");
const plugin = require("./js/plugins/addSkinnerVariables");

const CSSProcessor = require("./js/Processor.js");

const config = {
  inputFolder: path.resolve("e-sport", "partners"),
  inputFilePath: (id) => {
    return path.resolve("e-sport", "partners", `${id}.css`);
  },
  inputFolder2: path.resolve("C:\\FE\\e-sport\\src\\partner-styles"),
  inputFilePath2: (id) => {
    return path.resolve("C:\\FE\\e-sport\\src\\partner-styles", `${id}.css`);
  },
  outputPath: path.resolve("output", "esport"),
  outputFilePath: (id) => {
    return path.resolve("output", "esport", `${id}.css`);
  },
  // outputFilePath: (id) => {
  //   return path.resolve('D:\\Projects\\Sport\\Dev\\Sport.MVC\\Partners', id, 'Styles', 'web.css')
  // },
  plugins: [plugin],
  essencesToLook: [
    {
      from: "--sport-digi-background",
      to: "body",
    },
    {
      from: "--sport-digi-accent",
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
    "subHeader",
    "event",
    "modal",
    "tab",
    "tabActive",
    "tooltip",
  ],
  prompt: false,
};

const p = new CSSProcessor(config);

p.run().then(() => p.report());
