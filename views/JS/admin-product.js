async function renderAdminProducts() {
    const container = document.getElementById("productContainer");
    container.style.display = "flex";
    container.innerHTML = "";
    document.getElementById('hidden-form').style.display = "none";

    try {
        const response = await axios.get('http://localhost:3000/products');
        const products = response.data;

        products.forEach(product => {
            const article = document.createElement("article");
            article.classList.add("card", "product-item");

            uniqId = product._id;
            const header = document.createElement("header");
            header.classList.add("card__header");

            const title = document.createElement("h1");
            title.classList.add("product__title");
            title.textContent = product.title;
            header.appendChild(title);

            const imageContainer = document.createElement("div");
            imageContainer.classList.add("card__image");

            const image = document.createElement("img");
            image.src = product.imageUrl;
            image.alt = product.title;
            imageContainer.appendChild(image);

            const content = document.createElement("div");
            content.classList.add("card__content");

            const price = document.createElement("h2");
            price.classList.add("product__price");
            price.textContent = product.price;
            content.appendChild(price);

            const description = document.createElement("p");
            description.classList.add("product__description");
            description.textContent = product.description;
            content.appendChild(description);

            const actions = document.createElement("div");
            actions.classList.add("card__actions");

            const editLink = document.createElement("a");
            editLink.classList.add("btn_admin");
            editLink.href = `/admin/edit-product/${product.id}`;
            editLink.textContent = "Edit";

            function editEvent(uniqId) {
                editLink.onclick = (event) => {
                    event.preventDefault();
                    document.getElementById('hidden-form').style.display = "block";
                    document.getElementById('productContainer').style.display = "none";
                    document.getElementById('btn-product').textContent = "Update";
                    document.getElementById('form_heading').textContent = "Update Product";
                    // filling all value in input field to edit
                    document.getElementById("title-ip").value = product.title;
                    document.getElementById("image-ip").value = product.imageUrl;
                    document.getElementById("price-ip").value = product.price;
                    document.getElementById("description-ip").value = product.description;
                    const form = document.getElementById('form');
                    form.setAttribute('action', `http://localhost:3000/edit-product/${uniqId}`);
                    form.setAttribute('method', 'post');
                }

            }
            editEvent(uniqId);

            actions.appendChild(editLink);

            const deleteForm = document.createElement("form");
            deleteForm.action = "/admin/delete-product";
            deleteForm.method = "POST";

            const productIdInput = document.createElement("input");
            productIdInput.type = "hidden";
            productIdInput.value = product.id;
            productIdInput.name = "productId";
            deleteForm.appendChild(productIdInput);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("btn_admin");
            deleteButton.type = "submit";
            deleteButton.textContent = "Delete";

            function deleteList(article, uniqId) {
                deleteButton.onclick = (event) => {
                    event.preventDefault();
                    deleteFromServer(uniqId);
                    container.removeChild(article);
                }
            }
            deleteList(article, uniqId);
            

            deleteForm.appendChild(deleteButton);

            actions.appendChild(deleteForm);

            article.appendChild(header);
            article.appendChild(imageContainer);
            article.appendChild(content);
            article.appendChild(actions);

            container.appendChild(article);
        });
    } catch (error) {
        console.log(error);
    }
}


async function deleteFromServer(uniqId) {
    try {
        await axios.delete(`http://localhost:3000/${uniqId}`);
        renderAdminProducts();
    } catch (error) {
        console.log(error);
    }
}