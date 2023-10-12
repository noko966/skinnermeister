const inquirer = require("@inquirer/prompts");
const Skinner = require("../Skinner/Skinner");

const tinycolor = require("tinycolor2");

module.exports = plugin = (opts = {}) => {
  let matchedRoots = [];
  let matchedSelectors = [];

  let loggerData = {
    id: opts.id,
    rootSelectors: 0,
    darkThemeCount: 0,
    lightThemeCount: 0,
  };

  const selector = {
    selector: "--dominantBg",
    desiredSelector: "--dominantG",
  };

  return {
    postcssPlugin: "postcss-tst",

    Once(root, { result }) {

      root.walkRules((rule) => {
        rule.walkDecls(decl => {
          if(decl.prop === selector.selector){
            console.log(decl.prop);
            rule.append({
              prop: selector.desiredSelector,
              value: decl.value,
            });
          }
        });

      });

    },
  };
};

plugin.postcss = true;
