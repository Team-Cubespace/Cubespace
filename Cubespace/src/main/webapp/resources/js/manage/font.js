/* 폰트 이름 검색 */
const searchArea = document.getElementById("searchArea");
const searchInput = document.getElementById("searchInput");


searchArea.addEventListener("submit", e => {
    console.log(searchInput.value);

    if(searchInput.value.trim().length > 0){

        location.href="/manage/font?searchInput=" + searchInput.value;
        
    } 

})


/* 모든폰트 조회(모든폰트 버튼) */
const allFont = document.getElementById("allFont");
allFont.addEventListener("click", e => {
    searchInput.value="";
    location.href="/manage/font?searchInput=" + searchInput.value;
})



/* 적용하기 버튼 */
document.getElementById("useFontBtn").addEventListener("click", e => {

    const fontNo = $('input[type=radio][name=useFontRadio]:checked').val();
    if(fontNo != undefined) {
        
        $.ajax({
            url : "/manage/font/useFont",
            type: "get",
            data : {"memberNo" : memberNo, "fontNo" : fontNo},
            success : result => {
                if(result > 0) {
                    alert("폰트가 적용되었습니다");
                    window.parent.location.reload();
                } else {
                    console.log("폰트 적용 실패");
                }
            }, 
            error : e => {console.log("폰트 적용 중 오류 발생");}
        })
    } else {
        alert("폰트를 선택한 후 버튼을 눌러주세요");
    }



})