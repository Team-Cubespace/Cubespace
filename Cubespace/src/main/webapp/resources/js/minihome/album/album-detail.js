// 이미지 요소 가져오기
const swiperSlid = document.getElementsByClassName("swiper-slide");

// 이미지가 2개 이상일 때만 슬라이드 기능 추가
if(swiperSlid.length > 1) {
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
}