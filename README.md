# Web Component Javascript Demo

![Travis (.org)](https://img.shields.io/travis/AlaskaAirlines/AuroJavascriptDemo?style=for-the-badge) ![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/AlaskaAirlines/AuroJavascriptDemo?style=for-the-badge)

An example Javascript project with Auro Components integrated. This app runs and works in all Alaska-supported browsers. Explore the project source to see the Auro Components being used in a frameworkless environment.

Below are instructions for adding Auro compatibility to your project. A familiarity with modern Javascript development and bundlers such as Webpack is expected.

At a bare minimum, you need:

1. The Design Token CSS custom properties included in your CSS.

1. Any web components imported

To accomplish all of this, you will almost certainly need a module bundler such as Webpack to package the Web Components and dependencies.

Below is a quick outline of how this project is set up to consume the Auro Components.

## Setting up your project to use Auro Web Components

The following steps will let you start using Web Components in your project across all supported browsers.

1. Install the necessary packages by running the following in the terminal.

    ```
    npm install --save-dev @alaskaairux/ods-button @alaskaairux/orion-design-tokens
    focus-visible
    ```

    `@alaskaairux/ods-button` is the button component itself. `@alaskaairux/orion-design-tokens` and `focus-visible` are required dependencies for tokens and focus styles, respectively.

1. In `index.js` in the `src` directory you will need to add imports for all of the components used such as `auro-button`.

   ```js
   import '@alaskaairux/ods-button/dist/auro-button';
   ```

1. The design tokens need to be available as CSS Custom Properties for the component to render. This example project imports them in `sass\style.scss` which is then processed by Webpack.

   ```scss
   @import '~@alaskaairux/orion-design-tokens/dist/tokens/SCSSVariables';
   ```

1. You will need to use a module bundler to bundle the Web Components with the rest of your application. See this project for an example with Webpack, including an annotated `webpack.config.js`.

1. You can now use `auro-button` in your HTML. See the example in `index_template.html`.

1. Run the application with `npm start`. The button should render and trigger an alert when clicked.
