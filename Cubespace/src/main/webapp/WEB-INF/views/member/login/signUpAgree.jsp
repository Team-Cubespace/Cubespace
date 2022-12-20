<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/common/header.css">
    <link rel="stylesheet" href="/resources/css/common/footer.css">
    <link rel="stylesheet" href="/resources/css/member/login/signUpAgree.css">


    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>

</head>

<body>

    <jsp:include page="/WEB-INF/views/include/header.jsp" />


    <div class="signUp_agree">
        <div class="guideArea">
            <div class="guideText">
                <p>01</p>
                <p>약관동의</p>
            </div>
            <div class="chevron">
                <i class="fa-solid fa-chevron-right"></i>
            </div>
            <div class="guideText">
                <p>02</p>
                <p>정보입력</p>
            </div>
            <div class="chevron">
                <i class="fa-solid fa-chevron-right"></i>
            </div>
            <div class="guideText">
                <p>03</p>
                <p>가입완료</p>
            </div>
        </div>
    
    
        <div>
            <div class="agreeText">
                <p>Cubespace 회원 이용약관</p>
                <p>Cubespace 서비스이용약관을 위해 아래 이용약관 및 정보이용에 동의해주세요</p>
            </div>
    
            <!--------------------- 회원 약관동의 내용 시작  --------------------->
            <div class="SignUpAgreement4 Scroll">
                <p class="ag_text mt">제 1 장 총칙</p><br>
                <p class="ag_text">제 1 조 (목적)</p>
                <p class="ag_text mt">본 약관은  ▒▒Cubespace▒▒에서 제공하는 인터넷 서비스(이하 "서비스"라 합니다)를 이용함에 있어 Cubespace와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p><br>
                <p class="ag_text">제 2 조 (약관의 효력 및 변경)</p>
                <p class="ag_text">① 이 약관은 ▒▒ Cubespace ▒▒ 웹페이지 또는 전자우편 등의 수단을 이용하여 이를 공시함으로써 효력이 발생됩니다.</p>
                <p class="ag_text">② 합리적인 사유가 발생할 경우 관련법령에 위배되지 않는 범위 안에서 Cubespace는 약관의 내용을 회원의 사전 동의 없이 개정할 수 있으며, 변경된 약관은 온라인에서 공시함으로써 효력이 발휘됩니다. 단, 이용자의 권리 또는 의무 등 중요한 규정의 개정은 사전에 공지합니다.</p>
                <p class="ag_text">③ 이 약관에 동의하는 것은 정기적으로 웹사이트를 방문하여 약관의 변경사항을 확인하는 것에 동의함을 의미합니다. 변경된 약관에 대한 정보를 알지 못해 발생하는 이용자의 피해는 Cubespace에서 책임지지 않습니다.</p>
                <p class="ag_text mt">④ 회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴(해지)를 요청할 수 있으며, 변경된 약관의 효력 발생일 이후 14일 이내에 해지 요청을 하지 않을 경우 약관의 변경 사항에 동의한 것으로 간주됩니다.</p><br>
                <p class="ag_text">제 3 조 (약관 외 준칙)</p>
                <p class="ag_text mt">본 약관에 명시되지 아니한 사항에 대해서는 전기통신기본법, 전기통신사업법, 정보통신망 이용촉진등에 관한 법률 및 기타 관련 법령의 규정에 따릅니다.</p>
            </div>
            <!--------------------- 회원 약관동의 내용 끝  --------------------->
            
            <form action="/member/signUp/info" method="GET" onsubmit="return memberSignUpAgreement()">
                <!-- 회원 약관동의 체크박스 관련 -->
                <div class="SignUpAgreement5">
                    <div>
                        <input type="checkbox" name="nextSignUp" id="nextSignUp">
                        <label for="nextSignUp">
                            <i class="fa-solid fa-square-check"></i>회원약관에 동의합니다.
                        </label>
                    </div>
                </div>
                <!-- 회원 가입 다음 단계 -->
                <div class="SignUpAgreement6">
                    <button class="SignUp">회원 가입하기</button>
                </div>
    
        </div>
    </div>





    <jsp:include page="/WEB-INF/views/include/footer.jsp" />



    <script>
        function memberSignUpAgreement(){
            // 체크 여부 검사
            const nextSignUp = document.getElementById("nextSignUp");

            // 체크가 되어있지 않은 경우
            if(!nextSignUp.checked){ 
                alert("회원약관에 동의를 해주세요.")
                nextSignUp.focus();
                return false; 
            }
            return true;
            }
    </script>
</body>

</html>