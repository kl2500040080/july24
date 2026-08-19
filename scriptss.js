let cart = [];
let total = 0;
let allPhones = [];

// 1. Load phones from db.json
async function loadPhones() {
    try {
        const response = await fetch('db.json');

        const data = await response.json();

        allPhones = data.phones;

        displayPhones(allPhones);

    } catch (error) {
        alert("Could not load phones");
    }
}


// 2. Display phones
function displayPhones(phones) {

    const listDiv = document.getElementById('phoneList');

    listDiv.innerHTML = '';

    phones.forEach(phone => {

        listDiv.innerHTML += `
            <div class="card">

                <img src="${phone.image}" alt="${phone.name}">

                <h3>${phone.name}</h3>

                <p><b>Color:</b> ${phone.color}</p>

                <p><b>Storage:</b> ${phone.storage}</p>

                <p><b>Price:</b> ₹${phone.price}</p>

                <button onclick='addToCart(${JSON.stringify(phone)})'>
                    Add to Cart
                </button>

            </div>
        `;

    });
}


// 3. Search phones
function searchPhones() {

    const searchText =
        document.getElementById('searchBox').value.toLowerCase();

    const filtered = allPhones.filter(phone =>
        phone.name.toLowerCase().includes(searchText) ||
        phone.color.toLowerCase().includes(searchText)
    );

    displayPhones(filtered);
}


// 4. Add phone to cart
function addToCart(phone) {

    cart.push(phone);

    updateCart();

    alert(`${phone.name} added to cart!`);
}


// 5. Remove phone from cart
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// 6. Update cart
function updateCart() {

    total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );

    document.getElementById('cartCount').innerText = cart.length;

    document.getElementById('cartTotal').innerText = total;


    // Show cart items with remove button
    let cartItemsHTML = '<h4>Your Cart:</h4>';

    cart.forEach((item, index) => {

        cartItemsHTML += `
            <p>
                ${item.name} - ₹${item.price}

                <button
                    onclick="removeFromCart(${index})"
                    style="background:red; padding:2px 6px;"
                >
                    X
                </button>
            </p>
        `;

    });

    document.getElementById('cartItems').innerHTML =
        cartItemsHTML;
}