var Wallet = require('ethereumjs-wallet');
var Utils = require('ethereumjs-util');
var path = require('path');

var fs = require('fs');
var password = process.argv[4];
var nodeName = process.argv[2];
var fileName = process.argv[3];
var path = 'C:/tmp/parity' + nodeName + '/keys/EtherTwin/';
var files = fs.readdirSync(path);
var file = fs.readFileSync(path + fileName).toString();
var myWallet = Wallet.fromV3(file, password, true);

console.log("Private Key: " + myWallet.getPrivateKey().toString('hex')); 
console.log("Address: " + myWallet.getAddress().toString('hex')); 