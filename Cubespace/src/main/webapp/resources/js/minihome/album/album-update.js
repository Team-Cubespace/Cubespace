let swiper = new Swiper(".add-image-list", {
    slidesPerView: "auto",
    spaceBetween: 10,
    observer:true,
    observerParents:true,
    mousewheel:true
    // watchOverflow:true,
});

let fileNo = 0;
let filesArr = new Array();
let deleteImageList = new Array();

const deleteImage = (order, target) =>{
    // 삭제리스트에 순서 추가
    deleteImageList.push(order);

    // html요소 삭제
    target.parentElement.remove();
}

/* 첨부파일 추가 */
const addFile = (obj)=>{
    let fCount = 0;
    var maxFileCnt = 10;   // 첨부파일 최대 개수
    var attFileCnt = document.getElementsByClassName('file-item').length;    // 기존 추가된 첨부파일 개수
    var remainFileCnt = maxFileCnt - attFileCnt;    // 추가로 첨부가능한 개수
    var curFileCnt = obj.files.length;  // 현재 선택된 첨부파일 개수

    // 첨부파일 개수 확인
    if (curFileCnt > remainFileCnt) {
        alert("첨부파일은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.");
    } else {
        for (const file of obj.files) {
            console.log(file);

            // 첨부파일 검증
            if (validation(file)) {
                // 파일 배열에 담기
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e=> {
                    filesArr.push(file);

                    // 목록 추가
                    const addFileList = document.getElementById("addFileList");
    
                    // 파일아이템 생성
                    const fileItem = document.createElement("li");
                    fileItem.classList.add("file-item", "swiper-slide");
                    fileItem.setAttribute("id", `file${fileNo}`);
    
                    // 파일 이름영역
                    // const fileName = document.createElement("span");
                    // fileName.classList.add("file-name");
                    // fileName.innerText = file.name;
                    
                    // 파일 이미지
                    const img = document.createElement("img");
                    img.src = e.target.result;

                    // 파일 업로드 취소 버튼
                    const button = document.createElement("button");
                    button.classList.add("fa-solid", "fa-xmark");
                    button.setAttribute("onclick", `deleteFile(${fileNo})`);
    
                    // 파일아이템 조립
                    fileItem.append(img, button);
    
                    // 파일 목록에 추가
                    addFileList.append(fileItem);
                    fileNo++;
                    fCount++;
                };
            } else {
                continue;
            }
        }
        setTimeout(()=>{
            document.getElementById("addImageCount").innerText = Number(document.getElementById("addImageCount").innerText) + fCount;
        }, 200);
    }
    // 초기화
    document.querySelector("input[type=file]").value = "";
    console.log(filesArr);
}

/* 첨부파일 검증 */
function validation(obj){
    const fileTypes = ['application/pdf', 'image/gif', 'image/jpeg', 'image/png', 'image/bmp', 'image/tif', 'application/haansofthwp', 'application/x-hwp'];
    if (obj.name.length > 100) {
        alert("파일명이 100자 이상인 파일은 제외되었습니다.");
        return false;
    } else if (obj.size > (100 * 1024 * 1024)) {
        alert("최대 파일 용량인 100MB를 초과한 파일은 제외되었습니다.");
        return false;
    } else if (obj.name.lastIndexOf('.') == -1) {
        alert("확장자가 없는 파일은 제외되었습니다.");
        return false;
    } else if (!fileTypes.includes(obj.type)) {
        alert("첨부가 불가능한 파일은 제외되었습니다.");
        return false;
    } else {
        return true;
    }
}

/* 첨부파일 삭제 */
function deleteFile(num) {
    document.querySelector("#file" + num).remove();
    filesArr[num].is_delete = true;
    console.log(deleteImageList);
}

/* 폼 전송 */
function submitForm() {
    // 폼데이터 담기
    var form = document.getElementById("writeAlbumForm");
    var formData = new FormData(form);
    for (var i = 0; i < filesArr.length; i++) {
        // 삭제되지 않은 파일만 폼데이터에 담기
        if (!filesArr[i].is_delete) {
            formData.append("imageList", filesArr[i]);
        }
        
    }
    formData.append("deleteImageList", deleteImageList);
    formData.append("albumNo", albumNo);
    formData.append("prevLength", prevLength);
    console.log(filesArr);
    $.ajax({
        method: 'POST',
        url: '/albumUpdate',
        dataType: 'json',
        enctype: 'multipart/form-data',
        data: formData,
        // async: true,
        // timeout: 30000,
        processData: false,
        contentType: false,
        // cache: false,
        // headers: {'cache-control': 'no-cache', 'pragma': 'no-cache'},
        success: result => {
            console.log(result);
            if(result.albumNo > 0) {
                location.href=`/albumDetail/${result.albumNo}?folderNo=${result.folderNo}&cp=1`;
            }
        },
        error: result => {
            console.log(result);
            alert("파일업로드 실패");
        }

    })
}

// 카카오 좌표찍기 모달 생성
let map;
let bounds;
(()=>{
    // 버튼 가져오기
    const addLocationButton = document.getElementById("addLocationButton");
    addLocationButton.addEventListener("click", ()=>{
        // 모달 영역 가져오기
        document.getElementById("mapModal").style.display = "block";
        // 모달 영역 화면에 출력
        
        let mapInitOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567),  // 초기 중심좌표 설정
            level: 3 // 초기 지도의 확대 레벨
        }
        const mapContainer = document.getElementById("mapContainer");

        map = new kakao.maps.Map(mapContainer, mapInitOption);
        bounds = null;
    });

    // 모달 닫기 버튼 이벤트 등록
    const closdModalButton = document.getElementById("closdModalButton");
    closdModalButton.addEventListener("click", ()=>{
        document.getElementById("mapModal").style.display = "none";
        searchPlaceInput.value = "";
    });
    // 지도 레벨 초기화 버튼 이벤트 등록
    const initLavelButton = document.getElementById("initLavelButton");
    initLavelButton.addEventListener("click", ()=>{
        if(bounds != null) {
            map.setBounds(bounds);
        }
    });

    // 위치 검색 서브밋 이벤트 등록
    const searchPlaceForm = document.getElementById("searchPlaceForm")
    const searchPlaceInput = document.getElementById("searchPlaceInput");

    searchPlaceForm.addEventListener("submit", e=>{
        e.preventDefault();
        if(searchPlaceInput.value.trim().length == 0) {
            return;
        }
        // 장소 검색 객체 생성
        let ps = new kakao.maps.services.Places();

        // 장소 검색
        ps.keywordSearch(searchPlaceInput.value.trim(), searchPlace)
    });

    // 글작성 버튼 이벤트 달기
    document.getElementById("writeAlbumForm").addEventListener("submit", e=>{
        const albumTitle = document.querySelector("input[name='albumTitle']");
        // 제목 입력 검사
        e.preventDefault();
        if(albumTitle.value.trim().length == 0) {       // 제목이 비어있으면
            alert("제목을 입력해주세요.")
            albumTitle.focus();
            return;
        }
        
        // 이미지 등록 검사
        if(document.querySelectorAll(".file-item").length == 0) {   // 등록된 이미지가 한개도 없다면
            alert("이미지를 등록해주세요.");
            return;
        }

        // 제출 함수 (ajax) 작성 필요
        submitForm();
    });

    // 글작성 취소 버튼 이벤트 달기
    document.getElementById("cancelWrite").addEventListener("click", ()=>{
        if(confirm("작성중인 내용은 저장되지 않습니다.\n정말 취소하시겠습니까?")){
            location.href ="/albumList/2" + location.search;
        }
    });
})();

// 카카오 검색 콜백 함수
const searchPlace = (data, status, pagination) => {
    if(status === kakao.maps.services.Status.OK) {
        // 지도 범위 재설정 객체
        bounds = new kakao.maps.LatLngBounds();
        
        for(let i = 0; i<data.length; i++) {
            // 지도에 마커 표시
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            
            
        }
        // 지도 범위 재설정
        map.setBounds(bounds);
    }
}

// 마커 생성 후 출력 함수
const displayMarker = place =>{

    // 마커 생성
    let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
    });
    // 인포 윈도우 생성
    // 커스텀 오버레이 생성
    let content = `<div class='marker-content' onclick='selectPlace(${place.y}, ${place.x})'>` +
        `<span class='marker-title'>선택</span>`
    "</div>";

    let customOverlay = new kakao.maps.CustomOverlay({
        "map":map,
        "position": new kakao.maps.LatLng(place.y, place.x),
        "content": content,
        "yAnchor": 1
    });
}

// 위치 설정 삭제 함수
const initLocation = (obj) => {
    // 버튼의 부모 div(.location) 삭제
    obj.parentElement.remove();

    // input value 초기화
    document.querySelector("input[name='latitude']").value = "";
    document.querySelector("input[name='longitude']").value = "";
    console.log(document.querySelector("input[name='latitude']").value);
    console.log(document.querySelector("input[name='longitude']").value);

    // 지도 펼치기 버튼 출력
    document.getElementById("addLocationButton").style.display = "flex";
}

// 좌표 설정
const selectPlace = (y, x) => {
    // 위도 Latitude
    // 경도 LONGITUDE

    // 위치 검색 인풋
    const searchPlaceInput = document.getElementById("searchPlaceInput");

    // 값 저장
    document.getElementById("latitude").value = y;
    document.getElementById("longitude").value = x;
    document.getElementById("locationName").value = searchPlaceInput.value.trim();

    console.log(document.querySelector("input[name='latitude']").value);
    console.log(document.querySelector("input[name='longitude']").value);
    // 모달 삭제
    document.getElementById("mapModal").style.display = "none";

    // 위치 입력 영역
    const locationArea = document.getElementById("locationArea");

    // 지도 펼치기 버튼 숨기기
    document.getElementById("addLocationButton").style.display = "none";

    // 설정한 위치 블럭 생성
    const location = document.createElement("div");
    location.classList.add("location")

    const a = document.createElement("a");
    a.href = `https://map.kakao.com/link/map/${searchPlaceInput.value.trim()},${y},${x}`;
    a.target = "_blank";

    const i = document.createElement("i");
    i.classList.add("fa-solid", "fa-location-dot");
    
    // 위치 정보 삭제 버튼
    const span = document.createElement("span");
    span.classList.add("fa-solid", "fa-xmark");
    // 위치 정보 삭제 버튼 이벤트 달기
    span.addEventListener("click", ()=>{
        initLocation(span);
    });

    // 조립
    a.append(i, searchPlaceInput.value.trim());
    location.append(a, span);
    locationArea.append(location);
    
    // 검색창 초기화
    searchPlaceInput.value = "";
}