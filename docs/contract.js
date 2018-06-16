'use strict';

var Mine = function () {};

Mine.prototype = {
  init: function () {},
  add: function (key, lists) {
    var userAddress = Blockchain.transaction.from;
    var defaultData = JSON.parse(LocalContractStorage.get(userAddress));
    var saveMap = Object.prototype.toString.call(defaultData) == '[object Object]' ? defaultData : {};
    saveMap[key] = lists;
    LocalContractStorage.set(userAddress, JSON.stringify(saveMap));
  },
  del: function (key) {
    var userAddress = Blockchain.transaction.from;
    var defaultData = JSON.parse(LocalContractStorage.get(userAddress));
    var saveMap = Object.prototype.toString.call(defaultData) == '[object Object]' ? defaultData : {};
    delete saveMap[key];
    LocalContractStorage.set(userAddress, JSON.stringify(saveMap));
  },
  get: function () {
    var userAddress = Blockchain.transaction.from;
    return LocalContractStorage.get(userAddress);
  }
};

module.exports = Mine;
