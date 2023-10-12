const inquirer = require("@inquirer/prompts");
const Skinner = require("../Skinner/Skinner");

const postcss = require("postcss");
const tinycolor = require("tinycolor2");

const restoreName = (nameBg) => {
  if (nameBg.startsWith("--") && nameBg.endsWith("Bg")) {
    return nameBg.slice(2, -2);
  } else {
    return null; // or handle error
  }
};

const verbalData = (name, prefix) => {
  let data = {};
  data.name = name;

  data.nameBg = data.name + "Bg";
  data.nameBg_g = data.nameBg + "_g";
  data.nameG = data.name + "G";
  data.nameRGBA = data.name + "RGBA";
  data.nameRGBA2 = data.name + "RGBA2";
  data.nameRGBA3 = data.name + "RGBA3";
  data.nameG2 = data.nameG + "2";
  data.nameBgHov = data.nameBg + "Hover";
  data.nameBg2 = data.nameBg + "2";
  data.nameBg2Hov = data.nameBg2 + "Hover";
  data.nameBg3 = data.nameBg + "3";
  data.nameBg3Hov = data.nameBg3 + "Hover";
  data.upperCaseName = data.name[0].toUpperCase() + data.name.substring(1);
  data.isName = "is" + data.upperCaseName + "Bg";
  data.isGradient = "is" + data.upperCaseName + "Gradient";
  data.isGradientReversed = data.isGradient + "Reversed";
  data.gradientAngle = data.upperCaseName + "GradientAngle";

  data.isDark = "is" + data.upperCaseName + "BgDark";

  data.nameTxt = data.name + "Txt";
  data.nameTxt2 = data.nameTxt + "2";
  data.nameTxt3 = data.nameTxt + "3";
  data.nameTxtInverse = data.nameTxt + "Inverse";

  data.isCustomTxt = "isCustom" + data.upperCaseName + "Txt";

  data.nameBorder = data.name + "Border";
  data.isCustomBorder = "isCustom" + data.upperCaseName + "Border";

  data.nameAccent = data.name + "Accent";
  data.isCustomAccent = "isCustom" + data.upperCaseName + "Accent";
  data.nameAccentTxt = data.name + "AccentTxt";

  data.nameRadius = data.name + "Radius";

  if (prefix) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        data[key] = prefix + data[key];
      }
    }
  }

  return data;
};


module.exports = plugin = (opts = {}) => {
  let matchedRoots = [];

  this.opts = opts;

  const essencesToLook = opts.essencesToLook;
  const essencesToGenerate = opts.essencesToGenerate;

  return {
    postcssPlugin: "postcss-skinner",

    Once(root, { result }) {
      root.walkRules((rule) => {
        let matchedKeys = {};

        if (rule.selector === "body") {
          matchedRoots.push(rule);

          rule.walkDecls((decl) => {
            essencesToLook.forEach((key) => {
              const bg = key.from;
              if (decl.prop === bg) {
                matchedKeys[key.to] = {
                  Background: {
                    color: decl.value,
                  },
                };
              }
            });
            // const SKINNER = new Skinner(() => {}, matchedKeys, tinycolor);
            // const skin = SKINNER.init();

            rule.id = opts.id;
            rule.add = matchedKeys;
          });
        } 
      });


      console.log(matchedRoots.length, opts.id);

      let res;

      if(!matchedRoots.length){
        return new Error(`${opts.id} has no body selector`);
      }
      matchedRoots.forEach((rule) => {
        if (!Object.keys(rule.add).length) {
          return;
        }


        rule.add.body.Background.isDark = tinycolor(
          rule.add.body.Background.color
        ).isLight();
        const SKINNER = new Skinner(() => {}, rule.add, tinycolor);
        const skin = SKINNER.init();

        const newRule = postcss.rule({ selector: ":root" });

        essencesToGenerate.forEach((missingKey) => {
          const vdk = verbalData(missingKey, "--");
          const vdv = verbalData(missingKey);
          
          newRule.append({ text: `${vdk.name} ` })  
          newRule.append({ prop: vdk.nameG, value: skin[vdv.nameG] });
          newRule.append({ prop: vdk.nameBg, value: skin[vdv.nameBg] });
          newRule.append({ prop: vdk.nameBgHov, value: skin[vdv.nameBgHov] });
          newRule.append({ prop: vdk.nameBg2, value: skin[vdv.nameBg2] });
          newRule.append({ prop: vdk.nameBg2Hov, value: skin[vdv.nameBg2Hov] });
          newRule.append({ prop: vdk.nameBg3, value: skin[vdv.nameBg3] });
          newRule.append({ prop: vdk.nameBg3Hov, value: skin[vdv.nameBg3Hov] });
          newRule.append({ prop: vdk.nameTxt, value: skin[vdv.nameTxt] });
          newRule.append({ prop: vdk.nameTxt2, value: skin[vdv.nameTxt2] });
          newRule.append({ prop: vdk.nameTxt3, value: skin[vdv.nameTxt3] });
          newRule.append({ prop: vdk.nameAccent, value: skin[vdv.nameAccent] });
          newRule.append({
            prop: vdk.nameAccentTxt,
            value: skin[vdv.nameAccentTxt],
          });
          newRule.append({ prop: vdk.nameBorder, value: skin[vdv.nameBorder] });
        });

        // root.append(newRule);

        res = newRule;
      });

      result.messages.push({
        type: "new-rule",
        rule: res,
      });
    },
  };
};

plugin.postcss = true;
