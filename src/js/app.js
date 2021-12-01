App = {
  web3Provider: null,
  contracts: {},
  price: 0,
  id: 0,

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
          gameTemplate.find('.btn-purchase').attr('id', data[i].id);
          gameTemplate.find('.btn-purchase').attr('value', data[i].price);

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
          gameTemplate.find('.btn-purchase').attr('id', data[i].id);
          gameTemplate.find('.btn-purchase').attr('value', data[i].price);

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
        window.ethereum.request({ method: "eth_requestAccounts" });;
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
      App.contracts.GameStore = TruffleContract(GameArtifact);

      // Set the provider for our contract
      App.contracts.GameStore.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      //return App.markAdopted();

    });

    $.getJSON('consoles.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var GameArtifact = data;
      App.contracts.GameStore = TruffleContract(GameArtifact);

      // Set the provider for our contract
      App.contracts.GameStore.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      //return App.markAdopted();

    });

    //return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-purchase', App.handleAdopt);
  },

  handleAdopt: function (x) {

    App.defineValores(x)

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      ethereum.request({ method: 'eth_requestAccounts' });

      const transactionParameters = {
        gasPrice: '0x' + (2000000000).toString(16), // customizable by user during MetaMask confirmation.
        gas: '0x' + (210000).toString(16), // customizable by user during MetaMask confirmation.
        to: '0x0A4c19f01497156ac1Dca7DA796d65e24F8eeB8B', // Required except during contract publications.
        from: account, // must match user's active address.
        value: '0x' + (self.price * 1000000000000000000).toString(16) // Only required to send ether to the recipient from the initiating external account.
      };

      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      }).then(function (result) {
        $("#modalExemplo").modal("show");
      }).catch(function (err) {
        console.log("nao deu certo");
      });

      /*event.preventDefault();

      var gameId = parseInt($(event.target).data('id'));

      var adoptionInstance;

      App.contracts.GameStore.deployed().then(function (instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        return adoptionInstance.comprar({ from: account });
      }).then(function (result) {
        $("#modalExemplo").modal("show");
      }).catch(function (err) {
        console.log("nao deu certo");
      });*/

    });
  },

  find: function () {
    var link;

    var jogoNome;

    if (document.getElementById('dropdown').innerText == "Games") {

      $.getJSON('../products.json', function (data) {

        for (i = 0; i < data.length; i++) {

          if (data[i].id == id) {
            link = data[i].link;
            jogoNome = data[i].name;
            App.sendEmail(link, jogoNome)
          }

        }
      });

    }

    if (document.getElementById('dropdown').innerText == "Consoles") {

      $.getJSON('../consoles.json', function (data) {

        for (i = 0; i < data.length; i++) {

          if (data[i].id == id) {
            link = data[i].link;
            jogoNome = data[i].name;
            App.sendEmail(link, jogoNome)
          }

        }
      });

    }
  },

  sendEmail: function (link, jogoNome) {
    nome = document.getElementById('inputName').value;
    email = document.getElementById('inputEmail').value;

    Email.send({
      Host: "smtp.gmail.com",
      Username: "victor_tmeloo@edu.unifor.br",
      Password: "16254926",
      To: email,
      From: "victor_tmeloo@edu.unifor.br",
      Subject: "Your Game is Ready",
      Body: "<html><p>Hi " + nome + ", here is your product " + jogoNome + "!</p><img src='" + link + "'></html>"
    })
      .then(function (message) {
        alert("email sent successfully")
      });

    App.clearForm()
  },

  defineValores: function (x) {
    price = parseFloat(x.value);
    id = parseInt(x.id);
  },

  clearForm: function () {
    var name = document.getElementById("inputName");
    var email = document.getElementById("inputEmail");

    name.value = "";
    email.value = "";
  },

};

$(function () {
  $(window).load(function () {
    App.init('../products.json');
  });
});
