# RMUIF

RMUIF is the acronym for [React](https://reactjs.org) [Material-UI](https://material-ui.com) [Firebase](https://firebase.google.com) which are the three musketeers that make up this template.
With [Create React App](https://create-react-app.dev) at its core you can expect the same tooling to work out of the box, it is essentially a ”supercharged“ version of CRA with all the bells and whistles.

<img src="https://user-images.githubusercontent.com/7033377/73071460-13c58000-3eb3-11ea-9ed2-f5d9b5e8fc5b.png" alt="Screenshot">

## Features

There are lots of features included in the template, some of the most prominent are:

- Bootstrapped with Create React App, the same tooling works from the get-go
- UI scaffolding incorporates Google’s Material Design through Material-UI
- Built on top of Firebase with all their products for the web included
- Robust routing with React Router including protected routes and error handling
- Extensive mobile support with full-screen dialogs and react-swipeable-views for tabs
- Cross-platform application monitoring with a focus on error reporting with Sentry

There are a lot more features and more is included in every release.
Your project can take advantage of new releases by configuring Git to use this repository as an upstream origin.
You can learn more about this later.

## Demo

https://rmuif.com

The demo is using the `master` branch, which always contains the latest released version.
Development takes place in the `develop` branch as per the Gitflow workflow.

The Firebase project for the demo is cleared from time to time, your account may be deleted.

## Setup

It’s easy to setup RMUIF but can be time consuming if you want to go all the way, like setting up Firebase and Sentry.

### Clone repository

The first step is to get the files, you can do that by cloning the repository using Git.
Replace `<directory>` with your project’s name, e.g. `rmuif` or `react-material-ui-firebase`.

```
git clone https://github.com/phoqe/rmuif.git <directory>
```

### Install dependencies

Let’s make sure you’re inside your project’s root directory, replace `<directory>` with your project’s name.

```
cd <directory>
```

Now that you’re inside your project, you can use Yarn, which is the default package manager for this project, to install the dependencies:

```
yarn
```

### Test template

That’s basically it, for the base template.
Run this command to get it up and running to make sure everything’s working:

```
yarn start
```

### Configure template

The home for your project’s configuration lies in the `package.json` file.
Look for the `config` object, it houses properties that are self-explanatory.
You can add your own properties by modifying the `package.json` and `.env` files.

Remember that updates to the configuration requires restarting the development server.

### [Create a Firebase project](https://firebase.google.com/docs/web/setup#create-firebase-project)

### [Register your app with Firebase](https://firebase.google.com/docs/web/setup#register-app)

### [Firebase config object](https://firebase.google.com/docs/web/setup#config-object)

Place your Firebase config object under the `firebase` object in the `package.json` file.
Your Firebase credentials are public, access to your project is controlled through security rules.

### [Create a Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart#create)

### Cloud Firestore Security Rules

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

### [Create a default Storage bucket](https://firebase.google.com/docs/storage/web/start#create-default-bucket)

### Cloud Storage Security Rules

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

## Support

If you are experiencing an issue directly related to the project itself, you should create an issue using the bug report template.
However if you have any issues setting up the template you are welcome to either send an e-mail to [phoqe@phoqe.dev](mailto:phoqe@phoqe.dev) or join the [Discord channel](https://discord.gg/PdRYuHW).
Please keep discussions regarding this project in the #rmuif channel, thank you.

## Sponsor

If you want to provide monetary support, you’re welcome to do so. It is never required but greatly appreciated.
You can use my [GitHub Sponsors link](https://github.com/sponsors/phoqe) to donate directly via GitHub or you can contact me at [phoqe@phoqe.dev](mailto:phoqe@phoqe.dev) if you want to use another way.

## Attribution

| Image                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Name         | Description                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="https://browserstack.com"><img src="https://p14.zdusercontent.com/attachment/1015988/w1rTv9BV42bGKWAEdOOH0jyWu?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..1j02V7lb9BSm4tAQIuOOMw.FFMfm49EsVQDC0GxjH8kTd4HpJjURmpA7sATf2zcuN07PZK6DMhREVEEXqgVEwwXfCHmnkpvgv5sYNXpUyiyAOvoO6eE_UcMnXjPC8a3q6fDLjJHzxLVRx93OBr_AFzAf6Gnt5s93rEnN1Fjvqsn7sRItZbgQQLZ_M_7xnl_QHyhpn3zYSFt35mTwObGggMaJ6mBpZNI-72SJKZtzoEPb1hNaM97MTUFEAbdxQL2n_DFieJFyNDkBNeIDHUmG4TFrmHhwucxv9j3V6UIJikDFS97CrueA-jUnkRS_HY-JDA.ti_ZX5qRJwKWcqUewhZGgA" width="300"></a> | BrowserStack | Instant access to 2000+ browsers and real iOS and Android devices for cross browser testing.                                                                                                    |
| <a href="https://jetbrains.com"><img src="https://user-images.githubusercontent.com/7033377/64803713-a7925180-d58d-11e9-94a4-54bcdd9023e6.png" width="300"></a>                                                                                                                                                                                                                                                                                                                                                                                            | JetBrains    | JetBrains is a cutting-edge software vendor specializing in the creation of intelligent development tools, including IntelliJ IDEA – the leading Java IDE, and the Kotlin programming language. |

## License

[MIT License](https://github.com/phoqe/react-material-ui-firebase/blob/master/LICENSE.md)
