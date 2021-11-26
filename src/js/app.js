App = {
  web3Provider: null,
  contracts: {},

  init: async function (x) {

    if (x == '../products.json') {

      document.getElementById('dropdown').innerText = "Games";

      $.getJSON(x, function (data) {
        var gamesRow = $('#gamesRow');
        var gameTemplate = $('#gameTemplate');

        document.getElementById('gamesRow').innerHTML = "";

        for (i = 0; i < data.length; i++) {
          gameTemplate.find('.panel-title').text(data[i].name);
          gameTemplate.find('img').attr('src', data[i].picture);
          gameTemplate.find('.game-year').text(data[i].year);
          gameTemplate.find('.game-developer').text(data[i].developer);
          gameTemplate.find('.game-platform').text(data[i].platform);
          gameTemplate.find('.game-price').text(data[i].price);
          gameTemplate.find('.btn-purchase').attr('data-id', data[i].id);
          gameTemplate.find('.btn-purchase').attr('value', data[i].id);

          gamesRow.append(gameTemplate.html());
        }
      });

    }

    if (x == '../consoles.json') {

      document.getElementById('dropdown').innerText = "Consoles";

      $.getJSON(x, function (data) {
        var gamesRow = $('#gamesRow');
        var gameTemplate = $('#gameTemplate');

        document.getElementById('gamesRow').innerHTML = "";

        for (i = 0; i < data.length; i++) {
          gameTemplate.find('.panel-title').text(data[i].name);
          gameTemplate.find('img').attr('src', data[i].picture);
          gameTemplate.find('.game-year').text(data[i].year);
          gameTemplate.find('.game-developer').text(data[i].developer);
          gameTemplate.find('.game-platform').text(data[i].platform);
          gameTemplate.find('.game-price').text(data[i].price);
          gameTemplate.find('.btn-purchase').attr('data-id', data[i].id);
          gameTemplate.find('.btn-purchase').attr('value', data[i].id);

          gamesRow.append(gameTemplate.html());
        }
      });

    }

    return await App.initWeb3();
  },

  initWeb3: async function () {

    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });;
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();

  },

  initContract: function () {

    $.getJSON('products.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var GameArtifact = data;
      App.contracts.GamePurchase = TruffleContract(GameArtifact);

      // Set the provider for our contract
      App.contracts.GamePurchase.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();

    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-purchase', App.handleAdopt);
  },

  markAdopted: function () {
    var adoptionInstance;

    App.contracts.GamePurchase.deployed().then(function (instance) {
      adoptionInstance = instance;

      return adoptionInstance.getBuyers.call();
    }).then(function (adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var gameId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.GamePurchase.deployed().then(function (instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(gameId, { from: account });
      }).then(function (result) {
        return App.markAdopted();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  }

};

$(function () {
  $(window).load(function () {
    App.init('../products.json');
  });
});
