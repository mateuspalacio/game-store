var GamePurchase = artifacts.require("GamePurchase");

module.exports = function(deployer) {
  deployer.deploy(GamePurchase);
};