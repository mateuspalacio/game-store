
function sendEmail() {

  nome = document.getElementById('inputName').value;
  email = document.getElementById('inputEmail').value;

  clearForm()

  Email.send({
    Host: "smtp.gmail.com",
    Username: "victor_tmeloo@edu.unifor.br",
    Password: "16254926",
    To: email,
    From: "victor_tmeloo@edu.unifor.br",
    Subject: "Your Game is Ready",
    Body: "<html><p>Hi " + nome + ", here is your game!</p><img src='#'></html>",
  })
    .then(function (message) {
      alert("mail sent successfully")
    });
}

function sendEmailNow() {

  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'victor_tmeloo@edu.unifor.br',
      pass: '16254926'
    }
  });

  var mailOptions = {
    from: 'victor_tmeloo@edu.unifor.br',
    to: 'victor_tmeloo@hotmail.com',
    subject: 'Your Game is Ready',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      alert(error)
    } else {
      alert('Email sent: ' + info.response)
    }
  });

}

function clearForm() {

  var name = document.getElementById("inputName");
  var email = document.getElementById("inputEmail");

  name.value = ""
  email.value = ""
}