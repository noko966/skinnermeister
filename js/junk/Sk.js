class Skinner {
    constructor(cssCb, starterConfig, header, root) {
        this.header =
            document.querySelector(header) ||
            document.querySelector(".nik_skinner_header");
        this.skinnerRoot = root || document.body;
        this.classNames = {
            btn: "skinner_btn",
            btn50: "skinner_btn-50",
            btn100: "skinner_btn-100",
            ico: "skinner_ico",
            uiSwitch: "skinner_ui_switcher",
            settingsWrapper: "skinner_settings_wrapper",
            uiLabelSm: "skinner_ui_label_sm"
        };
        this.icons = {
            burger: `<svg width="22" height="18" viewBox="0 0 22 18"><path d="M20.6 0H1.39995C0.737209 0 0.199951 0.537258 0.199951 1.2V2.4C0.199951 3.06274 0.737209 3.6 1.39995 3.6H20.6C21.2627 3.6 21.8 3.06274 21.8 2.4V1.2C21.8 0.537258 21.2627 0 20.6 0Z" /><path d="M20.6 7.2H1.39995C0.737209 7.2 0.199951 7.73726 0.199951 8.4V9.6C0.199951 10.2627 0.737209 10.8 1.39995 10.8H20.6C21.2627 10.8 21.8 10.2627 21.8 9.6V8.4C21.8 7.73726 21.2627 7.2 20.6 7.2Z" /><path d="M20.6 14.4H1.39995C0.737209 14.4 0.199951 14.9373 0.199951 15.6V16.8C0.199951 17.4627 0.737209 18 1.39995 18H20.6C21.2627 18 21.8 17.4627 21.8 16.8V15.6C21.8 14.9373 21.2627 14.4 20.6 14.4Z"/></svg>`,
            save: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M4.7,24.1h14.7c2.4,0,4.4-2,4.4-4.4V7.7c0-1-0.4-1.9-1.1-2.6l-3.5-3.5c-0.7-0.7-1.6-1.1-2.6-1.1H4.7 c-2.4,0-4.4,2-4.4,4.4v14.7C0.3,22.1,2.2,24.1,4.7,24.1L4.7,24.1z M3.2,5c0-0.8,0.7-1.5,1.5-1.5c0,0,0,0,0,0h5.9v4.9L9,6.9l0,0 C8.5,6.4,7.8,6.3,7.2,6.7C6.5,7.1,6.3,8,6.7,8.7c0.1,0.1,0.1,0.2,0.2,0.2l2.2,2.2l0,0c1.6,1.6,4.2,1.6,5.8,0c0,0,0,0,0,0l2.2-2.2 l0,0c0.6-0.6,0.6-1.5,0-2.1c-0.1-0.1-0.1-0.1-0.2-0.2c-0.6-0.4-1.4-0.3-1.9,0.2l-1.5,1.5V3.5h3.1c0.2,0,0.4,0.1,0.5,0.2l3.5,3.5 c0.1,0.1,0.2,0.3,0.2,0.5v11.9c0,0.8-0.7,1.5-1.5,1.5c0,0,0,0,0,0H4.7c-0.8,0-1.5-0.7-1.5-1.5c0,0,0,0,0,0V5z"/> <path d="M8,18.2H16c0.8,0,1.4-0.7,1.4-1.5c0-0.8-0.6-1.4-1.4-1.4H8c-0.8,0-1.4,0.7-1.4,1.5 C6.6,17.5,7.2,18.2,8,18.2z"/> </svg>`,
            load: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="17.3px" height="17.8px" viewBox="0 0 17.3 17.8" style="overflow:visible;enable-background:new 0 0 17.3 17.8;" xml:space="preserve"><path d="M8.6,0C8,0,7.5,0.5,7.5,1.2l0,0v8.2L6,7.9C5.6,7.4,4.9,7.4,4.4,7.8C3.9,8.2,3.9,8.9,4.3,9.4c0,0,0,0,0,0 l2.5,2.5l0,0c1,1,2.6,1,3.6,0c0,0,0,0,0,0l2.4-2.4c0.5-0.4,0.5-1.1,0.1-1.6c-0.4-0.5-1.2-0.5-1.6-0.1c0,0,0,0,0,0L9.8,9.3V1.2 C9.8,0.5,9.3,0,8.6,0L8.6,0L8.6,0z"/><path d="M17.3,12.7c0-0.6-0.5-1.2-1.1-1.2c-0.6,0-1.2,0.5-1.2,1.1c0,0,0,0.1,0,0.1v1.7l0,0 c0,0.6-0.5,1.2-1.2,1.2l0,0H3.5c-0.6,0-1.2-0.5-1.2-1.2l0,0v-1.7c0-0.6-0.5-1.2-1.1-1.2c-0.6,0-1.2,0.5-1.2,1.1c0,0,0,0.1,0,0.1v1.7 l0,0c0,1.9,1.5,3.5,3.5,3.5l0,0h10.4c1.9,0,3.5-1.5,3.5-3.5l0,0L17.3,12.7z"/></svg>`,
            eye: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M12,6.1c-4.1,0-7.7,2.2-10.4,5.8c-0.2,0.3-0.2,0.7,0,1c2.7,3.6,6.4,5.8,10.4,5.8s7.7-2.2,10.4-5.8 c0.2-0.3,0.2-0.7,0-1C19.7,8.3,16.1,6.1,12,6.1z M12.3,16.9c-2.5,0.2-4.6-1.7-4.7-4.2s1.7-4.6,4.2-4.7c2.5-0.2,4.6,1.7,4.7,4.2 c0,0.2,0,0.4,0,0.6C16.3,14.9,14.5,16.7,12.3,16.9z M12.2,14.8c-1.3,0.1-2.5-0.9-2.5-2.2c-0.1-1.3,0.9-2.5,2.2-2.5 c1.3-0.1,2.5,0.9,2.5,2.2c0,0.1,0,0.2,0,0.3C14.3,13.8,13.4,14.7,12.2,14.8L12.2,14.8z"/></svg>`,
            sun: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M18.3,12c0,3.5-2.8,6.3-6.3,6.3S5.7,15.5,5.7,12c0-3.5,2.8-6.3,6.3-6.3C15.5,5.7,18.3,8.5,18.3,12L18.3,12" /> <path d="M12.9,3.9V1.2c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.4-0.9,0.9c0,0,0,0,0,0v2.7c0,0.5,0.4,0.9,0.9,0.9 C12.5,4.8,12.9,4.4,12.9,3.9C12.9,3.9,12.9,3.9,12.9,3.9z"/> <path d="M12.9,22.8v-2.7c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.4-0.9,0.9c0,0,0,0,0,0v2.7c0,0.5,0.4,0.9,0.9,0.9 C12.5,23.7,12.9,23.3,12.9,22.8z"/> <path id="Path_41477" d="M22.8,11.1h-2.7c-0.5,0-0.9,0.4-0.9,0.9c0,0.5,0.4,0.9,0.9,0.9c0,0,0,0,0,0h2.7c0.5,0,0.9-0.4,0.9-0.9 C23.7,11.5,23.3,11.1,22.8,11.1z"/><path d="M1.2,12.9h2.7c0.5,0,0.9-0.4,0.9-0.9c0-0.5-0.4-0.9-0.9-0.9c0,0,0,0,0,0H1.2c-0.5,0-0.9,0.4-0.9,0.9 C0.3,12.5,0.7,12.9,1.2,12.9C1.2,12.9,1.2,12.9,1.2,12.9z"/><path d="M5,3.7c-0.4-0.3-0.9-0.3-1.3,0C3.4,4.1,3.4,4.7,3.7,5l1.9,1.9c0.4,0.3,0.9,0.3,1.3,0c0.3-0.3,0.3-0.9,0-1.2 L5,3.7z"/> <path id="Path_41480" d="M20.3,19l-1.9-1.9c-0.4-0.3-0.9-0.3-1.3,0c-0.3,0.3-0.3,0.9,0,1.2l1.9,1.9c0.4,0.3,0.9,0.3,1.3,0 C20.6,19.9,20.6,19.3,20.3,19L20.3,19z"/> <path id="Path_41481" d="M20.3,3.7c-0.4-0.4-0.9-0.4-1.3,0l-1.9,1.9c-0.4,0.3-0.4,0.9,0,1.3c0.3,0.4,0.9,0.4,1.3,0c0,0,0,0,0,0 L20.3,5C20.6,4.7,20.6,4.1,20.3,3.7z"/><path d="M3.7,20.3c0.4,0.4,0.9,0.4,1.3,0l1.9-1.9c0.3-0.4,0.3-0.9,0-1.3c-0.3-0.3-0.9-0.3-1.2,0L3.7,19 C3.4,19.3,3.4,19.9,3.7,20.3z"/></svg>`,
            moon: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"> <path d="M22.2,16.6c-1.7,3-4.7,5.1-8.1,5.5c-0.5,0.1-1,0.1-1.5,0.1c-6.1,0-11-5-10.9-11.1 c0-3.7,1.9-7.2,5.1-9.2c0.4-0.2,0.9-0.1,1.1,0.3C8,2.4,8,2.7,7.9,3C5.3,7.5,7,13.3,11.5,15.8c1.8,1,3.8,1.4,5.8,1.1 c1.3-0.2,2.6-0.6,3.7-1.4c0.4-0.2,0.9-0.1,1.1,0.2C22.4,16,22.4,16.3,22.2,16.6L22.2,16.6z"/> </svg>`,
        };

        this.skinnerContainer = this.createControlsWrapper();

        this.uiColors = {
            dark: {
                bg: "#222f3e",
                accent: "#ee5253",
            },
            light: {
                bg: "#c8d6e5",
                accent: "#10ac84",
            },
        };

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

        this.cssCb = cssCb;
        this.skin = {};
        this.isUIVisible = true;
        this.version = "4.0.0";

        this._config = starterConfig || {};

        this.activeEssences = this.configOrder.filter((c) => {
            return this._config[c.name];
        });

        this.localStorage = {};

        this.defaults = {
            dark: {
                bg2: 6,
                bg3: 12,
                bgHov: 3,
            },
            light: {
                bg2: 10,
                bg3: 15,
                bgHov: 3,
            },
            alpha: {
                bg: 0.7,
                bg2: 0.5,
                bg3: 0.3,
            },
            txt: {
                txt: 0.9,
                txt2: 0.6,
                txt3: 0.4,
            },
        };

        this.mergedConfig = this.mergeConfig(this._config);
        this.generateInitialSkin();

        this.modifyKey = this.modifyKey.bind(this);
        this.generateInitialSkin = this.generateInitialSkin.bind(this);
        this.showOverlay = this.showOverlay.bind(this);
        this.hideOverlay = this.hideOverlay.bind(this);
        this.toggleUi = this.toggleUi.bind(this);
        this.initBasedOnCustomConfig = this.initBasedOnCustomConfig.bind(this);
        this.mergeConfig = this.mergeConfig.bind(this);
        this.saveConfig = this.saveConfig.bind(this);
        this.getFallbackLvl = this.getFallbackLvl.bind(this);
        this.message = this.message.bind(this);

        this.generateBackgrounds = this.generateBackgrounds.bind(this);
        this.generateGradientss = this.generateGradientss.bind(this);
        this.generateTextss = this.generateTextss.bind(this);
        this.generateAccentss = this.generateAccentss.bind(this);
        this.generateBorderss = this.generateBorderss.bind(this);

        this.labelsMap = {
            body: "Body",
            accent: "Accent",
            dominant: "Dominant",
            button: "Button",
            buttonSecondary: "Secondary Button",
            odd: "Odd",
            oddActive: "Active Odd",
            showMore: "Show More",
            header: "Header",
            subHeader: "Subheader",
            eventWrapper: "Event Wrapper",
            event: "Event",
            menu_1: "Menu Level 1",
            menu_2: "Menu Level 2",
            menu_3: "Menu Level 3",
            popup: "Popup",
            tab: "Tab",
            tabActive: "Active Tab",
            tabSecondaryActive: "Active Secondary Tab",
            input: "Input",
            inputSecondary: "Secondary Input",
            navbar: "Navbar",
            slider: "Slider",
            collapse: "Collapse",
            marketHeader: "Market Header",
            filter: "Filter",
            tooltip: "Tooltip",
            tmLogo: "Team logo",
            betSlip: "Betslip",
            betSlipStake: "Betslip Stake",
            betSlipTab: "Betslip Tab",
            betSlipTabActive: "Betslip Tab Active",
            betSlipInput: "Betslip Input",
            betSlipButton: "Betslip Button",
            name: "Name",
            background: "Background",
            gradient: "Gradient",
            text: "Text",
            border: "Border",
            radius: "Radius",
        };
    }

    mergeConfig(config) {
        let _config = config;
        let _mergedConfig = {};
        let _missingConfig = {};
        for (let i = 0; i < this.configOrder.length; i++) {
            let _essence = this.configOrder[i].name;
            let _configBlueprint = {
                Background: {
                    isDark: false,
                    isActive: false,
                    color: "#19C950",
                },
                Gradient: {
                    angle: 0,
                    isActive: false,
                    color: "#1703A2",
                },
                Text: {
                    isActive: false,
                    color: "#611BCD",
                },
                Accent: {
                    isActive: false,
                    color: "#F022FE",
                },
                Border: {
                    isActive: false,
                    color: "#AC23F7",
                },
                borderRadius: 0,
            };
            _mergedConfig[_essence] = {};
            _mergedConfig[_essence].editable = Boolean(
                this.activeEssences.find((f) => f.name === _essence)
            );
            if (!_config[_essence]) {
                _missingConfig[_essence] = {};
            }
            for (const key in _configBlueprint) {
                if (key === "borderRadius" && _config[_essence]) {
                    _mergedConfig[_essence][key] = _config[_essence][key]
                        ? _config[_essence][key]
                        : _configBlueprint[key];
                } else {
                    _mergedConfig[_essence][key] = Object.assign(
                        _configBlueprint[key],
                        _config[_essence] ? _config[_essence][key] : {}
                    );
                }
            }
            if (_essence === "body" || _essence === "accent") {
                _mergedConfig[_essence].Background.isActive = true;
            }
            _mergedConfig[_essence].fallback = this.configOrder[i].inherits;
            _mergedConfig[_essence].variation =
                _config[_essence] && _config[_essence].variation
                    ? _config[_essence].variation
                    : this.configOrder[i].variation;
        }
        console.log(_mergedConfig);
        return _mergedConfig;
    }

    generateBackgrounds(essence) {
        let _essence = essence;
        let _vb = this.verbalData(_essence);
        let _isDark = this.skin[_vb.isDark];
        this.skin[_vb.nameBg2] = _isDark
            ? tinycolor(this.skin[_vb.nameBg])
                .darken(this.defaults.dark.bg2)
                .toString()
            : tinycolor(this.skin[_vb.nameBg])
                .lighten(this.defaults.light.bg2)
                .toString();

        this.skin[_vb.nameBg3] = _isDark
            ? tinycolor(this.skin[_vb.nameBg])
                .darken(this.defaults.dark.bg3)
                .toString()
            : tinycolor(this.skin[_vb.nameBg])
                .lighten(this.defaults.light.bg3)
                .toString();

        this.skin[_vb.nameBgHov] = _isDark
            ? tinycolor(this.skin[_vb.nameBg])
                .darken(this.defaults.dark.bgHov)
                .toString()
            : tinycolor(this.skin[_vb.nameBg])
                .lighten(this.defaults.light.bgHov)
                .toString();

        this.skin[_vb.nameBg2Hov] = _isDark
            ? tinycolor(this.skin[_vb.nameBg2])
                .darken(this.defaults.dark.bgHov)
                .toString()
            : tinycolor(this.skin[_vb.nameBg2])
                .lighten(this.defaults.light.bgHov)
                .toString();

        this.skin[_vb.nameBg3Hov] = _isDark
            ? tinycolor(this.skin[_vb.nameBg3])
                .darken(this.defaults.dark.bgHov)
                .toString()
            : tinycolor(this.skin[_vb.nameBg3])
                .lighten(this.defaults.light.bgHov)
                .toString();

        this.skin[_vb.nameRGBA] = tinycolor(this.skin[_vb.nameBg])
            .setAlpha(this.defaults.alpha.bg)
            .toRgbString();
        this.skin[_vb.nameRGBA2] = tinycolor(this.skin[_vb.nameBg])
            .setAlpha(this.defaults.alpha.bg2)
            .toRgbString();
        this.skin[_vb.nameRGBA3] = tinycolor(this.skin[_vb.nameBg])
            .setAlpha(this.defaults.alpha.bg3)
            .toRgbString();
    }

    generateGradientss(essence) {
        let _essence = essence;
        let _vb = this.verbalData(_essence);
        let _isGradient = this.skin[_vb.isGradient];

        if (_isGradient) {
            this.skin[_vb.nameG] = `linear-gradient(${this.skin[_vb.gradientAngle]}deg, ${
                this.skin[_vb.nameBg_g]} 0%, ${this.skin[_vb.nameBg]} 100%)`;
        } else {
            this.skin[_vb.nameBg_g] = this.skin[_vb.nameBg2];
            this.skin[_vb.nameG] = this.skin[_vb.nameBg];
        }
    }

    generateTextss(essence) {
        let _essence = essence;
        let _vb = this.verbalData(_essence);
        let _isCustomTextActive = this.skin[_vb.isCustomTxt];
        let customTextColor = this.skin[_vb.nameTxt];

        if (_isCustomTextActive) {
            this.skin[_vb.nameTxt] = tinycolor(customTextColor)
                .setAlpha(this.defaults.txt.txt)
                .toRgbString();
        } else {
            this.skin[_vb.nameTxt] = tinycolor(
                guessVisibleColor(tinycolor(this.skin[_vb.nameBg]).toHexString())
            )
                .setAlpha(this.defaults.txt.txt)
                .toRgbString();
        }

        this.skin[_vb.nameTxt2] = tinycolor(this.skin[_vb.nameTxt])
            .setAlpha(this.defaults.txt.txt2)
            .toRgbString();
        this.skin[_vb.nameTxt3] = tinycolor(this.skin[_vb.nameTxt])
            .setAlpha(this.defaults.txt.txt3)
            .toRgbString();
    }

    generateAccentss(essence) {
        let _essence = essence;
        let _vb = this.verbalData(_essence);
        let _isCustomAccentActive = this.skin[_vb.isCustomAccent];
        let _customAccentColor = this.skin[_vb.nameAccent];
        if (_isCustomAccentActive) {
            this.skin[_vb.nameAccent] = _customAccentColor;
        } else {
            this.skin[_vb.nameAccent] =
                this.skin.accentBg || this.mergedConfig.accent.Background.color;
        }
        this.skin[_vb.nameAccentTxt] = tinycolor(
            guessVisibleColor(tinycolor(this.skin[_vb.nameAccent]).toHexString())
        )
            .setAlpha(this.defaults.txt.txt)
            .toRgbString();
    }

    generateBorderss(essence) {
        let _essence = essence;
        let _vb = this.verbalData(_essence);
        let _isCustomBorderActive = this.skin[_vb.isCustomBorder];
        let _customBorderColor = this.skin[_vb.nameBorder];
        if (_isCustomBorderActive) {
            this.skin[_vb.nameBorder] = _customBorderColor;
        } else {
            this.skin[_vb.nameBorder] = this.skin.bodyBg;
        }
    }

    generateInitialSkin() {
        let _config = this.mergedConfig;
        for (let i = 0; i < this.configOrder.length; i++) {
            let _essence = this.configOrder[i].name;
            let _vd = this.verbalData(_essence);

            if (_essence === "body" || _essence === "accent") {
                this.skin[_vd.isName] = true;
            } else {
                this.skin[_vd.isName] = _config[_essence].Background.isActive;
            }

            let isActive = this.skin[_vd.isName];

            if (isActive) {
                this.skin[_vd.nameBg] = _config[_essence].Background.color;
                this.skin[_vd.isDark] = _config[_essence].Background.isDark;
                this.generateBackgrounds(_essence);

                this.skin[_vd.isGradient] = _config[_essence].Gradient.isActive;
                this.skin[_vd.nameBg_g] = _config[_essence].Gradient.color;
                this.skin[_vd.gradientAngle] =
                    _config[_essence].Gradient.angle;
                this.generateGradientss(_essence);

                this.skin[_vd.isCustomTxt] = _config[_essence].Text.isActive;
                this.skin[_vd.nameTxt] = _config[_essence].Text.color;
                this.generateTextss(_essence);

                this.skin[_vd.isCustomAccent] = _config[_essence].Accent.isActive;
                this.skin[_vd.nameAccent] = _config[_essence].Accent.color;
                this.generateAccentss(_essence);

                this.skin[_vd.isCustomBorder] = _config[_essence].Border.isActive;
                this.skin[_vd.nameBorder] = _config[_essence].Border.color;
                this.generateBorderss(_essence);

                this.skin[_vd.nameRadius] = _config[_essence].borderRadius;
                this.skin[_vd.nameTxtInverse] = tinycolor(
                    this.skin[_vd.nameTxt]
                ).isLight()
                    ? "#262626"
                    : "#fff";
            } else {
                let _fbEssence = _config[_essence].fallback.find((f) => {
                    return _config[f].editable && _config[f]["Background"].isActive;
                });
                let _vdf = this.verbalData(_fbEssence);
                let fbLength = _config[_essence].fallback.length;
                let variation = this.mergedConfig[_essence].variation;
                this.skin[_vd.nameBg] = this.getFallbackLvl(
                    _fbEssence,
                    variation,
                    fbLength
                );
                this.generateBackgrounds(_essence);

                this.skin[_vd.isGradient] = this.skin[_vdf.isGradient];
                this.skin[_vd.nameBg_g] = this.skin[_vdf.nameBg_g];
                this.skin[_vd.gradientAngle] = this.skin[_vdf.gradientAngle];

                this.generateGradientss(_essence);

                this.skin[_vd.isCustomTxt] = this.skin[_vdf.isCustomTxt];
                this.skin[_vd.nameTxt] = this.skin[_vdf.nameTxt];
                this.generateTextss(_essence);

                this.skin[_vd.isCustomAccent] = this.skin[_vdf.isCustomAccent];
                this.skin[_vd.nameAccent] = this.skin[_vdf.nameAccent];
                this.generateAccentss(_essence);

                this.skin[_vd.isCustomBorder] = this.skin[_vdf.isCustomBorder];
                this.skin[_vd.nameBorder] = this.skin[_vdf.nameBorder];
                this.generateBorderss(_essence);

                this.skin[_vd.nameRadius] = this.skin[_vdf.nameRadius];
                this.skin[_vd.nameTxtInverse] = tinycolor(
                    this.skin[_vd.nameTxt]
                ).isLight()
                    ? "#262626"
                    : "#fff";
            }
        }
    }

    getFallbackLvl(essence, variation, lvl) {
        let _essence = essence;

        let _variation = variation;
        let _lvl = lvl;
        let _vb = this.verbalData(_essence);
        let _variationsArr = [
            "Bg",
            "BgHover",
            "Bg2",
            "Bg2Hover",
            "Bg3",
            "Bg3Hover",
        ];
        let _bg = _variation
            ? this.skin[_vb.name + _variationsArr[_variation]]
            : this.skin[_vb.name + _variationsArr[_lvl]];

        return _bg;
    }

    initBasedOnCustomConfig(config) {
        let _config = config;

        if (!_config) {
            console.error("asd");
            return false;
        }

        this.mergedConfig = this.mergeConfig(_config);
        this.generateInitialSkin();
        this.generateTheme();

        this.applyTheme();

        this.cssCb(this.skin);
    }

    applyTheme() {
        const self = this;
        const config = this.configOrder;
        self.message("loading config", true);

        let i = -1;
        let timeoutId;
        (function apply() {
            i++;
            clearTimeout(timeoutId);
            if (config.length === i) {
                return self.message("", false);
            }
            let _essence = config[i].name;
            if (!self.mergedConfig[_essence].editable) {
                return (timeoutId = setTimeout(apply));
            }
            self.updateControlFor(_essence);
            let verbalData = self.verbalData(_essence);

            self[verbalData.nameBg].picker.setColor(self.skin[verbalData.nameBg]);
            self[verbalData.nameBg].picker2.setColor(self.skin[verbalData.nameBg_g]);
            self[verbalData.nameBg].picker3.setColor(self.skin[verbalData.nameTxt]);
            self[verbalData.nameBg].borderPckr.setColor(
                self.skin[verbalData.nameBorder]
            );
            self[verbalData.nameBg].customAccentPckr.setColor(
                self.skin[verbalData.nameAccent]
            );
            timeoutId = setTimeout(apply);
        })();
    }

    init() {
        this.createHTML();
        this.addSettingsWrapper();
        this.addVersioning();
        this.addHeaderCollapserBtn();
        this.generateTheme();
        this.generateUiPalette(this.uiColors.light);
        this.addUiThemeSwitcher();
        this.updateAllControls();
        this.createDownloadButton();
        this.createCloseButton();
        this.cssCb(this.skin);
    }

    addSettingsWrapper() {
        this.settingsWrapper = document.createElement("Div");
        this.settingsWrapper.className = this.classNames.settingsWrapper;
        let headerNav = this.header.querySelector(".nik_skinner_link_wrapper");
        this.header.insertBefore(this.settingsWrapper, headerNav);
    }

    addVersioning() {
        let vDiv = document.createElement("Div");
        vDiv.className = "nik_skinner_versioning";
        vDiv.innerText = "V " + this.version;
        this.settingsWrapper.appendChild(vDiv);
    }

    addUiThemeSwitcher() {
        let _id = "skinner_ui_switcher";
        let switcherWrapper = document.createElement("label");
        switcherWrapper.className = this.classNames.uiSwitch;
        switcherWrapper.for = _id;
        let inp = document.createElement("input");
        inp.id = _id;
        inp.type = "checkbox";
        let lightIco = document.createElement("i");
        lightIco.className = this.classNames.ico;
        lightIco.innerHTML = this.icons.sun;
        let darkIco = document.createElement("i");
        darkIco.className = this.classNames.ico;
        darkIco.innerHTML = this.icons.moon;

        let thumb = document.createElement("span");

        let darkColors = this.uiColors.dark;
        let lightColors = this.uiColors.light;

        inp.addEventListener("change", (e) => {
            let uiTheme = e.currentTarget.checked ? darkColors : lightColors;
            this.updateUiPalette(uiTheme);
        });
        switcherWrapper.appendChild(inp);
        switcherWrapper.appendChild(lightIco);
        switcherWrapper.appendChild(darkIco);
        switcherWrapper.appendChild(thumb);

        this.settingsWrapper.appendChild(switcherWrapper);
    }

    addHeaderCollapserBtn() {
        let header = this.header;
        let root = this.skinnerRoot;

        let collapser = document.createElement("div");
        collapser.className = "skinner_header_toggler";
        let arrow = document.createElement("i");
        arrow.innerHTML = this.icons.burger;
        arrow.className = "skinner_ico skinner_ico_burger";

        collapser.appendChild(arrow);
        root.appendChild(collapser);

        collapser.addEventListener("click", () => {
            header.classList.toggle("nik_skinner_header-show");
            arrow.classList.toggle("skinner_ico_burger-rotated");
        });
    }

    prerogative(name) {
        return name === "body" || name === "accent" ? true : false;
    }

    modifyKey(key, value) {
        this.skin[key] = value;
        this.generateTheme();
        this.updateAllControls();
        this.cssCb(this.skin);
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

    generateTheme() {
        for (let i = 0; i < this.configOrder.length; i++) {
            let _essence = this.configOrder[i].name;
            this.generateColorLogick(_essence);
        }
    }

    generateColorLogick(essence) {
        let _config = this.mergedConfig;
        let _essence = essence;
        let _vd = this.verbalData(_essence);

        if (_essence === "body" || _essence === "accent") {
            this.skin[_vd.isName] = true;
        }

        let isActive = this.skin[_vd.isName];

        if (isActive) {
            this.generateBackgrounds(_essence);
            this.generateGradientss(_essence);
            this.generateTextss(_essence);
            this.generateAccentss(_essence);
            this.generateBorderss(_essence);

            this.skin[_vd.nameTxtInverse] = tinycolor(
                this.skin[_vd.nameTxt]
            ).isLight()
                ? "#262626"
                : "#fff";
        } else {
            let _fbEssence = _config[_essence].fallback.find((f) => {
                let vd = this.verbalData(f);
                return _config[f].editable && this.skin[vd.isName];
            });
            let fbLength = _config[_essence].fallback.length;
            let _vdf = this.verbalData(_fbEssence);
            let variation = _config[_essence].variation;
            this.skin[_vd.nameBg] = this.getFallbackLvl(
                _fbEssence,
                variation,
                fbLength
            );
            this.generateBackgrounds(_essence);

            this.skin[_vd.isDark] = this.skin[_vdf.isDark];

            this.skin[_vd.isGradient] = this.skin[_vdf.isGradient];
            this.skin[_vd.nameBg_g] = this.skin[_vdf.nameBg_g];
            this.skin[_vd.gradientAngle] = this.skin[_vdf.gradientAngle];

            this.generateGradientss(_essence);

            this.skin[_vd.isCustomTxt] = this.skin[_vdf.isCustomTxt];
            this.skin[_vd.nameTxt] = this.skin[_vdf.nameTxt];
            this.generateTextss(_essence);

            this.skin[_vd.isCustomAccent] = this.skin[_vdf.isCustomAccent];
            this.skin[_vd.nameAccent] = this.skin[_vdf.nameAccent];
            this.generateAccentss(_essence);

            this.skin[_vd.isCustomBorder] = this.skin[_vdf.isCustomBorder];
            this.skin[_vd.nameBorder] = this.skin[_vdf.nameBorder];
            this.generateBorderss(_essence);

            this.skin[_vd.nameRadius] = this.skin[_vdf.nameRadius];
            this.skin[_vd.nameTxtInverse] = tinycolor(
                this.skin[_vd.nameTxt]
            ).isLight()
                ? "#262626"
                : "#fff";
        }
    }

    createFallbackArray(essence) {
        let _essence = essence;
        let fbArr = [];
        let fb = _essence.fallback;

        while (fb) {
            fbArr.push(fb);
            fb = this.mergedConfig[fb].fallback;
        }

        return fbArr;
    }

    saveConfig() {
        this.message("config saved", true);
        let config = {};
        for (let i = 0; i < this.configOrder.length; i++) {
            let _essence = this.configOrder[i].name;
            let verbalData = this.verbalData(_essence);
            config[verbalData.name] = {};
            config[verbalData.name].Background = {
                isActive: this.skin[verbalData.isName],
                color: this.skin[verbalData.nameBg],
                isDark: this.skin[verbalData.isDark],
            };
            if (this.skin[verbalData.isGradient]) {
                config[verbalData.name].Gradient = {
                    isActive: this.skin[verbalData.isName],
                    color: this.skin[verbalData.nameBg_g],
                    angle: this.skin[verbalData.gradientAngle],
                };
            }
            if (this.skin[verbalData.isCustomTxt]) {
                config[verbalData.name].Text = {
                    isActive: this.skin[verbalData.isCustomTxt],
                    color: this.skin[verbalData.nameTxt],
                };
            }
            if (this.skin[verbalData.isCustomAccent]) {
                config[verbalData.name].Accent = {
                    isActive: this.skin[verbalData.isCustomAccent],
                    color: this.skin[verbalData.nameAccent],
                };
            }
            if (this.skin[verbalData.isCustomBorder]) {
                config[verbalData.name].Border = {
                    isActive: this.skin[verbalData.isCustomBorder],
                    color: this.skin[verbalData.nameBorder],
                };
            }
            if (this.skin[verbalData.nameRadius]) {
                config[verbalData.name].borderRadius = this.skin[verbalData.nameRadius];
            }
        }

        this.copyTextToClipboard(config);

        let timeout = null;
        if (!timeout) {
            timeout = window.setTimeout(() => {
                this.message("", false);
                clearTimeout(timeout);
            }, 1000);
        }

        return config;
    }

    copyTextToClipboard(text) {
        let _text = JSON.stringify(text);

        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(_text);
            return;
        }
        navigator.clipboard.writeText(_text).then(
            function () {
                console.log("Async: Copying to clipboard was successful!");
            },
            function (err) {
                console.error("Async: Could not copy text: ", err);
            }
        );
    }

    updateControlFor(name) {
        let c = this.verbalData(name);
        this.skin[c.isName]
            ? this[c.nameBg].picker.enable()
            : this[c.nameBg].picker.disable();
        this.skin[c.isGradient]
            ? this[c.nameBg].picker2.enable()
            : this[c.nameBg].picker2.disable();
        this.skin[c.isCustomTxt]
            ? this[c.nameBg].picker3.enable()
            : this[c.nameBg].picker3.disable();
        this.skin[c.isCustomBorder]
            ? this[c.nameBg].borderPckr.enable()
            : this[c.nameBg].borderPckr.disable();
        this.skin[c.isCustomAccent]
            ? this[c.nameBg].customAccentPckr.enable()
            : this[c.nameBg].customAccentPckr.disable();

        this[c.nameBg].radiusInput.disabled = !this.skin[c.isName];

        this[c.nameBg].checkBox2.disabled = !this.skin[c.isName];
        this[c.nameBg].checkBox3.disabled = !this.skin[c.isName];
        this[c.nameBg].borderChb.disabled = !this.skin[c.isName];
        this[c.nameBg].customAccentChb.disabled = !this.skin[c.isName];
        this[c.nameBg].checkBoxIsDark.disabled = !this.skin[c.isName];
        this[c.nameBg].gradientAnglePicker.setDisabled(this.skin[c.isGradient]);

        this[c.nameBg].checkBox.checked = this.skin[c.isName];
        this[c.nameBg].checkBox2.checked = this.skin[c.isGradient];
        this[c.nameBg].checkBoxIsDark.checked = this.skin[c.isDark];
        this[c.nameBg].checkBox3.checked = this.skin[c.isCustomTxt];
        this[c.nameBg].customAccentChb.checked = this.skin[c.isCustomAccent];
        this[c.nameBg].borderChb.checked = this.skin[c.isCustomBorder];

        if (name === "body") {
            this[c.nameBg].checkBox.checked = true;
            this[c.nameBg].checkBox.disabled = true;
        }
        if (name === "accent") {
            this[c.nameBg].checkBox.checked = true;
            this[c.nameBg].checkBox.disabled = true;
        }

        this[c.nameBg].picker.applyColor();
        this[c.nameBg].picker2.applyColor();
        this[c.nameBg].picker3.applyColor();
        this[c.nameBg].borderPckr.applyColor();
        this[c.nameBg].customAccentPckr.applyColor();

        this[c.nameBg].radiusInput.value = this.skin[c.nameRadius];

        this[c.nameBg].radiusAmount.innerText = this[c.nameBg].radiusInput.value;
    }

    updateAllControls() {
        for (let i = 0; i < this.configOrder.length; i++) {
            let _essence = this.configOrder[i].name;
            if (!this.mergedConfig[_essence].editable) {
                continue;
            }
            this.updateControlFor(_essence);
        }
    }

    createHTML() {
        let _config = this.mergedConfig;
        for (let i = 0; i < this.configOrder.length; i++) {
            let _essence = this.configOrder[i].name;
            if (!_config[_essence].editable) continue;
            let _vd = this.verbalData(_essence);
            let _hiddenControlsArray = _config[_essence].hide;

            this[_vd.nameBg] = this.createControl([
                _essence,
                this.skinnerContainer,
                (e) => {
                    this.modifyKey(_vd.isName, e.target.checked);
                },
                (e) => {
                    this.modifyKey(_vd.isGradient, e.target.checked);
                },
                (e) => {
                    console.log({ e });
                    this.modifyKey(_vd.gradientAngle, e.data.angle);
                },
                (e) => {
                    this.modifyKey(_vd.nameBg, e.toHEXA().toString());
                },
                (e) => {
                    this.modifyKey(_vd.nameBg_g, e.toHEXA().toString());
                },
                (e) => {
                    this.modifyKey(_vd.isDark, e.target.checked);
                },
                (e) => {
                    this.modifyKey(_vd.isCustomTxt, e.target.checked);
                },
                (e) => {
                    this.modifyKey(_vd.nameTxt, e.toHEXA().toString());
                },
                (e) => {
                    this.modifyKey(_vd.isCustomAccent, e.target.checked);
                },
                (e) => {
                    this.modifyKey(_vd.nameAccent, e.toHEXA().toString());
                },
                (e) => {
                    this.modifyKey(_vd.isCustomBorder, e.target.checked);
                },
                (e) => {
                    this.modifyKey(_vd.nameBorder, e.toHEXA().toString());
                },
                (e) => {
                    this.modifyKey(_vd.nameRadius, e.target.value);
                },
                _hiddenControlsArray,
            ]);
        }
    }

    toggleUi() {
        document.body.classList.toggle("nik_hide_ui");
    }

    createControlsWrapper() {
        const skinnerRoot = this.skinnerRoot;
        const skinnerUITogglerWrapper = document.createElement("div");
        skinnerUITogglerWrapper.className = "skinner_ui_toggler_wrapper";
        const skinnerUITogglerLabel = document.createElement("label");
        skinnerUITogglerLabel.id = "skinner_ui_toggler";
        const skinnerUITogglerImitator = document.createElement("i");
        skinnerUITogglerImitator.className = this.classNames.ico;
        skinnerUITogglerImitator.innerHTML = this.icons.eye;
        this.skinnerUIToggler = document.createElement("input");
        this.skinnerUIToggler.type = "checkbox";
        this.skinnerUIToggler.id = "skinner_ui_toggler";

        skinnerUITogglerWrapper.appendChild(skinnerUITogglerLabel);
        skinnerUITogglerLabel.appendChild(this.skinnerUIToggler);

        skinnerUITogglerLabel.appendChild(skinnerUITogglerImitator);
        skinnerRoot.appendChild(skinnerUITogglerWrapper);

        this.skinnerUIToggler.addEventListener("change", this.toggleUi);
        this.overlay = document.createElement("div");
        this.overlay.id = "skinner_overlay";
        skinnerRoot.appendChild(this.overlay);
        let toolbox = document.createElement("div");
        toolbox.className = "skinner_toolbox";
        let toolboxWrapper = document.createElement("div");
        toolboxWrapper.className = "skinner_toolbox_wrapper";
        let main = document.createElement("div");
        main.className = "nik_skinner_control_wrapper nik_skinner_scrollbar";
        let header = document.createElement("div");
        header.className = "nik_skinner_header_controls";
        toolbox.appendChild(toolboxWrapper);
        toolboxWrapper.appendChild(header);

        let tableHeaders = [
            "Name",
            "Background",
            "Gradient",
            "Text",
            "Accent",
            "Border",
            "Radius",
        ];

        tableHeaders.forEach((h, index) => {
            let heading = document.createElement("div");
            let className;
            switch (h) {
                case "name":
                    className =
                        "nik_skinner_header_control nik_skinner_header_control-name";
                    break;
                case "Background":
                case "Gradient":
                    className =
                        "nik_skinner_header_control nik_skinner_header_control-big";
                    break;
                case "Text":
                case "Accent":
                case "Border":
                    className =
                        "nik_skinner_header_control nik_skinner_header_control-small";
                    break;
                case "Radius":
                    className =
                        "nik_skinner_header_control nik_skinner_header_control-radius";
                    break;
                default:
                    className = "nik_skinner_header_control";
            }
            heading.className = className;
            heading.innerText = h;
            header.appendChild(heading);
        });

        toolboxWrapper.appendChild(main);
        skinnerRoot.appendChild(toolbox);
        this.toolboxWrapper = toolboxWrapper;
        return main;
    }

    createBtn(name, className) {
        let _class = className || "";
        let btn = document.createElement("button");
        btn.innerText = name;
        btn.className = `skinner_btn ${_class}`;

        return btn;
    }

    createDownloadBtn(name, className, number) {
        let _dn = "download " + name;

        let btn = this.createBtn(_dn, className);

        btn.addEventListener("click", () => {
            this.makeDownloadRequest(_dn, number);
        });
        return btn;
    }

    createDownloadButton() {
        this.btnWrapper = document.createElement("div");
        this.btnWrapper.className = "nik_skinner_download_button_wrapper";

        this.btnWrapperTop = document.createElement("div");
        this.btnWrapperTop.className = "nik_skinner_download_button_wrapper_row";

        this.btnWrapperBottom = document.createElement("div");
        this.btnWrapperBottom.className = "nik_skinner_download_button_wrapper_row";
        this.btnWrapper.appendChild(this.btnWrapperTop);
        this.btnWrapper.appendChild(this.btnWrapperBottom);

        this.toolboxWrapper.appendChild(this.btnWrapper);

        let config = this.cssCb(this.skin);
        let name = config.name;
        let name2 = config.name2;

        this.btnWrapperTop.appendChild(
            this.createDownloadBtn(
                name,
                `${
                name2 ? this.classNames.btn50 : this.classNames.btn100
                } skinner_btn-accent`
            )
        );
        if (name2) {
            this.btnWrapperTop.appendChild(
                this.createDownloadBtn(
                    name2,
                    `${this.classNames.btn50} skinner_btn-accent`,
                    2
                )
            );
        }
        let saveConfigBtn = this.createBtn("", "skinner_btn-s skinner_btn-accent");
        let saveIcoWrapper = document.createElement("i");
        saveIcoWrapper.className = "skinner_ico";
        saveIcoWrapper.innerHTML = this.icons.save;
        saveConfigBtn.appendChild(saveIcoWrapper);

        let loadConfigInput = document.createElement("textarea");
        loadConfigInput.spellcheck = false;
        loadConfigInput.placeholder = "enter copied config";
        loadConfigInput.className = "nik_skinner_input nik_skinner_scrollbar";

        let loadConfigInputWrapper = document.createElement("div");
        loadConfigInputWrapper.className = "nik_skinner_input_wrapper";

        let loadConfigButton = this.createBtn(
            "",
            "skinner_btn-l skinner_btn-accent"
        );
        let loadIcoWrapper = document.createElement("i");
        loadIcoWrapper.className = "skinner_ico";
        loadIcoWrapper.innerHTML = this.icons.load;
        loadConfigButton.appendChild(loadIcoWrapper);

        loadConfigButton.addEventListener("click", () => {
            let _config = loadConfigInput.value
                ? JSON.parse(loadConfigInput.value)
                : null;
            console.log(_config);
            this.initBasedOnCustomConfig(_config);
            loadConfigInput.value = "";
        });

        saveConfigBtn.addEventListener("click", () => {
            this.saveConfig();
        });

        this.btnWrapperBottom.appendChild(saveConfigBtn);
        loadConfigInputWrapper.appendChild(loadConfigInput);
        this.btnWrapperBottom.appendChild(loadConfigInputWrapper);
        this.btnWrapperBottom.appendChild(loadConfigButton);

        this.messageWrapper = document.createElement("div");
        this.messageWrapper.className = "nik_skinner_message hide";
        document.body.appendChild(this.messageWrapper);
    }

    async makeDownloadRequest(name, number) {
        let css;
        if (number) {
            css = this.cssCb(this.skin)["css" + number];
        } else {
            css = this.cssCb(this.skin).css;
        }

        var element = document.createElement("a");
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var fileNameSuffix = hours + "-" + minutes;
        element.setAttribute(
            "href",
            "data:text/css;charset=utf-8," + encodeURIComponent(css)
        );
        element.setAttribute("download", name + "_" + fileNameSuffix + ".css");
        element.style.display = "none";

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    createCloseButton() {
        this.toolBox = document.querySelector(".skinner_toolbox");
        this.closeBtn = document.createElement("button");
        let arrow = document.createElement("div");
        this.closeBtn.className = "skinner_toolbox_toggler";
        arrow.className = "skinner_ico_arrow";

        this.closeBtn.addEventListener("click", () => {
            this.toolBox.classList.toggle("skinner_toolbox-hide");
            arrow.classList.toggle("skinner_ico_arrow-rotated");
        });
        this.closeBtn.appendChild(arrow);
        this.toolBox.appendChild(this.closeBtn);
    }

    showOverlay() {
        const overlay = this.overlay;
        overlay.style.display = "block";
    }

    hideOverlay() {
        const overlay = this.overlay;
        overlay.style.display = "none";
    }

    createSpan(className, text) {
        const span = document.createElement("span");
        const _className = className || "skinner_txt";
        const _text = text || "provide txt";

        span.className = _className;
        span.innerText = _text;

        return span;
    }

    createControl(params) {
        const [
            label,
            parent,
            checkboxCallback,
            gradientCallback,
            angleChangeCallback,
            pickerCallback,
            picker2Callback,
            isDarkCallback,
            isCustomTxtCb,
            customTxtCb,
            isCustomAccentCb,
            customAccentCb,
            isCustomBorderCb,
            customBorderCb,
            customRadiusCb,
            hideConfigArray,
        ] = params;
        let t = this;
        let verbalData = this.verbalData(label);

        let _label = document.createElement("button");
        _label.className = "nik_skinner_control_collapse_collapser";
        let _labelSpan = document.createElement("span");
        let _labelArrow = document.createElement("div");
        _labelArrow.className = "skinner_ico_arrow";

        _labelSpan.innerText = this.labelsMap[label]
            ? this.labelsMap[label]
            : label;
        _label.appendChild(_labelSpan);
        _label.appendChild(_labelArrow);

        let pickerMainColor = this.skin[label + "Bg"];
        let pickerGradientColor = this.skin[label + "Bg_g"];
        let pickerTextColor = this.skin[label + "Txt"];
        let pickerBorderColor = this.skin[verbalData.nameBorder];
        let pickerCustomAccentColor = this.skin[verbalData.nameAccent]
            ? this.skin[verbalData.nameAccent]
            : this.skin.accentBg;

        let wrapper = document.createElement("div");
        wrapper.className = "nik_skinner_control_group";
        let ddContent = document.createElement("div");
        ddContent.className = "nik_skinner_control_collapse_content";

        _label.addEventListener("click", () => {
            _label.classList.toggle("nik_skinner_control_collapse_collapser-open");
            ddContent.classList.toggle("nik_skinner_control_collapse_content-show");
            _labelArrow.classList.toggle("skinner_ico_arrow-rotated");
        });

        wrapper.appendChild(_label);
        wrapper.appendChild(ddContent);

        //main color

        let isEnabledControl, isEnabledChb, isEnabledPckrDiv, isEnabledPckr;
        {
            isEnabledPckrDiv = this.createDiv("nik_skinner_control_group_picker");
            isEnabledControl = this.createDiv("nik_skinner_checkbox_wrapper");
            let chb = this.createCheckBox(label);
            isEnabledChb = chb.checkbox;
            isEnabledChb.addEventListener("change", function (e) {
                checkboxCallback(e);
                t.modifyKey(
                    verbalData.nameBg,
                    t[verbalData.nameBg].picker._color.toHEXA().toString()
                );
            });
            ddContent.appendChild(isEnabledControl);
            isEnabledControl.appendChild(
                this.createSpan(this.classNames.uiLabelSm, this.labelsMap.background)
            );

            isEnabledControl.appendChild(chb.label);
            isEnabledControl.appendChild(isEnabledPckrDiv);
            isEnabledPckr = this.createPicker(
                isEnabledPckrDiv,
                pickerMainColor,
                pickerCallback
            );
        }

        let isDarkChb;
        {
            let chb = this.createCheckBox(label + "dark", true);
            isDarkChb = chb.checkbox;
            isDarkChb.addEventListener("change", isDarkCallback);
            isEnabledControl.appendChild(chb.label);
        }

        //gradient

        let isGradientEnabledControl,
            isGradientEnabledChb,
            isGradientEnabledPckrDiv,
            isGradientEnabledPckr;
        {
            isGradientEnabledPckrDiv = this.createDiv(
                "nik_skinner_control_group_picker"
            );
            isGradientEnabledControl = this.createDiv("nik_skinner_checkbox_wrapper");
            let chb = this.createCheckBox(label + "_g");
            isGradientEnabledChb = chb.checkbox;
            isGradientEnabledChb.addEventListener("change", gradientCallback);
            ddContent.appendChild(isGradientEnabledControl);
            isGradientEnabledControl.appendChild(
                this.createSpan(this.classNames.uiLabelSm, this.labelsMap.gradient)
            );
            isGradientEnabledControl.appendChild(chb.label);
            isGradientEnabledControl.appendChild(isGradientEnabledPckrDiv);
            isGradientEnabledPckr = this.createPicker(
                isGradientEnabledPckrDiv,
                pickerGradientColor,
                picker2Callback
            );
        }

        let anglePicker;
        {
            anglePicker = new AnglePicker(isGradientEnabledControl);
            anglePicker.eventTarget.addEventListener("angleChange", angleChangeCallback);
        }

        //custom text

        let isCustomTextControl,
            isCustomTextChb,
            isCustomTextPckrDiv,
            isCustomTextPckr;
        {
            isCustomTextPckrDiv = this.createDiv("nik_skinner_control_group_picker");
            isCustomTextControl = this.createDiv(
                "nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-small"
            );
            let chb = this.createCheckBox(label + "_text");
            isCustomTextChb = chb.checkbox;
            isCustomTextChb.addEventListener("change", isCustomTxtCb);
            ddContent.appendChild(isCustomTextControl);
            isCustomTextControl.appendChild(
                this.createSpan(this.classNames.uiLabelSm, this.labelsMap.text)
            );
            isCustomTextControl.appendChild(chb.label);
            isCustomTextControl.appendChild(isCustomTextPckrDiv);
            isCustomTextPckr = this.createPicker(
                isCustomTextPckrDiv,
                pickerTextColor,
                customTxtCb
            );
        }

        //custom accent

        let customAccentControl,
            customAccentChb,
            customAccentPckrDiv,
            customAccentPckr;
        if (isCustomAccentCb && customAccentCb) {
            customAccentPckrDiv = this.createDiv("nik_skinner_control_group_picker");
            customAccentControl = this.createDiv(
                "nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-small"
            );
            let chb = this.createCheckBox(label + "_custom_accent");
            customAccentChb = chb.checkbox;
            customAccentChb.addEventListener("change", isCustomAccentCb);
            ddContent.appendChild(customAccentControl);
            customAccentControl.appendChild(
                this.createSpan(this.classNames.uiLabelSm, this.labelsMap.accent)
            );
            customAccentControl.appendChild(chb.label);
            customAccentControl.appendChild(customAccentPckrDiv);
            customAccentPckr = this.createPicker(
                customAccentPckrDiv,
                pickerCustomAccentColor,
                customAccentCb
            );
        }

        //custom border

        let borderControl, borderChb, borderPckrDiv, borderPckr;
        if (isCustomBorderCb && customBorderCb) {
            borderPckrDiv = this.createDiv("nik_skinner_control_group_picker");
            borderControl = this.createDiv(
                "nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-small"
            );
            let chb = this.createCheckBox(label + "_border");
            borderChb = chb.checkbox;
            borderChb.addEventListener("change", isCustomBorderCb);
            ddContent.appendChild(borderControl);
            borderControl.appendChild(
                this.createSpan(this.classNames.uiLabelSm, this.labelsMap.border)
            );
            borderControl.appendChild(chb.label);
            borderControl.appendChild(borderPckrDiv);
            borderPckr = this.createPicker(
                borderPckrDiv,
                pickerBorderColor,
                customBorderCb
            );
        }

        //custom roundness

        let radiusControl, radiusInput, radiusAmount;
        if (customRadiusCb) {
            radiusControl = this.createDiv(
                "nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-range"
            );
            radiusInput = document.createElement("input");
            radiusInput.type = "range";
            radiusInput.min = 0;
            radiusInput.max = 100;
            radiusAmount = this.createDiv("nik_skinner_radius_amount");
            radiusInput.addEventListener("change", function (e) {
                customRadiusCb(e);
            });
            ddContent.appendChild(radiusControl);
            radiusControl.appendChild(
                this.createSpan(this.classNames.uiLabelSm, this.labelsMap.radius)
            );

            radiusControl.appendChild(radiusInput);
            radiusControl.appendChild(radiusAmount);
        }

        let _hideConfigArray = hideConfigArray || [];

        const configMap = {
            background: isEnabledControl,
            gradient: isGradientEnabledControl,
            text: isCustomTextControl,
            accent: customAccentControl,
            border: borderControl,
            radius: radiusControl,
        };

        parent.appendChild(wrapper);

        _hideConfigArray.forEach((config) => {
            const el = configMap[config];
            if (!el) return console.warn(config + " not found in map");
            el.classList.add("nik-hidden");
        });

        return {
            picker: isEnabledPckr,
            picker2: isGradientEnabledPckr,
            checkBox: isEnabledChb,
            checkBox2: isGradientEnabledChb,
            gradientAnglePicker: anglePicker,
            checkBoxIsDark: isDarkChb,
            checkBox3: isCustomTextChb,
            picker3: isCustomTextPckr,
            customAccentChb: customAccentChb,
            customAccentPckr: customAccentPckr,
            borderChb: borderChb,
            borderPckr: borderPckr,
            radiusInput: radiusInput,
            radiusAmount: radiusAmount,
        };
    }

    createDiv(className) {
        let div = document.createElement("div");
        div.className = className;

        return div;
    }

    createCheckBox(id, type) {
        let _id = id;
        let _type = type || false;

        let label, icon, checkbox;
        label = document.createElement("label");
        label.className = "skinner_custom_chb_label ";
        label.htmlFor = _id;
        icon = document.createElement("i");
        icon.className =
            "skinner_custom_chb " + (_type ? "skinner_custom_chb-right" : "");
        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = _id;

        label.appendChild(checkbox);
        label.appendChild(icon);

        return {
            label: label,
            checkbox: checkbox,
        };
    }

    createPicker(el, defaultColor, callback) {
        let picker = Pickr.create({
            el: el,
            theme: "classic",
            comparison: false,
            default: defaultColor,
            components: {
                preview: false,
                hue: true,
                interaction: {
                    //hex: false,
                    input: true,
                    save: false,
                },
            },
        });

        picker.on("change", (color, source, instance) => {
            callback(color);
        });
        picker.on("show", this.showOverlay);
        picker.on("hide", this.hideOverlay);

        return picker;
    }

    message(text, show) {
        let t = this;
        let _text = text || "generic message";
        let _show = show || false;

        if (_show) {
            t.messageWrapper.innerText = _text;
            t.messageWrapper.classList.remove("hide");
        } else {
            t.messageWrapper.classList.add("hide");
        }
    }

    updateUiPalette(colors) {
        this.generateUiPalette(colors);
    }

    generateUiPalette(colors) {
        //this.uiColors.bg = tinycolor(this.uiColors.bg).darken(80).desaturate(60).toString();
        let step = 2;
        let bg = tinycolor(colors.bg).lighten(step).toHexString();
        let bg2 = tinycolor(colors.bg)
            .lighten(step * 2)
            .toHexString();
        let bg3 = tinycolor(colors.bg)
            .lighten(step * 3)
            .toHexString();
        let bg4 = tinycolor(colors.bg)
            .lighten(step * 4)
            .toHexString();
        let bg5 = tinycolor(colors.bg)
            .lighten(step * 5)
            .toHexString();
        let bg6 = tinycolor(colors.bg)
            .lighten(step * 6)
            .toHexString();

        let accent = tinycolor(colors.accent).lighten(step).toHexString();
        let accent2 = tinycolor(colors.accent)
            .lighten(step * 2)
            .toHexString();
        let accent3 = tinycolor(colors.accent)
            .lighten(step * 2.5)
            .toHexString();
        let accent4 = tinycolor(colors.accent)
            .lighten(step * 3)
            .toHexString();

        let txt = tinycolor(guessVisibleColor(bg)).setAlpha(0.8).toRgbString();
        let txt2 = tinycolor(guessVisibleColor(bg)).setAlpha(0.7).toRgbString();
        let accentTxt = tinycolor(guessVisibleColor(accent))
            .setAlpha(0.8)
            .toRgbString();

        let shadow = tinycolor(bg).setAlpha(0.3).toRgbString();

        document.documentElement.style.setProperty("--skinnerBg", bg);
        document.documentElement.style.setProperty("--skinnerBg2", bg2);
        document.documentElement.style.setProperty("--skinnerBg3", bg3);
        document.documentElement.style.setProperty("--skinnerToolboxBg", bg4);
        document.documentElement.style.setProperty("--skinnerToolboxBg2", bg5);
        document.documentElement.style.setProperty("--skinnerToolboxBg3", bg6);

        document.documentElement.style.setProperty("--skinnerTxt", txt);
        document.documentElement.style.setProperty("--skinnerTxt2", txt2);

        document.documentElement.style.setProperty("--skinnerToolboxTxt", txt);
        document.documentElement.style.setProperty("--shadow", shadow);

        document.documentElement.style.setProperty("--skinnerAccent", accent);
        document.documentElement.style.setProperty("--skinnerAccent2", accent2);
        document.documentElement.style.setProperty(
            "--skinnerToolboxAccent",
            accent3
        );
        document.documentElement.style.setProperty(
            "--skinnerToolboxAccentHover",
            accent4
        );

        document.documentElement.style.setProperty("--skinnerAccentTxt", accentTxt);
    }
}


class AnglePicker {
    constructor(element, radius) {
        this.eventTarget = new EventTarget();
        this.radius = radius || 100;
        this.min = 0;
        this.max = 359;
        this.element = element || document.body;
        this.classNames = {
            root: "ap_root",
            stick: "ap_stick",
            indicator: "ap_angle",
        };

        this.createHTML = this.createHTML.bind(this);
        this.handleRotation = this.handleRotation.bind(this);
        this.setDegreesFromEvent = this.setDegreesFromEvent.bind(this);
        this.roundToMultiple = this.roundToMultiple.bind(this);
        this.clamp = this.clamp.bind(this);


        this.init();
        var self = this;

        
        this.root.onmousedown = (e) => {
            self.bounds = this.root.getBoundingClientRect();

            self.handleRotation(e);

            const onMouseMove = (event) => {
                self.handleRotation(event);
            };

            document.addEventListener('mousemove', onMouseMove);

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                self.root.onmouseup = null;
            };

        };        

    }
    init() {
        this.createHTML();
    }

    createHTML() {
        this.root = document.createElement('div');
        this.root.className = this.classNames.root;
        this.stick = document.createElement('div');
        this.stick.className = this.classNames.stick;
        this.indicator = document.createElement('div');
        this.indicator.className = this.classNames.indicator;
        this.indicator.innerText = 0;

        this.root.appendChild(this.stick);
        this.root.appendChild(this.indicator);
        this.element.appendChild(this.root);


    }

    setDisabled(bool) {
        bool ? this.root.classList.remove('disabled') : this.root.classList.add('disabled');
    }

    handleRotation(event) {
        const self = this;
        let { angle, eventTarget } = this;
        angle = this.setDegreesFromEvent(event);
        this.stick.style.transform = `rotate(${angle}deg)`;
        this.indicator.innerText = angle;
        //this.root.dispatchEvent(self.angleChangeEvent, { angle: self.angle });
        eventTarget.dispatchEvent(new MessageEvent('angleChange', { data: { angle } }));
        
        return this.angle = angle;
    }



    setDegreesFromEvent(event) {
        let opposite = this.bounds.top + this.bounds.height / 2 - event.pageY;

        let adjacent = this.bounds.left + this.bounds.width / 2 - event.pageX;


        let radians = Math.atan(opposite / adjacent);
        let degrees = Math.round(radians * (180 / Math.PI), 10);

        degrees = this.roundToMultiple(degrees - 90);

        if (adjacent < 0 && opposite >= 0) {
            degrees += 180;
        } else if (opposite < 0 && adjacent < 0) {
            degrees -= 180;
        }

        return this.clamp(degrees);

    }

    roundToMultiple(number, multiple) {
        let _multiple = multiple || 1;
        let value = number / _multiple,
            integer = Math.floor(value),
            rest = value - integer;

        return rest > 0.5 ? (integer + 1) * _multiple : integer * _multiple;
    }


    clamp(degrees) {
        if (typeof degrees !== "number") {
            degrees = parseInt(degrees, 10);
            if (isNaN(degrees)) {
                degrees = 0;
            }
        }

        let min = 0,
            max = min + 360;

        while (degrees < min) {
            degrees += 360;
        }
        while (degrees > max) {
            degrees -= 360;
        }

        return degrees;
    }
}