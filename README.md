# RMUIF

RMUIF is an acronym for React + Material-UI + Firebase, which are the three musketeers that make up this template.
With [Create React App](https://facebook.github.io/create-react-app) at the core, you can expect the same tooling to work out of the box.

## Features

There are a lot of features included in RMUIF, some of the most prominent are:

- Bootstrapped with Create React App, the same tooling works out of the box
- Scaffolding incorporates Google’s Material Design principles through Material-UI
- Built on top of Firebase with Cloud Firestore, Cloud Functions, Authentication, Hosting, Cloud Storage, Performance Monitoring, Analytics, and Remote Config working from the start
- Robust and easy to maintain routing with React Router including protected routes and error handling
- Extensive mobile support with full-screen dialogs and [react-swipeable-views](https://react-swipeable-views.com) for tabs

## Screenshots

## Demo

The demo is using the `master` branch, this branch always contains the latest released version of RMUIF.
Development happens on the `develop` branch, feature branches are branched from this as per the Gitflow workflow.

https://rmuif.com

You are free to create an account and try out the various features present in RMUIF.
Data is cleared from time to time, there’s no guarantee that your account will persist.

## Get started

RMUIF is meant to be used for new React projects. It is pretty easy to setup but can take a while to get it just right.

### Clone the repository

To get the files you need to clone the repository.
The easiest way is to use Git to clone the `master` branch of the repository.
Replace `<directory>` with your project’s name, e.g. `rmuif` or `react-material-ui-firebase`.

```
git clone https://github.com/phoqe/react-material-ui-firebase.git <directory>
```

### Install dependencies

The next step is to get all the right modules used in the base template.
First, make sure you’re in your project directory, replace `<directory>` with your project name.

```
cd <directory>
```

This project uses Yarn as the default package manager, we recommend you do the same.
To install all the required dependencies, just run this command:

```
yarn
```

### Run the app

Well done! That’s all to get the project up and running with the default configuration.
Just to make sure everything went well, run this command to start the app:

```
yarn start
```

Open http://localhost:3000 to view it in the browser.
The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

### Configure the template

The template forwards the config object found in `package.json` via `.env`.
The only file you need to change values in is `package.json`.

```
"title": "RMUIF",
"theme": {
  "primaryColor": "blue",
  "secondaryColor": "red",
  "dark": false,
  "dense": false
},
"firebase": {
  "apiKey": "AIzaSyDYZOrZVpXkPQD6J31mb9t2eIIxmGEJK-Q",
  "authDomain": "react-material-ui-firebase.firebaseapp.com",
  "databaseUrl": "https://react-material-ui-firebase.firebaseio.com",
  "projectId": "react-material-ui-firebase",
  "storageBucket": "react-material-ui-firebase.appspot.com",
  "messagingSenderId": "552659850812",
  "appId": "1:552659850812:web:d685f74f72161d96",
  "measurementId": "G-LYJ69M3CEC"
},
"sentry": {
  "dsn": "https://78536326e6524916b6f44b4ea510b7a4@sentry.io/1846624"
}
```

#### `title`

The `title` property is used in the HTML `title` element and in the app bar.
It is recommended you use your project’s public-facing name.

#### `theme`

The `theme` property is the default app theme users start out with.
Whenever a user changes their theme it is synchronized to Cloud Firestore and overrides the default theme.

You can use one of the following colors for the `primaryColor` and `secondaryColor` properties:

- `red`
- `pink`
- `purple`
- `deep-purple`
- `indigo`
- `blue`
- `light-blue`
- `cyan`
- `teal`
- `green`
- `light-green`
- `lime`
- `yellow`
- `amber`
- `orange`
- `deep-orange`
- `brown`
- `gray`
- `blue-gray`

#### `firebase`

The `firebase` property is your project’s Firebase credentials.
You will setup a Firebase project later, I assure you.
Your Firebase credentials are public, but fear not, access is controlled through Firebase Security Rules.

#### `sentry`

The `sentry` property contains the key used with the Sentry application error logging framework.
It is useful if you want errors in your app to be reported to you, but it is optional.
Any errors reported to the default key will be ignored if they’re not coming from the demo domain.

### Create a Firebase project

https://firebase.google.com/docs/web/setup#create-firebase-project

### Register your app with Firebase

https://firebase.google.com/docs/web/setup#register-app

### Firebase config object

https://firebase.google.com/docs/web/setup#config-object

### Create a Cloud Firestore database

https://firebase.google.com/docs/firestore/quickstart#create

#### Deploy Cloud Firestore Security Rules

https://firebase.google.com/docs/firestore/security/get-started?authuser=0#deploying_rules

```
service cloud.firestore {
  function isUserAuthenticated() {
    return request.auth != null;
  }

  function isUserOwner(userId) {
    return request.auth.uid == userId;
  }

  function hasUserRole(role) {
    return role in request.auth.token.roles;
  }

  function isUserAdmin() {
    return hasUserRole('admin');
  }

  function isUserPremium() {
    return hasUserRole('premium');
  }

  function isUserAuthorized(userId) {
    return isUserOwner(userId) || isUserAdmin();
  }

  match /databases/{database}/documents {
    match /users/{userId} {
      allow get: if isUserAuthenticated();
      allow list: if isUserAuthenticated() && isUserAdmin();
    }

    match /users/{userId} {
      allow create: if isUserAuthenticated() && isUserAuthorized(userId);
      allow update: if isUserAuthenticated() && isUserAuthorized(userId);
      allow delete: if isUserAuthenticated() && isUserAuthorized(userId);
    }
  }
}
```

### Create a default Storage bucket

https://firebase.google.com/docs/storage/web/start?authuser=0#create-default-bucket

#### Deploy Storage Security Rules

https://firebase.google.com/docs/storage/security/start?authuser=0#edit_rules

```
service firebase.storage {
  function isUserAuthenticated() {
    return request.auth != null;
  }

  function isUserOwner(userId) {
    return request.auth.uid == userId;
  }

  function hasUserRole(role) {
    return role in request.auth.token.roles;
  }

  function isUserAdmin() {
    return hasUserRole('admin');
  }

  function isUserPremium() {
    return hasUserRole('premium');
  }

  function isUserAuthorized(userId) {
    return isUserOwner(userId) || isUserAdmin();
  }

  function isAvatarValid() {
  	return (
    	request.resource.contentType.matches('image/.*') &&
      request.resource.size <= 20 * 1024 * 1024 &&
      (resource == null || request.resource.md5Hash != resource.md5Hash)
    );
  }

  match /b/{bucket}/o {
    match /images {
    	match /avatars/{userId} {
        allow get: if isUserAuthenticated();
        allow list: if isUserAuthenticated() && isUserAdmin();
      }

      match /avatars/{userId} {
        allow create: if isUserAuthenticated() && isUserAuthorized(userId) && isAvatarValid();
        allow update: if isUserAuthenticated() && isUserAuthorized(userId) && isAvatarValid();
        allow delete: if isUserAuthenticated() && isUserAuthorized(userId);
      }
    }
  }
}
```

## Attribution

| Image                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Name         | Description                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a href="https://jetbrains.com"><img src="https://user-images.githubusercontent.com/7033377/64803713-a7925180-d58d-11e9-94a4-54bcdd9023e6.png" width="300"></a>                                                                                                                                                                                                                                                                                                                                                                                            | JetBrains    | The maintainers use [JetBrains](https://www.jetbrains.com)’ tools to maintain and develop new features for the project. Their [Open Source Support Program](https://www.jetbrains.com/community/opensource) gives us the ability to use their tools for free to improve upon this project. |
| <a href="https://browserstack.com"><img src="https://p14.zdusercontent.com/attachment/1015988/w1rTv9BV42bGKWAEdOOH0jyWu?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..1j02V7lb9BSm4tAQIuOOMw.FFMfm49EsVQDC0GxjH8kTd4HpJjURmpA7sATf2zcuN07PZK6DMhREVEEXqgVEwwXfCHmnkpvgv5sYNXpUyiyAOvoO6eE_UcMnXjPC8a3q6fDLjJHzxLVRx93OBr_AFzAf6Gnt5s93rEnN1Fjvqsn7sRItZbgQQLZ_M_7xnl_QHyhpn3zYSFt35mTwObGggMaJ6mBpZNI-72SJKZtzoEPb1hNaM97MTUFEAbdxQL2n_DFieJFyNDkBNeIDHUmG4TFrmHhwucxv9j3V6UIJikDFS97CrueA-jUnkRS_HY-JDA.ti_ZX5qRJwKWcqUewhZGgA" width="300"></a> | BrowserStack | [BrowserStack](https://browserstack.com) is being used for its powerful suite of testing tools. With it we can test the project on multiple devices and browsers in real-time.                                                                                                             |

## License

RMUIF is open-source software [licensed as MIT](https://github.com/phoqe/react-material-ui-firebase/blob/master/LICENSE.md).
