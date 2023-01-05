// 정렬
const order = document.getElementById("order");
const orderInput = document.getElementById("orderInput");

const orderBy = () => {

    switch (order.value) {
        case "order1": orderInput.value = 1; break;
        case "order2": orderInput.value = 2; break;
        case "order3": orderInput.value = 3; break;
        case "order4": orderInput.value = 4; break;
    }

    document.getElementById("frmSearchBase").submit();
};




/* -------------------------------------------------------------- */

//팝업 띄우기
function openPop1() {
    document.getElementById("popup_layer1").style.display = "block";
}
function openPop2() {
    document.getElementById("popup_layer2").style.display = "block";
}

// 팝업 닫기
function closePop1() {
    document.getElementById("popup_layer1").style.display = "none";
}
function closePop2() {
    document.getElementById("popup_layer2").style.display = "none";
}

/* -------------------------------------------------------------- */

// 상품정보 등록
document.getElementById("goodsAddBtn").addEventListener("click", openPop2);



// 상품정보 삭제
const deleteGoodsList = document.getElementsByClassName("deleteGoods");
for(let deleteGoods of deleteGoodsList){
    deleteGoods.addEventListener("click", e=>{

        console.log(e.target.getAttribute("name"));
        if(confirm("정말 상품 정보를 삭제하시겠습니까?")){
            const goodsNo = e.target.getAttribute("name");
            location.href =  "/admin/goods/deleteGoods?goodsNo=" + goodsNo;
        }
    })
}


/* -------------------------------------------------------------- */
// 미니홈피 배경색 변경
document.getElementById("updateAllColorBtn").addEventListener("click", openPop1);

// 프레임 폰트색 결정
const frameFontColor = document.getElementById("frameFontColor");
document.getElementById("frameMenuColorInput").addEventListener("change", e => {
    if(e.target.value != undefined){
        frameFontColor.value = getTextColorByBackgroundColor(e.target.value);
        console.log(frameFontColor.value);
    }
})


/* 배경색에 ‘어두움 정도’ 따라 텍스트의 색상 결정 */
function getTextColorByBackgroundColor(hexColor) {

    const c = hexColor.substring(1)      // 색상 앞의 # 제거
    const rgb = parseInt(c, 16)   // rrggbb를 10진수로 변환
    const r = (rgb >> 16) & 0xff  // red 추출
    const g = (rgb >> 8) & 0xff  // green 추출
    const b = (rgb >> 0) & 0xff  // blue 추출

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

    // 색상 선택
    return luma < 127.5 ? "white" : "black" // 글자색이
}

