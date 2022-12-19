<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>


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
    <link rel="stylesheet" href="/resources/css/member/login/login.css">


    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>

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
                <img src="/resources/images/common/bigCube.png">
                <span class="header-logo-title">Cubespace</span>
            </a>
        </div>
    </header>



    <form action="/member/login" method="post" id="loginForm">

        <img src="/resources/images/common/bigCube.png" class="bigCube">



        <!-- <ul>
            <li>
              <a id="naverIdLogin_loginButton" href="javascript:void(0)">
                  <span>네이버 로그인</span>
              </a>
            </li>
            <li onclick="naverLogout(); return false;">
              <a href="javascript:void(0)">
                  <span>네이버 로그아웃</span>
              </a>
            </li>
        </ul>


-------------------------------------------


        <ul>
            <li onclick="kakaoLogin();">
            <a href="javascript:void(0)">
                <span>카카오 로그인</span> -->

        <!-- id: 2580968502
                birthday :  "0210"
                birthday_needs_agreement :  false // false인 경우가 동의
                birthday_type :  "SOLAR"
                email :  "ekdnjs113@naver.com"
                email_needs_agreement :  false
                has_birthday :  true
                has_email :  true
                is_email_valid :  true
                is_email_verified :  true
                profile : 
                {nickname: '이다원', thumbnail_image_url: 'http://k.kakaocdn.net/dn/imSw2/btrTKLh0yey/94Pb1hAAOGhftzCqsTwDJ0/img_110x110.jpg', profile_image_url: 'http://k.kakaocdn.net/dn/imSw2/btrTKLh0yey/94Pb1hAAOGhftzCqsTwDJ0/img_640x640.jpg', is_default_image: false}
                profile_image_needs_agreement :  false
                profile_nickname_needs_agreement :  false -->




        <!-- </a>
            </li>
            <li onclick="kakaoLogout();">
            <a href="javascript:void(0)">
                <span>카카오 로그아웃</span>
            </a>
            </li>
        </ul>


------------------------------------------- -->

        <div>




            <!-- 아이디(이메일) -->
            <div class="signUp-input-Email textbox">
                <img src="/resources/images/common/smallCube.png" class="smallCube">
                <input type="text" name="memberEmail" id="memberEmail" class="inputBox" placeholder="아이디 (이메일)"
                    maxlength="40" autocomplete="off" value="${cookie.saveId.value}">
            </div>

            <!-- 쿠키에 saveId가 있는 경우 변수 생성 -->
            <c:if test="${!empty cookie.saveId.value}">
                <c:set var="temp" value="checked" />
            </c:if>

            <!-- 아이디 저장 -->
            <div class="saveId-area">
                <input type="checkbox" name="saveId" id="saveId" ${temp}>
                <label for="saveId">
                    <i class="fas fa-check"></i>
                    <div>아이디 저장</div>
                </label>
            </div>

            <!-- 비밀번호 -->
            <div class="signUp-input-password textbox">
                <img src="/resources/images/common/smallCube.png" class="smallCube">
                <input type="password" name="memberPw" class="inputBox" id="memberPw" placeholder="비밀번호" maxlength="20">
            </div>
        </div>

        <!-- 회원 가입 /찾기 버튼 -->
        <div class="text-area">
            <a href="/member/infoFind" class="findArea">
                <img src="/resources/images/common/smallCube.png" class="smallCube">
                ID/PW 찾기</a>
            <a href="/member/signUp/agreement" class="findArea">
                <img src="/resources/images/common/smallCube.png" class="smallCube">
                회원가입</a>
        </div>

        <div class="simpleLogin naver">
            <img src="/resources/images/common/naverLogo.png" class="loginLogo">
            <div>네이버로 시작하기</div>
        </div>
        <div class="simpleLogin kakao">
            <img src="/resources/images/common/kakaoLogo.png" class="loginLogo">
            <div id="startKakao">카카오로 시작하기</div>
        </div>



    </form>




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
                <img src="/resources/images/common/mark.gif">
            </div>
        </div>
    </footer>


    <script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" charset="utf-8"></script>
    <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
    <script src="/resources/js/member/login.js"></script>
</body>

</html>