# ray-node

---

## Setup

- `npm install`
- `npm run build`
- `node build/test.js`


## Configuration

`ray-node` will search for `ray.config.js`.  You should place this file in your project's root directory.

This is optional and will use the default settings if no configuration file is found.

_Example:_

```js
// ray.config.js

module.exports = {
    enable: true,
    host: 'localhost',
    port: 23517,
}
```

## Tests

`npm run test`

## About

Source was converted from original PHP source _(spatie/ray)_.

## How is this different from `js-ray`?

This is a more complete implementation written in typescript, and it's primary use case is for node.js projects.
The codebase was translated to Typescript directly from the original PHP source code of `spatie/ray`. 

As a result, supports all of the features that the original package does.  `js-ray` does not support all features of Ray.

We did, however, draw some inspiration for portions of the code from `js-ray`.

---

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
