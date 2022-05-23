import * as path from "path";
import * as fs from "fs";
import {PathLike} from "fs";
import { zip } from 'zip-a-folder';
import * as dotenv from 'dotenv';
import {RunOptions, RunTarget} from "github-action-ts-run-api";

dotenv.config({path: 'tests.env'});

describe('webext-buildtools-firefox-addons-action', () => {
    jest.setTimeout(2400000);

    const extensionDir = path.join(__dirname, 'extension');
    const outDirPath = path.join(__dirname, 'out');
    const zipFilePath = path.join(outDirPath, 'extension.zip');

    const rm = (path: PathLike) => fs.existsSync(path) && fs.rmSync(path);

    const target = process.env.CI
        ? RunTarget.mainJs('action.yml')
        : RunTarget.jsFile('lib/main.js', 'action.yml');

    beforeAll(async () => {
        await zip(extensionDir, zipFilePath);
    });

    afterAll(() => {
        rm(zipFilePath);
    });

    it('should try to deploy', async () => {
        const result = await target.run(RunOptions.create({
            inputs: {
                jwtIssuer: process.env.JWT_ISSUER,
                jwtSecret: process.env.JWT_SECRET,
                extensionId: process.env.EXTENSION_ID,
                channel: 'unlisted',
                zipFilePath: zipFilePath
            }
        }));

        expect(result.isSuccess).toBe(false);
        expect(result.exitCode).toBeGreaterThan(0);
        expect(result.commands.secrets).toContain(process.env.JWT_ISSUER);
        expect(result.commands.secrets).toContain(process.env.JWT_SECRET);
        expect(result.commands.errors.length).toEqual(1);
        expect(result.commands.outputs.sameVersionAlreadyUploadedError).toEqual('true');
        expect(result.commands.outputs.validationError).toBeUndefined();
        expect(result.commands.outputs.unauthorizedError).toBeUndefined();
        expect(result.commands.outputs.timeoutError).toBeUndefined();
    });

    it('should fail due to invalid jwt', async () => {
        const result = await target.run(RunOptions.create({
            inputs: {
                jwtIssuer: 'dewdewdweedwe',
                jwtSecret: '1231232131233',
                extensionId: process.env.EXTENSION_ID,
                channel: 'unlisted',
                zipFilePath: zipFilePath
            }
        }));

        expect(result.isSuccess).toBe(false);
        expect(result.exitCode).toBeGreaterThan(0);
        expect(result.commands.secrets).toContain('dewdewdweedwe');
        expect(result.commands.secrets).toContain('1231232131233');
        expect(result.commands.errors.length).toEqual(1);
        expect(result.commands.outputs.sameVersionAlreadyUploadedError).toBeUndefined();
        expect(result.commands.outputs.validationError).toBeUndefined();
        expect(result.commands.outputs.unauthorizedError).toEqual('true');
        expect(result.commands.outputs.timeoutError).toBeUndefined();
    });
});