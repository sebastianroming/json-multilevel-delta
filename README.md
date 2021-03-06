# json-multilevel-delta  [![Build Status](https://travis-ci.org/sebastianroming/json-multilevel-delta.svg?branch=master)](https://travis-ci.org/sebastianroming/json-multilevel-delta)

> Compare two objects and return the difference

## Install
```
npm install --save json-multilevel-delta
```


## Usage
```js
const jsonMultilevelDelta = require('json-multilevel-delta');

const objectA = { 'a': 'b', 'foo': { 'bar': 'baz', 'lorem': 'ipsum' } };
const objectB = { 'foo': { 'bar': 'baz' }, 'c': 'd' };

jsonMultilevelDelta(objectA, objectB);
// => [ 'a', 'foo.lorem', 'c' ]

jsonMultilevelDelta.json(objectA, objectB);
// => { 'a': 'b', 'foo': { 'lorem': 'ipsum' }, 'c': 'd' }
```

## License

MIT © [Sebastian Roming](https://webmonkey.io)
