import * as core from '@actions/core';

const transformBool = (v: boolean) => v ? 'true' : 'false';

export const actionOutputs = {
    setErrorUploadId(value: string) {
        core.setOutput('errorUploadId', value);
    },

    setErrorExtensionVersion(value: string) {
        core.setOutput('errorExtensionVersion', value);
    },

    setSameVersionAlreadyUploadedError(value: boolean) {
        core.setOutput('sameVersionAlreadyUploadedError', transformBool(value));
    },

    setValidationError(value: boolean) {
        core.setOutput('validationError', transformBool(value));
    },

    setUnauthorizedError(value: boolean) {
        core.setOutput('unauthorizedError', transformBool(value));
    },

    setTimeoutError(value: boolean) {
        core.setOutput('timeoutError', transformBool(value));
    },

    setRequestThrottledError(value: boolean) {
        core.setOutput('requestThrottledError', transformBool(value));
    },
}