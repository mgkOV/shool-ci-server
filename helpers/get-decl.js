const walk = require("@bem/sdk.walk");

const levels = ["."];

module.exports = async config => {
  const files = await walk.asArray(levels, config);

  return files.map(file => file.entity._data);
};
