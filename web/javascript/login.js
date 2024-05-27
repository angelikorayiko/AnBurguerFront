function sendDataToServer() {
    var correo = document.getElementById('correoField').value;
    var contrasena = document.getElementById('contrasenaField').value;

    $.ajax({
        url: 'http://localhost:8080/AnBurguer/Controller',
        data: {
            ACTION: 'LOGIN',
            EMAIL: correo,
            PASS: contrasena
        },
        dataType: 'json',
        async: false,
        success: function (response) {
            if (response.isEmployee) {
                window.location.href = "http://localhost:8080/AnBurguer/html/intranet.html";
            } else if (response.accountLogged) {
                sessionStorage.setItem('email', correo);

                window.location.href = "http://localhost:8080/AnBurguer/html/index.html";
            } else {
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').innerText = "No ha sido posible iniciar sesión, pruebe de nuevo";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('error-message').innerText = "No ha sido posible iniciar sesión, pruebe de nuevo";
        }
    });
}
