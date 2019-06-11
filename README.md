# React + Material-UI + Firebase [![Build Status](https://travis-ci.org/Phoqe/react-material-ui-firebase.svg?branch=master)](https://travis-ci.org/Phoqe/react-material-ui-firebase)

This project is an application skeleton for a typical [React](https://reactjs.org) project. It comes bundled with [Material-UI](https://material-ui.com), [Firebase](https://firebase.google.com), and [React Router](https://reacttraining.com/react-router). With [Create React App](https://facebook.github.io/create-react-app) at its core, you can use it to bootstrap your projects and development environment with the same tooling.

## Features

React + Material-UI + Firebase comes with a bunch of development and testing tools for instant web development gratification.

- Bootstrapped with Create React App, the same tooling works out-of-the-box
- Scaffolding incorporates Google Material Design principles through Material-UI
- Built on top of Firebase with authentication and performance monitoring working from the start
- Robust routing with React Router including error handling (404)
- Extensive mobile support with [react-swipeable-views](https://react-swipeable-views.com) for tabs

Want to see it in action? Take a look at the [demo](https://phoqe.me/react-material-ui-firebase).

## Getting Started

**You'll need to have Node 8.10.0 or later on your local development machine** (but it's not required on the server).
You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

### npm

```sh
npm install
```

### yarn

```sh
yarn install
```

### Changing the Basename

If you receive a warning like:

```
Warning: You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "/" to begin with "/react-material-ui-firebase".
```

You may need to adjust the router to use the correct basename. A basename is the base URL for all locations. In most cases you can just remove the `basename` attribute from the `<Router>` element in `src/App/App.js`.

If you're still having problems you can read more in [React Router's documentation](https://reacttraining.com/react-router/web/api/BrowserRouter/basename-string).

### Changing the Name and URL

Making this boilerplate your starting-point requires you changing its name and URL. There are 4 files you'll need to modify.

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

### Replacing the Firebase Credentials

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

### Changing the Default Theme

The sample app uses a blue and red color combination with a light theme type. When a user changes the theme, a local storage object will be created and read on startup. You can change the default theme, which is the theme all users will see before changing it themselves, in `src/settings.js`:

```js
theme: {
  primaryColor: {
    name: 'YOUR_PRIMARY_COLOR',
    import: YOUR_PRIMARY_COLOR
  },
  secondaryColor: {
    name: 'YOUR_SECONDARY_COLOR',
    import: YOUR_SECONDARY_COLOR
  },
  type: 'YOUR_TYPE'
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

## Built with React + Material-UI + Firebase

### [Sync](https://sync.phoqe.dev)

Synchronize activities like watching YouTube or listening to Spotify with others, mainly friends or friends-to-be.

####  Your project could be here...

Are you using this project as a skeleton for your application? Don't hesitate adding it through a pull request.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
