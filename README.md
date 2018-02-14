# Cordova Recaptcha Plugin

This is a cordova plugin to perform Google reCAPTCHA verify on Android using the android SafetyNet package.

## Installation
```
cordova plugin add https://bitbucket.org/packt-internal/cordova-plugin-recaptcha.git
```

__note:__ The plan is to publish this to the @packt npm org, however cordova-cli doesn't currently 
support scoped plugins, [see Issue CB-12774](https://issues.apache.org/jira/browse/CB-12774).

## Usage

```
window.plugins.recaptcha.verify('site-key', success_callback, fail_callback);
```
Calls the API passing your site key.

If successful the success callback is called with the reCAPTCHA response token as its only parameter.
If unsuccessful the fail callback is called with the error.

### From Angular1
The plugin registers the module 'cordova.recaptcha' if it finds the angular global variable.
The module registers the service '$cordovaRecaptcha'.

Add 'cordova.recaptcha' to your module's dependencies.

Then inject the service where you need it and use:
```
$cordovaRecaptcha.verify('site-key')
	.then(function(responseToken) {
		// Do what you need to with responseToken
	})
	.catch(function(error) {
		// Do what you need to with the error
	});
```


## A note on iOS
This solution will only work on android. For iOS you can use a web-based reCAPTCHA using the [Ionic Webview](https://github.com/ionic-team/cordova-plugin-ionic-webview).

Provided the reCAPTCHA's domains to check includes 'localhost' and your app's config.xml includes:
```
<allow-navigation href="https://www.google.com/recaptcha/*" />
```
