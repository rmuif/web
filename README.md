# React + Material-UI + Firebase [![Build Status](https://travis-ci.org/Phoqe/react-material-ui-firebase.svg?branch=master)](https://travis-ci.org/Phoqe/react-material-ui-firebase)

This project is an application skeleton for a typical [React](https://reactjs.org) project. It comes bundled with [Material-UI](https://material-ui.com), [Firebase](https://firebase.google.com), and [React Router](https://reacttraining.com/react-router). With [Create React App](https://facebook.github.io/create-react-app) at its core, you can use it to bootstrap your projects and development environment with the same tooling.

## Features

The boilerplate comes with a bunch of development and testing tools for instant web development gratification:

### React + Material-UI + Firebase

- Bootstrapped with Create React App, the same tooling works out-of-the-box
- Scaffolding incorporates Google Material Design principles through Material-UI
- Built on top of Firebase with authentication and performance monitoring working from the start
- Robust routing with React Router including error handling (404)
- Extensive mobile support with [react-swipeable-views](https://react-swipeable-views.com) for tabs

### Create React App

- React, JSX, ES6, TypeScript and Flow syntax support
- Language extras beyond ES6 like the object spread operator
- Autoprefixed CSS, so you don’t need `-webkit-` or other prefixes
- A fast interactive unit test runner with built-in support for coverage reporting
- A live development server that warns about common mistakes
- A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps
- An offline-first [service worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) and a [web app manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/), meeting all the [Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app) criteria (_Note: Using the service worker is opt-in as of `react-scripts@2.0.0` and higher_)
- Hassle-free updates for the above tools with a single dependency

Check out [this guide](https://github.com/nitishdayal/cra_closer_look) for an overview of how these tools fit together.

The tradeoff is that **these tools are preconfigured to work in a specific way**. If your project needs more customization, you can ["eject"](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject) and customize it, but then you will need to maintain this configuration.

## Demo

https://phoqe.me/react-material-ui-firebase

## Getting started

**You’ll need to have Node >= 8.10 on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

### Clone repository

The command `git clone` is a Git command line utility which is used to target an existing repository and create a clone, or copy of the target repository. Replace `<your-project-name>` with the name of your project or remove that part of the command if you want to use the `react-material-ui-firebase` name for your project directory.

```
git clone https://github.com/Phoqe/react-material-ui-firebase.git <your-project-name>
```

### Install dependencies

Use the `cd` command, also known as `chdir` (change directory) to change the current working directory to your newly cloned project. Again, change `<your-project-name>` to reflect the correct directory name for your project.

```
cd <your-project-name>
```

The command `yarn install` is used to install all dependencies for the project. Running `yarn` with no command will run `yarn install`, passing through any provided flags.

```
yarn install
```

If you are used to using npm you might be expecting to use `--save` or
`--save-dev` when adding new dependencies. These have been replaced by `yarn add` and `yarn add --dev`. For
more information, see [the `yarn add` documentation](https://yarnpkg.com/en/docs/cli/add).

## Scripts

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code. You will see the build errors and lint warnings in the console.

<p align='center'>
  <img src='https://cdn.rawgit.com/marionebl/create-react-app/9f62826/screencast-error.svg' width='600' alt='Build errors'>
</p>

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode. By default, runs tests related to files changed since the last commit.

[Read more about testing](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed.

## Configuration

Making this boilerplate your starting-point requires you to configure some parts to tailor it to your needs.

### Changing the name and URL

- public/index.html
  - `title`
- public/manifest.json
  - `short_name`
  - `name`
- src/settings.js
  - `title`
- package.json
  - `name`
  - `homepage`

### Replacing the Firebase credentials

By default, React + Material-UI + Firebase uses a demo Firebase project which you can't manage. You need to create a new Firebase project and replace the credentials with your own. You shouldn't use the demo project for anything more than testing as you have no control over it.

When you've created a Firebase project you can copy-paste your credentials into the `firebase` object in `src/settings.js`:

```js
firebase: {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
}
```

### Changing the default theme

The sample app uses a blue and red color combination with a light theme type. When a user changes the theme, a local storage object will be created and read on startup. You can change the default theme, which is the theme all users will see before changing it themselves, in `src/settings.js`:

```js
theme: {
  primaryColor: {
    name: 'your-primary-color',
    import: yourPrimaryColor
  },
  secondaryColor: {
    name: 'your-secondary-color',
    import: yourSecondaryColor
  },
  type: 'your-type'
}
```

Remember to follow the proper casing for colors, there are 2 variants: color names and color imports. Color names are within single-quotes and follow `kebab-case` and imports are ES6 classes written in `camelCase`.

Available colors:

|Name|Import|
|---|---|
|`'red'`|`red`|
|`'pink'`|`pink`|
|`'purple'`|`purple`|
|`'deep-purple'`|`deepPurple`|
|`'indigo'`|`indigo`|
|`'blue'`|`blue`|
|`'light-blue'`|`lightBlue`|
|`'cyan'`|`cyan`|
|`'teal'`|`teal`|
|`'green'`|`green`|
|`'light-green'`|`lightGreen`|
|`'lime'`|`lime`|
|`'yellow'`|`yellow`|
|`'amber'`|`amber`|
|`'orange'`|`orange`|
|`'deep-orange'`|`deepOrange`|
|`'brown'`|`brown`|
|`'gray'`|`gray`|
|`'blue-gray'`|`blueGray`|

Available types:

- `'light'`
- `'dark'`

## License

React + Material-UI + Firebase is open source software [licensed as MIT](https://github.com/Phoqe/react-material-ui-firebase/blob/master/LICENSE.md).
