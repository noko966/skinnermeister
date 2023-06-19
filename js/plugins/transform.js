module.exports = plugin = (opts = {}) => {
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
          rule.rule.append({ prop: selector.prop, value: selector.val });
        });
      });

      matchedSelectors.forEach((rule) => {
        rule.rule.remove();
      });
    },

    RootExit(root, { result }) {
      console.log(`transformer has processed ${opts.partnerId} css`);
    },
  };
};

plugin.postcss = true;
