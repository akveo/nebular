'use strict';
(function (module) {
  var _ = require('lodash');
  var fs = require('fs');
  var Colors = require('colors.js');

  var exporter = {};

  module.exports = function (path, name) {
    var out = {};
    out[exporter.interface(name)] = exporter.function(path);
    return out;
  };

  exporter.get_value = function get_value(a) {
    var value, i;
    switch (a.constructor.name) {
      case 'SassList':
        value = [];
        for (i = 0; i < a.getLength(); i++) {
          value.push(get_value(a.getValue(i)));
        }
        break;
      case 'SassMap':
        value = {};
        for (i = 0; i < a.getLength(); i++) {
          value[a.getKey(i).getValue()] = get_value(a.getValue(i));
        }
        break;
      case 'SassColor':
        if (1 === a.getA()) {
          value = Colors.rgb2hex(a.getR(), a.getG(), a.getB());
        }
        else {
          value = 'rgba(' + a.getR() + ', ' + a.getG() + ', ' + a.getB() + ', ' + a.getA() + ')';
        }
        break;
      case 'SassNumber':
        value = a.getValue();
        if (a.getUnit()) {
          value += a.getUnit();
        }
        break;
      case 'SassNull':
        value = null;
        break;
      default:
        value = a.getValue();
    }
    return value;
  };

  class Prop {
    constructor(name) {
      this.name = name;
      this.value = null;
      this.parents = [];
      this.childs = [];
    };
  }

  class PropLink {
    constructor(theme, prop) {
      this.theme = theme;
      this.prop = prop;
    }
  }

  exporter.parseThemes = function(THEMES) {
    var result = {};
    for (let themeName in THEMES) {
      result[themeName] = result[themeName] ? result[themeName] : {};
      result[themeName].data = result[themeName].data ? result[themeName].data : {};
      result[themeName].name = themeName;
      result[themeName].parent = THEMES[themeName].parent;
      let theme = THEMES[themeName].data;
      for (let prop in theme) {
        result[themeName].data[prop] = result[themeName].data[prop] ? result[themeName].data[prop] : new Prop(prop);
        result = exporter.getParent(prop, themeName, themeName, prop, result, THEMES);
      }
    }
    let output = {};
    output['themes'] = result;
    return output;
  }

  exporter.getParent = function(prop, scopedThemeName, resultThemeName, resultProp, resultObj, THEMES) {
    let scopedTheme = THEMES[scopedThemeName].data;
    let scopedParent = THEMES[scopedThemeName].parent;
    let value = scopedTheme[prop];
    if (resultProp === 'footer-height' && resultThemeName === 'light') debugger;
    if (typeof value === "string" && scopedTheme[value]) {
      if (resultObj[resultThemeName].data[resultProp].parents.length === 0) {
        exporter.linkProps(resultObj, scopedThemeName, value, resultThemeName, prop);
      } else resultObj[resultThemeName].data[resultProp].parents.push(new PropLink(scopedThemeName, value));
      exporter.getParent(value, scopedThemeName, resultThemeName, resultProp, resultObj, THEMES);
    } else {
      resultObj[resultThemeName].data[resultProp].value = value;
      if (scopedParent && THEMES[scopedParent].data[prop] === value) {
        if (resultObj[resultThemeName].data[resultProp].parents.length === 0) {
          exporter.linkProps(resultObj, scopedParent, prop, resultThemeName, prop)
        } else resultObj[resultThemeName].data[resultProp].parents.push(new PropLink(scopedParent, prop));
      }
    }
    return resultObj;
  }


  exporter.linkProps = function (resultObj, parentThemeName, parentPropName, childThemeName, childPropName) {
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

  exporter.function = function (path) {
    return function (file, value, options) {
      let opt = _.defaults(exporter.get_value(options), {prefix: '', suffix: '', extend: false});
      let output = exporter.get_value(value);
      output = exporter.parseThemes(output);
      output = _.defaults(JSON.parse(fs.readFileSync(path + '/' + file.getValue())), output);
      fs.writeFileSync(path + '/' + file.getValue(), opt.prefix + JSON.stringify(output, null, '  ') + opt.suffix);
      return value;
    }
  };

  exporter.interface = function (name) {
    name = name || 'export';
    return name + '($file, $value, $options:())';
  };
})(module);
