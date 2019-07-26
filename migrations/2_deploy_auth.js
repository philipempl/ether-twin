var Authorization = artifacts.require("./Authorization.sol");

module.exports = function(deployer) {
  deployer.deploy(Authorization, "0x03e50106abde1a64ada555c9abe4bf079dd9d450");
};
