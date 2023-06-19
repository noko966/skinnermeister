module.exports = plugin = (opts = {}) => {
  // checkOpts(opts);
  let var1 = {
    selector: "tg__submenu__item",
    count: false,
    background: "",
    color: "",
    bgName: "--menuItemBg",
    txtName: "--menuItemTxt",
  };
  let var2 = {
    selector: "tg__submenu__item:hover",
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
      root.walkRules((rule) => {
        if (rule.selector.includes(var1.selector) && !rule.selector.includes(var2.selector)) {
          data.var1Selector++;
        }
        else if (rule.selector.includes(var2.selector) && rule.selector.includes(var1.selector)) {
          data.var1Selector++;
        } else if (rule.selector === ':root' && rule.selector.split(',').length === 1) {
          data.rootSelectors++;
        } else if (rule.selector.includes('data-theme="dark"')) {
          data.darkThemeCount++;
        } else if (rule.selector.includes('data-theme="light"')) {
          data.lightThemeCount++;
        }
        
    })
    
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
