
/* today, shorts 선택 */
const todayStar = document.getElementById("todayStar");
const todayRank = document.getElementById("todayRank");
const popularShorts = document.getElementById("popular-shorts");
const newShorts = document.getElementById("new-shorts");

/* 기본변수 지정 */
let todayChoice =1

// 투데이 비동기 조회 함수
const todaySelect = (todayChoice) => {

    $.ajax({
        url : "/mainTodaySelect",
        data: {"todayChoice":todayChoice},
        dataType : "JSON",
        success : mainTodayList =>{

            const star_profile_container=document.querySelector(".star-profile-container");
            star_profile_container.innerHTML="" // 이전내용 제거

            // 검색된 tody 회원 생성
            for(let i=0; i<mainTodayList.length;i++){

                /* 회원번호 저장 */
                memberNo=mainTodayList[i].memberNo

                    const star_profile = document.createElement("div");
                    star_profile.classList.add("star-profile")

                        /* 왕관 생성 */
                        const star_profile_img = document.createElement("img");
                        star_profile_img.setAttribute("src","/resources/images/crown.png")

                        /* 미니홈피 이동 */
                        const star_profile_a = document.createElement("a");
                        star_profile_a.setAttribute("href","/minihome/"+mainTodayList[i].memberNo+"")
                        star_profile_a.setAttribute("onclick","return openMinihome(this.href)")
                        star_profile_a.classList.add("star-profile-img")

                            /* 프로필 이미지 생성 */
                            const star_profile_a_img = document.createElement("img");
                            if(mainTodayList[i].profileImage==null){ // null 이면 기본 프로필
                                star_profile_a_img.setAttribute("src","/resources/images/common/cubes.png")
                            }else{ // null이 아니라면 
                                star_profile_a_img.setAttribute("src",mainTodayList[i].profileImage)
                            }
                        
                        const nickName_a = document.createElement("a");
                        nickName_a.setAttribute("href","/minihome/"+mainTodayList[i].memberNo+"")
                        nickName_a.setAttribute("onclick","return openMinihome(this.href)")
                        nickName_a.innerText=""+[i+1]+". "+mainTodayList[i].memberNickname+"";

                        const today_span = document.createElement("span");
                        if(todayChoice==1){ //투데이스타
                            today_span.innerText="Today "+mainTodayList[i].today+"";
                        }else{ //누적투데이랭킹
                            today_span.innerText="Total "+mainTodayList[i].total+"";
                        }

                        star_profile_container.append(star_profile);
                            star_profile.append(star_profile_img,star_profile_a,nickName_a,today_span);
                                star_profile_a.append(star_profile_a_img);
            }
        }
    })
};

todaySelect(todayChoice)

/* 투데이 스타 클릭 시 */
todayStar.addEventListener("click", () => {
    todayStar.classList.add("select");
    todayRank.classList.remove("select");
    todayChoice=1;
    todaySelect(todayChoice);
})
/* 투데이 랭크 클릭 시 */
todayRank.addEventListener("click", () => {
    todayRank.classList.add("select");
    todayStar.classList.remove("select");
    todayChoice=2
    todaySelect(todayChoice);
})

/* 기본변수 지정 */
let shortsChoice =1
let folderNo;

// 숏츠 영상 비동기 조회 함수
const shortsSelect = (shortsChoice) => {

    $.ajax({
        url : "/mainShortsSelect",
        data: {"shortsChoice":shortsChoice},
        dataType : "JSON",
        success : mainShortsList =>{

            const place_list =document.querySelector(".place-list");
            place_list.innerHTML=""; // 이전내용 제거 

            for(let shorts of mainShortsList){
                
                // 회원 번호 저장
                memberNo= shorts.memberNo;
                folderNo= shorts.folderNo;

                const place_item = document.createElement("li");
                place_item.classList.add("place-item");

                    const place_item_a = document.createElement("a");
                    place_item_a.setAttribute("href","/minihome/"+ shorts.memberNo +"?videoNo="+ shorts.videoNo +"&folderNo="+ shorts.folderNo +"&goVideo=1")
                    place_item_a.setAttribute("onclick","return openMinihome(this.href)")


                        /* 썸네일 이미지 생성 */
                        const place_item_img = document.createElement("img");
                        place_item_img.setAttribute("src",shorts.videoThumbnail)

                        /* 영상 제목 생성 */
                        const place_title = document.createElement("span");
                        place_title.classList.add("place-title");
                        place_title.innerText=""+shorts.videoTitle+"";

                        /* 닉네임 생성 */
                        const place_title_nickname = document.createElement("span");
                        place_title_nickname.innerText=""+shorts.memberNickname+"";

                        /* 조회수 생성 */
                        const videoReadCount = document.createElement("span");
                        videoReadCount.innerText="조회수 : "+shorts.videoReadCount+"";

                        place_list.append(place_item);
                            place_item.append(place_item_a);
                                place_item_a.append(place_item_img,place_title,place_title_nickname,videoReadCount);
            }

            if(document.getElementsByClassName('place-item').length < 5) {
                document.querySelector(".slide-container > .next-arrow").style.display = "none";
            }
        }
    })
}

shortsSelect(shortsChoice)

/* 인기숏츠 클릭 시  */
popularShorts.addEventListener("click", () => {
    popularShorts.classList.add("select");
    newShorts.classList.remove("select");
    shortsChoice =1
    shortsSelect(shortsChoice);
})

/* 최신 클릭 시  */
newShorts.addEventListener("click", () => {
    // 여기에 ajax로 리스트를 가져오는 코드 작성
    newShorts.classList.add("select");
    popularShorts.classList.remove("select");
    shortsChoice =2
    shortsSelect(shortsChoice);
})

/* profile dropdown */
const profileDropdownBtn = document.querySelector(".profile-dropdown-btn");
const profileDropdownBtnIcon = document.querySelector(".profile-dropdown-btn-icon");
const profileDropdown = document.querySelector(".profile-dropdown");
let toggleFlag = true;

const hideProfileDropdown = () => {
    profileDropdown.style.height = "0px";
    profileDropdown.style.border = "none";
    profileDropdownBtnIcon.classList.add("fa-caret-down");
    profileDropdownBtnIcon.classList.remove("fa-caret-up");
    toggleFlag = true;
}

const profileDropdownEvent = () => {
    if(toggleFlag){
        profileDropdown.style.height = "50px";
        profileDropdown.style.border = "1px solid black";
        profileDropdownBtnIcon.classList.add("fa-caret-up");
        profileDropdownBtnIcon.classList.remove("fa-caret-down");
        toggleFlag = false;
        
    }else{
        hideProfileDropdown();
    }
}

if(loginMember != '') {
    profileDropdownBtn.addEventListener("click", () => {
        profileDropdownEvent();
    })
    
    window.addEventListener("click", e => {
        if(!e.target.matches('.profile-dropdown, .profile-dropdown-btn, .profile-dropdown-btn-icon')){
            hideProfileDropdown();
        }
    })
}


/* 슬라이드 기능 */
// if(document.getElementsByClassName('place-item').length < 5) {
//     document.querySelector(".slide-container > .next-arrow").style.display = "none";
// }

document.addEventListener("DOMContentLoaded", function(){
    let placeListArea = document.querySelector(".place-list-area");

    placeListArea.addEventListener("click", function (e) {
        currentNode = e.target;
        if (e.target.nodeName == "I") {
            currentNode = currentNode.parentElement;
        }

        if (currentNode.className == "prev-arrow") {
            prevMove(currentNode);
        } else if(currentNode.className == "next-arrow") {
            nextMove(currentNode);
        } else {
            return;
        }
    })

    // 공통 
    let offset = 1176;
    let placeItemWidth = 305;

    // 이전 슬라이드로 이동
    function prevMove(currentNode) {
        let prevBtn = currentNode;
        let nextBtn = prevBtn.nextElementSibling;
        let placeList = nextBtn.nextElementSibling;
        let placeListWidth = placeList.clientWidth;
        nextBtn.style.display = "flex";
        let currentLeft = placeList.offsetLeft;

        // 더많이 남았을 때
        if(offset + currentLeft < 0) {
            placeList.style.left = placeList.offsetLeft + offset + "px";
        } else {
            placeList.style.left = 0 + "px";
            prevBtn.style.display = "none";
        }
    }

    // 다음 슬라이드로 이동
    function nextMove(currentNode) {
        let nextBtn = currentNode;

        let prevBtn = nextBtn.previousElementSibling;
        let placeList = nextBtn.nextElementSibling;
        let placeListWidth = placeList.clientWidth;

        prevBtn.style.display = "flex";
        let currentLeft = placeList.offsetLeft;
        let newOffset = offset + -currentLeft;
        let nextOffset = placeListWidth - newOffset;

        if (nextOffset > offset) {
            placeList.style.left = placeList.offsetLeft - offset + "px";
        } else if (nextOffset <= offset) {
            placeList.style.left = placeList.offsetLeft - nextOffset + "px";
            nextBtn.style.display = "none";
        }
    }
})