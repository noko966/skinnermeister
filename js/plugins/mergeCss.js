
module.exports = plugin = (opts = {}) => {
  let add = opts.add
  return {
    postcssPlugin: "postcss-merge-css",

    Once(root, { result }) {

      root.append(add);

      // root.walkRules((rule) => {
      //   rule.walkDecls(decl => {
      //     if(decl.prop === selector.selector){
      //       console.log(decl.prop);
      //       rule.append({
      //         prop: selector.desiredSelector,
      //         value: decl.value,
      //       });
      //     }
      //   });

      // });

    },
  };
};

plugin.postcss = true;
