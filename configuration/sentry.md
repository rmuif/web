# Sentry

Sentry is a great help for when you want to put your app into the hands of your users. It’s like Firebase Crash Reporting, but for the web. Errors that users may experience are sent to your account immediately and automatically.

## [Sign up for an account](https://sentry.io/signup)

Get things off the ground with Sentry’s free plan, and when you're ready to expand usage you can simply pay as you go.

## Configure the SDK

After you completed setting up a project in Sentry, you’ll be given a value which we call a DSN, or Data Source Name. It looks a lot like a standard URL, but it’s actually just a representation of the configuration required by the Sentry SDKs. It consists of a few pieces, including the protocol, public key, the server address, and the project identifier.

You can set the DSN for your project in the `config` object of `package.json`, just replace `https://<key>@sentry.io/<project>` with your own DSN:

{% tabs %}
{% tab title="package.json" %}
```javascript
"sentry": {
  "dsn": "https://<key>@sentry.io/<project>"
}
```
{% endtab %}
{% endtabs %}

## Capturing your first event

Once you have Sentry integrated into your project, you probably want to verify that everything is working as expected before deploying it, and what better way to do that than to break your application!

One way to break your JavaScript application is to call an undefined function:

```javascript
myUndefinedFunction();
```

You can verify the function caused an error by checking your browser console.

