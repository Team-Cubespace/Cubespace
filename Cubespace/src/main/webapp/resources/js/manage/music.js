
audio1 = new Audio(); // 새 오디오 객체 생성

let playBtnList = document.getElementsByClassName("fa-play");
for(let playBtn of playBtnList){
    playBtn.addEventListener("click", e=>{

        playFx(e);
    })
}


const playFx = e => {
    
    audio1.pause();

    const musicPath = e.target.getAttribute("id");
    // 기존의 모든 stop버튼을 다 start(대기)상태로 만들기
    stopBtnList = document.getElementsByClassName("fa-stop");
    for(let stopBtn of stopBtnList){
        stopBtn.classList.add("fa-play");
        stopBtn.classList.remove("fa-stop");
    }

    e.target.classList.add("fa-stop");
    e.target.classList.remove("fa-play");
    
    audio1 = new Audio(musicPath);

    audio1.loop = true; // 반복재생
    audio1.volume = 0.5; // 음량 설정
    var playPromise = audio1.play(); // sound1.mp3 재생
    if (playPromise !== undefined) { playPromise.then((_) => {}).catch((error) => {}); }

    stopBtnList = document.getElementsByClassName("fa-stop");
    for(let stopBtn of stopBtnList){
        stopBtn.addEventListener("click", f=>{
            audio1.pause();
            f.target.classList.add("fa-play");
            f.target.classList.remove("fa-stop");

            let playBtnList = document.getElementsByClassName("fa-play");
            for(let playBtn of playBtnList){
                playBtn.addEventListener("click", g=>{

                    playFx(g);
                })
            }
        })
    }
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
                    originalMusic(musicNo);
                    window.parent.postMessage(musicNo, "*");
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


const originalMusic =  musicNo => {
    const useMusicRadioList = document.getElementsByClassName("useMusicRadio");
    for(let useMusicRadio of useMusicRadioList){
        if(useMusicRadio.value == musicNo){
            useMusicRadio.parentElement.parentElement.classList.add("originalMusic");
        } else {
            useMusicRadio.parentElement.parentElement.classList.remove("originalMusic");
        }
    }
}


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
                    alert("배경음악이 삭제되었습니다");
                    window.parent.postMessage(0, "*");
                } else {
                    console.log("배경음악 삭제 실패");
                }
            }, 
            error : e => {console.log("배경음악 삭제 중 오류 발생");}
        })
    }
})