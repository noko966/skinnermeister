const plugin = () => ({
  postcssPlugin: "postcss-filter-vars",
  Once(root) {
    root.nodes = root.nodes.filter(node => node.type === "rule")
    // Transform CSS AST here
    root.walkRules((rule) => {
      // Transform each rule here
      if(rule.selector !== ":root"){
        rule.remove()
      };

      rule.walkDecls((decl) => {
        // Transform each property declaration here
        // decl.prop = decl.prop.split('').reverse().join('');
      });
    });
  },
});

plugin.postcss = true;

module.exports =  plugin;
