module.exports = plugin = (opts = {}) => {
  // checkOpts(opts);
  let var1 = {
    count: false,
    background: "",
    color: "",
    bgName: "--menuItemBg",
    txtName: "--menuItemTxt",
  };
  let var2 = {
    count: false,
    background: "",
    color: "",
    bgName: "--menuItemBg",
    txtName: "--menuItemTxt",
  };
  let data = {
    rootSelectors: 0,
    var1Selector: 0,
    var2Selector: 0,
    lightThemeCount: 0,
    darkThemeCount: 0,
  };


  return {
    postcssPlugin: "plugin_nik",
    Once(root, { result }) {
      // Collecting data
      // root.walkRules(":root", (rule) => {
      //   data.rootSelectors++;
      // });
    
      root.walk((node) => {
        if (node.type === 'rule') {
          if (node.selector === ':root' && node.selector.split(',').length === 1) {
            data.rootSelectors++;
          } else if (node.selector.includes('data-theme="dark"')) {
            data.darkThemeCount++;
          } else if (node.selector.includes('data-theme="light"')) {
            data.lightThemeCount++;
          }
        }
    })
    
      // root.walkRules(':root[data-theme="light"]', (rule) => {
      //   data.lightThemeCount++;
      // });
    
      // root.walkRules(':root, :root[data-theme="dark"], :root [data-theme="dark"]', (rule) => {
      //   if (
      //     rule.selector.includes(':root') &&
      //     !rule.selector.includes(':root[data-theme="light"]') &&
      //     !rule.selector.includes(':root [data-theme="light"]')
      //   ) {
      //     data.rootSelectors++;
      //   }
      // });

      result.messages.push({
        type: "custom",
        plugin: "plugin_nik",
        text: 
`${opts.partnerId}----------------
------------
contains ${data.rootSelectors} root selectors
contains ${data.darkThemeCount} dark theme
contains ${data.lightThemeCount} light theme
    var1 spotted ${data.var1Selector} times
    var2 spotted ${data.var2Selector} times
..................................
`,
      });
    },
    
    
    
    
    
    
    
    RootExit(root, { result }) {
      
      // console.log(data);
      console.log(`plugin_nik has processed ${opts.partnerId} css`);
    },
  };
};

plugin.postcss = true;
