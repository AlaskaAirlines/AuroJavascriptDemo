# Web Component Javascript Demo

An example Javascript project with Auro Components integrated. This app runs and works in all Alaska-supported browsers. Explore the project source to see the Auro Components being used in a frameworkless environment.

Below are instructions for adding Auro compatibility to your project. A familiarity with modern Javascript development and bundlers such as Webpack is expected.

At a bare minimum, you need:

1. `webcomponents-loader.js` referenced in the head of your HTML.

1. The Design Token CSS custom properties included in your CSS.

1. Any web components imported after the polyfills have been loaded (look for WebComponentsReady event later in the documentation).

To accomplish all of this, you will almost certainly need a module bundler such as Webpack to package the Web Components and dependencies. If supporting legacy browsers such as IE11, you will also need to transpile your code using Babel.

Below is a quick outline of how this project is set up to consume the Auro Components.

## Setting up your project to use Auro Web Components

The following steps will let you start using Web Components in your project across all supported browsers.

1. Install the necessary packages by running `npm install --save-dev @alaskaairux/ods-button @alaskaairux/orion-design-tokens focus-visible @webcomponents/webcomponentsjs` in a terminal. `@alaskaairux/ods-button` is the button component itself. `@alaskaairux/orion-design-tokens` and `focus-visible` are required dependencies for tokens and focus styles, respectively. `@webcomponents/webcomponentsjs` contains polyfills for browsers that don't support Web Components.

1. Add a reference to `webcomponents-loader.js` in the head of your HTML. This examples places the loader in `src\index_template.html`. This will detect whether the user's browser supports Web Components and will polyfill any required features. You can load this file from a CDN (e.g. https://unpkg.com/@webcomponents/webcomponentsjs@2/webcomponents-loader.js) or copy the polyfills into your output directory yourself. This project does the latter using `copy-webpack-plugin` in the webpack config. However you load the polyfills, make sure you include the `defer` attribute -- conflicting polyfills may prevent the app from loading otherwise.

   ```html
   <script src="webcomponents/webcomponents-loader.js" defer></script>
   ```

1. Add a file called `webcomponents.js` in the `src` directory. You will add any additional Web Component imports here. After you import a component here, you can use it throughout the rest of your application. For now, just import `auro-button`.

   ```js
   import '@alaskaairux/ods-button/dist/auro-button';
   ```

1. Next, update your entrypoint (this example uses `index.js`) to import the Auro Components once the polyfills have loaded. This guarantees that Web Components are not defined until the browser polyfills are ready.

   ```js
   window.addEventListener('WebComponentsReady', () => {
     return import('./webcomponents');
   });
   ```

1. The design tokens need to be available as CSS Custom Properties for the component to render. This example project imports them in `sass\style.scss` which is then processed by Webpack.

   ```scss
   @import '~@alaskaairux/orion-design-tokens/dist/tokens/SCSSVariables';
   ```

1. You will need to use a module bundler to bundle the Web Components with the rest of your application. See this project for an example with Webpack, including an annotated `webpack.config.js`.

1. You can now use `auro-button` in your HTML. See the example in `index_template.html`.

1. Run the application with `npm start`. The button should render and trigger an alert when clicked.

## Setting up your project to work with IE11

Some additional steps must be taken to get Web Components working in IE11.

1. Add `"ie 11"` to your browserslist configuration. This example project has the browserslist in `package.json`.

1. Use Babel to transpile the Web Component code to ES5. The Web Component packages are shipped as ES6 Javascript that IE11 cannot interpret. If you are using Webpack, you need to add a rule to transpile your source and specific node_modules to ES5. The relevant code is below, but see the `webpack.config.js` for the example in context.

   ```js
   {
       test: /\.js$/,
       include: [
           path.resolve(__dirname, "src"),
           path.resolve(__dirname, "node_modules/lit-element"),
           path.resolve(__dirname, "node_modules/lit-html"),
           path.resolve(__dirname, "node_modules/@alaskaairux")
       ],
       use: {
           loader: 'babel-loader'
       },
   }
   ```

   You also need to add a Babel config to your project. See `babel.config.js` for an example.

You should now be able to run the app in IE11 without errors. Run `npm start` in the terminal and view the application in IE11.
