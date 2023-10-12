const Skinner = require("./Skinner");
const fs = require("fs").promises;
const tinycolor = require("tinycolor2");

const skinKeys = [
  {
    name: "body",
  },
  {
    name: "accent",
  },
  {
    name: "dominant",
  },
  {
    name: "button",
  },
  {
    name: "buttonSecondary",
  },
  {
    name: "navbar",
  },
  {
    name: "slider",
  },
  {
    name: "header",
  },
  {
    name: "subHeader",
  },
  {
    name: "event",
  },
  {
    name: "eventLive",
  },
  {
    name: "odd",
  },
  {
    name: "oddActive",
  },
  {
    name: "showMore",
  },
  {
    name: "marketHeader",
  },
  {
    name: "collapse",
  },
  {
    name: "tab",
  },
  {
    name: "tabActive",
  },
  {
    name: "tabSecondaryActive",
  },
  {
    name: "menu_1",
  },
  {
    name: "menu_2",
  },
  {
    name: "menu_3",
  },
  {
    name: "input",
  },
  {
    name: "inputSecondary",
  },
  {
    name: "filter",
  },
  {
    name: "tooltip",
  },
  {
    name: "modal",
  },
];

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

const variablesTranspiler = (config) => {
  let convertedConfig = {};
  if (!config) return new Error("no config provided");
  switch (config.type) {
    case "esport":
        const isBackgroundDark = tinycolor(config.Background).getLuminance() <= 0.5 ? false : true;
        const isBrandDark = tinycolor(config.Brand).getLuminance() <= 0.5 ? false : true;

      convertedConfig.body = {
        Background: {
          isDark: isBackgroundDark,
          isActive: true,
          color: config.Background,
        },
        Text: {
          isActive: true,
          color: config.Foreground,
        },
      };
      convertedConfig.accent = {
        Background: {
          isDark: false,
          isActive: true,
          color: config.Accent,
        },
      };
      convertedConfig.button = {
        Background: {
          isDark: false,
          isActive: true,
          color: config.Brand,
        },
      };

      break;
    default:
      break;
  }

  return convertedConfig;
};

const addCssVariableToRoot = (CSSsVarsArray, selector) => {
  cssVarsArray.forEach((CSSVar) => {
    document.querySelector(selector).style.setProperty(CSSVar.name, CSSVar.value)
  });
};

const generateCssArray = (inputSkin) => {
  let cssArray = [];
  const essenceBluePrint = [
    "nameBg",
    "nameBgHov",
    "nameBg2",
    "nameBg2Hov",
    "nameBg3",
    "nameBg3Hov",
    "nameRGBA",
    "nameRGBA2",
    "nameRGBA3",
    "nameTxt",
    "nameTxt2",
    "nameTxt3",
    "nameAccent",
    "nameAccentTxt",
    "nameBorder",
    "nameRadius",
  ];
  skinKeys.forEach((key) => {
    const VDPrefixed = verbalData(key.name, "--");
    const VD = verbalData(key.name);

    essenceBluePrint.forEach((ess) => {
      cssArray.push({
        name: VDPrefixed[ess],
        value: inputSkin[VD[ess]],
      });
    });
  });


  let str = `:root{\n`;
  cssArray.forEach(css => {
    str += `${css.name}: ${css.value};\n`;
  })

  str += `}\n`;


fs.writeFile('tmp.css', str, "utf8").catch(e => {
  console.log(e);
});

  return cssArray;
};

const skinTranspiler = () => {
  const cfg = {
    type: "esport",
    Accent: "#FFAE2B",
    Background: "#090909",
    Brand: "#F9521B",
    Foreground: "#FFF",
  };

  const starterConfig = variablesTranspiler(cfg);

  const SKINNER = new Skinner(() => {}, starterConfig, tinycolor);

  const skin = SKINNER.init();

  generateCssArray(skin);
};

skinTranspiler();
