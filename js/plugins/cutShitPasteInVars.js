const inquirer = require("@inquirer/prompts");
const Skinner = require("../Skinner/Skinner");

const tinycolor = require("tinycolor2");

module.exports = plugin = (opts = {}) => {
  let matchedRoots = [];
  let matchedKeys = {};

  let loggerData = {
    id: opts.id,
    rootSelectors: 0,
    darkThemeCount: 0,
    lightThemeCount: 0,
  };

  const selector = {
    selector: ".tg_widget_bg .tg_input",
    background: {
      value: null,
      var: "--inputResultBg",
    },
    color: {
      value: null,
      var: "--inputResultTxt",
    },
    border: {
      value: null,
      var: "--inputResultBorder",
    },
    radius: {
      value: null,
      var: "--inputResultRadius",
    },
  };

  return {
    postcssPlugin: "postcss-tst",

    Once(root, { result }) {
      root.walkRules((rule) => {
        if (
          rule.selector === ":root" &&
          rule.selector.split(",").length === 1
        ) {
          loggerData.rootSelectors++;
          matchedRoots.push(rule);
        } else if (rule.selector.includes('data-theme="dark"')) {
          loggerData.darkThemeCount++;
          matchedRoots.push(rule);
        } else if (rule.selector.includes('data-theme="light"')) {
          loggerData.lightThemeCount++;
          matchedRoots.push(rule);
        }
      });

      root.walkRules((rule) => {
        if(rule.selector === selector.selector) {
          rule.walkDecls((decl) => {
            if (
              decl.prop === "background" ||
              decl.prop === "background-color"
            ) {
              selector.background.value = decl.value;
            }
            if (decl.prop === "color") {
              selector.color.value = decl.value;
            }
            if (decl.prop === "border") {
              selector.border.value = decl.value;
            }
            if (decl.prop === "border-radius") {
              selector.radius.value = decl.value;
            }
          });
        }
      });

      // if(selector.border.value){

      // console.log(selector, opts.id);
      // }

      matchedRoots.forEach((rule) => {

        if (selector.background.value) {
          rule.append({
            prop: selector.background.var,
            value: selector.background.value,
          });
        }
        if (selector.color.value) {
          rule.append({
            prop: selector.color.var,
            value: selector.color.value,
          });
        }
        if (selector.border.value) {
          rule.append({
            prop: selector.border.var,
            value: selector.border.value,
          });
        }
        if (selector.radius.value) {
          rule.append({
            prop: selector.radius.var,
            value: selector.radius.value,
          });
        }

        //
      });
    },
  };
};

plugin.postcss = true;
