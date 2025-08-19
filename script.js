// ? Animation Function
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText)

const animationAllFunc = () => {
    ScrollSmoother.create({
        smooth: 1.3
    })

    // Initialitation
    let master = gsap.timeline()

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
        tagAnimTimeline.from("#taglineH1", {
            y: "50%",
            autoAlpha: 0,
            duration: 0.5
        })
    }

    // About Animation
    const aboutAnimation = () => {
        let split = SplitText.create(".wrap-text h2", {
            type: "words, chars"
        })
        
        let aboutTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".tagline",
                start: "bottom 30%"
            },
            ease: "power2.in"
        })
        aboutTimeline.from(split.chars, {
            scaleX: "-1",
            textAlign: "right",
            autoAlpha: 0,
            duration: 0.7
        })
        aboutTimeline.from(".wrap-text .detail", {
            y: "40px",
            autoAlpha: 0,
            duration: 0.6,
            delay: 0.1
        })
    }

    // Menu Animation
    const menuAnimation = () => {
        let split = SplitText.create(".menu h2", {
            type: "words, chars"
        })

        let menuTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-us",
                start: "bottom 30%"
            }
        })
        menuTimeline.from(split.chars, {
            scaleX: "-1",
            autoAlpha: 0,
            duration: 0.7
        })
        menuTimeline.from(".wrapper-menu .box", {
            y: "50px",
            autoAlpha: 0,
            duration: 0.6,
            delay: 0.2,
            stagger: 0.3
        })
        menuTimeline.from(".menu #menu-btn", {
            autoAlpha: 0,
            delay: 0.2,
            duration: 0.7
        })
    }

    // Location Animation
    const locationAnimation = () => {
        let split = SplitText.create(".location .wrap-text h2", {
            type: "words, chars"
        })

        let locAnimTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".menu",
                start: "bottom 30%"
            },
            ease: "power2.in"
        })
        locAnimTimeline.from(split.chars, {
            scaleX: "-1",
            textAlign: "right",
            autoAlpha: 0,
            duration: 0.7
        })
        locAnimTimeline.from(".detail-location", {
            y: "40px",
            autoAlpha: 0,
            duration: 0.6,
            delay: 0.1
        })
    }

    master
        .add(taglineAnimation())
        .add(aboutAnimation())
        .add(menuAnimation())
        .add(locationAnimation())

}

// ? Function navigate to Shop Section
const navigateShopFunc = () => {
    const toggleShop = document.getElementById("btn-shop")

    toggleShop.addEventListener("click", () => {
        window.location.href = './shop-section/shop.html'
    })
}

// ? Function navigate to each section
const navigateToSection = () => {
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

    // Large Device
    const homeToggle = document.getElementById("home-toggle")
    const aboutToggle = document.getElementById("about-us-toggle")
    const menuToggle = document.getElementById("menu-toggle")
    const locationToggle = document.getElementById("location-toggle")
    const galleryToggle = document.getElementById("gallery-toggle")
    
    homeToggle.addEventListener("click", () => scrollToSection("home"))
    aboutToggle.addEventListener("click", () => scrollToSection("about-us"))
    menuToggle.addEventListener("click", () => scrollToSection("menu"))
    locationToggle.addEventListener("click", () => scrollToSection("location"))
    galleryToggle.addEventListener("click", () => scrollToSection("gallery"))

    // Mobile
    const homeToggleMobile = document.getElementById("home-mobile")
    const aboutToggleMobile = document.getElementById("about-us-mobile")
    const menuToggleMobile = document.getElementById("menu-mobile")
    const locationToggleMobile = document.getElementById("location-mobile")
    const galleryToggleMobile = document.getElementById("gallery-mobile")

    homeToggleMobile.addEventListener("click", () => scrollToSection("home"))
    aboutToggleMobile.addEventListener("click", () => scrollToSection("about-us"))
    menuToggleMobile.addEventListener("click", () => scrollToSection("menu"))
    locationToggleMobile.addEventListener("click", () => scrollToSection("location"))
    galleryToggleMobile.addEventListener("click", () => scrollToSection("gallery"))
}

// ? Function of Get Image in Gallery Section
const getImageFunc = async() => {
    try {
        const result = await fetch("./data/gallery.json")
        const { image } = await result.json()
        let wrapperGallery = document.querySelector(".wrapper-gallery")
        
        let showData = ""
        image.forEach(data => {
            showData += `<a id="linkImg" href="${data.link}" target="_blank">
                <img id="img" src="${data.img}" loading="lazy">
            </a>`
        })
        wrapperGallery.innerHTML = showData;
    } catch(err) {
        console.log(err)
    }
}
// Gallery Animation
const galleryAnimation = () => {
    let split = SplitText.create(".gallery h2", {
        type: "words, chars"
    })

    let menuTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".location",
            start: "bottom 30%"
        }
    })
    menuTimeline.from(split.chars, {
        scaleX: "-1",
        autoAlpha: 0,
        duration: 0.7
    })
    menuTimeline.from(".wrapper-gallery #linkImg", {
        y: "50px",
        autoAlpha: 0,
        duration: 0.6,
        delay: 0.2,
        stagger: 0.3
    })
    menuTimeline.from(".gallery #btn-follow", {
        autoAlpha: 0,
        delay: 0.2,
        duration: 0.7
    })
}

// ? Function navigate to Maps
const navigateMapsFunc = () => {
    const toggleLocation = document.getElementById("btn-location")

    toggleLocation.addEventListener("click", () => {
        window.location = 'https://maps.app.goo.gl/Q8uP91MZGFRZuskx6'
    })
}

// ? Nav detail function
const navDetailFunc = () => {
    const navDetail = document.querySelector(".nav-detail")
    const toggleMenu = document.getElementById("toggle-menu")
    const toggleClose = document.getElementById("toggle-close")

    toggleMenu.addEventListener("click", () => {
        navDetail.style.transform = "translateX(0)"
    })
    toggleClose.addEventListener("click", () => {
        navDetail.style.transform = "translateX(100%)"
    })
}

// ! Execution Code
animationAllFunc();
navigateToSection();
navigateShopFunc()
getImageFunc().then(() => {
    galleryAnimation()
});
navDetailFunc();
navigateMapsFunc();