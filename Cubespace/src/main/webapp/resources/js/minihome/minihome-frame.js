// 미니홈피 이름 변경
let prevMiniohmeTitle;
(()=>{
    // 톱니바퀴 버튼
    const updateMinihomeTitleButton = document.getElementById("updateMinihomeTitleButton");
    // 수정 버튼
    const confirmUpdateButton = document.getElementById("confirmUpdateButton");
    // 취소 버튼
    const cancelUpdateButton = document.getElementById("cancelUpdateButton")
    // 미니홈피 이름 인풋
    const minihomeTitle = document.getElementById("minihomeTitle");

    // 톱니바퀴 아이콘 클릭 시
    updateMinihomeTitleButton.addEventListener("click", ()=>{
        // minihomeTitle 인풋 가져와서 read-only 해제
        prevMiniohmeTitle = minihomeTitle.value;
        minihomeTitle.readOnly = false;
        // 수정버튼 출력
        confirmUpdateButton.style.display = "block";
        // 취소버튼 출력
        cancelUpdateButton.style.display = "block";
        // 톱니바퀴 삭제
        updateMinihomeTitleButton.classList.remove("header-hover");
    });

    // 수정 버튼 클릭 시
    confirmUpdateButton.addEventListener("click", ()=>{
        // minihomeTitle 인풋의 값 가져와서
        const value = minihomeTitle.value.trim();
        if(value.length != 0) {
            $.ajax({
                url:"/updateMinihomeTitle",
                data: {
                    "homepageName": value
                },
                type:"POST",
                success: result=>{
                    if(result > 0) {
                        console.log("변경 성공");
                        prevMiniohmeTitle = value;
                    }
                }
            })
        }

        // 수정버튼 삭제
        confirmUpdateButton.style.display = "none";
        // 취소버튼 삭제
        cancelUpdateButton.style.display = "none";
        // 톱니바퀴 출력
        updateMinihomeTitleButton.classList.add("header-hover");

        // monihomeTitle 인풋 read-only 설정
        minihomeTitle.readOnly = true;
    });

    // 취소 버튼 클릭 시
    cancelUpdateButton.addEventListener("click", ()=>{
        // m inihomeTitle 인풋 readOnly 적용
        minihomeTitle.readOnly = true;
        // 이전 이름값 백업을 value에 삽입
        minihomeTitle.value = prevMiniohmeTitle;
        // 수정버튼 삭제
        confirmUpdateButton.style.display = "none";
        // 취소버튼 삭제
        cancelUpdateButton.style.display = "none";
        // 톱니바퀴 출력
        updateMinihomeTitleButton.classList.add("header-hover");
        // monihomeTitle 인풋 read-only 설정
        minihomeTitle.readOnly = true;
    });
})();


// 볼륨 화면
(()=>{
    let val = $('#musicVolume').val();
    $('#musicVolume').css('background', 'linear-gradient(to right, #2e2e2e 0%, #2e2e2e '+ val +'%, #d5d4d3 ' + val + '%, #d5d4d3 100%)');
})();

$('#musicVolume').on('input', function(){
    let val = $(this).val();
    $(this).css('background', 'linear-gradient(to right, #2e2e2e 0%, #2e2e2e '+ val +'%, #d5d4d3 ' + val + '%, #d5d4d3 100%)');
});

let minihomeMusic;
// 오디오 플레이어 기능
const musicDuration = document.getElementById("duration");
// 재생 시간 출력 함수
const printCurrentTime = () => {
    musicDuration.innerText = moment(minihomeMusic.currentTime * 1000).format("mm:ss");
}

(()=>{
    if(minihomeMusicPath != "") {   // 음악 경로가 비어있지 않다면
        // 음악 객체 생성
        minihomeMusic = new Audio(minihomeMusicPath);
        // 자동 반복 세팅
        minihomeMusic.loop = true;

        // 재생 버튼
        const playButton = document.getElementById("playButton");
        playButton.addEventListener("click", ()=>{
            if(playButton.classList.contains("fa-circle-play")) {   // 플레이 버튼이면
                // 음악 재생
                minihomeMusic.play();
                // 1초마다 현재 재생 시간을 출력   
                setInterval(printCurrentTime, 1000);
                // 일시정지 아이콘으로 바꾸기
                playButton.classList.remove("fa-circle-play");
                playButton.classList.add("fa-circle-pause");

                document.getElementById("minihomeMusicName").classList.add("music-play-marquee");
            } else {                                                 // 일시정지 버튼이면
                // 노래 정지
                minihomeMusic.pause();
                // 재생 아이콘으로 바꾸기
                playButton.classList.add("fa-circle-play");
                playButton.classList.remove("fa-circle-pause");

                // 재생시간 출력 멈춤
                clearInterval(printCurrentTime);
                // 노래 제목 멈춤
                document.getElementById("minihomeMusicName").classList.remove("music-play-marquee");
            }
        });

        // 볼륨 조절
        const musicVolume = document.getElementById("musicVolume");
        let prevIcon;
        musicVolume.addEventListener("input", ()=>{
            
            let volume = musicVolume.value;
            const volumeIcon = document.getElementById("volumeIcon");

            minihomeMusic.volume = "0." + musicVolume.value;

            if(volume == 0) {
                volumeIcon.className = "fa-solid fa-volume-xmark";
            } else if(volume <= 50) {
                volumeIcon.className = "fa-solid fa-volume-low";
            } else {
                volumeIcon.className = "fa-solid fa-volume-high";
            }
        });
    }
})();