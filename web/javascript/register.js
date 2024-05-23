function sendDataToServer() {

    var nombre = document.getElementById('nombreField').value;
    var apellidos = document.getElementById('apellidosField').value;
    var correo = document.getElementById('correoField').value;
    var telefono = document.getElementById('telefonoField').value;
    var contrasena = document.getElementById('contrasenaField').value;

    var dataWeb = new URLSearchParams();
    var accountCreated = false;
    dataWeb.append("ACTION", "REGISTER");
    dataWeb.append('nombre', nombre);
    dataWeb.append('apellidos', apellidos);
    dataWeb.append('correo', correo);
    dataWeb.append('telefono', telefono);
    dataWeb.append('contrasena', contrasena);

    $.ajax({
        url: 'http://localhost:8080/cafeteriaFinal/Controller',
        data: {
            ACTION: 'REGISTER',
            NAME: nombre,
            SURNAME: apellidos,
            MAIL: correo,
            PHONE: telefono,
            PASS: contrasena
        },
        dataType: 'json',
        async: false,
        success: function (response) {
            if (response.accountCreated) {
                accountCreated = true;
                window.location.href = "http://localhost:8080/cafeteriaFinal/login/paginalogin.html";
            } else {
                // Account creation failed, display error message in the div
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').innerText = "Registro fallido, vuelve a intentarlo.";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // Display AJAX error in the div
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('error-message').innerText = "Registro fallido, vuelve a intentarlo.";
        }
    });
}
