# transport-http-node

HTTP transport for node.

## Installation

```sh
yarn add @mainframe/transport-http-node
```

## Usage

```js
import httpTransport from '@mainframe/transport-http-node'

const transport = httpTransport('http://localhost')

transport.request({ hello: 'transport' }).then(console.log)
```

## API

### httpTransport()

**Arguments**

1.  `url: string`

**Returns** `(data: Object) => Promise<any>`

## License

MIT
