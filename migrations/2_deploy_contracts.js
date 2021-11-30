var GameStore = artifacts.require("GameStore");

module.exports = function(deployer) {
  deployer.deploy(GameStore);
};