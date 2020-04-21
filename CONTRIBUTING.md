# Contribution Guidelines

Welcome to the first step of your journey to becoming a contributor to RMUIF! This project is significant, and we need all the help we can get.

The app’s primary goal is to provide a starting point for apps that is secure, fast, and pleasing to the eye. It is necessary to consider these rudimentary points when contributing to RMUIF.

## Code of Conduct

Use common sense when interacting with people in this project; there is nothing else to be said.

## Submitting an issue

There are some rules you need to abide by to speed up the process of reporting and triaging issues. For example, if you don’t follow the bug report template when reporting a bug, there’s a chance that it’s deprioritized or dismissed.

### Reporting a bug

If you’ve found a bug within the project, use the [Bug report](https://github.com/rmuif/web/issues/new?template=bug_report.md) template when submitting an issue on GitHub. Following the template helps contributors to identify the bug and fix it more easily.

Bug reports that don’t follow the template might be dismissed, edited, and deprioritized.

### Requesting a feature

Is something missing from the project that you want to see added in the next version? Submit an issue using the [Request a feature](https://github.com/rmuif/web/issues/new?template=feature_request.md) template, and we’ll consider it.

Again, following the template is paramount to getting your issue prioritized.

### Something else

The issue tracker on GitHub is currently only supporting the templates above and not anything else.

If you’ve got an inquiry that does not fit the template, use the [Discord server](https://discord.gg/5Ann5C3). That is the primary channel for external communication and the quickest way to get help as we’re very active on there.

## Submitting a pull request

Pull requests are always welcome, however trivial, given that they correct a sensible issue or add something relevant to the project.

We recommend submitting an issue before a pull request.

### Branch your work

The `master` branch contains the latest released version of the template and not used for development. Instead, it would be best if you targeted the `dev` branch. It holds the code for the next version.

We recommend creating a feature branch based on the development branch as per the [Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

### Code style

All JavaScript projects maintained by RMUIF use the opinionated code formatting tool called [Prettier](https://prettier.io).

Prettier automatically formats commits in the development branch. We won’t accept code that is not formatted by Prettier.

### Peer-reviewed design

Whenever a pull request changes the design and structure of the app, additional time is required to review it. We try to adhere to the [Material Design specifications](https://material.io/design) except for when it is incomplete. In such cases, we rely on our own experience and knowledge of design to try and stay as accurate as can be to Material Design principles.
