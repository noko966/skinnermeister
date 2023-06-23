// function createExactMatchRegExp(selector) {
//   return new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$");
// }

function createExactMatchRegExp(selector) {
  return new RegExp(`(^|\\s)(\\.tg__results(\\.tg__results_header)?\\s\\.tg_input)($|\\s)`);
}

module.exports = plugin = (opts = {}) => {
  const matchedRoots = [];
  const matchedSelectors = [];

  const variables = [
    {
      selector: ".tg__results .tg_input",
      count: 0,
      background: "",
      color: "",
      bgName: "--inputResultBg",
      txtName: "--inputResultTxt",
      // initialVariableTxt: "var(--bodyTxt)",
    },
  ];

  let data = {
    rootSelectors: 0,
    var1Selector: 0,
    var2Selector: 0,
    lightThemeCount: 0,
    darkThemeCount: 0,
  };

  // variables.forEach((variable) => {
  //   variable.selector = createExactMatchRegExp(variable.selector);
  // });

  return {
    postcssPlugin: "analyzer",
    Once(root, { result }) {
      root.walkRules((rule) => {
        
        const individualSelectors = rule.selector.split(",");
        individualSelectors.forEach((individualSelector) => {
          // Trim the selector
          const trimmedSelector = individualSelector.trim();

          // Loop through each variable and check if the selector matches exactly
          variables.forEach((variable) => {
            if (rule.selector.includes(variable.selector)) {
            // if (new RegExp(`(^|\\s)(\\.tg__results(\\.tg__results_header)?\\s\\.tg_input)($|\\s)`).test(rule.selector)) {
              rule.walkDecls("color", (decl) => {
                variable.count++;
                variable.color = decl.value;
                matchedSelectors.push({
                  prop: variable.txtName,
                  val: decl.value,
                  sel: variable.selector,
                  // initialVariable: variable.initialVariableTxt,
                  rule: rule,
                });
              });

              rule.walkDecls(/^(background|background-color)$/, (decl) => {
                variable.count++;
                variable.background = decl.value;
                matchedSelectors.push({
                  prop: variable.bgName,
                  val: decl.value,
                  sel: variable.selector,
                  // initialVariable: variable.initialVariableTxt,
                  rule: rule,
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
        plugin: "analyzer",
        text: `${opts.partnerID}----------------
------------
contains ${data.rootSelectors} root selectors
contains ${data.darkThemeCount} dark theme
contains ${data.lightThemeCount} light theme
${variables[0].selector} spotted ${variables[0].count} times | color ${variables[0].color} background ${variables[0].background}
..................................

`,
      });

      result.messages.push({
        type: "root",
        plugin: "analyzer",
        matchedRoots: matchedRoots,
      });
      result.messages.push({
        type: "selector",
        plugin: "analyzer",
        matchedSelectors: matchedSelectors,
      });
    },

    RootExit(root, { result }) {
      // console.log(data);
      console.log(`plugin has processed ${opts.partnerID} css`);
    },
  };
};

plugin.postcss = true;
