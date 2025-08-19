// ? Render Cart Function
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const renderCart = (cart) => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalDisplay = document.getElementById("cart-total");
    const cartTotalDisplayMobile = document.getElementById("cart-total-mobile");

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div class="item-details">
                <h3>${item.name}</h3>
                <div class="keterangan">
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: Rp${item.totalPrice.toLocaleString("id-ID")}</p>
                </div>
                <div class="after-click">
                    <button class="button decrease-btn" data-index="${index}">-</button>
                    <button class="keterangan">${item.quantity}</button>
                    <button class="button increase-btn" data-index="${index}">+</button>
                </div>
                
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.totalPrice;
    });

    cartTotalDisplay.textContent = `Rp${total.toLocaleString("id-ID")}`;
    cartTotalDisplayMobile.textContent = `Rp${total.toLocaleString("id-ID")}`;
    
    // ! Execution Function
    attachQuantityListeners();
    showProductsSummary();
    totalPriceCheckout(total)
    showCheckoutFunc(cart)
}

const attachQuantityListeners = () => {
    const decreaseBtns = document.querySelectorAll(".decrease-btn");
    const increaseBtns = document.querySelectorAll(".increase-btn");

    decreaseBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.getAttribute("data-index"));
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                cart[index].totalPrice = cart[index].unitPrice * cart[index].quantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart(cart);
                cartNumFunc();
            } else {
                // Optional: hapus item jika jumlah 1 dan dikurangi
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart(cart);
                cartNumFunc();
            }
        });
    });

    increaseBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.getAttribute("data-index"));
            cart[index].quantity++;
            cart[index].totalPrice = cart[index].unitPrice * cart[index].quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart(cart);
            cartNumFunc();
        });
    });
}

// ? Cart num function

const cartNumFunc = () => {
    const cartH2Quantity = document.getElementById("quantity")
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    localStorage.setItem("number", JSON.stringify(totalQuantity));
    if(totalQuantity === 0) {
        cartH2Quantity.textContent = ""
    } else {
        cartH2Quantity.innerHTML = `(${totalQuantity})`;
    }
}

// ? Navigate To Menu
const navigateToMenu = () => {
    const menuIconMobile = document.getElementById("shop-mobile")
    const menuIcon = document.getElementById("shop")

    menuIconMobile.addEventListener("click", () => {
        window.location.href = "../shop-section/shop.html"
    })
    menuIcon.addEventListener("click", () => {
        window.location.href = "../shop-section/shop.html"
    })
}

// ? Products detail Summary
const showProductsSummary = () => {
    const productsContainer = document.getElementById("products-summary")
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let products = ""
    cart.forEach(product => {
        products += `<p>${product.name} (${product.quantity}X)</p>`
    })
    productsContainer.innerHTML = products
}

// ? Show Checkout Function
const showCheckoutFunc = (cartUpdate) => {
    const checkoutSection = document.querySelector(".checkout-section")
    const checkoutSectionBox = document.querySelector(".checkout-section .box")
    const doneCheckout = document.getElementById("doneCheckout")
    const toggleClose = document.getElementById("toggle-close")
    const checkoutToggle = document.getElementById("checkout")
    const checkoutToggleRight = document.getElementById("checkout-right")

    checkoutToggle.addEventListener("click", () => {
        checkoutSection.style.visibility = "visible"
        checkoutSection.style.opacity = "1"
        checkoutSectionBox.style.transform = "translateY(0)"
    })
    checkoutToggleRight.addEventListener("click", () => {
        checkoutSection.style.visibility = "visible"
        checkoutSection.style.opacity = "1"
        checkoutSectionBox.style.transform = "translateY(0)"
    })
    // Done checkout
    doneCheckout.addEventListener("click", () => {
        checkoutSection.style.visibility = "hidden"
        checkoutSection.style.opacity = "0"
        checkoutSectionBox.style.transform = "translateY(70%)"
        
        cartUpdate = []
        localStorage.setItem("cart", JSON.stringify(cartUpdate));
        renderCart(cartUpdate);
        cartNumFunc();
    })
    toggleClose.addEventListener("click", () => {
        checkoutSection.style.visibility = "hidden"
        checkoutSection.style.opacity = "0"
        checkoutSectionBox.style.transform = "translateY(70%)"
    })
}

// ? Total Price Checkout
const totalPriceCheckout = (totalPrice) => {
    const priceCheckout = document.getElementById("price-checkout")

    priceCheckout.innerHTML = `Rp${totalPrice.toLocaleString("id-ID")}`
}

// ! Execution Code
navigateToMenu()
document.addEventListener("DOMContentLoaded", () => {
    renderCart(cart)
    cartNumFunc();
});