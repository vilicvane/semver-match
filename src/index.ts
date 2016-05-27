import * as Semver from 'semver';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export interface Dictionary<T> {
    [key: string]: T;
}

declare let module: any;
declare let exports: any;

// Compatibility with `const match = require('semver-match')`.
module.exports = exports = match;

export function match(range: string, versions: string[], tags: Dictionary<string> = {}): string {
    if (Semver.validRange(range)) {
        versions = versions.sort(Semver.rcompare);

        let latest = tags['latest'] || versions[0];

        for (let version of versions) {
            if (Semver.gte(latest, version) && Semver.satisfies(version, range)) {
                return version;
            }
        }

        for (let version of versions) {
            if (Semver.satisfies(version, range)) {
                return version;
            }
        }

        if (range === '*') {
            return latest;
        }

        return undefined;
    } else {
        // Otherwise, treat it as a tag (according to NPM source code).
        return hasOwnProperty.call(tags, range) ? tags[range] : undefined;
    }
}

export default match;
