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
    <link rel="stylesheet" href="/resources//css/member/login/findIdPw.css">


    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>

</head>

<body>

    <jsp:include page="/WEB-INF/views/include/header.jsp" />

    <div class="findIdPw">

        <div class="signUpInfoLink">
            <a href="findId.html" id="findIdLink">아이디 찾기</a>
            <a href="findPw.html" id="findPwLink">비밀번호 찾기</a>
        </div>


        <form action="/member/findId" method="POST" name="findId-frm" id="findId-frm">

            <div>
                <!-- 이름/생년월일/휴대번호 -->
                <!-- 이름 -->
                <div class="questionBox">
                    <div class="signUp-input-Name textbox">
                        <i class="fa-regular fa-user"></i>
                        <input type="text" name="memberName" class="inputBox" id="memberName" placeholder="회원가입한 계정 이름"
                            maxlength="10" />
                    </div>
                    <div class="firstBox">
                        <span class="signUp-message" id="nameMessage"></span>
                    </div>
                </div>



                <!-- 휴대번호 -->
                <div class="questionBox">
                    <div class="signUp-input-Tel textbox">
                        <i class="fa-solid fa-mobile-screen"></i>
                        <input type="text" name="memberTel" class="inputBox" id="memberTel"
                            placeholder="회원가입한 전화번호 ex)01045459986" maxlength="11" value="${tempMember.memberTel}" />
                    </div>
                    <div class="firstBox">
                        <span class="signUp-message" id="telMessage">"-" 기호를 제외하고 숫자만 입력해주세요"</span>
                    </div>
                </div>


                <!-- 아이디(이메일) -->
                <div class="questionBox">
                    <div class="signUp-input-Email textbox">
                        <i class="fa-regular fa-envelope"></i>
                        <input type="text" name="memberEmail" id="memberEmail" class="inputBox" placeholder="아이디 정보를 받을 새 이메일을 입력해주세요"
                            maxlength="40" autocomplete="off" value="${tempMember.memberEmail}" />
                    </div>
                    <div class="emailMessageBox firstBox">
                        <span class="signUp-message" id="emailMessage">사용가능한 이메일을 입력해주세요.</span>
                    </div>
                </div>

            </div>



            <!--------------------- 회원 정보 입력 끝  --------------------->
            <!-- 회원 가입 다음 단계 -->
            <div class="SignUpAgreement6">
                <button class="SignUp">아이디 찾기</button>
                <a href="" id="toLoginPage">로그인하기</a>
            </div>
        </form>
    </div>





    <jsp:include page="/WEB-INF/views/include/footer.jsp" />


    <script src="/resources/js/member/login/findIdPw.js"></script>
</body>

</html>