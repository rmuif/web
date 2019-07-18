# React + Material-UI + Firebase

[![Build Status](https://travis-ci.org/Phoqe/react-material-ui-firebase.svg?branch=master)](https://travis-ci.org/Phoqe/react-material-ui-firebase)
![Discord](https://img.shields.io/discord/567707014361513995.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/Phoqe/react-material-ui-firebase.svg)
![Website](https://img.shields.io/website/https/phoqe.me/react-material-ui-firebase.svg)

This project is an application skeleton for a typical [React](https://reactjs.org) project. It comes bundled with [Material-UI](https://material-ui.com), [Firebase](https://firebase.google.com), and [React Router](https://reacttraining.com/react-router). With [Create React App](https://facebook.github.io/create-react-app) at its core, you can use it to bootstrap your projects and development environment with the same tooling.

## Features

- Bootstrapped with Create React App, the same tooling works out-of-the-box
- Scaffolding incorporates Google Material Design principles through Material-UI
- Built on top of Firebase with Authentication, Cloud Firestore, Cloud Functions, Storage, and Performance Monitoring working from the start
- Robust routing with React Router including error handling
- Extensive mobile support with full-screen dialogs and [react-swipeable-views](https://react-swipeable-views.com) for tabs

## Demo

https://phoqe.me/react-material-ui-firebase

## Get started

### Clone the repository

The command `git clone` is a [Git](https://www.git-scm.com) command-line utility which is used to target an existing repository and create a clone, or copy of the target repository. The `<directory>` option is the name of a new directory to clone into, you can replace it with your project’s name. The ”humanish“ part of the source repository is used if no directory is explicitly given (`repo` for `/path/to/repo.git` and `foo` for `host.xz:foo/.git`).

```
git clone https://github.com/Phoqe/react-material-ui-firebase.git <directory>
```

### Install the dependencies

The command `cd`, also known as `chdir` (**ch**ange **dir**ectory), is a command-line OS shell command used to change the current working directory.

```
cd <directory>
```

The command `yarn install` is a [Yarn](https://yarnpkg.com) command-line utility used to install all dependencies for a project. This is most commonly used when you have just checked out code for a project, or when another developer on the project has added a new dependency that you need to pick up.

```
yarn install
```

### Run the app

The command `yarn start` runs the app in development mode. Open http://localhost:3000 to view it in the browser.

The page will automatically reload if you make changes to the code. You will see the build errors and lint warnings in the console.

```
yarn start
```

## Make it your own

```
git remote rm origin
```

```
git remote add origin https://github.com/Phoqe/react-material-ui-firebase.git
```

```
git remote add upstream https://github.com/Phoqe/react-material-ui-firebase.git
```

```
git push -u origin master
```

```
npm install -g firebase-tools
```

```
firebase login
```

```
firebase init
```

```
firebase deploy --only firestore:rules,storage,functions
```

## License

React + Material-UI + Firebase is open source software [licensed as MIT](https://github.com/Phoqe/react-material-ui-firebase/blob/master/LICENSE.md).
