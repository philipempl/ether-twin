# rpc-ws-browser

[`rpc-stream`](../rpc-stream) factory using [`transport-ws-browser`](../transport-ws-browser).

## Installation

```sh
yarn add @mainframe/rpc-ws-browser
```

## Usage

```js
import wsRPC from '@mainframe/rpc-ws-browser'

const rpc = wsRPC('ws://localhost')

rpc.request('getUser', ['1234']).then(console.log)
```

## API

### wsRPC()

**Arguments**

1.  `url: string`

**Returns** [`StreamRPC`](../rpc-stream)

## License

MIT
