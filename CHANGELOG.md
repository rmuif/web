# Changelog

## v1.0

The initial version of React + Material-UI + Firebase features basic authentication and routing.
There’s not much to it but certainly room for improvement.

## v2.0

The second major version of React + Material-UI + Firebase contains general improvements,
bug fixes, and some new features. The primary focus of this update was to refactor the `App` component
and move dialog visibility management into a separate component `DialogHost`.

All dialogs have been remade from the ground up and there’s some new templates to base your own dialogs on,
namely `AlertDialog`, `ConfirmationDialog`, and `SimpleDialog`.

Theming is now synced with the signed in user and persists across every session where the user is signed in.
Changing the theme on one browser will change the theme in another, assuming the same user is signed in.

The folder structure has been reorganized to be more accessible and easier to browse. You can now import
components without having to dig through their folder because of the newly added `index.js` file in every component
folder.

Authentication, theming, colors, and more have been moved into separate files in an effort to refactor `App`.
Firebase is now referenced and initialized from `firebase.js`.

Most things have been changed and it is recommended to update to v2.0 as soon as possible as there are
security vulnerabilities that have been fixed.
