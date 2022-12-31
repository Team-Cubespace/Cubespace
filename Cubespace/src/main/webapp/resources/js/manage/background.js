/* 헥사값 방식 -> RGB 방식 */
function hexToRgb ( hexType ){ 
    //  맨 앞의 "#" 기호를 삭제하기. 
    var hex = hexType.trim().replace( "#", "" ); 
    
    //  rgb로 각각 분리해서 배열에 담기. 
    var rgb = ( 3 === hex.length ) ? 
		hex.match( /[a-f\d]/gi ) : hex.match( /[a-f\d]{2}/gi );     
    
    rgb.forEach(function (str, x, arr){     
        //  rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. 
        if ( str.length == 1 ) str = str + str; 
        
        //  10진수로 변환하기.  
        arr[ x ] = parseInt( str, 16 ); 
    }); 
    
    return "rgb(" + rgb.join(", ") + ")"; 
} 




/* 배경색에 ‘어두움 정도’ 따라 텍스트의 색상 결정 */
function getTextColorByBackgroundColor(hexColor) {

    const c = hexColor.substring(1)      // 색상 앞의 # 제거
    const rgb = parseInt(c, 16)   // rrggbb를 10진수로 변환
    const r = (rgb >> 16) & 0xff  // red 추출
    const g = (rgb >>  8) & 0xff  // green 추출
    const b = (rgb >>  0) & 0xff  // blue 추출

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

    // 색상 선택
    return luma < 127.5 ? "white" : "black" // 글자색이
}


/* 부모창(minihome-frame.jsp에 저장된 색 가져오기) */
(()=>{
    const originalFrameColor = parent.originalFrameColor;
    const originalFrameMenuColor = parent.originalFrameMenuColor;
    const originalFrameFontColor = parent.originalFrameFontColor;
    const originalBackgroundSkin = parent.originalBackgroundSkin;
})(); // 페이지 로딩시 즉시 실행



//-----------------------------------------------------------------------  
/* 전체-색상변경 */


const BGColorInput = document.getElementById("BGColorInput");
const bgColorShow = document.getElementById("bgColorShow");

BGColorInput.addEventListener("change", () => {
    // 미리보기 색상 변경
    bgColorShow.style.backgroundColor = BGColorInput.value;

});


/* 미리보기 버튼 */
const bgColorPreview = document.getElementById("bgColorPreview");
bgColorPreview.addEventListener("click", e=> {

    let hexColor = BGColorInput.value; // #102142 형태
    let frameFontColor = getTextColorByBackgroundColor(hexColor); // 배경색 따라 글자색결정


    // window.parent.postMessage(rgbList, '*');
    // 구현중--------------------------------------------------------------------
    // 구현중--------------------------------------------------------------------
    // 구현중--------------------------------------------------------------------
    // 구현중--------------------------------------------------------------------
    // 구현중--------------------------------------------------------------------
    // 구현중--------------------------------------------------------------------
    // 구현중--------------------------------------------------------------------
    // 구현중--------------------------------------------------------------------
    // 구현중--------------------------------------------------------------------
    // 구현중--------------------------------------------------------------------
    // 구현중--------------------------------------------------------------------
    // 구현중--------------------------------------------------------------------
})



/* 배경색 적용하기 버튼 */
const bgColorUse = document.getElementById("bgColorUse");
bgColorUse.addEventListener("click", e => {

    const newBGColor = BGColorInput.value;
    $.ajax({
        url : "/manage/background/updateBGColor",
        type : "get",
        data : {"newBGColor" : newBGColor},
        success : result => {
            if(result > 0) {
                alert("배경색이 변경되었습니다");
                window.parent.location.reload();

            } else {
                console.log("배경색 변경 실패");
            }
        },
        error : e => {console.log("배경색 변경 중 오류 발생");}
    })

})





/* 배경이미지 적용하기 버튼 */
const bgImageUse = document.getElementById("bgImageUse");
bgImageUse.addEventListener("click", e => {

    
    if(imageInput.files[0] != undefined) {
        
        const newBGImage = new FormData();
        const file = imageInput.files[0];
        newBGImage.append("uploadFile", file);


    }
})



// 배경색/이미지 변경 메서드
// const updateBGImage = newBGImage => {

//     // processData: false : Jquery 내부적으로 쿼리 스트링을 만들어 data 파라미터를 전송 -> 파일전송은 XX
//     // contentType: false : default 값이 앞서 이야기한 application/x-www-form-urlencoded이므로 false

//     $.ajax({
//         url : "/manage/background/updateBGImage",
//         type : "post",
//         enctype: 'multipart/form-data',
//         data : {"newBGSkin" : newBGSkin},
//         processData: false,
//         contentType: false,
//         dataType: 'json',
//         success : result => {
//             if(result > 0) {
//                 alert("배경이 변경되었습니다");
//                 window.parent.location.reload();

//             } else {
//                 console.log("배경 변경 실패");
//             }
//         },
//         error : e => {console.log("배경 변경 증 오류 발생");}
//     })
// }


//----------------------------------------------------------------------- 
/* 전체-이미지 변경 */




/* 전체-이미지변경 */
const imageInput = document.getElementById("imageInput");
const imageShow = document.getElementById("imageShow");

imageInput.addEventListener("change", e => {

    if(e.target.files[0] != undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = e => {

            imageShow.src = e.target.result;
            if(!imageShow.classList.contains("bgImage")){
                imageShow.classList.add("bgImage");
            }

        }
    }
})




//----------------------------------------------------------------------- 
/* 전체-프레임변경 */
const frameColorInput = document.getElementById("frameColorInput");
const frameColorShow = document.getElementById("frameColorShow");

frameColorInput.addEventListener("change", () => {
    frameColorShow.style.backgroundColor = frameColorInput.value;
});








//----------------------------------------------------------------------- 
/* 배경색, 배경이미지 초기화 */
const bgColorReturn = document.getElementById("bgColorReturn"); // 배경색
const bgImageReturn = document.getElementById("bgImageReturn"); // 배경색
bgColorReturn.addEventListener("click", e => {resetBGColor();});
bgImageReturn.addEventListener("click", e => {resetBGColor();});

const resetBGColor = () => {

    if(confirm("정말 초기화하시겠습니까?")){
        
        $.ajax({
            url : "/manage/background/resetBGColor",
            type : "get",
            success : result => {
                if(result > 0) {
                    alert("배경이 초기화되었습니다");
                    window.parent.location.reload();
    
                } else {
                    console.log("배경 초기화 실패");
                }
            },
            error : e => {console.log("배경 초기화 중 오류 발생");}
        })
    }
}

/* 프레임 초기화 */
const frameReturn = document.getElementById("frameReturn");
frameReturn.addEventListener("click", e => {

    if(confirm("정말 초기화하시겠습니까?")){
        $.ajax({
            url : "/manage/background/resetFrameColor",
            type : "get",
            success : result => {
                if(result > 0) {
                    alert("프레임이 초기화되었습니다");
                    window.parent.location.reload();

                } else {
                    console.log("프레임 초기화 실패");
                }
            },
            error : e => {console.log("프레임 초기화 중 오류 발생");}
        })
    }
})