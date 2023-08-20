const fs = require('fs');
const p = require('../package.json');

const readmeStr = fs.readFileSync('./README.md', 'utf8');
const readmeNew = readmeStr.replace(/sdk@(.*?\/dist)/, `sdk@${p.version}/dist`);
fs.writeFileSync('./README.md', readmeNew);
