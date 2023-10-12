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
    selector: ".tg__coupon .tg_input",
    background: {
      value: null,
      var: "--betslipInputBg",
    },
    color: {
      value: null,
      var: "--betslipInputTxt",
    },
    border: {
      value: null,
      var: "--betslipInputBorder",
    }
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
          matchedSelectors.push(rule);
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
            if (decl.prop === "border-bottom") {
              selector.border.value = decl.value;
            }
          });
        }
      });

      // if(selector.border.value){

      // console.log(selector, opts.id);
      // }


      if(selector.background.value || selector.color.value || selector.border.value) {
        console.log(opts.id, '');
      }

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

        //
      });


      root.walkRules((rule) => {
        matchedSelectors.forEach(S => {

          console.log(S.selector);

          S.remove();

        })
      });

      


    },
  };
};

plugin.postcss = true;
