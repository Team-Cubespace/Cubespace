/* 음악 듣기 */
const playBtnList = document.getElementsByClassName("fa-play");
const stopBtnList = document.getElementsByClassName("fa-stop");

for(let i = 0; i < playBtnList.length; i++){
    playBtnList[i].addEventListener("click", e => {
        const musicPath = e.target.getAttribute("id");
        var audio1 = new Audio(musicPath);
        audio1.loop = false; // 반복재생하지 않음
        audio1.volume = 0.5; // 음량 설정
        audio1.play(); // sound1.mp3 재생

        stopBtnList[i].addEventListener("click", () => {
            audio1.pause();
        })
    })
}



/* 배경음악 검색 */
const searchArea = document.getElementsByClassName("searchArea")[0];
const searchInput = document.getElementById("searchInput");


searchArea.addEventListener("submit", e => {

    if(searchInput.value.trim().length > 0){

        location.href="/manage/music?searchInput=" + searchInput.value;
        
    } 

})

/* 모든 배경음악 */
const allMusic = document.getElementById("allMusic");
allMusic.addEventListener("click", e => {
    searchInput.value="";
    location.href="/manage/music?searchInput=" + searchInput.value;
})


/* 적용하기 버튼 */
const useMusicBtn = document.getElementsByClassName("useMusicBtn")[0];
useMusicBtn.addEventListener("click", e => {

    const musicNo = $('input[type=radio][name=useMusicRadio]:checked').val();
    if(musicNo != undefined) {

        
        $.ajax({
            url : "/manage/music/useMusic",
            type: "get",
            data : {"memberNo" : memberNo, "musicNo" : musicNo},
            success : result => {
                if(result > 0) {
                    alert("배경음악이 적용되었습니다");
                    window.parent.location.reload();
                } else {
                    console.log("배경음악 적용 실패");
                }
            }, 
            error : e => {console.log("배경음악 적용 중 오류 발생");}
        })
    } else {
        alert("배경음악을 선택한 후 버튼을 눌러주세요");
    }
})

/* 배경음악 없애기 버튼 */
const deleteMusic = document.getElementsByClassName("deleteMusic")[0];
deleteMusic.addEventListener("click", e => {


    if(confirm("정말 배경음악을 없애겠습니까?")){

        $.ajax({
            url : "/manage/music/deleteMusic",
            type: "get",
            data : {"memberNo" : memberNo},
            success : result => {
                if(result > 0) {
                    alert("배경음악이 적용되었습니다");
                    window.parent.location.reload();
                } else {
                    console.log("배경음악 적용 실패");
                }
            }, 
            error : e => {console.log("배경음악 적용 중 오류 발생");}
        })
    }
})