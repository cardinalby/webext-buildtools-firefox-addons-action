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

async function run(): Promise<void> {
    try {
        await runImpl();
    } catch (error) {
        ghActions.setFailed(error.message);
        if (error instanceof ValidationError) {
            actionOutputs.setValidationError();
        } else if (error instanceof SameVersionAlreadyUploadedError) {
            actionOutputs.setSameVersionAlreadyUploadedError();
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
            extensionId: actionInputs.extensionId
        }
    };
}

// noinspection JSIgnoredPromiseFromCall
run();