/* 슬라이드 기능 */
if(document.getElementsByClassName('place-item').length < 5) {
    document.querySelector(".slide-container > .next-arrow").style.display = "none";
}

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

/* today, shorts 선택 */
const todayStar = document.getElementById("todayStar");
const todayRank = document.getElementById("todayRank");
const popularShorts = document.getElementById("popular-shorts");
const newShorts = document.getElementById("new-shorts");

const todaySelect = () => {
    // 여기에 ajax로 리스트를 가져오는 코드 작성
    todayStar.classList.add("select");
    todayRank.classList.remove("select");
};

(todaySelect)();

todayStar.addEventListener("click", () => {
    todaySelect();
})

todayRank.addEventListener("click", () => {
    // 여기에 ajax로 리스트를 가져오는 코드 작성
    todayRank.classList.add("select");
    todayStar.classList.remove("select");
})

const shortsSelect = () => {
    // 여기에 ajax로 리스트를 가져오는 코드 작성
    popularShorts.classList.add("select");
    newShorts.classList.remove("select");
}

(shortsSelect)();

popularShorts.addEventListener("click", () => {
    shortsSelect();
})

newShorts.addEventListener("click", () => {
    // 여기에 ajax로 리스트를 가져오는 코드 작성
    newShorts.classList.add("select");
    popularShorts.classList.remove("select");
})

/* dropdown */
const dropDownBtn = document.querySelector(".dropdown-btn");
const dropDownBtnIcon = document.querySelector(".dropdown-btn-icon");
const dropdown = document.querySelector(".dropdown");
let toggleFlag = true;

const hideDropdown = () => {
    dropdown.style.height = "0px";
    dropdown.style.border = "none";
    dropDownBtnIcon.classList.add("fa-caret-down");
    dropDownBtnIcon.classList.remove("fa-caret-up");
    toggleFlag = true;
}

const dropdownEvent = () => {
    if(toggleFlag){
        dropdown.style.height = "50px";
        dropdown.style.border = "1px solid black";
        dropDownBtnIcon.classList.add("fa-caret-up");
        dropDownBtnIcon.classList.remove("fa-caret-down");
        toggleFlag = false;
        
    }else{
        hideDropdown();
    }
}

if(loginMember != '') {
    dropDownBtn.addEventListener("click", () => {
        dropdownEvent();
    })
    
    window.addEventListener("click", e => {
        if(!e.target.matches('.dropdown, .dropdown-btn, .dropdown-btn-icon')){
            hideDropdown();
        }
    })
}

/* 미니홈페이지 오픈 */
const openMinihome = (url) => {
    console.log(url);
    let title = "minihome";

    let status = "resizable=no, status=no, menubar=no, width=1203, height=718, top=50, left=300";
    window.open(url, title, status);

    return false;
}


/* 로그아웃 */
const logout = document.getElementById("logout");
if(logout != null){

    logout.addEventListener("click", e => {
    
        //카카오로그아웃  
        (()=>{
            
            if (Kakao.Auth.getAccessToken()) {
            Kakao.API.request({
                url: '/v1/user/unlink'
                , success: function (response) {
        
                console.log(response);
                window.location.href="/";
                },
                fail: function () {
        
                alert("로그아웃에 실패하셨습니다");
                }
            })
            Kakao.Auth.setAccessToken(undefined);
        
            } else {
            alert("이미 로그아웃 상태입니다");
            }
        })();
        
        
          
    
        location.href = "/member/logout";
    })
}