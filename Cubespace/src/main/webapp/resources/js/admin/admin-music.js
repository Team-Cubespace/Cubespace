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
function openPop() {
    document.getElementById("popup_layer").style.display = "block";
}

function openPop2() {
    document.getElementById("popup_layer2").style.display = "block";
}

// 팝업 닫기
function closePop() {
    document.getElementById("popup_layer").style.display = "none";
}
function closePop2() {
    document.getElementById("popup_layer2").style.display = "none";
}



document.getElementById("fontAddBtn").addEventListener("click", openPop2);



/* -------------------------------------------------------------- */
// 오디오객체는 전역변수로 하나 정하기
// 재생시
/* 
    정지버튼 리스트 돌면서 모든 정지버튼 리스트를 재생으로 만들어놓음
    오디오객체 초기화

*/
// 정지시
// 재생버튼 리스트 돌면서 버튼 모양 변경
// 오디오객체 pause();

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
    

    


// for(let stopBtn of stopBtnList) {

// }




// for(let stopBtn of stopBtnList){
//     stopBtn.addEventListener("click", e => {
//         stopPlay();
//         stopMusic();
//     })
// }


// /* 음악 정지버튼 */
// const stopPlay = e => {
//     stopBtnList = document.getElementsByClassName("fa-stop");
//     for(let stopBtn of stopBtnList){
//         stopBtn.classList.add("fa-play");
//         stopBtn.classList.remove("fa-stop");
//     }
// }

// /* 음악 재생버튼 */
// const startPlay = e => {
//     playBtnList = document.getElementsByClassName("fa-play");
//     for(let playBtn of playBtnList) {
//         playBtn.classList.add("fa-stop");
//         playBtn.classList.remove("fa-play");
//     }
// }

// /* 오디오 재생 */
// const listenMusic = e => {
//     const musicPath = e.target.getAttribute("id");
//         audio1 = new Audio(musicPath);
//         audio1.loop = false; // 반복재생하지 않음
//         audio1.volume = 0.5; // 음량 설정
//         audio1.play(); // sound1.mp3 재생


// }

// /* 오디오 정지 */
// const stopMusic = e => {
//     audio1.pause();
// }


