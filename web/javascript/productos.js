sendProductRequestToServer();

document.addEventListener("DOMContentLoad", () => {
    generateProducts();
})

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
            generateProducts(productsList);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}

function generateProducts(productsList) {
    var productDiv = document.querySelector('.productlist');
    var productsByCategory = {};

    for (var i = 0; i < productsList.length; i++) {
        var product = productsList[i];
        var categoryName = product['categoryName'];

        if (!productsByCategory.hasOwnProperty(categoryName)) {
            productsByCategory[categoryName] = [];
        }

        productsByCategory[categoryName].push(product);
    }

    var categoryIndex = 0;

    for (var category in productsByCategory) {
        if (productsByCategory.hasOwnProperty(category)) {
            var categoryId = 'category-' + categoryIndex;

            productDiv.innerHTML += `
        <div class="listrow">
          <div class="rowtitle1">${category}</div>
          <div class="productrow Flipped productrow_Flipped" id="${categoryId}">
          </div>
        </div>`;

            var products = productsByCategory[category];
            var container_productos = document.getElementById(categoryId);

            for (var j = 0; j < products.length; j++) {
                var product = products[j];

                container_productos.innerHTML += `
          <div class="imgdiv1">
            <div class="textrow1">
              <button class="addbutton" data-product="${product['productName']}" data-price="${product['price']}">${product['productName']} ${product['price']}€</button>
            </div>
            <img class="imgrow1" src="${product['productUrl']}">
          </div>`;
            }

            categoryIndex++;
        }
    }

    // Add click event listener to the buttons
    var buttons = document.getElementsByClassName('addbutton');
    for (var k = 0; k < buttons.length; k++) {
        buttons[k].addEventListener('click', handleAddToCart);
    }
    var userEmail = sessionStorage.getItem('email');

    if (userEmail) {
        var registerButton = document.getElementById('registerButton');
        registerButton.innerHTML = 'Logout';
        registerButton.href = '#';

        var loginButton = document.getElementById('loginButton');
        loginButton.innerHTML = 'Welcome, ' + userEmail;
        loginButton.href = '#';
    }
}
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
            loginButton.addEventListener('click', function () {
                sessionStorage.removeItem('email');
                location.reload();
            });
        }
    }
}
function handleAddToCart(event) {
    var button = event.target;
    var productName = button.getAttribute('data-product');
    var price = button.getAttribute('data-price');

    var sessionCartItems = JSON.parse(sessionStorage.getItem('sessionCartItems')) || [];
    sessionCartItems.push({productName: productName, price: price});
    sessionStorage.setItem('sessionCartItems', JSON.stringify(sessionCartItems));

    console.log('Product:', productName);
    console.log('Price:', price);
}
