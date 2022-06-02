# Using Parcel to build SwaggerUI

## JavaScript

Parcel.js module resolution is not compliant with the spec.

```js
import * as e from 'lodash/memoize.js';
```

Parcel.js resolves to:

```
[Function: memoize] { Cache: [Function: MapCache] }
```

The rest of the bundlers and Node.js resolves to:

```
[Module: null prototype] {
  default: [Function: memoize] { Cache: [Function: MapCache] }
}
```

It seems that Parcel.js resolves default export to the symbol the default export points to
instead of resolving to Module Object.

Related issues:
- https://github.com/parcel-bundler/parcel/issues/5459
- https://github.com/thangngoc89/bs-ant-design/issues/21

To resolve the issue with the latest version of `swagger-ui-react@4.11.1`, matching
version of `swagger-ui@4.11.1` needs to be installed as well and following
Parcel.js aliases need to provided in `package.json`:

```json
  "alias": {
    "./node_modules/swagger-ui-react/index.js": "./node_modules/swagger-ui-react/commonjs.js",
    "./node_modules/swagger-ui-react/swagger-ui-es-bundle-core.js": "./node_modules/swagger-ui/dist/swagger-ui.js"
  }
```

Using this setup we avoid using modern ESM distribution fragments and instead 
fallback to CommonJS which consistently works with Parcel.js.

## CSS

**swagger-ui.css** contains single character that Parcel just don't like.
We have to disable `@parcel/transformer-css` transformer to build successfully.

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.{css,pcss}": [
      "@parcel/transformer-postcss"
    ]
  }
}
```