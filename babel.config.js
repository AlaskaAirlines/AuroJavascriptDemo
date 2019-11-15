module.exports = {
    env: {
      // This is the config we'll use to generate bundles for legacy browsers.
      legacy: {
        presets: [
          [
            "@babel/preset-env", {
              useBuiltIns: "usage",
              // This should reasonably target older browsers.
              targets: "> 0.25%, last 2 versions, Firefox ESR",
              corejs: 3
            }
          ]
        ],
        plugins: [
          "@babel/plugin-transform-runtime",
          "@babel/plugin-syntax-dynamic-import"
        ]
      },
      // This is the config we'll use to generate bundles for modern browsers.
      modern: {
        presets: [
          [
            "@babel/preset-env", {
              modules: false,
              targets: {
                // This will target browsers which support ES modules.
                esmodules: true
              }
            }
          ]
        ],
        plugins: [
          "@babel/plugin-transform-runtime",
          "@babel/plugin-syntax-dynamic-import"
        ]
      }
    }
  };