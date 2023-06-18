

const plugin = () => ({
    postcssPlugin: 'postcss-add=missing-vars-props',
    Once(root) {
        // Transform CSS AST here
        root.walkRules(rule => {
          
            if (rule.nodes && rule.nodes.length > 0) {
                rule.walkDecls((decl) => {
                    // Check if the declaration's property does not match the target type
                    if (decl.prop !== "color" && decl.prop !== "background" && decl.prop !== "background-color") {
                      // Remove the rule if the declaration does not match
                      rule.remove();
                      return;
                    }
                  });
    
            }
        })
      
      root.walkAtRules((atRule) => {
    // Check if the at-rule has any declarations
      atRule.remove();
      
  });
  }
})

plugin.postcss = true;

module.exports =  plugin;
