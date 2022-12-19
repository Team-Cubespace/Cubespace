<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../../css/reset.css">
    <link rel="stylesheet" href="../../css/variables.css">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/common/header.css">
    <link rel="stylesheet" href="../../css/common/footer.css">
    <link rel="stylesheet" href="../../css/member/login/findIdPw.css">


    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
    <style>
        #findPwLink {
        border-bottom: none;
        border-top: 1px solid black;
        border-right: 1px solid black;
        color: var(--violet);
        font-weight: bold;
    }
    #findIdLink{
        color: black;
        border-left: none;
        border-top: none;
        border-bottom: 1px solid black;
    }
    </style>

</head>

<body>

    <header>
        <!------------------ 헤더 메뉴 ------------------>
        <ul class="header-menu-nav">
            <li>
                <a href="">
                    <i class="fa-solid fa-shop"></i>
                    <span>상점</span>
                </a>
            </li>
            <li>
                <a href="">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <span>깐부 찾기</span>
                </a>
            </li>
            <li>
                <a href="">
                    <div class="notice">
                        <span class="notice-new"></span>
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    <span>알림</span>
                </a>
            </li>
            <!-- 로그인 X -->
            <li>
                <a href="">
                    <i class="fa-solid fa-right-to-bracket"></i>
                    <span>로그인</span>
                </a>
            </li>

            <!-- 로그인 O -->
            <!-- <li>
                <button type="button" id="headerDropDownButton">
                    <img src="cat4.jpg" alt="로그인 회원 프로필 이미지" class="header-profile-image">
                    <ul class="header-drop-down" id="headerDropDown">
                        <li><a href="">내 미니홈피</a></li>
                        <li><a href="">내 정보 수정</a></li>
                        <li><a href="">로그아웃</a></li>
                    </ul>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
            </li> -->
        </ul>
        <!------------------ 헤더 로고 영역 ------------------>
        <div class="header-logo">
            <a href="/">
                <img src="../../images/common/bigCube.png">
                <span class="header-logo-title">Cubespace</span>
            </a>
    </header>

    <div class="findIdPw">

        <div class="signUpInfoLink">
            <a href="" id="findIdLink">아이디 찾기</a>
            <a href="" id="findPwLink">비밀번호 찾기</a>
        </div>


        <form action="/member/login/findPw" method="POST" name="findPw-frm" id="findPw-frm">

            <div>
                <!-- 아이디(이메일) -->
                <div class="questionBox">
                    <div class="signUp-input-Email textbox">
                        <i class="fa-regular fa-envelope"></i>
                        <input type="text" name="memberEmail" id="memberEmail" class="inputBox" placeholder="회원가입한 계정 이메일"
                            maxlength="40" autocomplete="off" value="${tempMember.memberEmail}" />
                    </div>
                    <div class="emailMessageBox firstBox">
                        <span class="signUp-message" id="emailMessage">사용가능한 이메일을 입력해주세요.</span>
                    </div>
                </div>

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


            </div>

            <p class="findPwInfo">임시 비밀번호가 회원가입한 이메일 계정으로 전송됩니다</p>



            <!--------------------- 회원 정보 입력 끝  --------------------->
            <!-- 회원 가입 다음 단계 -->
            <div class="SignUpAgreement6">
                <button class="SignUp">비밀번호 찾기</button>
                <a href="" id="toLoginPage">로그인하기</a>
            </div>
        </form>
    </div>





    <footer>
        <!------------------ 푸터 메뉴 ------------------>
        <ul class="footer-menu-nav">
            <li><a href="">이용약관</a></li>
            <li><a href="">개인정보처리방침</a></li>
            <li><a href="">저작권정책</a></li>
            <li><a href="">FAQ</a></li>
        </ul>
        <!------------------ 헤더 내용 ------------------>
        <div class="footer-content">
            <div class="footer-description">
                <span>대표자 : BDH</span>
                <span>대표전화 : 010 - 8108 - 1399</span>
                <span>사업자등록번호 : 870 - 85 - 01234</span>
                <span>주소 : 서울특별시 중구 남대문로 120 그레이츠 청계(구 대일빌딩) 2F A클래스 E조</span>
                <span>ⓒCubespace. All Rights Reserved.</span>
            </div>
            <div class="footer-logo">
                <img src="../../images/common/mark.gif">
            </div>
        </div>
    </footer>


    <script src="../../js/member/login/signUpInfo.js"></script>
</body>

</html>