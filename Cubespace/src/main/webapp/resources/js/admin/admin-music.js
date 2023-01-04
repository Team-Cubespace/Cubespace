// 정렬
const order = document.getElementById("order");
const orderInput = document.getElementById("orderInput");

const orderBy = () => {

    switch (order.value) {
        case "order1": orderInput.value = 1; break;
        case "order2": orderInput.value = 2; break;
        case "order3": orderInput.value = 3; break;
        case "order4": orderInput.value = 4; break;
    }

    document.getElementById("frmSearchBase").submit();
};


/* -------------------------------------------------------------- */
//팝업 띄우기
function openPop2() {
    document.getElementById("popup_layer2").style.display = "block";
}

// 팝업 닫기
function closePop2() {
    document.getElementById("popup_layer2").style.display = "none";
}

document.getElementById("fontAddBtn").addEventListener("click", openPop2);

/* -------------------------------------------------------------- */
/* 오디오 플레이 */
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

    audio1.loop = false; // 반복재생하지 않음
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
    
/* -------------------------------------------------------------- */
/* 음악 삭제 */
const deleteMusicList = document.getElementsByClassName("deleteMusic");
for(let deleteMusic of deleteMusicList){
    deleteMusic.addEventListener("click", e=>{

        console.log(e.target.getAttribute("name"));
        if(confirm("정말 음악을 삭제하시겠습니까?")){
            const musicNo = e.target.getAttribute("name");
            location.href =  "/admin/music/deleteMusic?musicNo=" + musicNo;
        }
    })
}
