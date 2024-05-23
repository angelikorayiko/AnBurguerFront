function sendDataToServer() {

    var nombre = document.getElementById('nombreField').value;
    var apellidos = document.getElementById('surnameField').value;
    var correo = document.getElementById('emailField').value;
    var telefono = document.getElementById('phoneField').value;
    var contrasena = document.getElementById('passField').value;
    var store = document.getElementById('storeField').value;

    var dataWeb = new URLSearchParams();
    var accountCreated = false;
    dataWeb.append("ACTION", "INTRANET");
    dataWeb.append('nombre', nombre);
    dataWeb.append('apellidos', apellidos);
    dataWeb.append('correo', correo);
    dataWeb.append('telefono', telefono);
    dataWeb.append('contrasena', contrasena);
    dataWeb.append('store', store);

    $.ajax({
        url: 'http://localhost:8080/cafeteriaFinal/Controller',
        data: {
            ACTION: 'INTRANET',
            SUB_ACTION: 'REGISTER',
            NAME: nombre,
            SURNAME: apellidos,
            MAIL: correo,
            PHONE: telefono,
            PASS: contrasena,
            STORE: store
        },
        dataType: 'json',
        async: false,
        success: function (response) {
            if (response.accountCreated) {
                accountCreated = true;
                alert("Account created successfully!");
                //window.location.href = "http://localhost:8080/cafeteriaFinal/login/paginalogin.html";
            } else {
                alert("Failed to create account. Please try again.");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}

function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(function (section) {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

function sendCategoryToServer() {

    var categoryName = document.getElementById('categoryNameField').value;

    var dataWeb = new URLSearchParams();
    var accountCreated = false;
    dataWeb.append("ACTION", "INTRANET");
    dataWeb.append('categoryName', categoryName);


    $.ajax({
        url: 'http://localhost:8080/cafeteriaFinal/Controller',
        data: {
            ACTION: 'INTRANET',
            SUB_ACTION: 'CREATECATEGORY',
            categoryName: categoryName
        },
        dataType: 'json',
        async: false,
        success: function (response) {
            if (response.CategoryCreated) {
                CategoryCreated = true;
                alert("Category created successfully!");
                //window.location.href = "http://localhost:8080/cafeteriaFinal/login/paginalogin.html";
            } else {
                alert("Failed to create category. Please try again.");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}
function sendRequestToServer() {
    var dataWeb = new URLSearchParams();
    var accountCreated = false;
    dataWeb.append("ACTION", "INTRANET");

    $.ajax({
        url: 'http://localhost:8080/cafeteriaFinal/Controller',
        data: {
            ACTION: 'INTRANET',
            SUB_ACTION: 'REFRESHUSERS'
        },
        dataType: 'json',
        async: false,
        success: function (response) {
            var employeesList = response;

            var html = "<table>";
            html += "<tr><th>Employee ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Store ID</th></tr>";

            for (var i = 0; i < employeesList.length; i++) {
                var employee = employeesList[i];
                html += "<tr>";
                html += "<td>" + employee.employeeId + "</td>";
                html += "<td>" + employee.firstName + "</td>";
                html += "<td>" + employee.surName + "</td>";
                html += "<td>" + employee.email + "</td>";
                html += "<td>" + employee.storeId + "</td>";
                html += "<td><button onclick='sendDeleteToServer(" + employee.employeeId + ")' class='delete-button' data-employee-id='" + employee.employeeId + "'>Delete</button></td>";
                html += "</tr>";
            }

            html += "</table>";

            $("#employee-list").html(html);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    }
    );
}

function sendDeleteToServer(employeeID) {
    var dataWeb = new URLSearchParams();
    dataWeb.append("ACTION", "INTRANET");
    dataWeb.append('data-employee-id', employeeID);

    $.ajax({
        url: 'http://localhost:8080/cafeteriaFinal/Controller',
        data: {
            ACTION: 'INTRANET',
            SUB_ACTION: 'DELETEUSER',
            employeeID: employeeID
        },
        dataType: 'json',
        async: false,
        success: function (response) {
            var employeesList = response;

            var html = "<table>";
            html += "<tr><th>Employee ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Store ID</th><th>Action</th></tr>";

            for (var i = 0; i < employeesList.length; i++) {
                var employee = employeesList[i];
                html += "<tr>";
                html += "<td>" + employee.employeeId + "</td>";
                html += "<td>" + employee.firstName + "</td>";
                html += "<td>" + employee.surName + "</td>";
                html += "<td>" + employee.email + "</td>";
                html += "<td>" + employee.storeId + "</td>";
                html += "<td><button onclick='sendDeleteToServer()'class='delete-button' data-employee-id='" + employee.employeeId + "'>Delete</button></td>";
                html += "</tr>";
            }

            html += "</table>";
            //$("#employee-list").html(html);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}

function sendProductToServer() {

    var categoryName = document.getElementById('category').value;
    var productName = document.getElementById('product-name').value;
    var price = document.getElementById('price').value;
    var productUrl = document.getElementById('product-url').value;

    var dataWeb = new URLSearchParams();
    var productCreated = false;
    dataWeb.append("ACTION", "INTRANET");
    dataWeb.append('categoryName', categoryName);
    dataWeb.append('productName', productName);
    dataWeb.append('price', price);
    dataWeb.append('productUrl', productUrl);


    $.ajax({
        url: 'http://localhost:8080/cafeteriaFinal/Controller',
        data: {
            ACTION: 'INTRANET',
            SUB_ACTION: 'CREATEPRODUCT',
            CATEGORYNAME: categoryName,
            PRODUCTNAME: productName,
            PRICE: price,
            PRODUCTURL: productUrl
        },
        dataType: 'json',
        async: false,
        success: function (response) {
            if (response.accountCreated) {
                // Account created successfully
                productCreated = true;
                alert("Product created successfully!");
                //window.location.href = "http://localhost:8080/cafeteriaFinal/login/paginalogin.html";
            } else {
                alert("Failed to create Product. Please try again.");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}

function sendProductRequestToServer() {
    var dataWeb = new URLSearchParams();
    var accountCreated = false;
    dataWeb.append("ACTION", "INTRANET");

    $.ajax({
        url: 'http://localhost:8080/cafeteriaFinal/Controller',
        data: {
            ACTION: 'INTRANET',
            SUB_ACTION: 'REFRESHPRODUCTS'
        },
        dataType: 'json',
        async: false,
        success: function (response) {
            var productsList = response;

            var html = "<table>";
            html += "<tr><th>Product ID</th><th>Product Name</th><th>Category ID</th><th>Category Name</th><th>Price</th><th>Product Url</th></tr>";

            for (var i = 0; i < productsList.length; i++) {
                var product = productsList[i];
                html += "<tr>";
                html += "<td>" + product.productId + "</td>";
                html += "<td>" + product.productName + "</td>";
                html += "<td>" + product.categoryId + "</td>";
                html += "<td>" + product.categoryName + "</td>";
                html += "<td>" + product.price + "</td>";
                html += "<td>" + product.productUrl + "</td>";
                html += "<td><button onclick='sendDeleteProductToServer(" + product.productId + ")' class='delete-button' data-employee-id='" + product.productId + "'>Delete</button></td>";
                html += "</tr>";
            }

            html += "</table>";

            $("#product-list").html(html);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    }
    );
}

function sendDeleteProductToServer(productID) {
    var dataWeb = new URLSearchParams();
    dataWeb.append("ACTION", "INTRANET");
    dataWeb.append('data-product-id', productID);

    $.ajax({
        url: 'http://localhost:8080/cafeteriaFinal/Controller',
        data: {
            ACTION: 'INTRANET',
            SUB_ACTION: 'DELETEPRODUCT',
            productID: productID
        },
        dataType: 'json',
        async: false,
        success: function (response) {
            var productsList = response;

            var html = "<table>";
            html += "<tr><th>Product ID</th><th>Product Name</th><th>Category ID</th><th>Category Name</th><th>Price</th><th>Product Url</th></tr>";
            for (var i = 0; i < productsList.length; i++) {
                var product = productsList[i];
                html += "<tr>";
                html += "<td>" + product.productId + "</td>";
                html += "<td>" + product.productName + "</td>";
                html += "<td>" + product.categoryId + "</td>";
                html += "<td>" + product.categoryName + "</td>";
                html += "<td>" + product.price + "</td>";
                html += "<td>" + product.productUrl + "</td>";
                html += "<td><button onclick='sendDeleteProductToServer(" + product.productId + ")' class='delete-button' data-employee-id='" + product.productId + "'>Delete</button></td>";
                html += "</tr>";
            }

            html += "</table>";
            $("#product-list").html(html);


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}

function sendOrderRequestToServer() {
    var dataWeb = new URLSearchParams();
    var accountCreated = false;
    dataWeb.append("ACTION", "INTRANET");

    $.ajax({
        url: 'http://localhost:8080/cafeteriaFinal/Controller',
        data: {
            ACTION: 'INTRANET',
            SUB_ACTION: 'REFRESHORDER'
        },
        dataType: 'json',
        async: false,
        success: function (response) {
            var orderList = response;

            var html = "<table>";
            html += "<tr><th>Order id</th><th>Store id</th><th>Client id</th>";

            for (var i = 0; i < orderList.length; i++) {
                var order = orderList[i];
                html += "<tr>";
                html += "<td>" + order.Order_id + "</td>";
                html += "<td>" + order.Store_id + "</td>";
                html += "<td>" + order.Client_id + "</td>";
                html += "<td><button onclick='sendDeleteToServer(" + order.Order_id + ")' class='delete-button' data-employee-id='" + order.Order_id + "'>Delete</button></td>";
                html += "</tr>";
            }

            html += "</table>";

            $("#delete-order").html(html);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}
