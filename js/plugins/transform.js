module.exports = plugin = (partnerID, opts = {}) => {
  return {
    postcssPlugin: "transformer",
    Once(root, { result }) {
      const matchedRulesMessage = result.messages.find(
        (message) => message.type === "root" && message.plugin === "analyzer"
      );
      const matchedSelectorMessage = result.messages.find(
        (message) =>
          message.type === "selector" && message.plugin === "analyzer"
      );

      const matchedRoots = matchedRulesMessage
        ? matchedRulesMessage.matchedRoots
        : [];
      const matchedSelectors = matchedSelectorMessage
        ? matchedSelectorMessage.matchedSelectors
        : [];

      matchedRoots.forEach((rule) => {
        matchedSelectors.forEach((selector) => {
          // if (selector.initialVariable === selector.val) {
          //   return;
          // }
          rule.rule.append({ prop: selector.prop, value: selector.val });
        });
      });

      matchedSelectors.forEach((rule) => {
        if(partnerID === 95) {
          console.log(rule);
        }
        let _selectors = rule.rule.selector.split(',');
        _selectors = _selectors.filter(s => !s.includes(rule.sel));
       rule.rule.selector = _selectors.join(',');
       if (rule.rule.selector.trim().length === 0) {
         rule.rule.remove();
       }
      });
    },

    RootExit(root, { result }) {
      // console.log(`transformer has processed ${opts.partnerId} css`);
    },
  };
};

plugin.postcss = true;
