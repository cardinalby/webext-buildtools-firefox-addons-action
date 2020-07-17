![Node.js CI](https://github.com/cardinalby/webext-buildtools-firefox-addons-action/workflows/build-test/badge.svg)

# Deploy your WebExtension to Firefox Addons

Based on [FirefoxAddonsBuilder](https://www.npmjs.com/package/webext-buildtools-firefox-addons-builder) 
package.

## Inputs

* `zipFilePath` **Required**<br>
Path to packed extension (relative to repository)

* `extensionId` **Required**<br>
Your extension id at Firefox Addons

* To setup API access you need to generate `jwtIssuer` and `jwtSecret` 
([https://addons.mozilla.org/en-US/developers/addon/api/key/](https://addons.mozilla.org/en-US/developers/addon/api/key/)):
    * `jwtIssuer` **Required**<br>
    JWT issuer also called "apiKey" obtained from created credentials. Use secrets!
    * `jwtSecret` **Required**<br>
    JWT secret also called "apiSecret" obtained from created credentials. Use secrets!

## Simple usage example

```yaml
uses: cardinalby/webext-buildtools-firefox-addons-action@v1
with:
  zipFilePath: 'build/extension.zip'
  extensionId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  jwtIssuer: ${{ secrets.FF_JWT_ISSUER }}
  jwtSecret: ${{ secrets.FF_JWT_SECRET }}
```