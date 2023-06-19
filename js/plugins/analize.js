function createExactMatchRegExp(selector) {
  return new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$");
}

module.exports = plugin = (opts = {}) => {
  const matchedRoots = [];
  const matchedSelectors = [];

  let variables = [
    {
      selector: "tg__submenu__item:hover",
      count: 0,
      background: "",
      color: "",
      bgName: "--menuItemBg",
      txtName: "--menuItemTxt",
    },
    {
      selector: "tg__submenu__item",
      count: 0,
      background: "",
      color: "",
      bgName: "--menuItemActiveBg",
      txtName: "--menuItemActiveTxt",
    },
  ];

  let data = {
    rootSelectors: 0,
    var1Selector: 0,
    var2Selector: 0,
    lightThemeCount: 0,
    darkThemeCount: 0,
  };

  variables.forEach((variable) => {
    variable.selector = createExactMatchRegExp(variable.selector);
  });

  return {
    postcssPlugin: "analizer",
    Once(root, { result }) {
      root.walkRules((rule) => {
        const individualSelectors = rule.selector.split(",");
        individualSelectors.forEach((individualSelector) => {
          // Trim the selector
          const trimmedSelector = individualSelector.trim();

          // Loop through each variable and check if the selector matches exactly
          variables.forEach((variable) => {
            if (variable.selector.test(trimmedSelector)) {
              variable.count++;
              rule.walkDecls("color", (decl) => {
                variable.color = decl.value;
                matchedSelectors.push({
                  prop: variable.txtName,
                  val: decl.value,
                  rule: rule
                });
              });
            }
          });
        });

        if (
          rule.selector === ":root" &&
          rule.selector.split(",").length === 1
        ) {
          data.rootSelectors++;
          matchedRoots.push({ rule: rule });
        } else if (rule.selector.includes('data-theme="dark"')) {
          data.darkThemeCount++;
          matchedRoots.push({ rule: rule });
        } else if (rule.selector.includes('data-theme="light"')) {
          data.lightThemeCount++;
          matchedRoots.push({ rule: rule });
        }
      });

      result.messages.push({
        type: "custom",
        plugin: "analizer",
        text: `${opts.partnerId}----------------
------------
contains ${data.rootSelectors} root selectors
contains ${data.darkThemeCount} dark theme
contains ${data.lightThemeCount} light theme
${variables[0].selector} spotted ${variables[0].count} times | ${variables[0].color}
${variables[1].selector} spotted ${variables[1].count} times | ${variables[1].color}
..................................

`,
      });

      result.messages.push({
        type: "root",
        plugin: "analizer",
        matchedRoots: matchedRoots,
      });
      result.messages.push({
        type: "selector",
        plugin: "analizer",
        matchedSelectors: matchedSelectors,
      });
    },

    RootExit(root, { result }) {
      // console.log(data);
      console.log(`plugin_nik has processed ${opts.partnerId} css`);
    },
  };
};

plugin.postcss = true;
