

// 카카오 로그인
Kakao.init('ba7efe090b13a948ab0dd59fc30762a7'); //발급받은 키 중 javascript키를 사용해준다.
console.log(Kakao.isInitialized()); // sdk초기화여부판단

function kakaoLogin() {
  Kakao.Auth.login({
    success: function (response) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: function (response) {

          window.Kakao.API.request({ // 사용자 정보 가져오기 
            url: '/v2/user/me',
            success: (res) => {
              const kakao_account = res.kakao_account;


              $.ajax({
                url: "/member/kakaoLogin",
                type: "post",
                data: { "kakaoLoginMember": JSON.stringify(response) },
                success: e => {
                  if (e == 0) {
                    location.href = "/";
                  } else { // 전화번호가 저장되지 않은경우->수정페이지 이동
                    alert("큐브스페이스에 오신 것을 환영합니다. 카카오에서 불러오지 못한 필수 정보 입력을 위해 회원 수정 페이지로 이동합니다");
                    location.href = "/member/updateInfo";
                  }
                }

              })
            }
          });
        },
        fail: function (error) {
          console.log(error)
        }

      })/* , location.href = "/"; */
    },
    fail: function (error) {
      console.log(error)
    }
  })
  // location.href = "/"; 
}



/* ------------------------------------------- */
/* 네이버로그인 */
const naverLogin = document.getElementsByClassName("naver")[0];
naverLogin.addEventListener("click", e => {
  alert("서비스 준비중입니다");
})