/* 값을 저장할 변수 선언 */
let goodsNo; //상품 번호



/* 검색 클릭 시 돋보기 색변경 */
const goodsSearch = document.querySelector(".goods-search")
const searchImg=document.querySelector(".search-img")
goodsSearch.addEventListener("focus",()=>{
    searchImg.style.filter="invert(15%) sepia(77%) saturate(6158%) hue-rotate(267deg) brightness(110%) contrast(108%)";
});
goodsSearch.addEventListener("blur",()=>{
    searchImg.style.filter="";
});

(()=>{
    const shopSearchInput = document.getElementById("shopSearch")
    if(shopSearchInput != null){ // 검색창 존재 여부 확인
        // 주소에서 쿼리스트링만 분리한 객체
        const params = new URL(location.href).searchParams;
        const shopSearch= params.get("shopSearch");

        // input에 이전 검색어를 값으로 추가
        shopSearchInput.value=shopSearch;
    }
})();

/* 상점 카테고리 */
const shopFont = document.querySelector(".shop-font");
const shopMusic = document.querySelector(".shop-music");
const shopMiniroom = document.querySelector(".shop-miniroom");
const shopFontMove = ()=>{
    shopFont.classList.add("select1");
    shopMusic.classList.remove("select1");
    shopMiniroom.classList.remove("select1");
}
const shopMusicMove = ()=>{
    shopFont.classList.remove("select1");
    shopMusic.classList.add("select1");
    shopMiniroom.classList.remove("select1");
}
const shopMiniroomMove = ()=>{
    shopFont.classList.remove("select1");
    shopMusic.classList.remove("select1");
    shopMiniroom.classList.add("select1");
}
/* 페이지 실행시 즉시 실행 함수 */
if(shopCathNo==1){
    (shopFontMove)();

}else if(shopCathNo==2){
    (shopMusicMove)();

}else{
    (shopMiniroomMove)();
}
/* 폰트상점 클릭 시 */
shopFont.addEventListener("click", () => {
    shopFontMove();
});
/* 배경음악 상점 클릭 시 */
shopMusic.addEventListener("click", () => {
    shopMusicMove();
});
/* 미니룸 소품 상점 클릭 시 */
shopMiniroom.addEventListener("click", () => {
    shopMiniroomMove();
});


/* 최신상품 / 인기랭크 선택 */
const newGoodsBox =document.getElementById("newGoodsBox");
const shopRankBox =document.getElementById("shopRankBox");
/* 최신상품목록 조회 함수 선언 */
const newGoodsSelect = () => {
    newGoodsBox.classList.add("select");
    shopRankBox.classList.remove("select");

    $.ajax({
        url:"/shopNewGoods",
        data: {"loginMemberNo":loginMemberNo,"shopCathNo":shopCathNo},
        dataType : "JSON",
        success : newGoodsList =>{

            const shopRankLsit =document.querySelector(".shop-rank-lsit");
            shopRankLsit.innerHTML=""; // 이전 내용 제거

            for(let newGoods of newGoodsList){
                /* 상품번호 저장 */
                goodsNo= newGoods.goodsNo;
                
                const goods = document.createElement("div");
                goods.classList.add("goods");

                    /* new이미지 생성 */
                    const new_img = document.createElement("img");
                    new_img.classList.add("new-img");
                    new_img.setAttribute("src","/resources/images/common/shopNew2.png");
                    
                    /* 예시용 화면 생성 */
                    const goods_example = document.createElement("div");
                    goods_example.classList.add("goods-example");

                    if(shopCathNo==1){ // 폰트 예시화면 생성
                        goods_example.style.fontFamily= "'"+newGoods.goodsNo+"'";
                        goods_example.innerText="우리들의 작은 공간 큐브스페이스에서 시작하세요";

                    }else if(shopCathNo==2){ // 배경음악 예시화면 생성
                        goods_example.classList.add("goods-lpimg");

                        const goods_exampleimg = document.createElement("img");
                        goods_exampleimg.classList.add("goods-exampleimg-music");
                        goods_exampleimg.setAttribute("src",""+newGoods.goodsImagePath+"");

                        goods_example.append(goods_exampleimg);

                    }else{ // 미니룸 소품 예시화면 생성
                        const goods_exampleimg = document.createElement("img");
                        goods_exampleimg.classList.add("goods-exampleimg-miniroom");
                        goods_exampleimg.setAttribute("src",""+newGoods.goodsPath+"");

                        goods_example.append(goods_exampleimg);
                    }
                    
                    const goods_info = document.createElement("div");
                    goods_info.classList.add("goods-info");

                        /* 상품 이름 생성 */
                        const goods_title = document.createElement("div");
                        goods_title.classList.add("goods-title");
                        goods_title.innerText=newGoods.goodsName;

                        /* 상품 제작자 생성 */
                        const goods_producer = document.createElement("div");
                        goods_producer.classList.add("goods-producer");
                        goods_producer.innerText=newGoods.goodsCreater;

                        const goods_info_div = document.createElement("div");

                            /* 사용횟수 생성 */
                            const goods_count =document.createElement("div");
                            goods_count.classList.add("goods-count");
                            goods_count.innerText="사용횟수 : "+newGoods.goodsCount;

                            /* 사용하기 or 보유중버튼 생성*/
                            const goods_btn =document.createElement("div");
                            if(newGoods.goodsNo==newGoods.useGoodsNo ){// 보유중
                                goods_btn.classList.add("goods-holding");
                                goods_btn.innerText="보유중";
                                
                            }else{ // 사용가능
                                goods_btn.classList.add("goods-btn","goods_"+newGoods.goodsNo+"");
                                goods_btn.innerText="사용하기";
                                goods_btn.setAttribute("onclick","goodsAdd("+goodsNo+","+shopCathNo+",this)");
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
(newGoodsSelect)();

/* 최신상품 클릭 시 */
newGoodsBox.addEventListener("click", () => {
    newGoodsSelect();
})
/* 인기랭킹 클릭 시 */
shopRankBox.addEventListener("click", () => {
    shopRankBox.classList.add("select");
    newGoodsBox.classList.remove("select");

    $.ajax({
        url:"/shopPopularGoods",
        data: {"loginMemberNo":loginMemberNo,"shopCathNo":shopCathNo},
        dataType : "JSON",
        success : popularGoodsList =>{

            const shopRankLsit =document.querySelector(".shop-rank-lsit");
            shopRankLsit.innerHTML=""; // 이전 내용 제거

            for(let popularGoods of popularGoodsList){

                /* 상품번호 저장 */
                goodsNo= popularGoods.goodsNo;
                
                const goods = document.createElement("div");
                goods.classList.add("goods");

                    /* new이미지 생성 */
                    const new_img = document.createElement("img");
                    new_img.classList.add("rank-img");
                    new_img.setAttribute("src","/resources/images/crown.png");
                    
                    /* 예시용 화면 생성 */
                    const goods_example = document.createElement("div");
                    goods_example.classList.add("goods-example");

                    if(shopCathNo==1){ // 폰트 예시화면 생성
                    goods_example.style.fontFamily= "'"+popularGoods.goodsNo+"'";
                    goods_example.innerText="우리들의 작은 공간 큐브스페이스에서 시작하세요";
                    
                }else if(shopCathNo==2){ // 배경음악 예시화면 생성
                    goods_example.classList.add("goods-lpimg");

                    const goods_exampleimg = document.createElement("img");
                    goods_exampleimg.classList.add("goods-exampleimg-music");
                    goods_exampleimg.setAttribute("src",""+popularGoods.goodsImagePath+"");

                    goods_example.append(goods_exampleimg);

                }else{ // 미니룸 소품 예시화면 생성
                    const goods_exampleimg = document.createElement("img");
                    goods_exampleimg.classList.add("goods-exampleimg-miniroom");
                    goods_exampleimg.setAttribute("src",""+popularGoods.goodsPath+"");

                    goods_example.append(goods_exampleimg);
                }

                    const goods_info = document.createElement("div");
                    goods_info.classList.add("goods-info");

                        /* 상품 이름 생성 */
                        const goods_title = document.createElement("div");
                        goods_title.classList.add("goods-title");
                        goods_title.innerText=popularGoods.goodsName;

                        /* 상품 제작자 생성 */
                        const goods_producer = document.createElement("div");
                        goods_producer.classList.add("goods-producer");
                        goods_producer.innerText=popularGoods.goodsCreater;

                        const goods_info_div = document.createElement("div");

                            /* 사용횟수 생성 */
                            const goods_count =document.createElement("div");
                            goods_count.classList.add("goods-count");
                            goods_count.innerText="사용횟수 : "+popularGoods.goodsCount;

                            /* 사용하기 or 보유중버튼 생성*/
                            const goods_btn =document.createElement("div");
                            if(popularGoods.goodsNo==popularGoods.useGoodsNo){// 보유중
                                goods_btn.classList.add("goods-holding");
                                goods_btn.innerText="보유중";
                                
                            }else{ // 사용가능
                                goods_btn.classList.add("goods-btn","goods_"+popularGoods.goodsNo+"");
                                goods_btn.innerText="사용하기";
                                goods_btn.setAttribute("onclick","goodsAdd("+goodsNo+","+shopCathNo+",this)");
                            }
                shopRankLsit.append(goods);
                    goods.append(new_img,goods_example,goods_info);
                        goods_info.append(goods_title,goods_producer,goods_info_div);
                            goods_info_div.append(goods_count,goods_btn);
            }
        }
    })
});

