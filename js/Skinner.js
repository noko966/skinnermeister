class Skinner{
    constructor(){ 
        this.configOrder = [
            {
                name: "body",
                inherits: null,
            },
            {
                name: "accent",
                inherits: null,
            },
            {
                name: "dominant",
                inherits: ["body"],
            },
            {
                name: "button",
                inherits: ["accent"],
            },
            {
                name: "buttonSecondary",
                inherits: ["body"],
                variation: 5,
            },
            {
                name: "navbar",
                inherits: ["dominant", "body"],
            },
            {
                name: "slider",
                inherits: ["body"],
            },
            {
                name: "header",
                inherits: ["dominant", "body"],
                variation: 5,
            },
            {
                name: "subHeader",
                inherits: ["header", "dominant", "body"],
            },
            {
                name: "event",
                inherits: ["dominant", "body"],
            },
            {
                name: "eventLive",
                inherits: ["event", "body"],
                variation: 5,
            },
            {
                name: "odd",
                inherits: ["body"],
            },
            {
                name: "oddActive",
                inherits: ["accent"],
            },
            {
                name: "showMore",
                inherits: ["body"],
            },
            {
                name: "marketHeader",
                inherits: ["body", "header"],
            },
            {
                name: "collapse",
                inherits: ["header", "dominant", "body"],
            },
            {
                name: "tab",
                inherits: ["dominant", "body"],
            },
            {
                name: "tabActive",
                inherits: ["tab", "dominant", "body"],
            },
            {
                name: "tabSecondaryActive",
                inherits: ["tab", "dominant", "body"],
            },
            {
                name: "menu_1",
                inherits: ["dominant", "body"],
            },
            {
                name: "menu_2",
                inherits: ["menu_1", "dominant", "body"],
            },
            {
                name: "menu_3",
                inherits: ["menu_2", "menu_1", "dominant", "body"],
            },
            {
                name: "input",
                inherits: ["dominant", "body"],
            },
            {
                name: "inputSecondary",
                inherits: ["input", "dominant", "body"],
            },
            {
                name: "filter",
                inherits: ["input", "dominant", "body"],
            },
            {
                name: "tooltip",
                inherits: ["dominant", "body"],
            },
            {
                name: "modal",
                inherits: ["dominant", "body"],
            },
            {
                name: "betSlip",
                inherits: ["dominant", "body"],
            },
            {
                name: "betSlipStake",
                inherits: ["betSlip", "dominant", "body"],
            },
            {
                name: "betSlipInput",
                inherits: ["betSlip", "dominant", "body"],
            },
            {
                name: "betSlipButton",
                inherits: ["betSlip", "dominant", "body"],
            },
            {
                name: "betSlipHeader",
                inherits: ["betSlip", "dominant", "body"],
            },
            {
                name: "betSlipTab",
                inherits: ["betSlip", "dominant", "body"],
            },
            {
                name: "betSlipTabActive",
                inherits: ["betSlip", "dominant", "body"],
            },
            {
                name: "tmLogo",
                inherits: ["dominant", "body"],
            },
        ];

        this.essenceBgList = [];


        this.createArr();

    }

    verbalData(name) {
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

        return data;
    }

    isEssenceProperty(prop){
        return this.essenceBgList.find((bg) => {
            if(bg.name === prop){
                bg.count += 1; 
                return true
            }
        }
        )
       
    }

    createArr(){
        this.configOrder.forEach(c => {
            const bg = this.verbalData(c.name).nameBg;
            this.essenceBgList.push({
                name: `--${bg}`,
                count: 0
            });
        })
    }

    watch(prop){
        return this.isEssenceProperty(prop);
    }


    checkMissingEssences(){
        console.log(this.essenceBgList);
    }
}

module.exports = new Skinner();
