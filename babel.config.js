module.exports = function (api) {
  api.cache(true);
  const presets = [["@babel/preset-env", {
    "targets": {
      "chrome": "58",
      "ie": "11"
    },
    "useBuiltIns": "entry"
  }]
  ];
  const plugins = [
  ];
  return {
    presets,
    plugins
  }
}