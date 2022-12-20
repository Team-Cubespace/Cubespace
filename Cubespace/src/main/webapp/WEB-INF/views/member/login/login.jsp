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

    <jsp:include page="/WEB-INF/views/include/header.jsp" />



    <form action="/member/login" method="post" id="loginForm">

        <img src="/resources/images/common/bigCube.png" class="bigCube">

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
        <div class="simpleLogin kakao" onclick="kakaoLogin();">
            <img src="/resources/images/common/kakaoLogo.png" class="loginLogo">
            <div id="startKakao">카카오로 시작하기</div>
        </div>



    </form>




    <jsp:include page="/WEB-INF/views/include/footer.jsp" />


    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" charset="utf-8"></script>
    <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
    <script src="/resources/js/member/login/login.js"></script>
</body>

</html>