<p align="center">
    <img src="https://static.permafrost.dev/images/node-ray/node-ray-logo.png" alt="node-ray" height="200" style="block">
    <br><br>
    <code style="font-size:3.0rem;"><strong>node-ray</strong></code>
    <br><br>
</p>

<p align="center">
    <img src="https://shields.io/npm/v/node-ray" alt="npm version"> <img src="https://img.shields.io/npm/dt/node-ray.svg" alt="npm downloads"> <img src="https://shields.io/github/license/permafrost-dev/node-ray" alt="license"> <img src="https://github.com/permafrost-dev/node-ray/workflows/Run%20Tests/badge.svg" alt="test status"> <img src="https://codecov.io/gh/permafrost-dev/node-ray/branch/main/graph/badge.svg?token=YW2BTKSNEO"/>
</p>

# node-ray
## Debug your NodeJS code with Ray to fix problems faster

This package can be installed in any NodeJS, ES6+, or TypeScript application to send messages to the [Ray app](https://myray.app).

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

### NodeJS

When using in a NodeJS environment (the default), import the package as you would normally:

```js 
// es module import:
import { ray } from 'node-ray';

// commonjs import:
const ray = require('node-ray').ray;
```

### Browser bundle
If you're bundling your scripts for use in a Browser environment _(i.e. using webpack)_, import the `/web` variant:

```js 
// es module import:
import { ray } from 'node-ray/web';

// commonjs import:
const { ray } = require('node-ray/web');
```

### Browser standalone

If you'd like to use `node-ray` directly in a webpage, you may inject it via a CDN package. The standalone version is bundled with everything _except_ the axios library.

```html
    <script src="https://cdn.jsdelivr.net/npm/axios@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/node-ray@latest/dist/standalone.min.js"></script>
    <script>
        window.ray = Ray.ray;
        window.Ray = Ray.Ray;
    </script>
```

You may access the helper `ray()` method normally.

### Using with Laravel Mix

To use `node-ray` with Laravel Mix, include the following in `resources/js/bootstrap.js`:

```js
const { ray } = require('node-ray/web');

window.ray = ray;
```

You may then compile as usual _(`npm run dev`)_. After including `js/app.js` in your view, you may access `ray()` normally within your scripts.

## Usage

The majority of the API from the [original PHP package](https://github.com/spatie/ray) is supported.  See the [api reference](https://spatie.be/docs/ray/v1/usage/reference) for more information.

```js 
// es module import:
import { ray } from 'node-ray';

// commonjs import:
const { ray } = require('node-ray');
```

If you need to modify the host or port:

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

_Note: This section only applies if you are using `node-ray` in the NodeJS environment, NOT a browser environment._

`node-ray` will search for `ray.config.js`.  You should place this file in your project's root directory, similiar to the way `ray.php` is placed in the root directory when using `spatie/ray`.

This is optional and the package will use the default settings if no configuration file is found.

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
}
```

When running `node-ray` within a NodeJS environment, you may set the environment variable `NODE_ENV` to "production" or "staging" to disable sending data to Ray from calls to `ray()`.

### Browser config

This section only applies if you are using `node-ray` in a browser environment _(webpack, etc.)_.

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

## About

This package attempts to replicate the entire PHP API for Ray to provide a robust solution for debugging NodeJS projects.

## How is this different from `js-ray`?

This is a more complete implementation written in typescript, and its primary use case is for NodeJS projects, although it can be used in Browser environments as well.

The codebase was translated to Typescript directly from the original PHP source code of [`spatie/ray`](https://github.com/spatie/ray). 

As a result, `node-ray` supports the majority of features that exist in the original package; [`js-ray`](https://github.com/m1guelpf/ray-js) does not.

We did draw some inspiration for portions of the code from [`js-ray`](https://github.com/m1guelpf/ray-js), however.

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
| `ray().image(url)` | Display an image in Ray | 
| `ray().interceptor()` | Access ConsoleInterceptor; call `.enable()` to show `console.log()` calls in Ray |
| `ray().json([…])` | Send JSON to Ray | 
| `ray().macro(name, callable)` | Add a custom method to the Ray class. make sure not to use an arrow function if returning `this` |
| `ray().measure(callable)` | Measure the performance of a callback function |
| `ray().measure()` | Begin measuring the overall time and elapsed time since previous `measure()` call |
| `ray().newScreen()` | Start a new screen |
| `ray().newScreen('title')` | Start a new named screen |
| `ray(…).notify(message)` | Display a notification |
| `ray(…).pass(variable)` | Display something in Ray and return the value instead of a Ray instance |
| `ray().pause()` | Pause code execution within your code; must be called using `await` |
| `ray().showApp()` | Programmatically show the Ray app window |
| `ray(…).showIf(true)` | Conditionally show things based on a truthy value or callable  |
| `ray(…).showWhen(true)` | Conditionally show things based on a truthy value or callable  |
| `ray(…).small()` | Output text smaller or bigger. Use `large` or `small`|
| `ray().stopTime(name)` | Removes a named stopwatch if specified, otherwise removes all stopwatches |
| `ray().table(…)` | Display an array or an object formatted as a table; Objects and arrays are pretty-printed |
| `ray().trace()` | Display a stack trace |
| `ray().xml(string)` | Send XML to Ray | 

## FAQ

- Can `node-ray` be used with React? _yes, just be sure to import `node-ray/web`_

- Can `node-ray` be used if I'm using webpack? _yes, just be sure to import `node-ray/web`_

## Development setup

- `npm install`
- `npm run build:all`
- `npm run test`
- `node build/test.js`

## Testing

`node-ray` uses Jest for unit tests.  To run the test suite:

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
