const fs = require("fs");
const path = require("path");
const fsExtra = require("fs-extra");
const postcss = require("postcss");
const filterVarsPlugin = require("./js/onlyVars");

const filesPathStarter = path.join(__dirname, "starter");
const outputPath = path.join(__dirname, "output");
const workingFiles = fs.readdirSync(filesPathStarter);
const encoding = "utf8";

function clearDirectory(dir) {
  fsExtra.emptyDirSync(dir);
}

clearDirectory(outputPath);

for (let i = 0; i < workingFiles.length; i++) {
  const fileContent = fs.readFileSync(
    path.join(filesPathStarter, "/", workingFiles[i]),
    encoding
  );

  

  // let result = postcss(pl).process(fileContent)

  // const root = postcss.parse(fileContent);
  // const rootRules = root.nodes.filter((node) => node.selector === ":root");

  postcss(filterVarsPlugin).process(fileContent,  { from: 'a.css', to: 'a.out.css' }).then(result => {
    fs.writeFileSync(
    path.join(__dirname, "output", "/", `${workingFiles[i]}`),
    result.css
  );
 })

  




}

