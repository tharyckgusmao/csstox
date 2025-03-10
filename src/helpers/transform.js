import postcss from "postcss";
import postcssJs from "postcss-js";
import transform from "css-to-react-native";

const toJSSObject = (cssText) => {
  const root = postcss.parse(cssText);
  return postcssJs.objectify(root);
};

export const toJSS = (cssText) => {
  try {
    return JSON.stringify(toJSSObject(cssText), null, 2);
  } catch (e) {
    return "Error translating CSS to JSS";
  }
};

export const toRN = (cssText) => {
  try {
    const output = toJSSObject(cssText);
    const result = Object.keys(output).map((rules) => [rules, output[rules]]);

    const resultTransform = result
      .map((e) => {
        let properties = Object.keys(e[1]).map((rules) => [rules, e[1][rules]]);
        return `${e[0]}: ${JSON.stringify(transform(properties), null, 2)}`;
      })
      .join(`,\n`);

    return resultTransform;
  } catch (e) {
    return "Error translating CSS to RN";
  }
};
