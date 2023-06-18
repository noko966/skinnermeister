const plugin = (Skinner) => ({
  postcssPlugin: "postcss-compare-vars",
  Declaration(decl) {
    
    // console.log(decl.prop);
    if(!Skinner.watch(decl.prop)){
      decl.remove()
    }
  },
  Once(root){
  }
  // Once(root) {
  //   // Transform CSS AST here
  //   root.nodes = root.nodes.filter((node) => node.type === "rule");
  //   // Transform CSS AST here
  //   root.walkRules((rule) => {
  //     // Transform each rule here
  //     if (rule.selector === ":root") {
  //       rule.remove();
  //     }

  //     rule.walkDecls((decl) => {
  //       // Transform each property declaration here
  //       // decl.prop = decl.prop.split('').reverse().join('');
  //     });
  //   });
  // },
});

plugin.postcss = true;

module.exports = plugin;
