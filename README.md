<p align="center">
    <img src="https://repository-images.githubusercontent.com/336133471/01ea1b91-c6bb-4fae-a9a6-94e3fb661f85" alt="node-ray" height="450" style="block">
</p>

<p align="center">
    <img src="https://img.shields.io/github/actions/workflow/status/permafrost-dev/node-ray/run-tests.yml?branch=main&label=tests&logo=github&style=flat-square&nocache=1" alt="test status">
    <img src="https://shields.io/npm/v/node-ray?style=flat-square" alt="npm version">
    <img src="https://shields.io/github/license/permafrost-dev/node-ray?style=flat-square" alt="license">
    <br>
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/permafrost-dev/node-ray?color=%234c1&label=coverage&logo=codecov&logoColor=%23ef6f6f&style=flat-square&token=YW2BTKSNEO" alt="codecov">
    <img alt="tech debt" src="https://img.shields.io/codeclimate/tech-debt/permafrost-dev/node-ray?label=tech%20debt&logo=codeclimate&style=flat-square">
    <img src="https://img.shields.io/codeclimate/maintainability/permafrost-dev/node-ray?logo=codeclimate&style=flat-square" /> 
    <br>
    <br>
    <img src="https://bestpractices.coreinfrastructure.org/projects/6837/badge" alt="best practuices">
    <img src="https://badgen.net/github/dependabot/permafrost-dev/node-ray?style=flat-square" alt="dependabot status">
    <br>
    <img src="https://img.shields.io/npm/dt/node-ray.svg?style=flat-square&logo=npm&logoColor=white" alt="npm downloads">
    <img alt="jsDelivr hits (npm)" src="https://img.shields.io/jsdelivr/npm/hm/node-ray?logo=jsdelivr&logoColor=%23fff&style=flat-square">
    <!--img src="https://data.jsdelivr.com/v1/package/npm/node-ray/badge?style=flat-square" alt="cdn downloads"-->
</p>

# node-ray
### The official javascript, TypeScript, and NodeJS integration for Ray. 

The package can be installed in any NodeJS, ES6+, or TypeScript application to send messages to the [Ray app](https://myray.app).

<br>

> **It is recommended that you immediately update to v1.20.11 or higher.**
> 
> **Versions 1.19.6 through 1.20.10 are broken and will not function correctly.**


## Installation

Install with npm:

```bash
npm install node-ray
```

or yarn:

```bash
yarn add node-ray
```

## Available environments

`node-ray` offers several variants to allow you to use it in either NodeJS or Browser environments.

>If you're using NextJs/React, take a look at [permafrost-dev/react-ray](https://github.com/permafrost-dev/react-ray).
>
>If you're using Vue, check out [permafrost-dev/vue-ray](https://github.com/permafrost-dev/vue-ray).

### NodeJS

When using in a NodeJS environment (the default), import the package as you would normally:

```js
// es module import:
import { ray } from 'node-ray';

// commonjs import:
const ray = require('node-ray').ray;
```

### Browser bundle
When bundling scripts for use in a Browser environment _(i.e., using webpack)_, import the `/web` variant:

```js
// es module import:
import { ray } from 'node-ray/web';

// commonjs import:
const { ray } = require('node-ray/web');
```

### Browser standalone

> **Important Note** - As of version `1.20.6`, you should no longer include `axios` as a separate `<script>` tag.
> 
> It is now included in the standalone build.

`node-ray` may be directly used within a web page via a script tag. The standalone version includes all required libraries, **including** axios.

```html
<script src="https://cdn.jsdelivr.net/npm/node-ray@latest/dist/standalone.min.js"></script>
<script>
    window.ray = Ray.ray;
    window.Ray = Ray.Ray;
</script>
```
#### Recommended Standalone Initialization

As of version `1.20.3`, you may use the `rayInit()` method instead of manually assigning properties to the `window` global object.  `rayInit()` is simply a wrapper around the above method to provide a better developer experience as well as more succinct and readable code:

```html
<script src="https://cdn.jsdelivr.net/npm/node-ray@latest/dist/standalone.min.js"></script>
<script>
    rayInit(window);
    ray('hello world');
</script>
```

Regardless of the method used for initialization, the `ray()` helper function and the `Ray` class will now available in all scopes via the global window object.

### Laravel Mix

To use `node-ray` with Laravel Mix, include the following in `resources/js/bootstrap.js`:

```js
const { ray } = require('node-ray/web');

window.ray = ray;
```

Compile the bundle _(`npm run dev`)_as usual. After including `js/app.js` in your view, you may access `ray()` within your scripts.

### Laravel + Vite

To use `node-ray` with Laravel + Vite, include the following in `resources/js/bootstrap.js`:

```js
import { ray } from 'node-ray/web';

window.ray = ray;
```

`ray()` is immediately available to other scripts such as `app.js`, however note that `window.ray()` is NOT immediately available in `<script>` tags embedded in the view.

## Usage

Most of the API from the [original PHP package](https://github.com/spatie/ray) is supported. See the [api reference](https://spatie.be/docs/ray/v1/usage/reference) for more information.

```js
// es module import:
import { ray } from 'node-ray';

// commonjs import:
const { ray } = require('node-ray');
```

To modify the host or port:

```js
// make sure you import the Ray class (capital "R")
const { Ray, ray } = require('node-ray');

Ray.useDefaultSettings({ host: '127.0.0.1', port: 3000 });

// or just modify the port:
Ray.useDefaultSettings({ port: 3000 });

// ...and use ray() as normal
```

```js
ray('a string');

ray(['several', 'arguments'], 'can', {be: provided});

ray().table(['one two', {a: 100, b: 200, c: 300}, [9, 8, 7]]).blue();

ray().html('<em>large text</em>').large().green();

ray().image('https://placekitten.com/200/300');

ray().clearAll();

ray().disable(); // disable sending data to Ray at runtime

ray().xml('<one>11</one>'); // disabled, data not sent to Ray
```

## Configuration

### NodeJS config

_Note: This section only applies when using `node-ray` in the NodeJS environment, NOT a browser environment._

`node-ray` will search for `ray.config.js`, which should be in the project's root directory.

Using a configuration file is optional, and the package will use the default settings if no configuration file is specified.

_Example:_

```js
// ray.config.js

module.exports = {
    enable: true,
    host: 'localhost',
    port: 23517,
    scheme: 'http', //only change this if you know what you're doing!

    // calls to console.log() are redirected to Ray
    intercept_console_log: true,

    // determine the enabled state using the specified callback
    // the 'enable' setting is also considered when using this setting.
    enabled_callback: () => {
        return functionThatReturnsABoolean();
    },

    sending_payload_callback: (rayInstance, payloads) => {
        if (payloads[0].getType() === 'custom') {
            payloads[0].html += ' <strong>- modified!</strong>';
        }
    },

    sent_payload_callback: (rayInstance) => {
        // automatically make all payloads sent to Ray green.
        rayInstance.green();
    },
}
```

When running `node-ray` within a NodeJS environment, you may set the environment variable `NODE_ENV` to "production" or "staging" to disable sending data to Ray from calls to `ray()`.

### Browser config

This section only applies within a browser environment _(i.e., webpack)_.

You can configure `node-ray` by importing the `Ray` class and calling the `useDefaultSettings()` method.

```js
const { Ray, ray } = require('node-ray/web');

// set several settings at once:
Ray.useDefaultSettings({
    host: '192.168.1.20',
    port: 23517
});

// or set individual settings only:
Ray.useDefaultSettings({ port: 23517 });

// use ray() normally:
ray().html('<strong>hello world</strong>');
```

These settings persist across calls to `ray()`, so they only need to be defined once.

### Enabled state

If providing a callback for the `enabled_callback` setting _(a function that returns a boolean)_, payloads will only be sent to Ray if:

- the `enable` setting is set to `true`.
- the callback returns a value of `true`.

If either condition is `false`, then no payloads will be sent to Ray.

Set the `enabled_callback` setting to `null` or leave it `undefined` to consider the `enable` setting _(the default)_.

### Sending/sent payload callbacks

Specify the `sending_payload_callback` or `sent_payload_callback` settings to trigger a callback before _(sending)_ or after _(sent)_ sending a payload.

This feature is helpful when sending additional payloads or modifying all payloads _(i.e., changing the color)_.

## About

This package attempts to replicate the entire PHP API for Ray to provide a robust solution for debugging NodeJS projects.

## How is this different from `js-ray`?

This package is a more comprehensive implementation written in Typescript, and its primary use case is for NodeJS projects, although it also works within browser environments.

The codebase was translated to Typescript directly from [`spatie/ray`](https://github.com/spatie/ray).

As a result, `node-ray` implements most features in the original package; [`js-ray`](https://github.com/m1guelpf/ray-js) does not.

However, we did draw some inspiration for portions of the code from [`js-ray`](https://github.com/m1guelpf/ray-js).

## Using the package

See [using the package](docs/usage.md).

## Reference

| Call | Description |
| --- | --- |
| `ray(variable)` | Display a string, array or object |
| `ray(var1, var2, …)` | Ray accepts multiple arguments |
| `ray(…).blue()` | Output in color. Use `green`, `orange`, `red`, `blue`,`purple` or `gray` |
| `ray().caller()` | Show the calling class and method |
| `ray().clearScreen()` | Clear current screen |
| `ray().clearAll()` | Clear current and all previous screens |
| `ray().className(obj)` | Display the classname for an object |
| `ray().confetti()` | Display Confetti in Ray |
| `ray().count(name)` | Count how many times a piece of code is called, with optional name |
| `ray().date(date, format)` | Display a formatted date, the timezone, and its timestamp |
| `ray().die()` | Halt code execution - NodeJS only |
| `ray().disable()` | Disable sending stuff to Ray |
| `ray().disabled()` | Check if Ray is disabled |
| `ray().enable()` | Enable sending stuff to Ray |
| `ray().enabled()` | Check if Ray is enabled |
| `ray().error(err)` | Display information about an Error/Exception |
| `ray().event(name, data)` | Display information about an event with optional data |
| `ray().exception(err)` | Display extended information and stack trace for an Error/Exception |
| `ray().file(filename)` | Display contents of a file - NodeJS only |
| `ray(…).hide()` | Display something in Ray and make it collapse immediately |
| `ray().hideApp()` | Programmatically hide the Ray app window |
| `ray().html(string)` | Send HTML to Ray |
| `ray().htmlMarkup(string)` | Display syntax-highlighted HTML code in Ray |
| `ray().if(true, callback)` | Conditionally show things based on a truthy value or callable, optionally calling the callback with a `ray` argument |
| `ray().image(url)` | Display an image in Ray |
| `ray().interceptor()` | Access ConsoleInterceptor; call `.enable()` to show `console.log()` calls in Ray |
| `ray().json([…])` | Send JSON to Ray |
| `ray().label(string)` | Add a text label to the payload |
| `ray().limit(N).…` | Limit the number of payloads that can be sent to Ray to N; used for debugging within loops |
| `ray().macro(name, callable)` | Add a custom method to the Ray class. make sure not to use an arrow function if returning `this` |
| `ray().measure(callable)` | Measure the performance of a callback function |
| `ray().measure()` | Begin measuring the overall time and elapsed time since previous `measure()` call |
| `ray().newScreen()` | Start a new screen |
| `ray().newScreen('title')` | Start a new named screen |
| `ray().nodeinfo()` | Display statistics about node, such as the v8 version and memory usage (NodeJS only) |
| `ray(…).notify(message)` | Display a notification |
| `ray().once(arg1, …)` | Only send a payload once when in a loop |
| `ray(…).pass(variable)` | Display something in Ray and return the value instead of a Ray instance |
| `ray().pause()` | Pause code execution within your code; must be called using `await` |
| `ray().projectName(name)` | Change the active project name |
| `ray(…).remove()` | Remove an item from Ray   |
| `ray(…).removeIf(true)` | Conditionally remove an item based on a truthy value or callable   |
| `ray(…).removeWhen(true)` | Conditionally remove an item based on a truthy value or callable   |
| `ray(…).screenColor(color)` | Changes the screen color to the specified color |
| `ray(…).separator()` | Display a separator |
| `ray().showApp()` | Programmatically show the Ray app window |
| `ray(…).showIf(true)` | Conditionally show things based on a truthy value or callable  |
| `ray(…).showWhen(true)` | Conditionally show things based on a truthy value or callable  |
| `ray(…).small()` | Output text smaller or bigger. Use `large` or `small`|
| `ray().stopTime(name)` | Removes a named stopwatch if specified, otherwise removes all stopwatches |
| `ray().table(…)` | Display an array or an object formatted as a table; Objects and arrays are pretty-printed |
| `ray().text(string)` | Display raw text in Ray while preserving whitespace formatting |
| `ray().trace()` | Display a stack trace |
| `ray().xml(string)` | Send XML to Ray |

## FAQ

- Is `node-ray` only for NodeJS? _Not at all! It can be used in a web environment with javascript as well._

- Can `node-ray` be used with React/Vue? _yes, be sure to import `node-ray/web`_

- Can `node-ray` be used if I am using webpack? _yes, be sure to import `node-ray/web`_

## Development setup

- `npm install`
- `npm run build:all`
- `npm run test`
- `node build/test.js`

## Code Coverage Details

<p align="center">
    <img src="https://codecov.io/gh/permafrost-dev/node-ray/branch/main/graphs/commits.svg" height="100" alt="codecov graph" />
    <br>
    <img src="https://codecov.io/gh/permafrost-dev/node-ray/branch/main/graphs/sunburst.svg" height="175" alt="codecov graph" />
    <img src="https://codecov.io/gh/permafrost-dev/node-ray/branch/main/graphs/icicle.svg" width="400" alt="codecov graph" />
</p>


## Testing

`node-ray` uses Jest for unit tests. To run the test suite:

`npm run test`

To update the test snapshots:

`npm run test -- -u`

---

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Patrick Organ](https://github.com/patinthehat)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
