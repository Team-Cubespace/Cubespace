const slideContainer = new Swiper(".swiper-container", {
    loop:true,
    pagination : {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev"
    }
})