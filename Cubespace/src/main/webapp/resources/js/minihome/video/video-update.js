// 동영상 미리보기
let videoDuration;
const addVideo = input => {
    document.getElementById("addVideoArea").innerHTML = "";
    // const myVideo = document.createElement("video-js");
    // myVideo.setAttribute("id", "myVideo");
    // myVideo.className = "video-js vjs-big-play-button vjs-big-play-centered vjs-fluid";
    // myVideo.setAttribute("data-setup", '{"controls":true, "playbackRates": [0.5, 1, 1.5, 2]}')
    const file = input.files[0];
    if(file != null) {
        const video = document.createElement("video");
        video.setAttribute("id", "myVideo");
        video.controls = true;
        console.log(file.name);
        const videoURL = URL.createObjectURL(file);
        // const source = document.createElement("source");
        // source.setAttribute("src", videoURL);
        // source.setAttribute("type", "video/webm");
        // myVideo.append(source);
        video.src=videoURL;
        video.preload = 'metadata';
        video.onloadedmetadata = () =>{
            console.log(video.duration);
        }
        document.getElementById("addVideoArea").append(video);
    }
}

const checkVideo= ()=>{
    const myVideo = document.getElementById("myVideo");
    console.log(myVideo.duration);
}

const submitForm = ()=>{
    let form = document.getElementById("writeVideoForm");
    let formData = new FormData(form);
    formData.append("videoNo", videoNo);
    $.ajax({
        method: 'POST',
        url: '/videoUpdate',
        dataType: 'json',
        enctype: 'multipart/form-data',
        data: formData,
        // async: true,
        // timeout: 30000,
        processData: false,
        contentType: false,
        success: result=>{
            console.log(result);
            if(result.videoNo > 0) {
                document.getElementById("loadingMask").style.display = "none";
                const cp = new URLSearchParams(location.search).get("cp");
                location.href= `/videoDetail/${result.videoNo}?folderNo=${result.folderNo}&cp=${cp}`;
            }
        },
        error: result =>{
            alert("파일업로드 실패");
        }
    })
}


(()=>{
    document.getElementById("writeVideoForm").addEventListener("submit", e=>{
        const videoTitle = document.querySelector("input[name='videoTitle']");
        // 제목 입력 검사
        e.preventDefault();
        if(videoTitle.value.trim().length == 0) {       // 제목이 비어있으면
            alert("제목을 입력해주세요.")
            videoTitle.focus();
            return;
        }
        
        // 비디오 등록 검사
        if(document.getElementById("myVideo") == null) {
            alert("동영상을 업로드해주세요.");
            return;
        } else if(document.getElementById("myVideo").duration > 60) { 
            alert("1분 이상의 동영상은 업로드할 수 없습니다.");
            return;
        }
        console.log(document.getElementById("myVideo").duration);
        // 제출 함수 (ajax) 작성 필요
        submitForm();
        document.getElementById("loadingMask").style.display = "flex";
    });

    // 글작성 취소 버튼 이벤트 달기
    document.getElementById("cancelWrite").addEventListener("click", ()=>{
        if(confirm("작성중인 내용은 저장되지 않습니다.\n정말 취소하시겠습니까?")){
            location.href ="/videoList/3" + location.search;
        }
    });
})()
