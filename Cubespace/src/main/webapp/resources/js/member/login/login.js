

// 카카오 로그인
Kakao.init('ba7efe090b13a948ab0dd59fc30762a7'); //발급받은 키 중 javascript키를 사용해준다.
console.log(Kakao.isInitialized()); // sdk초기화여부판단

function kakaoLogin() {
  Kakao.Auth.login({
    success: function (response) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: function (response) {
          // console.log(JSON.stringify(response));
          console.log("3" + response);

          window.Kakao.API.request({ // 사용자 정보 가져오기 
            url: '/v2/user/me',
            success: (res) => {
                const kakao_account = res.kakao_account;
                // console.log(kakao_account.properties);

                console.log("4" + res);

                $.ajax({
                  url : "/member/kakaoLogin",
                  type : "post",
                  data : {"kakaoLoginMember" : JSON.stringify(response)},
                  success : e => {

                    console.log("success : " + e);

                    if(e == 0){
                      alert("0"); // 페이지 이동
                      location.href = "/";
                    }else if(e == 1) {
                      alert("1");
                      location.href="/member/findId";
                    } else {
                      alert(e);
                      
                    }
                  }

                })
                console.log("여기");
            }
        });
        },
        fail: function (error) {
          console.log(error)
        }
        
      })/* , location.href = "/"; */ , console.log("2");
    },
    fail: function (error) {
      console.log(error)
    }
  })
  // location.href = "/"; 
  console.log("1");
}
//카카오로그아웃  
function kakaoLogout() {
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
}  



// 나중에 자리옮김
//  카카오탈퇴
// function secession() {
//   Kakao.API.request({
//       url: '/v1/user/unlink',
//       success: function(response) {
//           console.log(response);
//           //callback(); //연결끊기(탈퇴)성공시 서버에서 처리할 함수
//           window.location.href='/'
//       },
//       fail: function(error) {
//           console.log('탈퇴 미완료')
//           console.log(error);
//       },
//   });
// };


/* ------------------------------------------- */
/* 네이버로그인 */
const naverLogin = document.getElementsByClassName("naver")[0];
naverLogin.addEventListener("click", e=> {
  alert("서비스 준비중입니다");
})