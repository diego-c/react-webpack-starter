![Dependencies](https://david-dm.org/diego-c/react-webpack-starter.svg "Dependencies")
![devDependencies](https://david-dm.org/diego-c/react-webpack-starter/dev-status.svg "devDependencies")

# react-webpack-starter

A robust setup for new React projects

# Features

This boilerplate supports by default:

- ES6+, including stage 2 ECMAScript proposals
- Source Maps for easier debugging
- Testing with Jest and Enzyme
- Compression for production
- Hot Module Replacement (HMR)
- Code splitting
- Scoped CSS classes with CSS modules
- IE9 / Safari 10 (for React 16)

# Instructions

1. Clone the repo: `git clone https://github.com/diego-c/react-webpack-starter.git`
2. Move to the project's directory: `cd react-webpack-starter`
3. Install packages: `npm install` or `yarn install`
4. Start the server: `npm start` or `yarn start`

## Test

To run all tests:

`npm test` or `yarn test`

**NOTE:** if you wish to use async/await for your tests, install the `regenerator-runtime` package and add on the top of your file:

`import 'babel-polyfill';`

`import 'regenerator-runtime';`

See this [StackOverflow thread](https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined) for more info.

## Build

To build your project:

`npm run build` or `yarn build`

Your assets will be available in the `dist` folder
