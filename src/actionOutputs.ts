import { ActionTrOutput } from 'github-actions-utils';

const transformBool = (v: boolean) => v ? 'true' : 'false';

export const actionOutputs = {
    sameVersionAlreadyUploadedError: new ActionTrOutput<boolean>('sameVersionAlreadyUploadedError', transformBool),
    validationError: new ActionTrOutput<boolean>('validationError', transformBool),
    timeoutError: new ActionTrOutput<boolean>('timeoutError', transformBool),
}