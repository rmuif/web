# Installation

It’s easy to setup RMUIF but can be a bit time consuming considering you’ll want to setup Firebase and Sentry.

## Get the files

The first step is to get all the files for the base template, there are many ways to do this depending on what method you prefer.

### Use the Create React App template

You can use the CRA command-line tool to initialize a new React app using the RMUIF template, this is the easiest way to get started.

```bash
npx create-react-app <directory> --template rmuif
```

### Use your own GitHub repository

This is the recommended way to setup RMUIF if you’re going to use GitHub for your project, and it’s very simple:

1. Click “Use this template” on this repository’s page on GitHub or use this [link](https://github.com/phoqe/rmuif/generate). This will generate a repository based on RMUIF for you, so you don’t have to worry about that after cloning.
2. Fill in your repository’s name, description, and any GitHub apps you want to include. We recommend using [Dependabot](https://dependabot.com) to keep all of your packages updated, although packages used by RMUIF will be automatically updated once you pull down changes from the upstream.
3. Proceed with “Clone this repository” but replace `https://github.com/phoqe/rmuif.git` with your newly created repository’s URL.

### Clone this repository

You can clone this repository using `git` to get all the files you need, replace `<directory>` with your project’s name, e.g. `rmuif` or `react-material-ui-firebase`.

{% tabs %}
{% tab title="git" %}
```bash
git clone https://github.com/phoqe/rmuif.git <directory>
```
{% endtab %}

{% tab title="degit" %}
```bash
npx degit phoqe/rmuif <directory>
```
{% endtab %}
{% endtabs %}

This will download all the files to a folder named whatever you set the `<directory>` option to, e.g. `rmuif` if you used that in lieu of `<directory>`.

## Install required dependencies

First, let’s make sure we’re inside of the directory, so run this command as well, and don’t forget to use your project’s name:

```bash
cd <directory>
```

Now that you have all the required files and is inside your project’s directory we can install the required dependencies. You have the option to use either npm or yarn, make sure you stay consistent once you have have chosen which one to use.

{% tabs %}
{% tab title="npm" %}
```bash
npm install
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn install
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
This will install all dependencies used by RMUIF, including development tools. Depending on your package manager, they might generate a file called a lockfile, e.g. `package-lock.json` or `yarn.lock`. It is safe to commit this file.
{% endhint %}

## Test the template

That’s basically it, for the installation that is. We need to make sure everything’s working, to do that you can bring the template up on a web server using:

{% tabs %}
{% tab title="npm" %}
```bash
npm start
```
{% endtab %}

{% tab title="yarn" %}
```text
yarn start
```
{% endtab %}
{% endtabs %}

If everything’s working as it should, you’re ready to start configuring the template. Bear in mind that the app you just started is using a test project maintained by RMUIF, data is cleared from time to time.

