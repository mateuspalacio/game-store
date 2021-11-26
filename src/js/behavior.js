
var id = -1;

function sendEmail(link, jogoNome) {

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

  clearForm()

}

function find() {

  var link;

  var jogoNome;

  if (document.getElementById('dropdown').innerText == "Games") {

    $.getJSON('../products.json', function (data) {

      for (i = 0; i < data.length; i++) {

        if (data[i].id == id) {
          link = data[i].link;
          jogoNome = data[i].name;
          sendEmail(link, jogoNome)
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
          sendEmail(link, jogoNome)
        }

      }
    });

  }


}

function retornaValor(x) {

  id = parseInt(x.value);

}

function clearForm() {

  var name = document.getElementById("inputName");
  var email = document.getElementById("inputEmail");

  name.value = "";
  email.value = "";

}