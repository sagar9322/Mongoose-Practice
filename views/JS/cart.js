function getCart() {
    
    axios.get('http://localhost:3000/get-cart').then(response => {
        const products = response.data;
        document.getElementById('hidden-form').style.display = "none";
        // Get the container element to display the cart items
        const container = document.getElementById("productContainer");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.justifyContent = "space-evenly";
        container.innerHTML = "";

        // Iterate over each product in the cart
        products.forEach(product => {
            
            const uniqId = product.productId._id;
            // Create a new div element for each product
            const productDiv = document.createElement("div");
            productDiv.classList.add("cart-item");

            // Display the product details
            const title = document.createElement("h3");
            title.textContent = product.productId.title;
            productDiv.appendChild(title);

            const price = document.createElement("p");
            price.textContent = "Price: " + product.productId.price;
            productDiv.appendChild(price);

            const quantity = document.createElement("p");
            quantity.textContent = "Quantity: " + product.quantity;
            productDiv.appendChild(quantity);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("btn_cart");
            function deleteEvent(uniqId) {
                deleteButton.onclick = () => {
                    deleteFromCart(uniqId);
                    container.removeChild(productDiv);
                    setTimeout(() => {
                        getCart();
                    }, 300);

                }
            }

            deleteEvent(uniqId);
            productDiv.appendChild(deleteButton);
            // Add the product div to the container
            container.appendChild(productDiv);

        });
        // Create the "Order Now" button
        if (products.length > 0) {
            const orderButton = document.createElement("button");
            orderButton.textContent = "Order Now";
            orderButton.classList.add("btn_order");


            // Add an event listener to the "Order Now" button
                orderButton.onclick = (event) => {
                    event.preventDefault();
                    axios.get('http://localhost:3000/order-now')
                    // container.removeChild(productDiv);
                    setTimeout(() => {
                        getCart();
                    }, 300);

                }

            // Append the "Order Now" button to the container
            container.appendChild(orderButton);
        }
        else {
            const h1 = document.createElement('h1');
            h1.textContent = "🛒Cart is Empty🙅‍♂️";
            h1.style.color = "blue";
            container.appendChild(h1);
        }

    })
        .catch(error => {
            console.log(error);
        })
}


function deleteFromCart(uniqId) {
    
    axios.delete(`http://localhost:3000/delete-cart/${uniqId}`).then(()=> {
        getCart();
    });
}