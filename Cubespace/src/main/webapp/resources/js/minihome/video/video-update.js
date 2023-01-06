const getByteSize = size => {
    for(let i =0; i< 2; i++) {
        size = Math.floor(size / 1024);
    }
    return size;
}

// 동영상 미리보기
const videoVariable = {
    duration : 0,
    size : 0,
}

const initVideoInfo = () => {
    // 동영상 유효성 객체에 값 대입
    const video = document.getElementById("myVideo");
    video.preload = 'metadata';
    video.onloadedmetadata = () =>{
        videoVariable.duration = video.duration.toFixed(1);
        document.getElementById("videoDurationSpan").innerText = videoVariable.duration;
    }
}

// 동영상 미리보기
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

        const videoURL = URL.createObjectURL(file);
        // const source = document.createElement("source");
        // source.setAttribute("src", videoURL);
        // source.setAttribute("type", "video/webm");
        // myVideo.append(source);
        video.src=videoURL;
        video.preload = 'metadata';
        video.onloadedmetadata = () =>{
            videoVariable.duration = video.duration.toFixed(1);
            videoVariable.size = getByteSize(file.size);

            document.getElementById("videoSizeSpan").innerText = videoVariable.size;
            document.getElementById("videoDurationSpan").innerText = videoVariable.duration;
        }
        document.getElementById("addVideoArea").append(video);
    } else {
        videoVariable.duration = 0;
        videoVariable.size = 0;
        console.log(videoVariable.duration);
        console.log(videoVariable.size);
        document.getElementById("videoSizeSpan").innerText = 0;
        document.getElementById("videoDurationSpan").innerText = 0;
    }
}

const checkVideo= ()=>{
    if(document.getElementById("myVideo") == null) {
        alert("동영상을 업로드해주세요.");
        return false;
    }
    if (videoVariable.size > 100000000) {
        alert("100mb이하의 동영상만 업로드할 수 있습니다.");
        return false;
    }
    if (videoVariable.duration > 60) {
        alert("1분 미만의 동영상만 업로드할 수 있습니다.");
        return false;
    }
    return true;
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
            document.getElementById("loadingMask").style.display = "none";
            alert("파일업로드 실패");
        }
    })
}

initVideoInfo();

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
        }
        
        // 비디오 유효성 검사
        if(!checkVideo()) {
            return;
        }

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
