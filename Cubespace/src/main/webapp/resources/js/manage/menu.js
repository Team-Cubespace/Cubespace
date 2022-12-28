/* ---------------------------------------- */
/* 정렬 함수 */
$(function () {
    $("#sortable1").sortable();
});
$(function () {
    $("#sortable2").sortable();
});
$(function () {
    $("#sortable3").sortable();
});
$(function () {
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

    $("input[name='useMenu']:checked").each(function (e) {
        var value = $(this).val();
        checkArr.push(value);
    })

    console.log(checkArr);

    if (!checkArr.includes("diary")) {
        diaryOrder = -1;
    }
    if (!checkArr.includes("album")) {
        albumOrder = -1;
    }
    if (!checkArr.includes("video")) {
        videoOrder = -1;
    }
    if (!checkArr.includes("guestBook")) {
        guestBookOrder = -1;
    }
    console.log(checkArr);


    $.ajax({
        url: "/manage/menu/categorySelect",
        data: {
            "diary": diaryOrder, "album": albumOrder,
            "video": videoOrder, "guestBook": guestBookOrder,
            "memberNo": memberNo
        },
        type: "get",
        success: result => {
            if (result > 0) { alert("변경사항이 저장되었습니다") }
            else { alert("변경사항 저장 실패") }
        },
        error: () => { console.log("변경사항 저장 중 오류 발생"); }
    })
    window.href = window.href;

})


/* 원래대로(모든 메뉴 사용) */
menuSelectCancelBtn.addEventListener("click", () => {


    for (let useMenu of useMenuList) {
        useMenu.checked = true;
    }

    $.ajax({
        url: "/manage/menu/categorySelectCancel",
        type: "get",
        data: { "memberNo": memberNo },
        success: result => {
            if (result > 0) {
                alert("메뉴설정을 변경 완료했습니다");
                location.reload(true);
            }
            else { console.log("메뉴설정 변경 실패"); }
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
    for (let category of categoryArea) {
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
        url: "/manage/menu/changeCategory",
        type: "get",
        data: {
            "diary": orderArr[0],
            "album": orderArr[1],
            "video": orderArr[2],
            "guestBook": orderArr[3],
            "memberNo": memberNo
        },
        success: result => {
            if (result > 0) {
                alert("변경사항이 저장되었습니다");
            } else {
                alert("변경사항 저장 실패");
            }
        },
        error: () => { console.log("변경사항 저장 중 오류 발생"); }
    })
})

/* ------------------------------------------- */
/* 폴더 추가 */


/* ------------------------------------------- */
/* 폴더 관리 */


/* "+"버튼 클릭시 */
const plusBtnList = document.getElementsByClassName("fa-plus");
for (let plusBtn of plusBtnList) {

    plusBtn.addEventListener("click", e => {

        // 다이어리, 사진첩, 동영상
        const categoryName = e.target.parentElement.firstElementChild.innerText;
        console.log(categoryName);

        // 카테고리 이름에 따른 boardType 설정
        let boardTypeNo = 0;
        if (categoryName == '다이어리') {
            boardTypeNo = 1;
        }
        if (categoryName == '사진첩') {
            boardTypeNo = 2;
        }
        if (categoryName == '동영상') {
            boardTypeNo = 3;
        }


        // createElement를 위한 카테고리 추출
        const category = e.target.parentElement.parentElement;
        // <div class="diary" style="order:${categoryOrder.diary}"> 등등..

        // 해당 카테고리 폴더의 수
        const subCategoryLength = document.querySelectorAll(".diary  .subCategory").length;

        // 해당 카테고리의 마지막 폴더
        const lastSubCath = category.firstElementChild.nextElementSibling.lastElementChild;

        console.log(category);
        console.log(subCategoryLength);
        console.log(lastSubCath);


        const img = document.createElement("img");
        img.src = "/resources/images/common/folder.png";
        img.classList.add("subCategoryImg");

        const span = document.createElement("span");
        span.classList.add("folderTitle");
        const folderName = "나의 " + categoryName; // ajax에 사용
        span.innerText = folderName;

        const i = document.createElement("i");
        i.classList.add("fa-solid");
        i.classList.add("fa-minus");

        const div = document.createElement("div");
        div.classList.add("subCategory");
        div.setAttribute("name", Number(subCategoryLength) + 1); // ajax에 사용

        div.append(img, span, i);
        lastSubCath.after(div);



        $.ajax({
            url: "/manage/menu/addFolder",
            data: {
                "boardTypeNo": boardTypeNo, "folderName": folderName,
                "folderOrder": Number(subCategoryLength) + 1,
                "memberNo": memberNo
            },
            type: "get",
            success: result => {
                if (result > 0) { console.log("폴더 삽입 성공"); }
                else { console.log("폴더 삽입 실패"); }
            },
            error: () => { alert("폴더 삽입 중 오류 발생") }
        })

    })
}




/* "-"버튼 클릭시 */

