![Node.js CI](https://github.com/cardinalby/webext-buildtools-firefox-addons-action/workflows/build-test/badge.svg)

# Deploy your WebExtension to Firefox Addons

Based on [FirefoxAddonsBuilder](https://www.npmjs.com/package/webext-buildtools-firefox-addons-builder) 
package.

## API access

To setup API access you need to generate `jwtIssuer` and `jwtSecret`
([https://addons.mozilla.org/en-US/developers/addon/api/key/](https://addons.mozilla.org/en-US/developers/addon/api/key/)):

## Inputs

### 🔸 `zipFilePath` _Required_
Path to packed extension (relative to repository)
You can use [webext-buildtools-pack-extension-dir-action](https://github.com/cardinalby/webext-buildtools-pack-extension-dir-action)
to pack your extension directory and provide this input from it's output

### 🔸 `extensionId` _Required_
Your extension id at Firefox Addons

### 🔸 `jwtIssuer` _Required_
JWT issuer also called "apiKey" obtained from created credentials. Use secrets!

### 🔸 `jwtSecret` _Required_
JWT secret also called "apiSecret" obtained from created credentials. Use secrets!

## Outputs

### 🔹 `sameVersionAlreadyUploadedError`
`true` if the action failed because the version you try to upload already exists.

### 🔹 `validationError`
`true` if the action failed because validation at Add-ons side rejected your extension.

## Usage example

```yaml
uses: cardinalby/webext-buildtools-firefox-addons-action@v1
with:
  zipFilePath: 'build/extension.zip'
  extensionId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  jwtIssuer: ${{ secrets.FF_JWT_ISSUER }}
  jwtSecret: ${{ secrets.FF_JWT_SECRET }}
```

---
If you are interested in the building the entire deployment workflow for WebExtension, 
you can read this [article](https://dev.to/cardinalby/webextension-deployment-and-publishing-using-github-actions-522o).