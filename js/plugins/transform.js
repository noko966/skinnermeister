module.exports = plugin = (opts = {}) => {
  return {
    postcssPlugin: "transformer",
    Once(root, { result }) {
      const matchedRulesMessage = result.messages.find(
        (message) =>
          message.type === "root" && message.plugin === "analizer"
      );
      const matchedSelectorMessage = result.messages.find(
        (message) =>
          message.type === "selector" && message.plugin === "analizer"
      );

      const matchedRoots = matchedRulesMessage
        ? matchedRulesMessage.matchedRoots
        : [];
      const matchedSelectors = matchedSelectorMessage
        ? matchedSelectorMessage.matchedSelectors
        : [];


        if(!matchedRoots){
          return
        }
        matchedRoots.forEach((rule) => {
        if(rule.type = "selector"){
          matchedSelectors.forEach((selector) => {
            // rule.append({ prop: selector.prop, value: selector.val });
          })
        }
      });
    },

    RootExit(root, { result }) {
      console.log(`transformer has processed ${opts.partnerId} css`);
    },
  };
};

plugin.postcss = true;
