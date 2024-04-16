const { transformTokens } = require('token-transformer');
const rawTokens = require('../tokens/figma.json')
const fs = require('fs');

const setsToUse = ['Core', 'Buttons'];
const excludes = ['Core'];

const transformerOptions = {
  expandTypography: true,
  expandShadow: true,
  expandComposition: true,
  expandBorder: true,
  preserveRawValue: false,
  throwErrorWhenNotResolved:  true,
  resolveReferences:true
}

const resolved = transformTokens(rawTokens, setsToUse, excludes, transformerOptions);

console.log(resolved);

// safe resolved to file 

fs.writeFileSync('./src/transformed/figma.json', JSON.stringify(resolved, null, 2));