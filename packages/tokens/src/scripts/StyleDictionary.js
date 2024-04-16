const StyleDictionaryPackage = require('style-dictionary');
const rimraf = require('rimraf');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

StyleDictionaryPackage.registerFormat({
    name: 'css/variables',
    formatter: function (dictionary, config) {
        return `:root {
        ${dictionary.allProperties.map(prop => `  --${prop.name}: ${prop.value};`).join('\n')}
        }`
    }
});  

function getBasePxFontSize(options) {
  return (options && options.basePxFontSize) || 16;
}

function fontPxToRem(token, options) {
  const baseFont = getBasePxFontSize(options);
  const floatVal = parseFloat(token.value);
  if (isNaN(floatVal)) {
    console.log('NaN error', token.name, token.value, 'rem');
  }
  if (floatVal === 0) {
    return '0';
  }
  return `${floatVal / baseFont}rem`;
}

StyleDictionaryPackage.registerTransform({
    name: 'size/pxToRem',
    type: 'value',
    matcher: (token) => ['fontSizes', 'lineHeights'].includes(token.type),
    transformer: (token, options) => fontPxToRem(token, options)
})
// 
StyleDictionaryPackage.registerTransform({
    name: 'sizes/px',
    type: 'value',
    matcher: function(prop) {
        // You can be more specific here if you only want 'em' units for font sizes    
        return ["fontSize", "spacing", "borderRadius", "borderWidth", "sizing"].includes(prop.attributes.category);
    },
    transformer: function(prop) {
        // You can also modify the value here if you want to convert pixels to ems
        return parseFloat(prop.original.value) + 'em';
    }
});

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

rimraf.sync('dist');

const webConfig = {
     "source": [
      `./src/transformed/figma.json`,
    ],
    "platforms": {
        "web": {
            "transforms": ["attribute/cti", "name/cti/kebab", "sizes/px", "size/pxToRem"],
            "buildPath": `./dist/`,
            "files": [{
                "destination": `css/variables.css`,
                "format": "css/variables",
            }]
        }
    }
}
const tsConfig = {
    "source": [
    `./src/transformed/figma.json`,
    ],
    "platforms": {
        "ts": {
            "transforms": ["attribute/cti", "name/cti/pascal", "sizes/px", "size/pxToRem"],
            "transformGroup": "js",
            "buildPath": `./dist/`,
            "files": [
                {
                "format": "javascript/es6",
                "destination": "javascript/variables.js"
                },
                {
                "format": "typescript/es6-declarations",
                "destination": "javascript/variables.d.ts"
                }
            ]
        },
    }   
};

for (let config of [webConfig, tsConfig]) {
    const StyleDictionary = StyleDictionaryPackage.extend(config);
    StyleDictionary.buildAllPlatforms();
}



console.log('\n==============================================');
console.log('\nBuild completed!');