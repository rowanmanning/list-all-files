
# @rowanmanning/list-all-files

List all files in a directory recursively.


## Table of Contents

  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [License](#license)


## Requirements

This library requires the following to run:

  * [Node.js](https://nodejs.org/) 14+


## Usage

Install with [npm](https://www.npmjs.com/):

```sh
npm install @rowanmanning/list-all-files
```

Load the library into your code with a `require` call:

```js
const listAllFiles = require('@rowanmanning/list-all-files');
```

### Asynchronous Interface

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

List all files in a directory synchronously:

```js
const files = listAllFiles.sync('./directory-path');
// files is an array of strings, each being the path to a file
```


## Contributing

[The contributing guide is available here](docs/contributing.md). All contributors must follow [this library's code of conduct](docs/code_of_conduct.md).


## License

Licensed under the [MIT](LICENSE) license.<br/>
Copyright &copy; 2020, Rowan Manning
