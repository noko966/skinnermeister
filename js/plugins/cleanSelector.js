function createExactMatchRegExp(selector) {
  return new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$");
}

module.exports = plugin = () => {

  const SELECTORS = ['.tg__results .tg_input:'];
  let variables = [
    {
      selector: "tg__submenu__item:hover",
      count: 0,
      background: "",
      color: "",
      bgName: "--menuItemBg",
      txtName: "--menuItemTxt"
    },
    {
      selector: "tg__submenu__item",
      count: 0,
      background: "",
      color: "",
      bgName: "--menuItemActiveBg",
      txtName: "--menuItemActiveTxt"
    }
  ];
  return {
    postcssPlugin: "postcss-reverse-props",


Once(root, { result }) {
      root.walkRules(rule => {
        SELECTORS.forEach(S => {
          if(rule.selector.includes(S)){
            let selectors = rule.selector.split(',');
            selectors = selectors.filter(selector => !selector.includes(S));
            rule.selector = selectors.join(',');
  
          }
          // If there are no selectors left, remove the rule
          if (rule.selector.trim().length === 0) {
              rule.remove();
          }
        })
        
    });

    },

    }

};
plugin.postcss = true;

