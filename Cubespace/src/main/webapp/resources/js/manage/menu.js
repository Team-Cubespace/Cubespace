/* ---------------------------------------- */
/* 정렬 함수 */
$(function() {
    $("#sortable1").sortable();
});
$(function() {
    $("#sortable2").sortable();
});
$(function() {
    $("#sortable3").sortable();
});
$(function() {
    $("#sortable4").sortable();
});



/* ---------------------------------------- */
/* 상단메뉴 관리 */
const menuSelectBtn = document.getElementById("menuSelectBtn");
const menuSelectCancelBtn = document.getElementById("menuSelectCancelBtn");
const useMenuList = document.querySelectorAll("input[name='useMenu']");




/* 변경사항 저장 */
menuSelectBtn.addEventListener("click", () => {
    
    var checkArr = [];
    
    $("input[name='useMenu']:checked").each(function(e){
        var value = $(this).val();
        checkArr.push(value);        
    })
    // console.log(checkArr);
    window.href = window.href;
    
})


/* 원래대로(모든 메뉴 사용) */
menuSelectCancelBtn.addEventListener("click", () => {

    
    for(let useMenu of useMenuList){
        useMenu.checked = true;
    }

    $.ajax({
        url : "/manage/menu/menuSelectCancel",
        type:"get",
        success :  result=> {
            if(result > 0) {
                alert("메뉴설정을 변경 완료했습니다");
                location.reload(true);
            }
            else {console.log("메뉴설정 변경 실패");}
        }
    })
})




/* ---------------------------------------- */
/* 메뉴설정 변경

*/
/* 카테고리 정렬 */
document.getElementById("menuSaveBtn").addEventListener("click", () => {

    const categoryArea = document.getElementsByClassName("categoryArea");
    let orderString = "";
    for(let category of categoryArea){
        orderString += category.getAttribute("name");
    }
    const orderArr = Array.from(orderString);

    // $.ajax({
    //     url : "/manage/menu",
    //     type: "get",
    //     data : {
    //             "diary" : orderArr[1],
    //             "album" : orderArr[2],
    //             "video" : orderArr[3],
    //             "guestBook" : orderArr[4],
    //         /*  */},
    //     success : result => {
    //         if(result > 0) {

    //         }
    //     }
    // })
})

/* ------------------------------------------- */
/* 폴더 추가 */


/* ------------------------------------------- */
/* 폴더 관리 */
const diary = document.getElementsByClassName("diary")[0];
diary.addEventListener("click", e => {

    /* border추가 */
    const clickedList = document.getElementsByClassName("clicked");
    if(clickedList.length != 0) {
        for(let clicked of clickedList){
            clicked.classList.remove("clicked");
        }
    } else {

        diary.classList.add("clicked");
    
        /* "+"버튼 추가 */
        const fileAddBtn = document.createElement("i");
        fileAddBtn.classList.add("fa-solid");
        fileAddBtn.classList.add("fa-plus");
        diary.firstElementChild.append(fileAddBtn);
    
        /* "-"버튼 추가 */
        const folderList = document.querySelectorAll(".diary > .subCategoryArea > .subCategory");
        for(let i = 1; i < folderList.length; i++){
            const fileRemoveBtn = document.createElement("i");
            fileRemoveBtn.classList.add("fa-solid");
            fileRemoveBtn.classList.add("fa-minus");
    
            folderList[i].append(fileRemoveBtn);
        }
    }

    /* "+"버튼 클릭시 */
    document.getElementsByClassName("fa-plus")[0].addEventListener("click", e => {
        const subCategoryLength = document.querySelectorAll(".diary  .subCategory").length;
        const lastSubCath = document.querySelectorAll(".diary  .subCategory")[subCategoryLength-1];

        const img = document.createElement("img");
        img.src = "/resources/images/common/folder.png";
        img.classList.add("subCategoryImg");

        const span = document.createElement("span");
        span.classList.add("folderTitle");
        span.innerText = "나의 다이어리22";

        const div = document.createElement("div");
        div.classList.add("subCategory");
        div.setAttribute("name", Number(subCategoryLength)+1);

        div.append(img/* , '&nbsp;' */, span);

        lastSubCath.after(div);
    })

})