/* 값을 저장할 변수 선언 */
let fontNo;

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

    $.ajax({
        url:"/shopNewFont",
        data: {"loginMemberNo":loginMemberNo},
        dataType : "JSON",
        success : newFontList =>{

            const shopRankLsit =document.querySelector(".shop-rank-lsit")
            shopRankLsit.innerHTML=""; // 이전 내용 제거

            for(let newFont of newFontList){

                /* 회원번호 저장 */
                fontNo= newFont.fontNo;
                
                const goods = document.createElement("div")
                goods.classList.add("goods")

                    /* new이미지 생성 */
                    const new_img = document.createElement("img")
                    new_img.classList.add("new-img")
                    new_img.setAttribute("src","/resources/images/common/shopNew2.png")
                    
                    /* 예시용 폰트화면 생성 */
                    const goods_example = document.createElement("div")
                    goods_example.classList.add("goods-example")
                    goods_example.style.fontFamily= "'"+newFont.fontNo+"'";
                    goods_example.innerText="우리들의 작은 공간 큐브스페이스에서 시작하세요"
                    
                    const goods_info = document.createElement("div")
                    goods_info.classList.add("goods-info")

                        /* 폰트 이름 생성 */
                        const goods_title = document.createElement("div")
                        goods_title.classList.add("goods-title")
                        goods_title.innerText=newFont.fontName;

                        /* 폰트 제작자 생성 */
                        const goods_producer = document.createElement("div")
                        goods_producer.classList.add("goods-producer")
                        goods_producer.innerText=newFont.fontProducer;

                        const goods_info_div = document.createElement("div")

                            /* 사용횟수 생성 */
                            const goods_count =document.createElement("div")
                            goods_count.classList.add("goods-count")
                            goods_count.innerText="사용횟수 : "+newFont.fontCount;

                            /* 사용하기 or 보유중버튼 생성*/
                            const goods_btn =document.createElement("div")
                            if(newFont.fontNo==newFont.goodsNo){// 보유중
                                goods_btn.classList.add("holding")
                                goods_btn.innerText="보유중"
                                
                            }else{ // 사용가능
                                goods_btn.classList.add("goods-btn")
                                goods_btn.innerText="사용하기"
                                goods_btn.setAttribute("onclick","return goodsAdd("+newFont.fontNo,shopCathNo+", this)");
                            }

                shopRankLsit.append(goods);
                    goods.append(new_img,goods_example,goods_info);
                        goods_info.append(goods_title,goods_producer,goods_info_div);
                            goods_info_div.append(goods_count,goods_btn);
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


// 사용하기 클릭시
// 폰트번호, 카테고리를 가져와서 비동기로 인설트
// 버튼 변경