const fs = require('fs');

// Boostrap 配置文件的路径
const bootstraprcCustomLocation = process.env.BOOTSTRAPRC_LOCATION

let defaultBootstraprcFileExists = true;

try {// 配置文件的默认路径
    fs.statSync('./.bootstraprc');
} catch (e) {
    defaultBootstraprcFileExists = false;
}

if (!bootstraprcCustomLocation && !defaultBootstraprcFileExists) {
  /* eslint no-console: 0 */
  console.log('You did not specify a \'bootstraprc-location\' ' +
    'arg or a ./.boostraprc file in the root.');
  console.log('Using the bootstrap-loader default configuration.');
}

// DEV and PROD have slightly different configurations
let bootstrapDevEntryPoint;
if (bootstraprcCustomLocation) {
    bootstrapDevEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?' +
    `configFilePath=${__dirname}/${bootstraprcCustomLocation}` +
    '!bootstrap-loader/no-op.js';
} else {
    bootstrapDevEntryPoint = 'bootstrap-loader';
}

let bootstrapProdEntryPoint;
if (bootstraprcCustomLocation) {
    bootstrapProdEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?extractStyles' +
    `&configFilePath=${__dirname}/${bootstraprcCustomLocation}` +
    '!bootstrap-loader/no-op.js';
} else {
    bootstrapProdEntryPoint = 'bootstrap-loader/extractStyles';
}

module.exports = {
    dev: bootstrapDevEntryPoint,
    prod: bootstrapProdEntryPoint,
};
