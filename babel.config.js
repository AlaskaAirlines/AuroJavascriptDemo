module.exports = {
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
}