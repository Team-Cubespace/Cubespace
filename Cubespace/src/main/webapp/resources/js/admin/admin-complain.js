const order = document.getElementById("order");
const orderInput = document.getElementById("orderInput");

const orderBy = () => {

    switch (order.value) {
        case "order1": orderInput.value = 1; break;
        case "order2": orderInput.value = 2; break;
    }
    document.getElementById("frmSearchBase").submit();
};


/* 상품등록 페이지 이동 */
document.getElementById("goodsAddBtn").addEventListener("click", e => {
    location.href = "/admin/goods/font";
})



//팝업 띄우기
function openPop() {
    document.getElementsByClassName("popup_box")[0].style.display = "block";
}

// 팝업 닫기
function closePop() {
    document.getElementsByClassName("popup_box")[0].style.display = "none";
}