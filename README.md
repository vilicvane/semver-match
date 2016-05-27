# Semver Match

A simple function that conforms npm package version matching behavior.

## Install

```sh
npm install semver-match --save
```

## Usage

```ts
import match from 'semver-match';

match('^0.1.0', ['0.1.0', '0.1.1', '0.2.0']); // "0.1.1"
match('*', ['0.1.0', '0.2.0'], { latest: '0.1.0' }); // "0.1.0"
```

## License

MIT License.
