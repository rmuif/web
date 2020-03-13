# Contributing

Welcome to the first step of your journey to become a contributor for RMUIF! This is a big project and we need all the help we can get. The template’s main goal is to provide a starting-point for apps that is secure, fast, and pleasing to the eye. It is important to take these rudimentary points into consideration when contributing to RMUIF.

## Creating an issue

There are some rules you need to follow to speed up the process of reporting and triaging issues. For example, if you do not follow the bug report template when reporting a bug, there’s a chance that it will be deprioritized or dismissed.

### Reporting a bug

If you’ve found a bug with the project itself, use the [Report a bug](https://github.com/rmuif/web/issues/new?template=bug_report.md) template when creating an issue on GitHub. Following the template will help contributors to more easily identify the bug and fix it. Bug reports that don’t follow the template might be dismissed, edited, and deprioritized.

### Suggesting a feature

Is something missing from the project that you want to see in the next version? Create an issue using the [Request a feature](https://github.com/rmuif/web/issues/new?template=feature_request.md) template and we’ll consider it. Again, following the template is paramount to getting your issue prioritized.

### Something else

The issue tracker on GitHub is currently only supporting the templates above and should not be used for anything else. If you’ve got an inquiry that does not fit the template, use the [Discord server](https://discord.gg/5Ann5C3). This is the main channel for external communication and the quickest way to get help as we’re very active on there.

If we receive multiple inquiries concerning the same category, we might add it as a template on GitHub. If you think a template is missing, don’t hesitate contacting us and we’ll consider adding it.

## Creating a pull request

Pull requests are always welcome, given that they fix a sensible issue or add something relevant. In most cases, it’s recommended an issue is created first before creating a pull request, that way we can discuss it further and manage it more easily. Also, if an issue is closed before a pull request is submitted, we won’t waste anyone’s time.

### Use the `develop` branch

The `master` branch contains the production ready version of RMUIF, i.e. the latest released version of the template. The final step of the release process is to merge `release` into `master`. Therefore, development in all forms, must take place in the `develop` branch.

### Code style

We use [Prettier]() when developing RMUIF. Users of the template can choose whatever coding style they want. It is important that the code you commit follows Prettier, we have setup hooks for styling your code when you create a commit, you should be fine already but if the code is not properly formatted, we will not accept it into RMUIF.

### Peer-reviewed design

Whenever a PR changes something related to the design and structure of the app, it will take some time to review it. We will try to adhere to Material Design principles in all cases, except for when the specification is incomplete for that particular case. In such cases, we will rely on our own experience and knowledge of design to try and stay as true as can be to Material Design.
