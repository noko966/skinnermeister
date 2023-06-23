const fs = require('fs');
const {getLuminance,lighten,darken,rgba } = require("polished");
const cmsColors = require("./esport");

class CssVariablesGenerator {
  /**
   * Package generates CSS variables based on provided design system
   * which includes colors and variations (optional) and/or other optional properties,
   *
   * @author Karen Grigoryan (karen.grigoryan.h@digtiain.com)
   * @version 1.2.0
   *
   * @param {Array.<SkinningDesignSystem>} designSystem       - Application design system
   * @param {Object} [options]                                - Additional options
   * @param {string} [options.prefix]                         - CSS variable prefix (ex. prefix: 'my-prefix' -> var(--my-prefix-background))
   * @param {boolean} [options.generateForegroundColors]      - Generate foreground color css variable based on top-level color luminance
   *
   * @class
   *
   * @todo Add colors update functionality
   */
  constructor(designSystem = [], options = {}) {
    this.designSystem = designSystem; // provided colors
    this.prefix = options.prefix || "sport-digi"; // css variables name prefix (ex. --sport-digi-background)
    this.generateForegroundColors = options.generateForegroundColors || false;

    // -------------------- bindings
    this.addCssVariableToRoot = this.addCssVariableToRoot.bind(this);

    this.cssVariablesArr = []; // result css variables
  }

  /* --- core methods --- */

  /**
   * Generate CSS variables and add them to the :root (<html>) element
   *
   * @return {undefined}
   * @public
   */
  init() {
    this.generateCssVariables();
    return this.addGeneratedCssVariablesToRoot();
  }

  /**
   * Generate CSS variables for top level colors + their variations and static properties like 'border-radius'
   *
   * @return {undefined}
   * @private
   */
  generateCssVariables() {
    this.designSystem.forEach((propertyObj = {}) => {
      // 1. extract properties
      const { name, color, value, variations } = propertyObj;

      // handle colors
      if (color) {
        // 2. add base color css variable
        this.addCssVariable(this.generateCssVariableName(name), color);

        // 3. generate foreground if option is enabled
        if (this.generateForegroundColors) {
          this.addCssVariable(
            this.generateCssVariableName(`${name}-foreground`),
            this.generateForegroundColor(color)
          );
        }

        // 4. generate new colors if those are provided
        if (variations) {
          const variationsArr = Object.entries(variations);
          const handleVariablesGenerationForVariation =
            this.generateCssColorVariablesForVariation(name, color);

          variationsArr.forEach(handleVariablesGenerationForVariation);
        }
      }

      // handle static values (e.g. 'border-radius', 'shadow', etc.)
      else if (value) {this.addCssVariable(
          this.generateCssVariableName(name, "static"),
          `${value}`
        );

        if (variations) {
          const variationsArr = Object.entries(variations);
          const handleVariablesGenerationForVariation =
            this.generateCssValueVariablesForVariation(name, value);

          variationsArr.forEach(handleVariablesGenerationForVariation);
        }
      }
    });
  }

  /**
   * Generate new color and CSS variables for variations using modifiers and levels
   *
   * @param {string} name
   * @param {number} value
   *
   * @return {Function}
   * @private
   */
  generateCssValueVariablesForVariation(name, value) {
    const generateNewValue =
      this.generateNewValueBasedOnModifierAndLevel.bind(this);
    return this.generateCssVariablesForVariation(name, value, generateNewValue);
  }

  /**
   * Generate new color and CSS variables for variations using modifiers and levels
   *
   * @param {string} baseColorName
   * @param {string} baseColor
   *
   * @return {Function}
   * @private
   */
  generateCssColorVariablesForVariation(baseColorName, baseColor) {
    const generateNewValue =
      this.generateNewColorBasedOnModifierAndLevel.bind(this);
    return this.generateCssVariablesForVariation(
      baseColorName,
      baseColor,
      generateNewValue
    );
  }

  /**
   * Generate new cvalueolor and CSS variables for variations using modifiers, levels and newValueGenaratorFunction
   *
   * @param {string} name
   * @param {string|number} value
   * @param {Function} generateNewValue
   *
   * @return {undefined}
   * @private
   */
  generateCssVariablesForVariation(name, value, generateNewValue = () => {}) {
    return (variation = []) => {
      // 1. extract properties
      const [modifier, levelsArr] = variation;

      // 2. create css variable for every level
      levelsArr.forEach((level) => {
        // 2.1 generate css variable name and new color based on modification and level
        const cssVariableName = this.generateCssVariableName(
          name,
          modifier,
          level
        );
        const newValue = generateNewValue(value, modifier, level);

        // 2.2 add newly created css variables to variables list
        this.addCssVariable(cssVariableName, newValue);
      });
    };
  }

  /**
   * Add all generated CSS variables to Root (<html>) element
   *
   * @return {undefined}
   * @private
   */
  addGeneratedCssVariablesToRoot() {
    this.cssVariablesArr.forEach(this.addCssVariableToRoot);
    return this.cssVariablesArr;
  }

  /* --- helper methods --- */

  /**
   * Generate new color based on modification type and level
   * using "polished" lib
   *
   * @param {string} value
   * @param {string} modifier
   * @param {number} level
   *
   * @return {string}
   * @private
   */
  generateNewValueBasedOnModifierAndLevel(value, modifier, level) {
    let newValue = null;
    switch (modifier) {
      case "multiply":
        newValue = value * level;
        break;
      case "divide":
        newValue = value / level;
        break;
      default:
        newValue = value;
        break;
    }

    return newValue;
  }

  /**
   * Generate new color based on modification type and level
   * using "polished" lib
   *
   * @param {string} color        - HEX or RGB/A color
   * @param {string} modifier     - (darken, lighten, opacity, level)
   * @param {number} level        - in percentage (5, 10, 30)
   *
   * @return {string}
   * @private
   */
  generateNewColorBasedOnModifierAndLevel(color, modifier, level) {
    const convertedLevel = level / 100; // convert provided level (as percentage) to 0. based float

    switch (modifier) {
      case "lighten":
        return lighten(convertedLevel, color);
      case "darken":
        return darken(convertedLevel, color);
      case "opacity":
        return rgba(color, convertedLevel);
      case "level":
        // in case of "level" modifier, function will generate new color based on base color luminance
        // example: base color is '#000' which is dark in case of luminance, so it's level will be lighter
        return getLuminance(color) <= 0.5
          ? lighten(convertedLevel, color)
          : darken(convertedLevel, color);
      default:
        return color;
    }
  }

  /**
   * Generate white or black color based on provided color luminance
   *
   * @param {string} color - HEX or RGB/A color
   *
   * @return {string}
   * @private
   */
  generateForegroundColor(color) {
    return getLuminance(color) <= 0.5 ? "#ffffff" : "#000000";
  }

  /**
   * Generate CSS variable name based on:
   *
   * @param {string} name             - (background, foreground, etc...)
   * @param {string} [modifier]       - optional (darken, lighten, opacity...)
   * @param {String|Number} [level]   - optional if no modifier provided (1, 50, 100...)
   *
   * @return {string} - Ex.: "--background_lighten_10"
   * @private
   */
  generateCssVariableName(name, modifier, level) {
    // 1. format variable name kebab-case
    const formattedName = this.convertToKebabCase(name);

    // 2. create required skeleton
    let variable = `--${this.prefix}-${formattedName}`;

    // 3. add "modifier" and "level" parts
    if (modifier) variable += `--${modifier}`;
    if (level) variable += `-${level}`;

    // 4. return generated name
    return variable;
  }

  /**
   * Add provided CSS variable to instance CSS variables array
   *
   * @param {string} name     - variable name
   * @param {string} value    - value
   *
   * @return {undefined}
   * @private
   */
  addCssVariable(name, value) {
    this.cssVariablesArr.push({ name, value });
  }

  /**
   * Add CSS variable to Root (<html>) element using variable name and color
   *
   * @param {Object} nameAndColorObj
   * @param {string} nameAndColorObj.name     - variable name
   * @param {string} nameAndColorObj.value    - property value
   *
   * @return {undefined}
   * @private
   */
  addCssVariableToRoot({ name, value }) {
    // console.log(name, value);
    // this.targetElement.style.setProperty(name, value);
  }

  /**
   * Converts provided string to kebab-case.
   * Supports camel, pascal and snake cases.
   *
   * @see https://gist.github.com/thevangelist/8ff91bac947018c9f3bfaad6487fa149
   * @param {string} str
   */
  convertToKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2") // get all lowercase letters that are near to uppercase ones
      .replace(/[\s_]+/g, "-") // replace all spaces and low dash
      .toLowerCase();
  }

  /**
   * Returns reference of the target element if it's provided.
   * Otherwise it will return the reference of the root <html> element.
   *
   * @param {HTMLElement|string} target reference or CSS selector string
   * @returns {HTMLElement}
   *
   * @private
   */

}

class Skinner {
  /**
   * Skinner - Skinning System based on native CSS variables
   *
   * Package generates CSS variables using <CssVariablesGenerator> based on design system and base colors
   *
   * @version 1.2.0
   *
   * @param {Array.<SkinningDesignSystem>} designSystem                           - Application design system
 						- 4 base colors and other properties
   * @param {Object} [cssVariablesGeneratorOptions]                               - Additional options
   * @param {string} [cssVariablesGeneratorOptions.prefix]                        - CSS variable prefix (ex. prefix: 'my-prefix' -> var(--my-prefix-background))
   * @param {boolean} [cssVariablesGeneratorOptions.generateForegroundColors]     - Generate foreground color css variable based on top-level color luminance
   *
   * @class
   * @example
   * const skinner = new Skinner(defaultSkin, options, {
   *    generateForegroundColors: true
   * });
   * skinner.init();
   */
  constructor(
    designSystem = [],
    cssVariablesGeneratorOptions = {}
  ) {
    this.designSystem = designSystem; // provided colors and other properties
    this.cssVariablesGeneratorOptions = cssVariablesGeneratorOptions;
    this.generateCssVariablesInstance = null;
  }

  /* --- core methods --- */

  /**
   * Generate variables and add them to the :root (<html>) element
   *
   * @return {undefined}
   * @public
   */
  init(colors) {
    this.doSkinning(colors);
    this.generateCssVariables(colors.id);
  }

  /**
   * Merge base colors and other properties with application's design system
   *
   * @return {undefined}
   * @private
   */
  doSkinning(colors) {
    Object.entries(colors).forEach(([name, value]) => {
      const propertyNameLowerCase = name.toLowerCase();
      const designSystemProperties = this.designSystem.map((prop) => prop.name);

      // if property is exists in provided design, system override it
      if (
        designSystemProperties.includes(name) ||
        designSystemProperties.includes(propertyNameLowerCase)
      ) {
        this.designSystem = this.designSystem.map((rule) => {
          const ruleNameLowerCase = rule.name.toLowerCase();
          const validProperty = Boolean(value);
          const ruleFound = ruleNameLowerCase === propertyNameLowerCase;

          // override rule's color or value if it's provided in base properties
          if (ruleFound && validProperty) {
            if (rule.color) rule.color = value;
            if (rule.value) rule.value = value;
          }

          return rule;
        });
      }

      // otherwise create static property
      else {
        this.designSystem.push({
          name,
          value,
        });
      }
    });
  }

  /**
   * Generate CSS variables based on design system and additional options
   *
   * @return {undefined}
   * @private
   */
  generateCssVariables(id) {
    this.generateCssVariablesInstance = new CssVariablesGenerator(
      this.designSystem,
      this.cssVariablesGeneratorOptions
    );
    // this.generateCssVariablesInstance.init();
    let cssVariablesArray = this.generateCssVariablesInstance.init()

    let res = ':root{\n';

    cssVariablesArray.forEach(v => {
        res += `${v.name}:${v.value};\n`;
    })

    res += '}';


    fs.writeFileSync(`./partners/${id}.css`, res)

    // console.log(this.generateCssVariablesInstance.init());

    // console.log(this.designSystem);
  }
}

const defaultSkin = [
  {
    name: "background",
    color: "#262626",
    variations: {
      level: [-4, 5, 10, 15],
      opacity: [50],
    },
  },

  {
    name: "foreground",
    color: "#fff",
    variations: {
      level: [20, 40, 60],
    },
  },

  {
    name: "accent",
    color: "#ffb700",
    variations: {
      darken: [20, 10],
      opacity: [50],
    },
  },

  {
    name: "brand",
    color: "#f14100",
    variations: {
      darken: [20, 10],
      opacity: [50],
    },
  },

  {
    name: "border-radius",
    value: "2px",
    variations: {
      multiply: [2, 3, 4],
      divide: [2],
    },
  },

  { name: "odd", value: "#262626" },

  { name: "header", value: "#404040" },

  {
    name: "background-mobile",
    color: "#1a1a1a",
  },

  {
    name: "star",
    color: "#ffb700",
  },

  {
    name: "red",
    color: "#d40000",
  },

  {
    name: "green",
    color: "#00912C",
  },

  {
    name: "white",
    color: "#fff",
  },

  {
    name: "black",
    color: "#000",
  },

  {
    name: "button-background",
    color: "#4D4D4D",
  },

  {
    name: "button-foreground",
    color: "#999",
  },
];

const skinner = new Skinner(defaultSkin, {
  generateForegroundColors: true,
});

for (let i = 0; i < cmsColors.length; i++) {
  skinner.init(cmsColors[i]);
}
