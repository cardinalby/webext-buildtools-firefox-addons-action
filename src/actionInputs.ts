import { actionInputs as inputs } from 'github-actions-utils';

export const actionInputs = {
    zipFilePath: inputs.getWsPath('zipFilePath', true),
    extensionId: inputs.getString('extensionId', true, false),
    jwtIssuer: inputs.getString('jwtIssuer', true, true),
    jwtSecret: inputs.getString('jwtSecret', true, true),
    timeoutMs: inputs.getInt('timeoutMs', true),
}