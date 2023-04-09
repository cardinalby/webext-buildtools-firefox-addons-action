import { actionInputs as inputs } from 'github-actions-utils';
import {UploadChannel} from "webext-buildtools-firefox-addons-builder";

function getChannel(): UploadChannel {
    const value = inputs.getString('channel', true);
    if (value === 'listed' || value === 'unlisted') {
        return value;
    }
    throw new Error(`Invalid "channel" input value: ${value}. Should be "listed" or "unlisted"`);
}

export const actionInputs = {
    zipFilePath: inputs.getString('zipFilePath', false),
    uploadId: inputs.getString('uploadId', false),
    sourcesZipFilePath: inputs.getString('sourcesZipFilePath', false),
    extensionId: inputs.getString('extensionId', true, false),
    channel: getChannel(),
    jwtIssuer: inputs.getString('jwtIssuer', true, true),
    jwtSecret: inputs.getString('jwtSecret', true, true),
    timeoutMs: inputs.getInt('timeoutMs', true),
}

if ((!actionInputs.zipFilePath && !actionInputs.uploadId) ||
    (actionInputs.zipFilePath && actionInputs.uploadId)
) {
    throw new Error('Either zipFilePath or uploadId input should be set')
}