function updateButtons() {
  var userEmail = sessionStorage.getItem('email');

  if (userEmail) {
    var registerButton = document.getElementById('registerButton');
    if (registerButton) {
      registerButton.innerHTML = 'Welcome, ' + userEmail;
      registerButton.href = '#';
      registerButton.style.order = '2';
    }

    var loginButton = document.getElementById('loginButton');
    if (loginButton) {
      loginButton.innerHTML = 'Logout';
      loginButton.href = '#';
      loginButton.style.order = '1';
      loginButton.addEventListener('click', function() {
        sessionStorage.removeItem('email');
        location.reload(); // Reload the page
      });
    }
  }
}

window.addEventListener('load', updateButtons);
