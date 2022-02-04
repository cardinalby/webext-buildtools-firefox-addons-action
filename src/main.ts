import * as ghActions from '@actions/core';
import FirefoxAddonsBuilder, {
    IFirefoxAddonsOptions,
    SameVersionAlreadyUploadedError,
    ValidationError
} from 'webext-buildtools-firefox-addons-builder';
import {actionInputs} from './actionInputs';
import {getLogger} from './logger';
import fs from "fs";
import {actionOutputs} from "./actionOutputs";
import {PollTimedOutError} from "webext-buildtools-firefox-addons-builder/dist/errors/PollTimedOutError";

async function run(): Promise<void> {
    try {
        await runImpl();
    } catch (error) {
        ghActions.setFailed(error.message);
        if (error instanceof ValidationError) {
            actionOutputs.validationError.setValue(true);
        } else if (error instanceof SameVersionAlreadyUploadedError) {
            actionOutputs.sameVersionAlreadyUploadedError.setValue(true);
        } else if (error instanceof PollTimedOutError) {
            actionOutputs.timeoutError.setValue(true);
        }
    }
}

async function runImpl() {
    const logger = getLogger();

    const options = getBuilderOptions();
    const builder = new FirefoxAddonsBuilder(options, logger);

    builder.setInputBuffer(fs.readFileSync(actionInputs.zipFilePath));
    builder.requireDeployedExt();

    return builder.build();
}

function getBuilderOptions(): IFirefoxAddonsOptions {
    return {
        api: {
            jwtSecret: actionInputs.jwtSecret,
            jwtIssuer: actionInputs.jwtIssuer
        },
        deploy: {
            extensionId: actionInputs.extensionId,
            pollTimeoutMs: actionInputs.timeoutMs
        }
    };
}

// noinspection JSIgnoredPromiseFromCall
run();