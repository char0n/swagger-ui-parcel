# Using Parcel to build swagger-ui-react

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

Another issue seems to be with package.json [imports](https://nodejs.org/api/packages.html#imports field.
Parcel.js doesn't handle imports fields correctly when in CommonJS context.
Because of this fact, we need to utilize a `postinstall` npm scripts which replaces `#swagger-ui`
for `$swagger-ui` in `swagger-ui-react` main entry point. `$swagger-ui` is something
that is supported by Parcel.js aliasing (strings starting with `#` are not).

Related issues:
- https://github.com/parcel-bundler/parcel/issues/4155#issuecomment-1687884414

To resolve both above-mentioned issues with the latest version of `swagger-ui-react@5.4.2`, 
`postinstall` script is automatically executed with every `npm install` and following aliases needs
to be utilized.

```json
{
  "alias": {
    "./node_modules/swagger-ui-react/index.mjs": "./node_modules/swagger-ui-react/index.cjs",
    "$swagger-ui": "./node_modules/swagger-ui-react/swagger-ui.js"
  }
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