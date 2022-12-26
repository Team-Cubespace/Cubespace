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
    
    $.ajax({
        url : "/manage/menu/categorySelect",
        data : "checkArr",
        type : "get",
        success : result => {
            if(result > 0) {alert("변경사항이 저장되었습니다")}
            else {alert("변경사항 저장 실패")}
        },
        error : () => {console.log("변경사항 저장 중 오류 발생");}
    })
    window.href = window.href;
    
})


/* 원래대로(모든 메뉴 사용) */
menuSelectCancelBtn.addEventListener("click", () => {

    
    for(let useMenu of useMenuList){
        useMenu.checked = true;
    }

    $.ajax({
        url : "/manage/menu/categorySelectCancel",
        type:"get",
        data : {"memberNo" : loginMember.memberNo},
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
        console.log(orderString);
    }
    const orderArr = Array.from(orderString);
    console.log(orderArr[0]);
    console.log(orderArr[1]);
    console.log(orderArr[2]);
    console.log(orderArr[3]);
    console.log(memberNo);

    $.ajax({
        url : "/manage/menu/changeCategory",
        type: "get",
        data : {
                "diary" : orderArr[0],
                "album" : orderArr[1],
                "video" : orderArr[2],
                "guestBook" : orderArr[3],
                "memberNo": memberNo},
        success : result => {
            if(result > 0) {
                alert("변경사항이 저장되었습니다");
            } else {
                alert("변경사항 저장 실패");
            }
        },
        error : () => {console.log("변경사항 저장 중 오류 발생");}
    })
})

/* ------------------------------------------- */
/* 폴더 추가 */


/* ------------------------------------------- */
/* 폴더 관리 */


    /* "+"버튼 클릭시 */
    document.getElementsByClassName("fa-plus")[0].addEventListener("click", e => {

        const categoryName = e.target.parentElement.firstElementChild.innerText;
 
        
        const category = e.target.parentElement.parentElement;


        if(category.classList.contains("diary")){
            const subCategoryLength = document.querySelectorAll(".diary  .subCategory").length;
            const lastSubCath = document.querySelectorAll(".diary  .subCategory")[subCategoryLength-1];

            const img = document.createElement("img");
            img.src = "/resources/images/common/folder.png";
            img.classList.add("subCategoryImg");

            const span = document.createElement("span");
            span.classList.add("folderTitle");
            span.innerText = "나의 다이어리";

            const i = document.createElement("i");
            i.classList.add("fa-solid");
            i.classList.add("fa-minus");

            const div = document.createElement("div");
            div.classList.add("subCategory");
            div.setAttribute("name", Number(subCategoryLength)+1);

            div.append(img/* , '&nbsp;' */, span, i);

            lastSubCath.after(div);

            $.ajax({
                url:"/manage/menu/addFolder",
                data : {"boardTypeNo" : "1", "folderName" : "나의 다이어리",
                    "folderOrder" : Number(subCategoryLength)+1,
                    "memberNo" : loginMember.memberNo},
                type:"get",
                success : result => {
                    if(result > 0) {console.log("폴더 삽입 성공");}
                    else {console.log("폴더 삽입 실패");}
                },
                error : () => {alert("폴더 삽입 중 오류 발생")}
            })
        }









        
    })


    /* "-"버튼 클릭시 */

