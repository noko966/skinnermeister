module.exports = plugin = (opts = {}) => {
  //   checkOpts(opts);
  return {
    postcssPlugin: "plugin_nik",
    Once(root, { result }) {
    // Collecting data

    root.walkRules((rule) => {
    });
      
      root.walkRules((rule) => {
        if (
          rule.selector.includes(":root") &&
          rule.selector.split(",").length === 1
        ) {
          // rule.append({ prop: "font-size", value: "16px" });
          result.messages.push({
            type: "custom",
            plugin: "plugin_nik",
            text: `${opts.partnerId} contains root\n`,
          });
        }

        if (rule.selector.includes(":root") && rule.selector.includes("dark")) {
          // rule.append({ prop: "font-size", value: "16px" });
          result.messages.push({
            type: "custom",
            plugin: "plugin_nik",
            text: `${opts.partnerId} contains dark theme\n`,
          });
        }

        if (
          rule.selector.includes(":root") &&
          rule.selector.includes("light")
        ) {
          // rule.append({ prop: "font-size", value: "16px" });
          result.messages.push({
            type: "custom",
            plugin: "plugin_nik",
            text: `${opts.partnerId} contains light theme\n`,
          });
        }
      });
    },
    RootExit() {
      console.log(`plugin_nik has processed ${opts.partnerId} css`);
    },
  };
};

plugin.postcss = true;
