// ? Animation All Function
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

const animationAllFunc = () => {
    ScrollSmoother.create({
        smooth: 1.3
    })
    
    let master = gsap.timeline();

    // Tagline Animation
    const taglineAnimation = () => {
        let tagAnimTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".tagline",
                start: "center center",
                end: "top center"
            },
            ease: "power2.in"
        })
        tagAnimTimeline.from(".tagline h1", {
            y: "50%",
            autoAlpha: 0,
            duration: 0.5
        })
    }

    // Search Animation
    const searchAnimation = () => {
        let searchAnimTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".tagline",
                start: "bottom 20%",
            },
            ease: "back.out(1.7)"
        })
        searchAnimTimeline.from(".search #form-search", {
            autoAlpha: 0,
            duration: 0.6,
            width: "10%"
        })
    }

    master
        .add(taglineAnimation())
        .add(searchAnimation())
}

// ? Looping menu list
const menuListFunc = async() => {
    try {
        const result = await fetch("../data/menuList.json")
        const { menuList } = await result.json()
        const menuListContainer = document.getElementById("menu-list")

        let showData = ""
        menuList.forEach(data => {
            showData += `<a id="menu-a" class="menuA" data-img="${data.link}" data-segment="${data.segment}">
                ${data.name}<i>></i>
            </a>`
        })
        menuListContainer.innerHTML = showData  
        
        let imgHover = document.querySelectorAll(".menuA")

        const scrollToSection = (sectionId) => {
            const section = document.getElementById(sectionId)
            if(section) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: section, offsetY: 50},
                    ease: "power3.out"
                })
            }
        }
        
        imgHover.forEach(item => {
            item.addEventListener("mouseenter", () => {
                const imgUrl = item.getAttribute("data-img")
                
                item.style.backgroundImage = `url(${imgUrl})`
                item.style.backgroundPosition = "left";
                item.style.backgroundSize = "cover";
                item.style.transition = "all .3s ease-in-out .1s";

            })
            item.addEventListener("mouseleave", () => {
                item.style.backgroundImage = "none"
            })
            
            // Klik untuk menampilkan segmen
            item.addEventListener("click", () => {
                const navDetail = document.querySelector(".nav-detail");
                const segments = item.getAttribute("data-segment");
                const wrapper = document.getElementById(segments)
                const searchResultsContainer = document.getElementById("searchResultcontainer");

                // Jika bukan wrapper
                if(!wrapper) return;
    
                // Sembunyikan nav-detail dan hasil pencarian
                navDetail.style.transform = "translateX(60%)";
                navDetail.style.opacity = "0";
                navDetail.style.visibility = "hidden";
                navDetail.style.width = "0";
                searchResultsContainer.style.display = "none";

                scrollToSection(segments);
            });
        })

    } catch(err) {
        console.log(err)
    }
}

// ? Open menu detail function
const openMenuDetFunc = () => {
    const toggleMenu = document.getElementById("toggle-menu")
    const toggleClose = document.getElementById("toggle-close")
    const logo = document.getElementById("toggle-icon")
    const navDetail = document.querySelector(".nav-detail")

    toggleMenu.addEventListener("click", () => {
        navDetail.style.transform = "translateX(0)"
        navDetail.style.opacity = "1"
        navDetail.style.visibility = "visible"
        navDetail.style.width = "100%"
    })
    toggleClose.addEventListener("click", () => {
        navDetail.style.transform = "translateX(60%)"
        navDetail.style.opacity = "0"
        navDetail.style.visibility = "hidden"
        navDetail.style.width = "50%"
    })
    logo.addEventListener("click", () => {
        navDetail.style.transform = "translateX(60%)"
        navDetail.style.opacity = "0"
        navDetail.style.visibility = "hidden"
        navDetail.style.width = "0"
    })
}

// ? Show All Product
const showAllProducts = async() => {
    const result = await fetch("../data/products.json");
    const data = await result.json();

    const segments = [
        "espressoBased", "flavourCoffee", "manualBrewed", "dagroSignature",
        "chocolate", "frappe", "teaNusakita", "yakultSeries", "tea",
        "snack", "deliciousPasta", "ricebowl", "breakfastSeries", "others"
    ];

    // const segments = ["chocolate", "snack"]
    segments.forEach(segment => {
        const wrapper = document.getElementById(segment);
        if (!wrapper || !data[segment]) return;

        wrapper.innerHTML = data[segment].map(product => createProductBox(product)).join("");
        // id Button Function
        idButtonFunc(wrapper);
    });
}
// ? Create Product Box Function
const createProductBox = (product) => {
    const isHotAvailable = parseInt(product.priceH) > 0;
    const isColdAvailable = parseInt(product.priceC) > 0;

    return `
        <div class="box">
            <div class="wrap-img">
                <img src="${product.img}" alt="${product.name}" loading="lazy">
                <p>${product.highlight}</p>
            </div>
            <div class="product-info">
                <div class="top">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="price" id="price" data-priceH="${product.priceH}" data-priceC="${product.priceC}">${product.priceShow}</p>
                </div>
                <p>${product.description}</p>
            </div>
            <button class="addCart-btn"><i class="fa-solid fa-cart-shopping"></i>Add to Cart</button>
            <div class="after-click">
                <button class="button decrease-btn">-</button>
                <button class="keterangan">1</button>
                <button class="button increase-btn">+</button>
                <button class="button buy-btn">Add Cart</button>
            </div>
            <div class="choose-variant">
                ${isHotAvailable ? `<button class="hot-btn">Hot</button>` : ""}
                ${isHotAvailable && isColdAvailable ? `<button class="or-btn">or</button>` : ""}
                ${isColdAvailable ? `<button class="cold-btn">Cold</button>` : ""}
            </div>
        </div>
    `;
}
// Product animation
const productAnimation = () => {
    const boxes = Array.from(document.querySelectorAll('.box'));

    // Kelompokkan box berdasarkan posisi vertikal (baris)
    const rows = [];
    boxes.forEach(box => {
        const top = box.offsetTop;
        let row = rows.find(r => Math.abs(r.top - top) < 10);
        if (row) {
            row.elements.push(box);
        } else {
            rows.push({ top, elements: [box] });
        }
    });

    // Buat animasi per baris
    rows.forEach((row, index) => {
        gsap.from(row.elements, {
            scrollTrigger: {
                trigger: row.elements[0],
                start: "top 50%",
                toggleActions: "play none none none",
                once: true
            },
            y: "20%",
            autoAlpha: 0,
            stagger: 0.3,
            ease: "power2.out",
            duration: 0.7
        });
    });
};

// ? Increase, Decrease and Add Cart Button Function
const idButtonFunc = (root = document) => {
    const productBox = root.querySelectorAll(".box");

    productBox.forEach(box => {
        if(box.dataset.bound === "1") return;
        box.dataset.bound = "1"

        const increaseBtn = box.querySelector(".increase-btn");
        const decreaseBtn = box.querySelector(".decrease-btn");
        const keterangan = box.querySelector(".keterangan");
        const buyBtn = box.querySelector(".buy-btn");
        const addCartBtn = box.querySelector(".addCart-btn");

        const chooseVariantBtn = box.querySelector(".choose-variant");
        const hotBtn = box.querySelector(".hot-btn");
        const coldBtn = box.querySelector(".cold-btn");

        const afterClick = box.querySelector(".after-click");
        let priceTag = box.querySelector(".price");

        if (priceTag) {
            const priceH = parseInt(priceTag.getAttribute("data-priceH"));
            const priceC = parseInt(priceTag.getAttribute("data-priceC"));
    
            let count = 1;
            let selectedVariant = null;
    
            if (addCartBtn) {
                addCartBtn.addEventListener("click", () => {
                    chooseVariantBtn.style.display = "flex";
                    addCartBtn.style.display = "none";
                });
            }
    
            if (hotBtn) {
                hotBtn.addEventListener("click", () => {
                    selectedVariant = "hot";
                    afterClick.style.display = "flex";
                    chooseVariantBtn.style.display = "none";
                });
            }
    
            if (coldBtn) {
                coldBtn.addEventListener("click", () => {
                    selectedVariant = "cold";
                    afterClick.style.display = "flex";
                    chooseVariantBtn.style.display = "none";
                });
            }
    
            increaseBtn.addEventListener("click", () => {
                count++;
                keterangan.textContent = count;
            });
    
            decreaseBtn.addEventListener("click", () => {
                if (count > 1) {
                    count--;
                    keterangan.textContent = count;
                } else {
                    afterClick.style.display = "none";
                    addCartBtn.style.display = "block";
                    selectedVariant = null;
                    count = 1;
                    keterangan.textContent = count;
                }
            });
    
            buyBtn.addEventListener("click", () => {
                if (!selectedVariant) {
                    alert("Pilih varian Hot atau Cold terlebih dahulu.");
                    return;
                }
    
                const unitPrice = selectedVariant === "hot" ? priceH : priceC;
                const totalPrice = unitPrice * count;
    
                // Ambil data produk
                const productName = box.querySelector(".product-name").textContent;
                const productImg = box.querySelector(".wrap-img img").getAttribute("src");

                // Buat objek produk
                const selectedProduct = {
                    name: productName,
                    image: productImg,
                    variant: selectedVariant,
                    quantity: count,
                    totalPrice: totalPrice,
                    unitPrice: unitPrice
                };

                // Ambil array dari localStorage atau buat baru
                const cartData = JSON.parse(localStorage.getItem("cart")) || [];
                // const numCart = { number: cartData.length}

                // Tambahkan produk ke array
                cartData.push(selectedProduct);

                // Simpan kembali ke localStorage
                localStorage.setItem("cart", JSON.stringify(cartData));

                // Cart num function
                const totalQuantity = cartData.reduce((sum, item) => sum + item.quantity, 0)
                cartNumFunc({ numCart: totalQuantity })

                afterClick.style.display = "none"
                addCartBtn.style.display = "block"
                selectedVariant = null
                count = 1
                keterangan.textContent = count;
            });
        }
    });
};

// ? Cart num function
const cartNumFunc = (num) => {
    const numMobile = document.getElementById("num-mobile")
    const numLargeDevice = document.getElementById("num")

    // Store num
    localStorage.setItem("number", JSON.stringify(num.numCart));

    // Parse or get the number
    const showNum = JSON.parse(localStorage.getItem("number") || "0");

    if(showNum === 0) {
        numMobile.style.display = "none";
        numLargeDevice.style.display = "none";
    } else {
        numMobile.innerHTML = `${showNum}`;
        numLargeDevice.innerHTML = `${showNum}`;
        numMobile.style.display = "block";
        numLargeDevice.style.display = "flex";
    }
}

// ? Navigate to cart section
const navigateToCart = () => {
    const cartMobileToggle = document.getElementById("cart-icon")
    const cartLargeDeviceToggle = document.getElementById("cart")

    cartMobileToggle.addEventListener("click", () => {
        window.location.href = "../cart-section/cart.html"
    })
    cartLargeDeviceToggle.addEventListener("click", () => {
        window.location.href = "../cart-section/cart.html"
    })
}

// ? Search Function
const searchFunc = async () => {
    const input = document.getElementById("input-search")
    const searchResultsContainer = document.getElementById("searchResultcontainer")
    const allContent = document.querySelector(".all")

    if (!input || !searchResultsContainer || !allContent) return;

    // Siapkan shell hasil sekali saja agar input tidak tertimpa
    const ensureResultsShell = () => {
        let heading = searchResultsContainer.querySelector(".search-heading");
        if (!heading) {
        heading = document.createElement("h2")
        heading.className = "search-heading"
        searchResultsContainer.appendChild(heading)
        }
        let list = searchResultsContainer.querySelector(".product-wrapper");
        if (!list) {
            list = document.createElement("div")
            list.className = "product-wrapper"
            searchResultsContainer.appendChild(list)
        }
        return { heading, list };
    };

    let allProducts = [];

    try {
        const result = await fetch("../data/products.json");
        const data = await result.json();
        allProducts = Object.values(data).flat();
    } catch (err) {
        console.error("Gagal memuat data produk untuk pencarian:", err);
        return;
    }

    const onInput = () => {
        const keyword = input.value.toLowerCase().trim();
        const searchDelete = document.getElementById("search-x")

        // Ketika kosong: sembunyikan hasil, tampilkan semua
        if (keyword === "") {
            searchResultsContainer.style.display = "none"
            searchDelete.style.display = "none";
            const heading = searchResultsContainer.querySelector(".search-heading");
            const list = searchResultsContainer.querySelector(".search-products");
            if (heading) heading.textContent = "";
            if (list) list.innerHTML = "";
            allContent.style.display = "block";
        return;
    }

    // Hapus value di search
    if(keyword.length > 0) {
        searchDelete.style.display = "block"
        
        searchDelete.addEventListener("click", () => {
            input.value = ""
            searchDelete.style.display = "none";
            searchResultsContainer.style.display = "none"
            allContent.style.display = "block"
        })
    }

    const { heading, list } = ensureResultsShell();

    const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(keyword)
    );

    allContent.style.display = "none";
    searchResultsContainer.style.display = "block";
    heading.textContent = keyword;

    if (filtered.length === 0) {
        list.innerHTML = `<h3>Produk tidak ditemukan.</h3>`;
        return;
    }

    // Render ulang list hasil
    list.innerHTML = filtered.map(product => createProductBox(product)).join("");
        // Bind event hanya di list hasil (tidak ke seluruh dokumen)
        idButtonFunc(list);
    };

    // Pasang listener sekali
    input.addEventListener("input", onInput);
};

// ! Execute code
document.addEventListener("DOMContentLoaded", () => {
    const totalQuantity = JSON.parse(localStorage.getItem("number") || "0");
    cartNumFunc({ numCart: totalQuantity });
})
animationAllFunc()
navigateToCart()
menuListFunc();
openMenuDetFunc();
showAllProducts().then(() => {
    productAnimation()
});
searchFunc()