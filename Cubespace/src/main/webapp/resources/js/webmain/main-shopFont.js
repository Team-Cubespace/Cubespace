/* 값을 저장할 변수 선언 */
let memberNo;

/* 검색 클릭 시 돋보기 색변경 */
const goodsSearch = document.querySelector(".goods-search")
const searchImg=document.querySelector(".search-img")

goodsSearch.addEventListener("focus",()=>{
    searchImg.style.filter="invert(15%) sepia(77%) saturate(6158%) hue-rotate(267deg) brightness(110%) contrast(108%)";
})
goodsSearch.addEventListener("blur",()=>{
    searchImg.style.filter="";
})

/* 상점 카테고리 */
const shopFont = document.querySelector(".shop-font")
const shopMusic = document.querySelector(".shop-music")
const shopMiniroom = document.querySelector(".shop-miniroom")

const shopName = ()=>{
    shopFont.classList.add("select1");
    shopMusic.classList.remove("select1");
    shopMiniroom.classList.remove("select1");
}
/* 페이지 실행시 즉시 실행 함수 */
(shopName)();
/* 폰트상점 클릭 시 */
shopFont.addEventListener("click", () => {
    shopName();
})
/* 배경음악 상점 클릭 시 */
shopMusic.addEventListener("click", () => {
    shopFont.classList.remove("select1");
    shopMusic.classList.add("select1");
    shopMiniroom.classList.remove("select1");
})
/* 미니룸 소품 상점 클릭 시 */
shopMiniroom.addEventListener("click", () => {
    shopFont.classList.remove("select1");
    shopMusic.classList.remove("select1");
    shopMiniroom.classList.add("select1");
})


/* 최신폰트 / 인기랭크 선택 */
const newGoodsBox =document.getElementById("newGoodsBox")
const shopRankBox =document.getElementById("shopRankBox")
/* 함수 선언 */
const rankSelect = () => {
    newGoodsBox.classList.add("select");
    shopRankBox.classList.remove("select");
    // 여기에 ajax로 리스트를 가져오는 코드 작성
    // 폰트번호
    // 폰트 이름
    // 폰트 경로
    // 폰트 제작자
    // 내가 보유중

    $.ajax({
        url:"/shopNewFont",
        data: {"loginMemberNo":loginMemberNo},
        dataType : "JSON",
        success : newFontList =>{

            const shopRankLsit = querySelector(".shop-rank-lsit")
            shopRankLsit.innerHTML="" // 이전 내용 제거

            for(let newFont of newFontList){

                /* 회원번호 저장 */
                // memberNo= newFont.memberNo;
                
                const goods = document.createElement("div")
                goods.classList.add("goods")

                    /* new이미지 생성 */
                    const new_img = document.createElement("div")
                    new_img.classList.add("new-img")
                    new_img.setAttribute("src","/resources/images/common/shopNew2.png")

                    const new_img = document.createElement("div")

            }
        }
    })
};
/* 함수 즉시 실행 */
(rankSelect)();

/* 최신상품 클릭 시 */
newGoodsBox.addEventListener("click", () => {
    rankSelect();
})
/* 인기랭킹 클릭 시 */
shopRankBox.addEventListener("click", () => {
    // 여기에 ajax로 리스트를 가져오는 코드 작성
    shopRankBox.classList.add("select");
    newGoodsBox.classList.remove("select");
})


// 만약 보유중인 상품이라면? ( 보유중 or 메시지로 이미 보유중)