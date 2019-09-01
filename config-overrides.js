/* config-overrides.js */
const { override, addBabelPlugin, addLessLoader } = require('customize-cra');

module.exports = override([
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#08979c', '@info-color': '#87e8de' }
  }),
  addBabelPlugin(['styled-components', { displayName: true }])
]);
