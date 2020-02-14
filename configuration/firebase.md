# Firebase

Firebase is an integral part of the template with most of their products used in one place or another. The most used products are [Authentication](https://firebase.google.com/products/auth) and [Cloud Firestore](https://firebase.google.com/products/firestore), and the best thing is that it’s free.

The biggest learning curve with Firebase and its database layer is the security rules, but you don’t have to worry about them just yet because we’ve got you covered with the basics of the base template.

Alright, let’s get into creating your own Firebase project.

## Create a Firebase project

A Firebase project is the top-level entity for Firebase. In your project, you can add Firebase apps that can be iOS, Android, or Web apps. After you configure your apps to use Firebase, you can then add the Firebase SDKs for any number of Firebase products, like Analytics, Cloud Firestore, Performance Monitoring, or Remote Config.

1. In the [Firebase console](https://console.firebase.google.com), click ”Add project“, then select or enter a ”Project name“. If you have an existing Google Cloud Platform \(GCP\) project, you can select the project from the dropdown menu to add Firebase resources to that project.
2. If you are creating a new project, you can edit the ”Project ID“.
3. Click ”Continue“.
4. Set up Google Analytics for your project.
5. Click ”Create project“ \(or ”Add Firebase“, if you’re using an existing GCP project\). Firebase automatically provisions resources for your Firebase project. When the process completes, you’ll be taken to the overview page for your Firebase project in the Firebase console.

## Register your app with Firebase

After you have a Firebase project, you can add your web app to it.

1. In the center of the [Firebase console’s project overview page](https://console.firebase.google.com), click the ”Web“ icon to launch the setup workflow. If you’ve already added an app to your Firebase project, click ”Add app“ to display the platform options.
2. Enter your app’s nickname. This nickname is an internal, convenience identifier and is only visible to you in the Firebase console.
3. Click ”Register app“.

## Firebase config object

To initialize Firebase in your app, you need to provide your app’s Firebase project configuration.

```javascript
var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};
```

{% hint style="info" %}
If you enable new Firebase services in your Firebase project after creating your Firebase Web App \(especially Cloud Storage or Google Analytics\), make sure to update your Firebase config object in your app.
{% endhint %}

At any time, you can [obtain your Firebase config object](http://support.google.com/firebase/answer/7015592).

When you’ve retrieved your Firebase config object you need to replace the default one with your own. If the code above was your config, the `firebase` object in `config` of `packge.json` would look like this:

{% tabs %}
{% tab title="package.json" %}
```javascript
"firebase": {
  "apiKey": "api-key",
  "authDomain": "project-id.firebaseapp.com",
  "databaseUrl": "https://project-id.firebaseio.com",
  "projectId": "project-id",
  "storageBucket": "project-id.appspot.com",
  "messagingSenderId": "sender-id",
  "appId": "app-id",
  "measurementId": "G-measurement-id"
}
```
{% endtab %}
{% endtabs %}

## Enable Email/Password sign-in

You can use Firebase Authentication to allow users to sign in to your app using one or more sign-in methods, including email address and password sign-in, and federated identity providers such as Google Sign-in and Facebook Login.

1. In the Firebase console, open the ”Auth“ section.
2. On the ”Sign in method“ tab, enable the ”Email/password“ sign-in method and click ”Save“.

## Create a Cloud Firestore database

Cloud Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform. Like Firebase Realtime Database, it keeps your data in sync across client apps through realtime listeners and offers offline support for mobile and web so you can build responsive apps that work regardless of network latency or Internet connectivity. Cloud Firestore also offers seamless integration with other Firebase and Google Cloud Platform products, including Cloud Functions.

1. From the console's navigation pane, select ”Database“, then click ”Create database“ for Cloud Firestore.
2. Select a starting mode for your Cloud Firestore Security Rules. It doesn’t matter which mode you select as you will be replacing the default security rules.
3. Select a [location](https://firebase.google.com/docs/firestore/locations#types) for your database.
4. Click ”Done“.

{% hint style="info" %}
When you enable Cloud Firestore, it also enables the API in the [Cloud API Manager](https://console.cloud.google.com/projectselector/apis/api/firestore.googleapis.com/overview).
{% endhint %}

### Secure your data

Modify your security rules in ”Rules“ on the console:

```javascript
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

## Create a default Storage bucket

Cloud Storage for Firebase lets you upload and share user generated content, such as images and video, which allows you to build rich media content into your apps. Your data is stored in a [Google Cloud Storage](https://cloud.google.com/storage) bucket, an exabyte scale object storage solution with high availability and global redundancy. Cloud Storage lets you securely upload these files directly from mobile devices and web browsers, handling spotty networks with ease.

1. From the navigation pane of the Firebase console, select ”Storage“, then click ”Get started“.
2. Review the messaging about securing your Storage data using security rules.
3. Select a [location](https://firebase.google.com/docs/projects/locations#types) for your default Storage bucket.
4. Click ”Done“.

### Secure your data

Modify your security rules in ”Rules“ on the console:

```javascript
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

{% hint style="info" %}
Portions of this page are modifications based on work created and [shared by Google](https://developers.google.com/readme/policies) and used according to terms described in the [Creative Commons 4.0 Attribution License](https://creativecommons.org/licenses/by/4.0).
{% endhint %}

