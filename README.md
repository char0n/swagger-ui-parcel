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

To resolve the issue with the latest version of `swagger-ui@4.11.1` 
following Parcel.js alias needs to provided in `package.json`:

```json
  "alias": {
    "./node_modules/swagger-ui/dist/swagger-ui-es-bundle-core.js": "./node_modules/swagger-ui/dist/swagger-ui.js"
  }
```

Using this setup we avoid using modern ESM distribution fragments and instead
fallback to CommonJS which consistently works with Parcel.js.

## Support for package.json `exports` field

Parcel.js doesn't support package.json [exports](https://nodejs.org/api/packages.html#package-entry-points) field [by default](https://parceljs.org/blog/v2-9-0/#new-resolver). It needs to be enabled
explicitly. This can be done by adding the following to your project root package.json:

```json
{
  "@parcel/resolver-default": {
    "packageExports": true
  }
}
```

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