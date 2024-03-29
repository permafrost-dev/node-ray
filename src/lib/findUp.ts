import { toPath } from '@/lib/utils';
import { lstatSync, statSync } from 'node:fs';
import path from 'node:path';

export const findUpStop = Symbol('findUpStop');

function matchType(type, stat) {
    return type === 'directory' ? stat.isDirectory() : stat.isFile();
}

function locatePathSync(paths, { cwd = process.cwd(), type = 'file', allowSymlinks = true } = {}) {
    cwd = toPath(cwd);

    const statFunction = allowSymlinks ? statSync : lstatSync;

    for (const path_ of paths) {
        try {
            const stat = statFunction(path.resolve(cwd, path_), {
                throwIfNoEntry: false,
            });

            if (!stat) {
                continue;
            }

            if (matchType(type, stat)) {
                return path_;
            }
        } catch {
            //
        }
    }
}

function findUpMultipleSync(name, options: any = {}) {
    let directory = path.resolve(toPath(options.cwd) ?? '');
    const { root } = path.parse(directory);
    const stopAt = path.resolve(directory, toPath(options.stopAt) ?? root);
    const limit = options.limit ?? Number.POSITIVE_INFINITY;
    const paths = [name].flat();

    const runMatcher = locateOptions => {
        if (typeof name !== 'function') {
            return locatePathSync(paths, locateOptions);
        }

        const foundPath = name(locateOptions.cwd);
        if (typeof foundPath === 'string') {
            return locatePathSync([foundPath], locateOptions);
        }

        return foundPath;
    };

    const matches: any[] = [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const foundPath = runMatcher({ ...options, cwd: directory });

        if (foundPath === findUpStop) {
            break;
        }

        if (foundPath) {
            matches.push(path.resolve(directory, foundPath));
        }

        if (directory === stopAt || matches.length >= limit) {
            break;
        }

        directory = path.dirname(directory);
    }

    return matches;
}

export function findUp(name, options: any = {}) {
    const matches = findUpMultipleSync(name, { ...options, limit: 1 });
    return matches[0];
}
