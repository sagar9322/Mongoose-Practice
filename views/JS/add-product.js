document.getElementById('btn-product').addEventListener('click', () => {

    document.getElementById('hidden-form').style.display = "none";
    const container = document.getElementById("productContainer");
    container.style.display = "block";
    container.innerHTML = "";
    const h1 = document.createElement('h1');
    if (document.getElementById('btn-product').textContent === "Add Product") {
        h1.textContent = "Product Added Successfully";
    }
    else {
        h1.textContent = "Product Edited Successfully";
    }

    h1.style.color = "Green";
    container.appendChild(h1);
    document.getElementById('form_heading').textContent = "Add Product";
    document.getElementById('btn-product').textContent = "Add Product";
    setTimeout(() => {
        location.reload();
    }, 2000);
});


function addProduct() {
    document.getElementById('hidden-form').style.display = "block";
    document.getElementById('productContainer').style.display = "none";
    document.getElementById("title-ip").value = "";
    document.getElementById("image-ip").value = "";
    document.getElementById("price-ip").value = "";
    document.getElementById("description-ip").value = "";
    document.getElementById('form_heading').textContent = "Add Product";
    document.getElementById('btn-product').textContent = "Add Product";

}