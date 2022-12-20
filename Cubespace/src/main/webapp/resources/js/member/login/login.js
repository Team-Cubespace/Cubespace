

// // 네이버 로그인
// var naverLogin = new naver.LoginWithNaverId(
//   {
//     clientId: "80mdf88flkWWJT1f93Tz", //내 애플리케이션 정보에 cliendId를 입력해줍니다.
//     callbackUrl: "http://localhost:8181/naverLogin", // 내 애플리케이션 API설정의 Callback URL 을 입력해줍니다.
//     isPopup: false,
//     callbackHandle: true
//   }
// );


// naverLogin.init();

// window.addEventListener('load', function () {
//   naverLogin.getLoginStatus(function (status) {
//     if (status) {
//       var email = naverLogin.user.getEmail(); // 필수로 설정할것을 받아와 아래처럼 조건문을 줍니다.

//       console.log(naverLogin.user);

//       if (email == undefined || email == null) {
//         alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
//         naverLogin.reprompt();
//         return;
//       }
//     } else {
//       console.log("callback 처리에 실패하였습니다.");
//     }
//   });
// });


// var testPopUp;
// function openPopUp() {
//   testPopUp = window.open("https://nid.naver.com/nidlogin.logout", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1,height=1");
// }
// function closePopUp() {
//   testPopUp.close();
// }

// function naverLogout() {
//   openPopUp();
//   setTimeout(function () {
//     closePopUp();
//   }, 10000);


// }



// 카카오 로그인
Kakao.init('ba7efe090b13a948ab0dd59fc30762a7'); //발급받은 키 중 javascript키를 사용해준다.
console.log(Kakao.isInitialized()); // sdk초기화여부판단

function kakaoLogin() {
  Kakao.Auth.login({
    success: function (response) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: function (response) {
          console.log(JSON.stringify(response));
          window.Kakao.API.request({ // 사용자 정보 가져오기 
            url: '/v2/user/me',
            success: (res) => {
                const kakao_account = res.kakao_account;
                console.log(kakao_account);

                $.ajax({
                  url : "/member/login",
                  type : "post",
                  data : {"kakaoLoginMember" : JSON.stringify(response), "loginType" : "3"}

                })
            }
        });
        // window.location.href="/member/login";
          



        },
        fail: function (error) {
          console.log(error)
        },
      })
    },
    fail: function (error) {
      console.log(error)
    }
  })
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
function secession() {
  Kakao.API.request({
      url: '/v1/user/unlink',
      success: function(response) {
          console.log(response);
          //callback(); //연결끊기(탈퇴)성공시 서버에서 처리할 함수
          window.location.href='/'
      },
      fail: function(error) {
          console.log('탈퇴 미완료')
          console.log(error);
      },
  });
};