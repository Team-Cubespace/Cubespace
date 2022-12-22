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
    
    var len = $("input[name='useMenu']:checked").length;
    var checkArr = [];
    
    $("input[name='useMenu']:checked").each(function(e){
        var value = $(this).val();
        checkArr.push(value);        
    })
    

    console.log(checkArr);
    
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

    $.ajax({
        url : "/manage/menu",
        type: "get",
        data : {
                "diary" : orderArr[1],
                "album" : orderArr[2],
                "video" : orderArr[3],
                "guestBook" : orderArr[4],
            /*  */},
        success : result => {
            if(result > 0) {

            }
        }
    })
})