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
function openPop2() {
    document.getElementById("popup_layer2").style.display = "block";
}

// 팝업 닫기
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
0