<p align="center">
    <img src="https://static.permafrost.dev/images/node-ray/node-ray-logo.png" alt="node-ray" height="125" style="block">
    <br><br>
    <code style="font-size:2.4rem;"><strong>node-ray</strong></code>
</p>

# node-ray
## Debug your NodeJS code with Ray to fix problems faster

This package can be installed in any NodeJS application to send messages to the [Ray app](https://myray.app).

## Installation

Install with npm:

```bash
npm install node-ray
```

or yarn:

```bash
yarn add node-ray
```

## Usage

The majority of the API from the [original PHP package](https://github.com/spatie/ray) is supported.  See the [api reference](https://spatie.be/docs/ray/v1/usage/reference) for more information.

```js 
// es module import:
import { ray } from 'node-ray';

// commonjs import:
const ray = require('node-ray').ray;
```

```js
ray('a string');

ray(['several', 'arguments'], 'can', {be: provided});

ray().table(['one two', {a: 100, b: 200, c: 300}, [9, 8, 7]).blue();

ray().html('<em>large text</em>').large().green();

ray().image('https://placekitten.com/200/300');

ray().clearAll();

ray().disable(); // disable sending data to Ray at runtime
ray().xml('<one>11</one>'); // disabled, data not sent to Ray
```

## Configuration

`node-ray` will search for `ray.config.js`.  You should place this file in your project's root directory, similiar to the way `ray.php` is placed in the root directory when using `spatie/ray`.

This is optional and the package will use the default settings if no configuration file is found.

_Example:_

```js
// ray.config.js

module.exports = {
    enable: true,
    host: 'localhost',
    port: 23517,
}
```

## About

This package attempts to replicate the entire PHP API for Ray to provide a robust solution for debugging NodeJS projects.

## How is this different from `js-ray`?

This is a more complete implementation written in typescript, and its primary use case is for NodeJS projects (the default builds won't work in a browser environment).

The codebase was translated to Typescript directly from the original PHP source code of [`spatie/ray`](https://github.com/spatie/ray). 

As a result, `node-ray` supports the majority of features that exist in the original package; [`js-ray`](https://github.com/m1guelpf/ray-js) does not.

We did draw some inspiration for portions of the code from [`js-ray`](https://github.com/m1guelpf/ray-js), however.

## Development setup

- `npm install`
- `npm run build:all`
- `node build/test.js`

## Testing

`node-ray` uses Jest for unit tests.  To run the test suite:

`npm run test`

To update the test snapshots:

`npm run test -- -u`

---

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
