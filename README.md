# React + Material-UI + Firebase

[![Build Status](https://travis-ci.org/Phoqe/react-material-ui-firebase.svg?branch=master)](https://travis-ci.org/Phoqe/react-material-ui-firebase)
[![Discord](https://img.shields.io/discord/567707014361513995.svg)](https://discord.gg/y3EMyrN)
![GitHub repo size](https://img.shields.io/github/repo-size/Phoqe/react-material-ui-firebase.svg)
[![Website](https://img.shields.io/website/https/phoqe.me/react-material-ui-firebase.svg)](https://phoqe.me/react-material-ui-firebase)

This project is an application skeleton for a typical [React](https://reactjs.org) project.
With [Create React App](https://facebook.github.io/create-react-app) at its core, you can use it to bootstrap your projects and development environment with the same tooling.
It comes bundled with [Material-UI](https://material-ui.com), [Firebase](https://firebase.google.com) and [React Router](https://reacttraining.com/react-router).

<p align="center">
  <img src="https://user-images.githubusercontent.com/7033377/62852357-794cf800-bce9-11e9-8e0c-08774c616970.png" alt="Preview">
</p>

## Features

- Bootstrapped with Create React App, the same tooling works out-of-the-box
- Scaffolding incorporates Google Material Design principles through Material-UI
- Built on top of Firebase with Analytics, Authentication, Cloud Firestore, Cloud Functions, Storage and Performance Monitoring working from the start
- Robust routing with React Router including error handling
- Extensive mobile support with full-screen dialogs and [react-swipeable-views](https://react-swipeable-views.com) for tabs

## Demo

The demo is using the `master` branch, which houses the latest version of the template.

https://phoqe.me/react-material-ui-firebase

## Get started

The project is up and running after just 4 commands.

### Clone the repository

The command `git clone` is a [Git](https://www.git-scm.com) command-line utility which is used to target an existing repository and create a clone, or copy of the target repository.
The `<directory>` option is the name of a new directory to clone into, replace it with your project’s name.
The “humanish” part of the source repository is used if no directory is explicitly given (`repo` for `/path/to/repo.git` and `foo` for `host.xz:foo/.git`).

```
git clone https://github.com/Phoqe/react-material-ui-firebase.git <directory>
```

### Install the dependencies

The command `cd`, also known as `chdir` (**ch**ange **dir**ectory), is a command-line OS shell command used to change the current working directory.
The `<directory>` option is the name of the new working directory, replace it with your project’s name.

```
cd <directory>
```

The command `yarn install` is a [Yarn](https://yarnpkg.com) command-line utility which is used to install all dependencies for a project.
This is most commonly used when you have just checked out code for a project, or when another developer on the project has added a new dependency that you need to pick up.

```
yarn install
```

### Run the app

The command `yarn start` is another Yarn command-line utility which is used to run the app in development mode.
Open http://localhost:3000 to view it in the browser.
The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

```
yarn start
```

## Make it yours

React + Material-UI + Firebase is a boilerplate for your own project.
It wouldn’t make sense if you couldn’t customize it to the core.

### Create Firebase project

You need to create a Firebase project to connect to your app.

1. In the [Firebase console](https://console.firebase.google.com), click **Add project**, then select or enter a **Project name**.
If you have an existing Google Cloud Platform (GCP) project, you can select the project from the dropdown menu to add Firebase resources to that project.
2. *(Optional)* If you created a new project, you can edit the **Project ID**.
Firebase automatically assigns a unique ID to your Firebase project.
Visit [Understand Firebase Projects](https://firebase.google.com/docs/projects/learn-more#project-id) to learn about how Firebase uses the project ID.
3. Click **Continue**.
4. *(Optional)* Set up Google Analytics for your project.
When prompted, select to use an existing [Google Analytics account](https://support.google.com/analytics/answer/1009618?ref_topic=3544906&authuser=0) or to create a new account.
If you choose to create a new account, select your [Analytics reporting location](https://firebase.google.com/docs/projects/locations), then accept the data sharing settings and Google Analytics terms for your project.
5. Click **Create project** (or **Add Firebase**, if you’re using an existing GCP project).

Firebase automatically provisions resources for your Firebase project.
When the process completes, you’ll be taken to the overview page for your Firebase project in the Firebase console.

### Create a Cloud Firestore database

1. From the console’s navigation pane, select **Database**, then click **Create database** for Cloud Firestore.
2. Select a starting mode for your Cloud Firestore Security Rules.
**Test mode** is good for getting started with the mobile and web client libraries, but allows anyone to read and overwrite your data.
After testing, **make sure to review the [Secure your data](https://firebase.google.com/docs/firestore/quickstart#secure_your_data) section**.
**Locked mode** denies all reads and writes from mobile and web clients.
Your authenticated application servers (C#, Go, Java, Node.js, PHP, Python, or Ruby) can still access your database.
To get started with the C#, Go, Java, Node.js, PHP, Python, or Ruby server client library, select locked mode.
3. Select a [location](https://firebase.google.com/docs/firestore/locations#types) for your database.
This location setting is your project’s [default Google Cloud Platform (GCP) resource location](https://firebase.google.com/docs/firestore/locations#default-cloud-location).
Note that this location will be used for GCP services in your project that require a location setting, specifically, your default [Cloud Storage](https://firebase.google.com/docs/storage) bucket and your [App Engine](https://cloud.google.com/appengine/docs) app (which is required if you use Cloud Scheduler).
If you aren’t able to select a location, then your project already has a default GCP resource location.
It was set either during project creation or when setting up another service that requires a location setting.
4. Click **Done**.

#### Deploying rules

To set up and deploy your first set of rules, open the [**Rules** tab](https://console.firebase.google.com/project/_/database/firestore/rules) in the Cloud Firestore section of the Firebase console.
Copy the contents of the `firestore.rules` file in your project into the online editor, then click **Publish**.

### Create a default Storage bucket

1. From the navigation pane of the [Firebase console](https://console.firebase.google.com), select **Storage**, then click **Get started**.
2. Review the messaging about securing your Storage data using security rules.
During development, consider [setting up your rules for public access](https://firebase.google.com/docs/storage/web/start#set_up_public_access).
3. Select a [location](https://firebase.google.com/docs/projects/locations#types) for your default Storage bucket.
This location setting is your project’s [default Google Cloud Platform (GCP) resource location](https://firebase.google.com/docs/firestore/locations#default-cloud-location).
Note that this location will be used for GCP services in your project that require a location setting, specifically, your [Cloud Firestore](https://firebase.google.com/docs/firestore) database and your [App Engine](https://cloud.google.com/appengine/docs) app (which is required if you use Cloud Scheduler).
If you aren’t able to select a location, then your project already has a default GCP resource location.
It was set either during project creation or when setting up another service that requires a location setting.
If you’re on the Blaze plan, you can [create multiple buckets](https://firebase.google.com/docs/storage/web/start#use_multiple_storage_buckets), each with its own [location](https://cloud.google.com/storage/docs/bucket-locations).
4. Click **Done**.

#### Deploying rules

To set up and deploy your first set of rules, open the [**Rules** tab](https://console.firebase.google.com/project/_/storage/rules) in the Storage section of the Firebase console.
Copy the contents of the `storage.rules` file in your project into the online editor, then click **Publish**.

### Register your app with Firebase

After you have a Firebase project, you can add your web app to it.

1. In the center of the [Firebase console’s project overview page](https://console.firebase.google.com), click the **Web** icon to launch the setup workflow.
If you’ve already added an app to your Firebase project, click **Add app** to display the platform options.
2. Enter your app’s nickname.
This nickname is an internal, convenience identifier and is only visible to you in the Firebase console.
3. *(Optional)* Set up Firebase Hosting for your web app.
You can set up Firebase Hosting now or [later](https://firebase.google.com/docs/hosting/quickstart).
You can also link your Firebase Web App to a Hosting site at any time in your [Project settings](https://console.firebase.google.com/project/_/settings/general).
If you choose to set up Hosting up now, select a site from the dropdown list to link to your Firebase Web App.
This list displays your project’s default Hosting site and any [other sites](https://firebase.google.com/docs/hosting/multisites) that you’ve set up in your project.
Any site that you’ve already linked to a Firebase Web App is unavailable for additional linking.
Each Hosting site can only be linked to a single Firebase Web App.
4. Click **Register app**.

### Configure your project

To initialize Firebase in your app, you need to provide your app’s Firebase project configuration.
The Firebase config object contains unique, but non-secret identifiers for your Firebase project.
At any time, you can [obtain your Firebase config object](http://support.google.com/firebase/answer/7015592).

Your Firebase config object looks something like this:

```
apiKey: "api-key",
authDomain: "project-id.firebaseapp.com",
databaseURL: "https://project-id.firebaseio.com",
projectId: "project-id",
storageBucket: "project-id.appspot.com",
messagingSenderId: "sender-id",
appId: "app-id",
measurementId: "G-measurement-id"
```

Replace the values of properties beginning with `REACT_APP_FIREBASE` in the `.env` file in your project with the matching Firebase identifier.
If your Firebase config object looked like the one above, the Firebase section in your `.env` file will look like this:

```
REACT_APP_FIREBASE_API_KEY=api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=project-id.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://project-id.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=sender-id
REACT_APP_FIREBASE_APP_ID=app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=G-measurement-id
```

### Add Firebase Extension

For account deletion to fully work you need to add a Firebase Extension to your Firebase project.
The extension called [Delete User Data](https://firebase.google.com/products/extensions/delete-user-data) will remove any references to the deleted account, i.e. Cloud Firestore and Storage references.

Use `users/{UID}` for Cloud Firestore paths and `{DEFAULT}/images/avatars/{UID}` for Cloud Storage paths.

### Change name and URL

Changing your project’s name can be tedious sometimes as it often involves changing the name of both files and directories along with a ton of hard-coded values.
With this template, you can change your project’s name by modifying 3 files:

- **public/**
  - manifest.json
    - `name`
    - `short_name`
- .env
    - `REACT_APP_NAME`
- package.json
  - `name`
  - `homepage`

### Use your own Git repository

The command `git remote` is another Git command-line utility which is used to manage the set of repositories (“remotes”) whose branches you track.
The options `rm origin` is used to remove the remote named `origin`.
All remote-tracking branches and configuration settings for the remote are removed.

```
git remote rm origin
```

The options `add origin` adds a remote named `origin` for the repository at `<url>`.

```
git remote add origin <url>
```

The options `add upstream` adds a remote named `upstream` for the repository at `https://github.com/Phoqe/react-material-ui-firebase.git`.

```
git remote add upstream https://github.com/Phoqe/react-material-ui-firebase.git
```

The command `git push` is yet another Git command-line utility which is used to update remote refs using local refs, while sending objects necessary to complete the given refs.

```
git push -u origin master
```

## Attribution

|Logo|Name|Description|
|---|---|---|
|<a href="https://jetbrains.com"><img src="https://user-images.githubusercontent.com/7033377/64803713-a7925180-d58d-11e9-94a4-54bcdd9023e6.png" width="300"></a>|JetBrains|The maintainers use [JetBrains](https://www.jetbrains.com)’ tools to maintain and develop new features for the project. Their [Open Source Support Program](https://www.jetbrains.com/community/opensource) gives us the ability to use their tools for free to improve upon this project.|
|<a href="https://browserstack.com"><img src="https://p14.zdusercontent.com/attachment/1015988/w1rTv9BV42bGKWAEdOOH0jyWu?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..1j02V7lb9BSm4tAQIuOOMw.FFMfm49EsVQDC0GxjH8kTd4HpJjURmpA7sATf2zcuN07PZK6DMhREVEEXqgVEwwXfCHmnkpvgv5sYNXpUyiyAOvoO6eE_UcMnXjPC8a3q6fDLjJHzxLVRx93OBr_AFzAf6Gnt5s93rEnN1Fjvqsn7sRItZbgQQLZ_M_7xnl_QHyhpn3zYSFt35mTwObGggMaJ6mBpZNI-72SJKZtzoEPb1hNaM97MTUFEAbdxQL2n_DFieJFyNDkBNeIDHUmG4TFrmHhwucxv9j3V6UIJikDFS97CrueA-jUnkRS_HY-JDA.ti_ZX5qRJwKWcqUewhZGgA" width="300"></a>|BrowserStack|[BrowserStack](https://browserstack.com) is being used for its powerful suite of testing tools. With it we can test the project on multiple devices and browsers in real-time.|

Portions of this page are modifications based on work created and [shared by Google](https://developers.google.com/readme/policies) and used according to terms described in the [Creative Commons 4.0 Attribution License](https://creativecommons.org/licenses/by/4.0).

## License

React + Material-UI + Firebase is open-source software [licensed as MIT](https://github.com/Phoqe/react-material-ui-firebase/blob/master/LICENSE.md).
