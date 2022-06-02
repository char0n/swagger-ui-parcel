# Using Parcel to build SwaggeruI

## JavaScript

By using **swagger-ui-es-bundle.js** distribution fragment the problems with
polyfills goes away. **swagger-ui-es-bundle.js** is commonjs2 build that does include production dependencies.

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