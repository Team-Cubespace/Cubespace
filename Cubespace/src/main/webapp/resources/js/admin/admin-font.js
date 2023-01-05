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
function openPop() {
    document.getElementById("popup_layer").style.display = "block";
}

function openPop2() {
    document.getElementById("popup_layer2").style.display = "block";
}

// 팝업 닫기
function closePop() {
    document.getElementById("popup_layer").style.display = "none";
}
function closePop2() {
    document.getElementById("popup_layer2").style.display = "none";
}



document.getElementById("fontAddBtn").addEventListener("click", openPop2);



/* -------------------------------------------------------------- */
// 폰트 삭제하기
const deleteFontList = document.getElementsByClassName("deleteFont");
for(let deleteFont of deleteFontList){
    deleteFont.addEventListener("click", e => {
        if(confirm("정말 폰트를 삭제하시겠습니까?")){
            const fontNo = e.target.getAttribute("name");
            location.href =  "/admin/font/deleteFont?fontNo=" + fontNo;
        }
    })
}