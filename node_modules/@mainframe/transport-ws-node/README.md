# transport-ws-node

WebSocket transport for node as a [RxJS `Subject`](http://reactivex.io/rxjs/class/es6/Subject.js~Subject.html).

## Installation

```sh
yarn add @mainframe/transport-ws-node
```

## Usage

```js
import wsTransport from '@mainframe/transport-ws-node'

const transport = wsTransport('ws://localhost')

transport.subcribe(console.log)
transport.next({ hello: 'transport' })
```

## API

### wsTransport()

**Arguments**

1.  `url: string`

**Returns** `Rx.Subject<T = any>`

## License

MIT
