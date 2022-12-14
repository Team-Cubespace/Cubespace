let minihomePopup;

// 드랍다운 버튼 이벤트 달기
(()=>{
    // header 드랍다운 버튼 가져오기
    const headerDropDownButton = document.getElementById("headerDropDownButton");
    // header 드랍다운이 null이 아닐 때(로그인 상태 시)
    if(headerDropDownButton != null) {
        // 클릭 이벤트
        headerDropDownButton.addEventListener("click", ()=>{
            document.getElementById("headerDropDown").style.display = "block";
        });
        // 블러 이벤트
        headerDropDownButton.addEventListener("blur", ()=>{
            setTimeout(()=>{
                document.getElementById("headerDropDown").style.display = "none";
            }, 100);
        });
    }
})();

const closePopup = () => {
    if(minihomePopup != null) {
        minihomePopup.close(); 
    } else {
        minihomePopup = window.open("https://www.naver.com", "minihome", "resizable=no, status=no, menubar=no, width=1203, height=718, top=50, left=300");
        minihomePopup.close();
    }
    return true;
}

/* 미니홈페이지 오픈 */
const openMinihome = (url) => {
    // 로그인 상태가 아닐 때
    if(loginMemberNo == "") {
        if(confirm("로그인 상태가 아닙니다.\n로그인 하시겠습니까?")) {
            location.href = "/member/login";
        } else {
            return false;
        }
    }
    localStorage.removeItem("minihomeHistory");
    let title = "minihome";

    let status = "resizable=no, status=no, menubar=no, width=1203, height=718, top=50, left=300";
    minihomePopup = window.open(url, title, status, false);

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