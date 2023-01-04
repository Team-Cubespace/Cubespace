// 뒤로가기
const goBack = ()=>{
    let historyArr = localStorage.getItem("minihomeHistory");

    if(historyArr != null) {
        historyArr = JSON.parse(historyArr);
        const minihomeNo = historyArr.pop();
        const url = `/minihome/${minihomeNo}`;
        const specs = "resizable=no, status=no, menubar=no, width=1203, height=718, top=50, left=300";

        window.open(url, "minihome", specs, false);
    }
}
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
// 이전 미니홈피 글자색 지정
(()=>{
    const goBackButton = document.getElementById("goBackButton");

    goBackButton.style.color = getTextColorByBackgroundColor(originalFrameColor);
})();

// 미니홈피 이름 변경
let prevMiniohmeTitleEl;
(()=>{
    // 톱니바퀴 버튼
    const updateMinihomeTitleButton = document.getElementById("updateMinihomeTitleButton");
    // 수정 버튼
    const confirmUpdateButton = document.getElementById("confirmUpdateButton");
    // 취소 버튼
    const cancelUpdateButton = document.getElementById("cancelUpdateButton")
    // 미니홈피 이름 인풋
    // const minihomeTitle = document.getElementById("minihomeTitle");

    // 톱니바퀴 아이콘 클릭 시
    updateMinihomeTitleButton.addEventListener("click", ()=>{
        // minihomeTitle 인풋 가져와서 read-only 해제
        const minihomeTitleContainer = document.getElementById("minihomeTitleContainer");
        prevMiniohmeTitleEl = minihomeTitleContainer.innerHTML;

        let prevValue = document.getElementById("minihomeTitle").innerText;
        // XSS 방지 처리 해제
        prevValue =  prevValue.replaceAll("&amp;", "&");
        prevValue =  prevValue.replaceAll("&lt;", "<");
        prevValue =  prevValue.replaceAll("&gt;", ">");
        prevValue =  prevValue.replaceAll("&quot;", "\"");
        
        // 개행문자 처리 해제
        prevValue =  prevValue.replaceAll("<br>", "\n").replaceAll("&nbsp;", " ");

        // 인풋 태그 생성
        const minihomeTitleInput = document.createElement("input");
        minihomeTitleInput.classList.add("minihome-title");
        minihomeTitleInput.setAttribute("id", "minihomeTitle");
        minihomeTitleInput.setAttribute("maxLength", 30);
        minihomeTitleInput.value = prevValue;

        minihomeTitleContainer.innerHTML = "";
        minihomeTitleContainer.prepend(minihomeTitleInput);

        // minihomeTitle.readOnly = false;
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
        const value = document.getElementById("minihomeTitle").value.trim();
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
                        document.getElementById("minihomeTitleContainer").innerHTML = prevMiniohmeTitleEl;
                        document.getElementById("minihomeTitle").innerText = value;
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
        // minihomeTitle.readOnly = true;
    });

    // 취소 버튼 클릭 시
    cancelUpdateButton.addEventListener("click", ()=>{
        // m inihomeTitle 인풋 readOnly 적용
        // minihomeTitle.readOnly = true;
        // 이전 이름값 백업을 value에 삽입
        // minihomeTitle.value = prevMiniohmeTitle;
        // 수정버튼 삭제
        confirmUpdateButton.style.display = "none";
        // 취소버튼 삭제
        cancelUpdateButton.style.display = "none";
        // 톱니바퀴 출력
        updateMinihomeTitleButton.classList.add("header-hover");
        // monihomeTitle 인풋 read-only 설정
        // minihomeTitle.readOnly = true;
        document.getElementById("minihomeTitleContainer").innerHTML = prevMiniohmeTitleEl;
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

// 오디오 플레이어 기능
const musicDuration = document.getElementById("duration");
let currentTime = 1;
let minihomeMusic;


// 재생 시간 출력 함수
const printCurrentTime = () => {
    
    musicDuration.innerText = moment(currentTime * 1000).format("mm:ss");
    currentTime++;
}

const createMusic = (musicPath, autoplay) => {
    currentTime = 0;    // 시간 초기화
    // 뮤직플레이어 소스 변경
    minihomeMusic = new Howl({
        src: [musicPath],
        autoplay: autoplay,
        loop: true,
        onend: () =>{
            currentTime = 0;
        }
    });
}

const initMinihomeMusic = music => {
    if(minihomeMusic != null) {
        let autoplay = false;
        if(minihomeMusic.playing()){    // 재생중이었다면
            minihomeMusic.pause();
            autoplay = true;
        }
        
        
        // 플레이버튼 가져와서 아이콘 변경
        // 제목 슬라이드 멈추기
        // document.getElementById("minihomeMusicName").classList.remove("music-play-marquee");
        document.getElementById("minihomeMusicName").innerText = music.MUSIC_NAME;
        // 재생시간 초기화 00:00
        musicDuration.innerText = "00:00";
        createMusic(music.MUSIC_PATH, autoplay);
    }
}


(()=>{
    if(minihomeMusicPath != "") {   // 음악 경로가 비어있지 않다면
        let interval;
        // 음악 객체 생성
        // minihomeMusic = new Audio(minihomeMusicPath);
        // // 자동 반복 세팅
        // minihomeMusic.loop = true;
        createMusic(minihomeMusicPath, true);
        interval = setInterval(printCurrentTime, 1000);
        // 재생 버튼
        const playButton = document.getElementById("playButton");
 
        playButton.addEventListener("click", ()=>{
            if(playButton.classList.contains("fa-circle-play")) {   // 플레이 버튼이면
                // 음악 재생
                // minihomeMusic.play();
                if(minihomeMusic.pause()) {
                    minihomeMusic.play();
                }
                // 1초마다 현재 재생 시간을 출력   
                interval = setInterval(printCurrentTime, 1000);
                // 일시정지 아이콘으로 바꾸기
                playButton.classList.remove("fa-circle-play");
                playButton.classList.add("fa-circle-pause");

                document.getElementById("minihomeMusicName").classList.add("music-play-marquee");
            } else {                                                 // 일시정지 버튼이면
                // 노래 정지
                // minihomeMusic.pause();
                if(minihomeMusic.playing()) {
                    minihomeMusic.pause();
                }
                // 재생 아이콘으로 바꾸기
                playButton.classList.add("fa-circle-play");
                playButton.classList.remove("fa-circle-pause");

                // 재생시간 출력 멈춤
                clearInterval(interval);
                // 노래 제목 멈춤
                document.getElementById("minihomeMusicName").classList.remove("music-play-marquee");
            }
        });

        // 볼륨 조절
        const musicVolume = document.getElementById("musicVolume");

        musicVolume.addEventListener("input", ()=>{
            
            let volume = musicVolume.value;
            const volumeIcon = document.getElementById("volumeIcon");

            minihomeMusic.volume("0." + musicVolume.value)

            if(volume == 0) {
                volumeIcon.className = "fa-solid fa-volume-xmark";
            } else if(volume <= 50) {
                volumeIcon.className = "fa-solid fa-volume-low";
            } else {
                volumeIcon.className = "fa-solid fa-volume-high";
            }
        });
        window.addEventListener("message", e=>{
            if(minihomeMusic != null) {
                $.ajax({
                    url:"/selectMusic",
                    data: {
                        musicNo:e.data
                    },
                    dataType:"JSON",
                    type:"GET",
                    success: music=>{
                        initMinihomeMusic(music);
                    }
                });
            }
        });
    }
})();