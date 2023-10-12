// const inquirer = require("@inquirer/prompts");
// const Skinner = require("../Skinner/Skinner");

// const tinycolor = require("tinycolor2");

module.exports = plugin = (opts = {}) => {
  let matchedRoots = [];
  let matchedKeys = {};

  let loggerData = {
    id: opts.id,
    rootSelectors: 0,
    darkThemeCount: 0,
    lightThemeCount: 0,
  };

  const selectors = [
    {
      selector: ".tg_widget_bg .tg_input",
      count: 0,
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
    },
    {
      selector: ".tg_widget_bg_2 .tg_input",
      count: 0,
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
    },
  ];

  return {
    postcssPlugin: "collector",

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
        selectors.forEach((s) => {
          rule.selector.split(",").forEach((rs) => {
            if (rs.trim() === s.selector) {
              s.count++;
              rule.walkDecls((decl) => {
                if (
                  decl.prop === "background" ||
                  decl.prop === "background-color"
                ) {
                  s.background.value = decl.value;
                }
                if (decl.prop === "color") {
                  s.color.value = decl.value;
                }
                if (decl.prop === "border-bottom") {
                  s.border.value = decl.value;
                }
                if (decl.prop === "border-radius") {
                  s.radius.value = decl.value;
                }
              });
            }
          });
        });
      });

      matchedRoots.forEach((rule) => {
        rule.walkDecls((decl) => {
          selectors.forEach((s) => {
            if (s.background.value && decl.prop === s.background.var) {
              console.log("matched background");
            }
            if (s.color.value && decl.prop === s.color.var) {
              console.log("matched color");
            }
            if (s.border.value && decl.prop === s.border.var) {
              console.log("matched border");
            }
            if (s.radius.value && decl.prop === s.radius.var) {
              console.log("matched radius");
            }
          });
        });

        // if (selector.background.value) {
        //   rule.append({
        //     prop: selector.background.var,
        //     value: selector.background.value,
        //   });
        // }
        // if (selector.color.value) {
        //   rule.append({
        //     prop: selector.color.var,
        //     value: selector.color.value,
        //   });
        // }
        // if (selector.border.value) {
        //   rule.append({
        //     prop: selector.border.var,
        //     value: selector.border.value,
        //   });
        // }
        // if (selector.radius.value) {
        //   rule.append({
        //     prop: selector.radius.var,
        //     value: selector.radius.value,
        //   });
        // }

        //
      });

      let text = `${opts.id}----------------\n\n`;

      selectors.forEach((s) => {
        text += `
${s.selector} spotted ${s.count} times
background ${s.background.value ? s.background.value : "-"}
color ${s.color.value ? s.color.value : "-"}
border ${s.border.value ? s.border.value : "-"}
radius ${s.radius.value ? s.radius.value : "-"}
..................................
`;
      });

      result.messages.push({
        type: "collector",
        plugin: "collector",
        text: text,
      });
    },
  };
};

plugin.postcss = true;
