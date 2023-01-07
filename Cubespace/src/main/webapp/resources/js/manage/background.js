/* 색, 이미지가 변경되었는지 여부를 확인하는 flag */
let BGColorFlag = false; // 배경색
let frameColorFlag = false; // 프레임색
let frameMenuColorFlag = false; // 프레임메뉴색




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



//-----------------------------------------------------------------------  
/* 적용하기 버튼 */


// 배경색 적용하기 버튼
const bgColorUse = document.getElementById("bgColorUse");
bgColorUse.addEventListener("click", e => {

    const newBGColor = BGColorInput.value;

    if (BGColorFlag) { // 배경색이 선택되었다면

        $.ajax({
            url: "/manage/background/updateBGColor",
            type: "get",
            data: { "newBGColor": newBGColor },
            success: result => {
                if (result > 0) {
                    alert("배경색이 변경되었습니다");
                    window.parent.location.reload();

                } else {
                    console.log("배경색 변경 실패");
                }
            },
            error: e => { console.log("배경색 변경 중 오류 발생"); }
        })
    } else {
        alert("배경색을 선택한 후 적용하기 버튼을 눌러주세요");
    }

})


// 프레임색 적용하기 버튼 
const frameUse = document.getElementById("frameUse");
frameUse.addEventListener("click", e => {

    if (frameColorFlag) {

        const newFrameColor = frameColorInput.value;
        $.ajax({
            url: "/manage/background/updateFrameColor",
            type: "get",
            data: { "newFrameColor": newFrameColor },
            success: result => {
                if (result > 0) {
                    alert("프레임색이 변경되었습니다");
                    window.parent.location.reload();

                } else {
                    console.log("프레임색 변경 실패");
                }
            },
            error: e => { console.log("프레임색 변경 중 오류 발생"); }
        })
    } else {
        alert("프레임색을 선택한 후 적용하기 버튼을 눌러주세요");
    }


})


// 프레임 메뉴색 적용하기 버튼 
const frameMenuUse = document.getElementById("frameMenuUse");
frameMenuUse.addEventListener("click", e => {

    if (frameMenuColorFlag) {

        const newFrameMenuColor = frameMenuColorInput.value;

        // 프레임 메뉴색에 따라 폰트색(black/white) 결정
        const newFrameFontColor = getTextColorByBackgroundColor(newFrameMenuColor);


        $.ajax({
            url: "/manage/background/updateFrameMenuColor",
            type: "get",
            data: { "newFrameMenuColor": newFrameMenuColor, "newFrameFontColor": newFrameFontColor },
            success: result => {
                if (result > 0) {
                    alert("프레임 메뉴색이 변경되었습니다");
                    window.parent.location.reload();

                } else {
                    console.log("프레임 메뉴색 변경 실패");
                }
            },
            error: e => { console.log("프레임 메뉴색 변경 중 오류 발생"); }
        })
    } else {
        alert("프레임 메뉴색을 선택한 후 적용하기 버튼을 눌러주세요");
    }


})





// 배경이미지 적용하기 버튼
const bgImageUse = document.getElementById("bgImageUse");
bgImageUse.addEventListener("click", e => {


    if (imageInput.files[0] != undefined) {

        const formData = new FormData($('#changeImageForm')[0]);
        // formData.append("image", imageInput.files[0]);

        for (var key of formData.keys()) {
            console.log(key);
        }
        for (var value of formData.values()) {
            console.log(value);
        }

        updateBGImage(formData);

    } else {
        alert("이미지를 등록한 후 적용하기 버튼을 눌러주세요");
    }
})

// 배경색/이미지 변경 메서드
const updateBGImage = formData => {

    // processData: false : Jquery 내부적으로 쿼리 스트링을 만들어 data 파라미터를 전송 -> 파일전송은 XX
    //    false로 선언 시 formData를 string으로 변환하지 않음

    // contentType: false : default 값이 앞서 이야기한 application/x-www-form-urlencoded이므로 false
    //    false 로 선언 시 content-type 헤더가 multipart/form-data로 전송되게 함

    $.ajax({
        url : "/manage/background/updateBGImage",
        type : "post",
        enctype: 'multipart/form-data',
        data : formData,
        processData: false,
        contentType: false,
        cache:false,
        success : result => {
            if(result > 0) {
                alert("배경이 변경되었습니다");
                window.parent.location.reload();

            } else {
                console.log("배경 변경 실패");
            }
        },
        error : e => {console.log("배경 변경 증 오류 발생");}
    })
}




//----------------------------------------------------------------------- 
/* 색상, 이미지 표현 */


// 전체 -색
const BGColorInput = document.getElementById("BGColorInput");
const bgColorShow = document.getElementById("bgColorShow");

BGColorInput.addEventListener("change", () => {

    BGColorFlag = true; // 배경색이 바뀌었음을 표시하는 flag
    bgColorShow.style.backgroundColor = BGColorInput.value;
});

/* 전체-이미지 */
const imageInput = document.getElementById("imageInput");
const imageShow = document.getElementById("imageShow");

imageInput.addEventListener("change", e => {

    if (e.target.files[0] != undefined) {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = e => {

            imageShow.src = e.target.result;
            if (!imageShow.classList.contains("bgImage")) {
                imageShow.classList.add("bgImage");
            }

        }
    }
})

// 전체-프레임 색
const frameColorInput = document.getElementById("frameColorInput");
const frameColorShow = document.getElementById("frameColorShow");

frameColorInput.addEventListener("change", () => {

    frameColorShow.style.backgroundColor = frameColorInput.value;

    frameColorFlag = true; // 프레임색이 바뀌었음을 표시하는 flag
});



//전체-프레임 메뉴색
const frameMenuColorInput = document.getElementById("frameMenuColorInput");
const frameMenuColorShow = document.getElementById("frameMenuColorShow");

frameMenuColorInput.addEventListener("change", () => {

    frameMenuColorFlag = true; // 프레임 메뉴색이 바뀌었음을 표시하는 flag
    frameMenuColorShow.style.backgroundColor = frameMenuColorInput.value;
});




//----------------------------------------------------------------------- 
/* 초기화 */

// 배경색, 배경이미지 초기화
const bgColorReturn = document.getElementById("bgColorReturn"); // 배경색
const bgImageReturn = document.getElementById("bgImageReturn"); // 배경색
bgColorReturn.addEventListener("click", e => { resetBGColor(); });
bgImageReturn.addEventListener("click", e => { resetBGColor(); });

const resetBGColor = () => {

    if (confirm("정말 초기화하시겠습니까?")) {

        $.ajax({
            url: "/manage/background/resetBGColor",
            type: "get",
            success: result => {
                if (result > 0) {
                    alert("배경이 초기화되었습니다");
                    window.parent.location.reload();

                } else {
                    console.log("배경 초기화 실패");
                }
            },
            error: e => { console.log("배경 초기화 중 오류 발생"); }
        })
    }
}

// 프레임 초기화
const frameReturn = document.getElementById("frameReturn");
frameReturn.addEventListener("click", e => {

    if (confirm("정말 초기화하시겠습니까?")) {
        $.ajax({
            url: "/manage/background/resetFrameColor",
            type: "get",
            success: result => {
                if (result > 0) {
                    alert("프레임이 초기화되었습니다");
                    window.parent.location.reload();

                } else {
                    console.log("프레임 초기화 실패");
                }
            },
            error: e => { console.log("프레임 초기화 중 오류 발생"); }
        })
    }
})


// 프레임 메뉴색 초기화
const frameMenuReturn = document.getElementById("frameMenuReturn");
frameMenuReturn.addEventListener("click", e => {

    if (confirm("정말 초기화하시겠습니까?")) {
        $.ajax({
            url: "/manage/background/resetFrameMenuColor",
            type: "get",
            success: result => {
                if (result > 0) {
                    alert("프레임 메뉴색이 초기화되었습니다");
                    window.parent.location.reload();

                } else {
                    console.log("프레임 메뉴 색 초기화 실패");
                }
            },
            error: e => { console.log("프레임 메뉴 색 초기화 중 오류 발생"); }
        })
    }
})