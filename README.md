
# @rowanmanning/list-all-files

List all files in a directory recursively.

> [!WARNING]
> This library will be deprecated in April 2026 to coincide with the end-of-life date for Node.js 20. This is because the native [`fs.glob`](https://nodejs.org/api/fs.html#fspromisesglobpattern-options) and [`fs.globSync`](https://nodejs.org/api/fs.html#fsglobsyncpattern-options) methods in Node.js 22 and above provide the same functionality.

* [Requirements](#requirements)
* [Usage](#usage)
  * [Asynchronous Interface](#asynchronous-interface)
  * [Synchronous Interface](#synchronous-interface)
* [Migration](#migration)
* [Contributing](#contributing)
* [License](#license)


## Requirements

This library requires the following to run:

  * [Node.js](https://nodejs.org/) 20+


## Usage

Install with [npm](https://www.npmjs.com/):

```sh
npm install @rowanmanning/list-all-files
```

### Asynchronous Interface

Load the library into your code with `require`:

```js
const { listAllFiles } = require('@rowanmanning/list-all-files');
```

List all files in a directory asynchronously, using promises or `async`/`await`:

```js
listAllFiles('./directory-path').then(files => {
    // files is an array of strings, each being the path to a file
});
```

or

```js
const files = await listAllFiles('./directory-path');
// files is an array of strings, each being the path to a file
```

### Synchronous Interface

Load the library into your code with `require`:

```js
const { listAllFilesSync } = require('@rowanmanning/list-all-files');
```

List all files in a directory synchronously:

```js
const files = listAllFilesSync('./directory-path');
// files is an array of strings, each being the path to a file
```


## Migration

A new major version of this project is released if breaking changes are introduced. We maintain a [migration guide](docs/migration.md) to help users migrate between these versions.


## Contributing

[The contributing guide is available here](docs/contributing.md). All contributors must follow [this library's code of conduct](docs/code_of_conduct.md).


## License

Licensed under the [MIT](LICENSE) license.<br/>
Copyright &copy; 2020, Rowan Manning
