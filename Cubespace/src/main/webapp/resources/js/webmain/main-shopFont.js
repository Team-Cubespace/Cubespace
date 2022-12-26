// 클릭 시 돋보기 색변경
const goodsSearch = document.querySelector(".goods-search")
const searchImg=document.querySelector(".search-img")

goodsSearch.addEventListener("focus",()=>{

    searchImg.style.filter="invert(15%) sepia(77%) saturate(6158%) hue-rotate(267deg) brightness(110%) contrast(108%)";
})
goodsSearch.addEventListener("blur",()=>{

    searchImg.style.filter="";
})