const fs = require("fs");
const path = require("path");
const fsExtra = require('fs-extra');
const postcss = require('postcss');
const pl = require('./js/plugin');


const filesPathStarter = path.join(__dirname,  "starter");
const outputPath = path.join(__dirname, "output");
const workingFiles = fs.readdirSync(filesPathStarter)
const encoding = "utf8";


function clearDirectory(dir) {
    fsExtra.emptyDirSync(dir);
}


clearDirectory(outputPath);

function getRulesObject(root){
    return root.nodes.filter(rule => rule.selector === '.ui-state-highlight,\r\n' +
    '.ui-widget-content .ui-state-highlight,\r\n' +
    '.ui-widget-header .ui-state-highlight,\r\n' +
    '.ui-state-active,\r\n' +
    '.ui-widget-content .ui-state-active,\r\n' +
    '.ui-widget-header .ui-state-active,\r\n' +
    '.ui-datepicker-calendar .ui-state-hover');
}

for (let i = 0; i < workingFiles.length; i++) {
    const fileContent = fs.readFileSync(
      path.join(filesPathStarter, "/", workingFiles[i]),
      encoding
    );


    // let result = postcss(pl).process(fileContent)

    const root = postcss.parse(fileContent);
    const rootRules = root.nodes.filter(node => node.type === 'comment')
    console.log(rootRules);
    // console.log(result.css);
    // console.log(result.map);
    // console.log(result.messages);




    // fs.writeFileSync(
    //     path.join(__dirname, "output", "/", "aa.css"),
    //     // JSON.stringify(root);
    //     // result;
    //   );

}


    