var signupSend = document.querySelector('.signup');
signupSend.addEventListener('click', signup, false);

function signup() {
  var signupEmail = document.querySelector('.signupEmail').value;
  var signupPassword = document.querySelector('.signupPassword').value;
  var signupAccount = {};
  signupAccount.email = signupEmail;
  signupAccount.password = signupPassword;

  var xhr = new XMLHttpRequest();
  xhr.open('post', 'https://hexschool-tutorial.herokuapp.com/api/signup', true);
  xhr.setRequestHeader('Content-type', 'application/json');
  var data = JSON.stringify(signupAccount);
  xhr.send(data);
  xhr.onload = function() {
    var callbackData = JSON.parse(xhr.responseText);
    var verifyData = callbackData.message;
    if(verifyData == "帳號註冊成功") {
      alert(verifyData);
    } else {
      alert(verifyData);
    }
  }  
}

var signinSend = document.querySelector('.signin');
signinSend.addEventListener('click', signin, false);

function signin() {
  var signinEmail = document.querySelector('.signinEmail').value;
  var signinPassword = document.querySelector('.signinPassword').value;
  var signinAccount = {};
  signinAccount.email = signinEmail;
  signinAccount.password = signinPassword;

  var xhr = new XMLHttpRequest();
  xhr.open('post', 'https://hexschool-tutorial.herokuapp.com/api/signin', true);
  xhr.setRequestHeader('Content-type', 'application/json');
  var data = JSON.stringify(signinAccount);
  xhr.send(data);
  xhr.onload = function() {
    var callbackData = JSON.parse(xhr.responseText);
    var verifyData = callbackData.message;
    if(verifyData == "登入成功") {
      alert(verifyData);
    } else {
      alert(verifyData);
    }
  }
}