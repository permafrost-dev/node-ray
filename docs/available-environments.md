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
const { ray } = require('node-ray/web');
```

### Browser standalone

If you'd like to use `node-ray` directly in a webpage, you may inject it via a CDN package. 

There are two standalone versions of `node-ray` available: one with axios included, and one without _(slim version)_.

`node-ray` may be directly used within a web page via a script tag. The standalone version includes all required libraries, **including** axios.

```html
<script src="https://cdn.jsdelivr.net/npm/node-ray@latest/dist/standalone.min.js"></script>
```

Or use the slim version _(without axios)_ if you already have axios included in your project:

```html
<script src="https://cdn.jsdelivr.net/npm/axios@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/node-ray@latest/dist/standalone-slim.min.js"></script>
```
