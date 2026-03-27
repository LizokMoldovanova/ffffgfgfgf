const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product");

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase();

    products.forEach(function(product){

        const title = product.querySelector("h3").textContent.toLowerCase();

        if(title.includes(searchText)){
            product.style.display = "block";
        } else{
            product.style.display = "none";
        }

    });

});

let cart = [];

const buttons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartBtn = document.getElementById("cart-btn");
const cartPanel = document.getElementById("cart-panel");

cartBtn.addEventListener("click", () => {
    cartPanel.classList.toggle("active");
});

cartPanel.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", (e) => {
    if(!cartPanel.contains(e.target) && !cartBtn.contains(e.target)){
        cartPanel.classList.remove("active");
    }
});

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const product = button.closest(".product");
        const title = product.querySelector("h3").textContent;

        const existing = cart.find(item => item.title === title);

        if(existing){
            existing.qty++;
        } else{
            cart.push({ title: title, qty: 1 });
        }

        updateCart();
    });
});

function updateCart(){

    cartItems.innerHTML = "";
    cartCount.textContent = cart.length;

    cart.forEach(item => {

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <span>${item.title}</span>
            <div>
                <button class="qty-btn minus">-</button>
                <span class="qty">${item.qty}</span>
                <button class="qty-btn plus">+</button>
            </div>
        `;

        const minus = div.querySelector(".minus");
        const plus = div.querySelector(".plus");

        minus.addEventListener("click", () => {
            item.qty--;
            if(item.qty <= 0){
                cart = cart.filter(i => i !== item);
            }
            updateCart();
        });

        plus.addEventListener("click", () => {
            item.qty++;
            updateCart();
        });

        cartItems.appendChild(div);
    });
}
