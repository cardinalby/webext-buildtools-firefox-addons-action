![pack](https://github.com/cardinalby/webext-buildtools-firefox-addons-action/workflows/build-test/badge.svg)
[![test](https://github.com/cardinalby/webext-buildtools-firefox-addons-action/actions/workflows/test.yml/badge.svg)](https://github.com/cardinalby/webext-buildtools-firefox-addons-action/actions/workflows/test.yml)

# Deploy your WebExtension to Firefox Addons

Based on [FirefoxAddonsBuilder](https://github.com/cardinalby/webext-buildtools-firefox-addons-builder) 
package. 

The action is intended to **update existing** published Addon and can't create a new one.

## API access

To setup API access you need to generate `jwtIssuer` and `jwtSecret`
([https://addons.mozilla.org/en-US/developers/addon/api/key/](https://addons.mozilla.org/en-US/developers/addon/api/key/)):

## Example

```yaml
uses: cardinalby/webext-buildtools-firefox-addons-action@v1
with:
  zipFilePath: 'build/extension.zip'
  extensionId: '{7b312f5e-9680-436b-acc1-9b09f60e8aaa}'
  jwtIssuer: ${{ secrets.FF_JWT_ISSUER }}
  jwtSecret: ${{ secrets.FF_JWT_SECRET }}
```

If you are interested in the building the entire deployment workflow for WebExtension,
you can read this [article](https://cardinalby.github.io/blog/post/github-actions/webext/1-introduction/).

## Inputs

### 🟧 `zipFilePath`
Path to packed extension (relative to repository). 

Either `zipFilePath` or `uploadId` inputs should be set.

You can use [webext-buildtools-pack-extension-dir-action](https://github.com/cardinalby/webext-buildtools-pack-extension-dir-action)
to pack your extension directory and provide this input from it's output.

### 🟧 `uploadId`
Id of already existing upload (can be obtained from outputs in case of error) to retry publishing.
Sometimes validating extension can take a long time, and you can repeat publishing with existing upload
id later (read [Implementing deferred steps](https://cardinalby.github.io/blog/post/github-actions/implementing-deferred-steps/)).

Either `zipFilePath` or `uploadId` inputs should be set.

### 🔸 `extensionId` _Required_
Your extension id at Firefox Addons

### 🔸 `jwtIssuer` _Required_
JWT issuer also called "apiKey" obtained from created credentials. Use secrets!

### 🔸 `jwtSecret` _Required_
JWT secret also called "apiSecret" obtained from created credentials. Use secrets!

### 🔹 `sourcesZipFilePath`
Path to packed source code of the extension (relative to repository).
Source code is required for addon review in case if your addon contains minified/unreadable code.

You can use [webext-buildtools-pack-extension-dir-action](https://github.com/cardinalby/webext-buildtools-pack-extension-dir-action)
to pack your extension directory and provide this input from it's output.

### 🔹 `channel` _Optional, default: `listed`_
The version channel, which determines its visibility on the site. Can be either `unlisted` or listed`

### 🔹 `timeoutMs` _Optional, default: `600000` (10 min)_
Timeout in milliseconds of waiting of uploaded extension processing by Addons server.
In case of timeout, action fails with `timeoutError` output equal `true`.

## Outputs

### 🔻 `sameVersionAlreadyUploadedError`
`true` if the action failed because the version you try to upload already exists.

### 🔻 `validationError`
`true` if the action failed because validation at Add-ons side rejected your extension.

### 🔻 `unauthorizedError`
`true` if failed because of 401 Unauthorized response from API

### 🔻 `timeoutError`
`true` if failed because polling timed out according to timeoutMs input.

### 🔻 `requestThrottledError`
`true` if failed because request to Add-ons API has been throttled by the server.

### 🔻 `errorUploadId`
Contains upload id in case of error (can be empty if upload wasn't successful). Can be used for 
retrying publishing after a while (see `uploadId` input).

### 🔻 `errorExtensionVersion`
Contains extension version in case of error (can be empty if upload wasn't successful)

## Key features
- Uses Addons API v5.
- Allows uploading sources for review.
- Has detailed error outputs.
- Extracts manifest from zip archive automatically