# Roles

RMUIF has a role-based access system that is accessible throughout the app through the authentication service. There are two roles in addition to no roles by default, the administrator and premium role.

Users with the administrator role can override user ownership permissions, e.g. change other users’ data and have access to the special `/admin` route.

The premium role doesn’t do anything specific at the moment, it just serves as a placeholder which you can use for inspiration or even use it for your own ”premium“ tiers in your app.

## Check if user has role

You can easily check if the user has a role attached to them by using the authentication service API:

```javascript
import authentication from "../../services/authentication";

authentication
  .getRoles()
  .then(value => {
    console.log(value);
  })
  .catch(reason => {
    const code = reason.code;
    const message = reason.message;

    switch (code) {
      default:
        this.openSnackbar(message);
        return;
    }
  });
```

## Set role for user

The Firebase Admin SDK supports defining custom attributes on user accounts. This provides the ability to implement various access control strategies, including role-based access control, in Firebase apps. These custom attributes can give users different levels of access \(roles\), which are enforced in an application's security rules.

User roles can be defined for the following common cases:

* Giving a user administrative privileges to access data and resources.
* Defining different groups that a user belongs to.
* Providing multi-level access:
* Differentiating paid/unpaid subscribers.
* Differentiating moderators from regular users.
* Teacher/student application, etc.
* Add an additional identifier on a user. For example, a Firebase user could map to a different UID in another system.

Setting a role for a user requires using the Firebase Admin SDK, luckily for you it is already setup in the `/admin` directory, although you will need to [initialize the SDK](https://firebase.google.com/docs/admin/setup#initialize-sdk).

If you haven’t used it before you need to install the dependencies:

{% tabs %}
{% tab title="npm" %}
```javascript
npm install
```
{% endtab %}

{% tab title="yarn" %}
```javascript
yarn install
```
{% endtab %}
{% endtabs %}

This code sets the role `admin` to the user with the UID `test`:

{% tabs %}
{% tab title="index.js" %}
```javascript
const setRoles = (uid, roles) => {
  auth.setCustomUserClaims(uid, {
    roles: roles
  }).then((value) => {
    console.log(`${uid}: ${roles}`);
  }).catch((reason) => {
    console.log(reason);
  });
};

setRoles("test", ["admin"]);
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
Custom claims can contain sensitive data, therefore they should only be set from a privileged server environment by the Firebase Admin SDK.
{% endhint %}

## Add new role

Adding new roles can be a bit complicated if you’re not used to using security rules with Firebase, but it depends on what you want your role to restrict or grant access to. You can read more about adding new roles in [Control Access with Custom Claims and Security Rules](https://firebase.google.com/docs/auth/admin/custom-claims).

{% hint style="info" %}
Portions of this page are modifications based on work created and [shared by Google](https://developers.google.com/readme/policies) and used according to terms described in the [Creative Commons 4.0 Attribution License](https://creativecommons.org/licenses/by/4.0).
{% endhint %}

