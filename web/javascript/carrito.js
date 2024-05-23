// Function to create a handler for removing one item of a specific type
function createRemoveOneHandler(itemName) {
    return function () {
        var sessionCartItems = JSON.parse(sessionStorage.getItem('sessionCartItems'));

        for (var i = 0; i < sessionCartItems.length; i++) {
            if (sessionCartItems[i].productName === itemName) {
                sessionCartItems.splice(i, 1);
                break;
            }
        }

        sessionStorage.setItem('sessionCartItems', JSON.stringify(sessionCartItems));
        displayCartItems();
    };
}

// Function to create a handler for removing all items of a specific type
function createRemoveAllHandler(itemName) {
    return function () {
        var sessionCartItems = JSON.parse(sessionStorage.getItem('sessionCartItems'));

        sessionCartItems = sessionCartItems.filter(function (cartItem) {
            return cartItem.productName !== itemName;
        });

        sessionStorage.setItem('sessionCartItems', JSON.stringify(sessionCartItems));
        displayCartItems();
    };
}

// Call the displayCartItems function when the page loads
window.addEventListener('DOMContentLoaded', displayCartItems);

// Function to display the cart items
function displayCartItems() {
    var sessionCartItems = JSON.parse(sessionStorage.getItem('sessionCartItems'));
    var productsDisplay = document.querySelector('.productsDisplay');

    // Clear the existing content
    productsDisplay.innerHTML = '';

    if (sessionCartItems && sessionCartItems.length > 0) {
        // Create an object to keep track of the item counts and prices
        var itemData = {};
        var totalPrice = 0;

        for (var i = 0; i < sessionCartItems.length; i++) {
            var cartItem = sessionCartItems[i];

            // Increment the item count for each item
            if (itemData.hasOwnProperty(cartItem.productName)) {
                itemData[cartItem.productName].count++;
            } else {
                itemData[cartItem.productName] = {
                    count: 1,
                    price: cartItem.price,
                    quantity: cartItem.quantity // Set the quantity property
                };
            }

            // Add the item price multiplied by the count to the total price
            totalPrice += cartItem.price * itemData[cartItem.productName].count;
        }




        for (var itemName in itemData) {
            if (itemData.hasOwnProperty(itemName)) {
                var itemInfo = itemData[itemName];
                var itemCount = itemInfo.count;
                var itemPrice = itemInfo.price;

                var itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');

                var productName = document.createElement('span');
                productName.textContent = itemName;

                var itemCountSpan = document.createElement('span');
                itemCountSpan.textContent = ' (x' + itemCount + ')';

                var itemPriceSpan = document.createElement('span');
                itemPriceSpan.textContent = ' - Price: ' + (itemPrice * itemCount) + '€';

                var removeOneButton = document.createElement('button');
                removeOneButton.textContent = 'Remove One';
                removeOneButton.addEventListener('click', createRemoveOneHandler(itemName));

                var removeAllButton = document.createElement('button');
                removeAllButton.textContent = 'Remove All';
                removeAllButton.addEventListener('click', createRemoveAllHandler(itemName));

                itemDiv.appendChild(productName);
                itemDiv.appendChild(itemCountSpan);
                itemDiv.appendChild(itemPriceSpan);
                itemDiv.appendChild(removeOneButton);
                itemDiv.appendChild(removeAllButton);
                productsDisplay.appendChild(itemDiv);
            }
        }

        // Display the total price
        var totalPriceDiv = document.createElement('div');
        totalPriceDiv.classList.add('total-price');
        totalPriceDiv.textContent = 'Total Price: ' + totalPrice + '€';

        productsDisplay.appendChild(totalPriceDiv);
    }
}

// Function to create a handler for removing one item of a specific type
function createRemoveOneHandler(itemName) {
    return function () {
        var sessionCartItems = JSON.parse(sessionStorage.getItem('sessionCartItems'));

        for (var i = 0; i < sessionCartItems.length; i++) {
            if (sessionCartItems[i].productName === itemName) {
                sessionCartItems.splice(i, 1);
                break;
            }
        }

        sessionStorage.setItem('sessionCartItems', JSON.stringify(sessionCartItems));
        displayCartItems();
    };
}

// Function to create a handler for removing all items of a specific type
function createRemoveAllHandler(itemName) {
    return function () {
        var sessionCartItems = JSON.parse(sessionStorage.getItem('sessionCartItems'));

        sessionCartItems = sessionCartItems.filter(function (cartItem) {
            return cartItem.productName !== itemName;
        });

        sessionStorage.setItem('sessionCartItems', JSON.stringify(sessionCartItems));
        displayCartItems();
    };
}

// Call the displayCartItems function when the page loads
window.addEventListener('DOMContentLoaded', displayCartItems);


function sendOrderToServer() {
    var sessionCartItems = JSON.parse(sessionStorage.getItem('sessionCartItems'));
    var email = sessionStorage.getItem('email');
    var quantity = 0;
    // Prepare the data to be sent
    var dataWeb = new URLSearchParams();
    dataWeb.append("EMAIL", email);

    // Add each product name and quantity to the data
    for (var i = 0; i < sessionCartItems.length; i++) {
        var cartItem = sessionCartItems[i];
        var productName = cartItem.productName;
        quantity++;

        dataWeb.append('productName', productName);
        dataWeb.append('quantity', quantity);
    }


    $.ajax({
        url: 'http://localhost:8080/cafeteriaFinal/Controller',
        data: {
            ACTION: 'SEND_ORDER',
            SUBACTION: 'SEND_ORDER',
            PRODUCTNAME: productName,
            QUANTITY: quantity,
            EMAIL: email
        },

        method: 'POST',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false,
        success: function (response) {
            alert("Order sent successfully");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // Handle the error
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    }
    );
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
                location.reload(); // Reload the page
            });
        }
    }
}

window.addEventListener('load', updateButtons);
