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
// 폰트 등록하기(form-submit, post)





// 폰트 수정하기(ajax)
const updateFontList = document.getElementsByClassName("updateFont");
for(let updateFont of updateFontList){
    updateFont.addEventListener("click", e => {

        document.getElementById("signUpBtn").innerText = "폰트 수정 완료";
        document.getElementById("formTitle").innerText = "폰트 수정";

        const fontNo = e.target.getAttribute("name");
        const tempList = document.getElementsByClassName(fontNo);
        const fontName = tempList[0];
        const fontpath = tempList[1].getAttribute("name");
        const fontCreater = tempList[2];

        document.getElementById("fontNameInput").value = fontName;
        document.getElementById("fontPathInput").value = fontpath;
        document.getElementById("fontCreaterInput").value = fontCreater;
        
    })
}