<a name="banner"><img src="https://cdn.jsdelivr.net/gh/tsdotnet/array-dispatch@master/assets/banner.svg" alt="@tsdotnet/array-dispatch: Call every listener. Safe even as the list changes."></a>

[![npm version](https://img.shields.io/npm/v/@tsdotnet/array-dispatch.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/array-dispatch)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/array-dispatch/blob/master/LICENSE)

Call every listener in an array with one payload, safely, even if the list changes mid-call.

## Install

```sh
npm install @tsdotnet/array-dispatch
```

## Usage

```ts
import { dispatch } from '@tsdotnet/array-dispatch';

const listeners = [
  (n: number) => console.log('a', n),
  (n: number) => { throw new Error('boom'); },
  (n: number) => console.log('c', n),
];

dispatch(listeners, 5, true); // logs a 5 and c 5; the error is trapped
```

The list is copied first, so listeners may add or remove themselves safely. `dispatch.mapped` collects each listener's result; `dispatch.unsafe` skips the copy.

## Use it from

ESM (`import { dispatch } from '@tsdotnet/array-dispatch';`) or CommonJS (`const { dispatch } = require('@tsdotnet/array-dispatch');`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/array-init@1/dist/umd/array-init.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/exceptions@1/dist/umd/exceptions.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/array-copy@1/dist/umd/array-copy.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/array-dispatch@1/dist/umd/array-dispatch.min.js"></script>
<script>
  const { dispatch } = tsdotnet.arrayDispatch;
</script>
```

</details>

## Docs

[tsdotnet.github.io/array-dispatch](https://tsdotnet.github.io/array-dispatch/)
