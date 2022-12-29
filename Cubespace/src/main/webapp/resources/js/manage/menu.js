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
    } else if(diaryOrder == -1){ // 해제->체크시 원래의 order값 부여
        diaryOrder = 1;
    }

    if (!checkArr.includes("album")) {
        albumOrder = -1;
    }else if(albumOrder == -1){ // 해제->체크시 원래의 order값 부여
        albumOrder = 1;
    }

    if (!checkArr.includes("video")) {
        videoOrder = -1;
    }else if(videoOrder == -1){ // 해제->체크시 원래의 order값 부여
        videoOrder = 1;
    }

    if (!checkArr.includes("guestBook")) {
        guestBookOrder = -1;
    }else if(guestBookOrder == -1){ // 해제->체크시 원래의 order값 부여
        guestBookOrder = 1;
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
            if (result > 0) { 
                alert("변경사항이 저장되었습니다")
                window.parent.location.reload();
            }
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
                window.parent.location.reload();
            }
            else { console.log("메뉴설정 변경 실패"); }
        }
    })
})



/* ---------------------------------------- */
/* 메뉴설정 변경*/
const orderCategory = () => {

    /* 카테고리 정렬 */
    const categoryArea = document.getElementsByClassName("categoryArea");
    let orderString = "";
    for (let category of categoryArea) {
        orderString += category.getAttribute("name");
    }
    // ['1', '4', '2']라면 다이어리-방명록-사진첩
    const orderArr = Array.from(orderString);




    document.getElementById("newDiaryOrder").value = -1;
    document.getElementById("newAlbumOrder").value = -1;
    document.getElementById("newVideoOrder").value = -1;
    document.getElementById("newGuestBookOrder").value = -1;

    for(let i = 0; i < orderArr.length; i++){
        if(orderArr[i] == 1){
            document.getElementById("newDiaryOrder").value = i+1;
        }
        if(orderArr[i] == 2){
            document.getElementById("newAlbumOrder").value = i+1;
        }
        if(orderArr[i] == 3){
            document.getElementById("newVideoOrder").value = i+1;
        }
        if(orderArr[i] == 4){
            document.getElementById("newGuestBookOrder").value = i+1;
        }
    }


    document.getElementById("memberNo").value = memberNo;



    /* 폴더 정렬 */
    if(diaryOrder != -1){ // 다이어리 카테고리 존재시
    // list에서 하나씩 꺼내서 getAttribute("name")으로 <<folderNo를>>빈 orderString에 하나씩 더함
    // input type=hidden, name="diaryFolderOrder"을 만들고 value값에 orderString을 더함

        const diaryFolderList = document.querySelectorAll(".diary .subCategory"); //  .diary 밑의 .subCategory
        let diaryOrderString = "";
        for(let diaryFolder of diaryFolderList){
            diaryOrderString += diaryFolder.getAttribute("id") + ",";
        }
        diaryOrderString += "0"; // 마지막이 콤마로 끝나지 않기 위해
        document.getElementById("diaryFolderOrder").value = diaryOrderString; // 61,1,129,131,132,134,137,
    }


    if(albumOrder != -1){ 

        const albumFolderList = document.querySelectorAll(".album .subCategory"); 
        let albumOrderString = "";
        for(let albumFolder of albumFolderList){
            albumOrderString += albumFolder.getAttribute("id") + ",";
        }
        albumOrderString += "0";
        document.getElementById("albumFolderOrder").value = albumOrderString; 
    }

    if(videoOrder != -1){ 

        const videoFolderList = document.querySelectorAll(".video .subCategory"); 
        let videoOrderString = "";
        for(let videoFolder of videoFolderList){
            videoOrderString += videoFolder.getAttribute("id") + ",";
        }
        videoOrderString += "0";
        document.getElementById("videoFolderOrder").value = videoOrderString; 
    }



    return true;
}




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




        const img = document.createElement("img");
        img.src = "/resources/images/common/folder.png";
        img.classList.add("subCategoryImg");

        const input = document.createElement("input");
        input.classList.add("folderTitle");
        const folderName = "나의 " + categoryName; // ajax에 사용
        input.value = folderName;
        input.setAttribute("maxlength", "20");

        const i = document.createElement("i");
        i.classList.add("fa-solid");
        i.classList.add("fa-minus");

        const div = document.createElement("div");
        div.classList.add("subCategory");
        div.setAttribute("name", Number(subCategoryLength) + 1); // ajax에 사용

        div.append(img, input, i);
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
                if (result > 0) { 
                    console.log("폴더 삽입 성공");
                    input.setAttribute("name", result);
                    div.setAttribute("name", result);
                }
                else { console.log("폴더 삽입 실패"); }
            },
            error: () => { alert("폴더 삽입 중 오류 발생") }
        })

    })
}




/* "-"버튼 클릭시 */
const minusBtnList = document.getElementsByClassName("fa-minus");
for (let minusBtn of minusBtnList) {
    minusBtn.addEventListener("click", e => {

        const categoryName = e.target.parentElement.parentElement.parentElement; // diary, album, video
        const folderOrder = e.target.parentElement.getAttribute("name"); //해당 폴더의 folderOrder
        const folderNo = e.target.parentElement.getAttribute("id"); //해당 폴더의 folderNo
        const subCategoryLength = e.target.parentElement.parentElement.childElementCount; // 해당 카테고리의 폴더 갯수
        const fileCount = e.target.getAttribute("name"); // 해당 폴더의 파일갯수
        // 카테고리 이름에 따른 boardType 설정
        
        let boardTypeNo = 0;
        if (categoryName.classList.contains("diary")) {
            boardTypeNo = 1;
        }
        if (categoryName.classList.contains("album")) {
            boardTypeNo = 2;
        }
        if (categoryName.classList.contains("video")) {
            boardTypeNo = 3;
        }



        // subCategoryLength가 1일때(diary카테고리는 2일때) 삭제 불가능하도록
        if(categoryName.classList.contains("diary")){
            if(subCategoryLength == 2){
                alert("적어도 한 개의 폴더가 존재해야 합니다");
                return;
            }
        } else {
            if(subCategoryLength == 1){
                alert("적어도 한 개의 폴더가 존재해야 합니다");
                return;
            }
        }

        
        // 폴더에 게시글이 존재할 경우 삭제가 불가능
        if(fileCount > 0) {
            alert("폴더에 글이 존재할 경우 삭제가 불가능합니다");
            return;
        }


        // 4번째 폴더를 삭제했으면 그 뒤 폴더들의 순서도 하나씩 밀기
        // 전체 폴더가 6개고, 4번째를 삭제했으면 
        // 1) n번째 폴더 delete
        // 2) for문 돌려서(5번째->4번째 / 6번째->5번째로 update)
        $.ajax({
            url : "/manage/menu/deleteFolder",
            type : "get",
            data : {"boardTypeNo" : boardTypeNo, "folderOrder" : folderOrder,
                    "folderNo" : folderNo, "subCategoryLength": subCategoryLength,
                    "memberNo" : memberNo},
            success : result => {
                if(result > 0){
                    alert("폴더가 삭제되었습니다");
                    location.href = location.href;
                } else{
                    console.log("폴더 삭제 실패");
                }
            },
            error : e => {console.log("폴더 삭제 중 오류 발생");}
        // })
        })
    })
}


