import * as ghActions from '@actions/core';
import FirefoxAddonsBuilder, {
    IFirefoxAddonsOptions,
    VersionAlreadyExistsError,
    ValidationError, UnauthorizedError
} from 'webext-buildtools-firefox-addons-builder';
import {actionInputs} from './actionInputs';
import {getLogger} from './logger';
import {actionOutputs} from "./actionOutputs";
import {PollTimedOutError} from "webext-buildtools-firefox-addons-builder/dist/errors/PollTimedOutError";

async function run(): Promise<void> {
    try {
        await runImpl();
    } catch (error) {
        ghActions.setFailed(String(error));
        if (error instanceof ValidationError) {
            actionOutputs.setValidationError(true);
        } else if (error instanceof VersionAlreadyExistsError) {
            actionOutputs.setSameVersionAlreadyUploadedError(true);
        } else if (error instanceof PollTimedOutError) {
            actionOutputs.setTimeoutError(true);
        } else if (error instanceof UnauthorizedError) {
            actionOutputs.setUnauthorizedError(true);
        }
    }
}

async function runImpl() {
    const logger = getLogger();

    const options = getBuilderOptions();
    const builder = new FirefoxAddonsBuilder(options, logger);

    builder.setInputZipFilePath(actionInputs.zipFilePath);
    if (actionInputs.sourcesZipFilePath) {
        builder.setInputSourcesZipFilePath(actionInputs.sourcesZipFilePath);
    }
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
            channel: actionInputs.channel,
            pollTimeoutMs: actionInputs.timeoutMs
        }
    };
}

// noinspection JSIgnoredPromiseFromCall
run();