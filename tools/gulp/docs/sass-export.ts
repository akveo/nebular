import { join } from 'path';
const _ = require('lodash');
const fs = require('fs');
const Colors = require('colors.js');

class Prop {
  public name: string;
  public value: any = null;
  public parents: any[] = [];
  public childs: any[] = [];

  constructor(name) {
    this.name = name;
  }
}

class PropLink {
  public theme: any;
  public prop: any;

  constructor(theme, prop) {
    this.theme = theme;
    this.prop = prop;
  }
}

export function getExportFunction(outDir: string) {
  const sef = new SassExportFunction(outDir);
  return { 'export($file, $themes, $mapping)': sef.export.bind(sef) };
}

class SassExportFunction {
  constructor(private outDir: string) {}

  export(file, themes, mapping) {
    const themesValue = this.get_value(themes);
    const mappingValue = this.get_value(mapping);

    const completeThemes = {};
    Object.keys(themesValue).forEach((themeName) => {
      const theme = themesValue[themeName];
      completeThemes[themeName] = {
        ...theme,
        data: _.defaults(mappingValue, theme.data),
      };
    });

    let output = {
      themes: this.parseThemes(themesValue),
      // TODO: we need to change internal function interface as it very hard to re-use them
      completeThemes: this.parseThemes(completeThemes),
    };

    const outFilePath = join(this.outDir, file.getValue());
    output = _.defaults(JSON.parse(fs.readFileSync(outFilePath)), output);
    fs.writeFileSync(outFilePath, JSON.stringify(output, null, '  '));

    return themes;
  }

  get_value(a) {
    let value, i;
    switch (a.constructor.name) {
      case 'sass.types.List':
        value = [];
        for (i = 0; i < a.getLength(); i++) {
          value.push(this.get_value(a.getValue(i)));
        }
        break;
      case 'sass.types.Map':
        value = {};
        for (i = 0; i < a.getLength(); i++) {
          value[a.getKey(i).getValue()] = this.get_value(a.getValue(i));
        }
        break;
      case 'sass.types.Color':
        if (1 === a.getA()) {
          value = Colors.rgb2hex(a.getR(), a.getG(), a.getB());
        } else {
          value = 'rgba(' + a.getR() + ', ' + a.getG() + ', ' + a.getB() + ', ' + a.getA() + ')';
        }
        break;
      case 'sass.types.Number':
        value = a.getValue();
        if (a.getUnit()) {
          value += a.getUnit();
        }
        break;
      case '_SassNull0':
        value = null;
        break;
      default:
        value = a.getValue();
    }
    return value;
  }

  parseThemes(THEMES) {
    let result = {};

    Object.keys(THEMES).forEach((themeName) => {
      result[themeName] = result[themeName] ? result[themeName] : {};
      result[themeName].data = result[themeName].data ? result[themeName].data : {};
      result[themeName].name = themeName;
      result[themeName].parent = THEMES[themeName].parent;
      const theme = THEMES[themeName].data;

      Object.keys(theme).forEach((prop) => {
        result[themeName].data[prop] = result[themeName].data[prop] ? result[themeName].data[prop] : new Prop(prop);
        result = this.getParent(prop, themeName, themeName, prop, result, THEMES);
      });
    });

    return result;
  }

  getParent(prop, scopedThemeName, resultThemeName, resultProp, resultObj, THEMES) {
    const scopedTheme = THEMES[scopedThemeName].data;
    const scopedParent = THEMES[scopedThemeName].parent;
    const value = scopedTheme[prop];
    if (typeof value === 'string' && scopedTheme[value]) {
      if (resultObj[resultThemeName].data[resultProp].parents.length === 0) {
        this.linkProps(resultObj, scopedThemeName, value, resultThemeName, prop);
      } else {
        resultObj[resultThemeName].data[resultProp].parents.push(new PropLink(scopedThemeName, value));
      }
      this.getParent(value, scopedThemeName, resultThemeName, resultProp, resultObj, THEMES);
    } else {
      resultObj[resultThemeName].data[resultProp].value = value;
      if (scopedParent && THEMES[scopedParent].data[prop] === value) {
        if (resultObj[resultThemeName].data[resultProp].parents.length === 0) {
          this.linkProps(resultObj, scopedParent, prop, resultThemeName, prop);
        } else {
          resultObj[resultThemeName].data[resultProp].parents.push(new PropLink(scopedParent, prop));
        }
      }
    }
    return resultObj;
  }

  linkProps(resultObj, parentThemeName, parentPropName, childThemeName, childPropName) {
    if (!resultObj.hasOwnProperty(parentThemeName)) {
      resultObj[parentThemeName].data = {};
      resultObj[parentThemeName].data[parentPropName] = new Prop(parentPropName);
    } else if (!resultObj[parentThemeName].data.hasOwnProperty(parentPropName)) {
      resultObj[parentThemeName].data[parentPropName] = new Prop(parentPropName);
    }
    resultObj[childThemeName].data[childPropName].parents.push(new PropLink(parentThemeName, parentPropName));
    resultObj[parentThemeName].data[parentPropName].childs.push(new PropLink(childThemeName, childPropName));
    return resultObj;
  }
}
