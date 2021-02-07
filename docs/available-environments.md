# Available environments

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
const ray = require('node-ray/web').ray;
```

### Browser standalone

If you'd like to use `node-ray` directly in a webpage, you may inject it via a CDN package. The standalone version is bundled with everything _except_ the axios library.

```html
    <script src="https://cdn.jsdelivr.net/npm/axios@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/node-ray@latest/dist/standalone.min.js"></script>
```

You may access the helper `ray()` method as `Ray.ray()`.

