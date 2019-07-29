"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _rpcNode = _interopRequireWildcard(require("@mainframe/rpc-node"));

var _rpcStream = _interopRequireDefault(require("@mainframe/rpc-stream"));

var _apiBzzNode = _interopRequireDefault(require("@erebos/api-bzz-node"));

var _apiPss = _interopRequireDefault(require("@erebos/api-pss"));

var _clientBase = _interopRequireWildcard(require("@erebos/client-base"));

const instantiateAPI = (0, _clientBase.createInstantiateAPI)(_rpcNode.default);

class NodeClient extends _clientBase.default {
  constructor(config) {
    if (config.rpc == null) {
      if (config.ipc != null) {
        config.rpc = (0, _rpcNode.ipcRPC)(config.ipc);
      } else if (config.ws != null) {
        config.rpc = (0, _rpcNode.wsRPC)(config.ws);
      }
    }

    super(config);
    (0, _defineProperty2.default)(this, "_bzz", void 0);
    (0, _defineProperty2.default)(this, "_pss", void 0);

    if (config.bzz != null) {
      if (config.bzz instanceof _apiBzzNode.default) {
        this._bzz = config.bzz;
      } else {
        this._bzz = new _apiBzzNode.default(config.bzz);
      }
    } else if (typeof config.http === 'string') {
      this._bzz = new _apiBzzNode.default({
        url: config.http
      });
    } // $FlowFixMe: instance type


    this._pss = instantiateAPI(config.pss, _apiPss.default);
  }

  get bzz() {
    if (this._bzz == null) {
      throw new Error('Missing Bzz instance or HTTP URL');
    }

    return this._bzz;
  }

  get pss() {
    if (this._pss == null) {
      this._pss = new _apiPss.default(this.rpc);
    }

    return this._pss;
  }

}

exports.default = NodeClient;