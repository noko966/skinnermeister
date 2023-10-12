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
    selector: ".tg__info_panel .tg_input_coupon_amount",
  };

  return {
    postcssPlugin: "postcss-clear",

    Once(root, { result }) {

      root.walkRules((rule) => {
        if(rule.selector === selector.selector) {
          matchedSelectors.push(rule);
          
        }
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
