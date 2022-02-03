import * as ghActions from '@actions/core';

export const actionOutputs = {
    setSameVersionAlreadyUploadedError: () => {
        ghActions.setOutput('sameVersionAlreadyUploadedError', 'true');
    },

    setValidationError: () => {
        ghActions.setOutput('validationError', 'true');
    }
}