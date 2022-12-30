<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/minihome/home/minihome-profile.css">
    <title>프로필</title>
</head>
<body>
    <div class="profile-area">
        <img src="/resources/images/삐약.gif" class="profile-img">

        <div class="emoji-container">
            <div class="today-emoji">
                <span>Today is</span>&nbsp;
                <span id="emojiText">유혹중</span>&nbsp;
                <img id="emojiImg" src="/resources/images/emotion/007-temptation.png">
            </div>

            <!-- 스페이스 주인 번호와 loginMember.memberNo가 같을 경우 -->
            <div class="today-dropdown-btn"><i class="fa-solid fa-caret-down today-dropdown-btn-icon"></i></div>

            <div class="today-dropdown">
                <span><span>기뻐요</span>&nbsp;<img src="/resources/images/emotion/001-happy.png"></span>
                <span><span>슬퍼요</span>&nbsp;<img src="/resources/images/emotion/002-sad.png"></span>
                <span><span>화나요</span>&nbsp;<img src="/resources/images/emotion/003-angry.png"></span>
                <span><span>졸려요</span>&nbsp;<img src="/resources/images/emotion/004-sleeping.png"></span>
                <span><span>아파요</span>&nbsp;<img src="/resources/images/emotion/005-sick.png"></span>
                <span><span>고민중</span>&nbsp;<img src="/resources/images/emotion/006-thinking.png"></span>
                <span><span>유혹중</span>&nbsp;<img src="/resources/images/emotion/007-temptation.png"></span>
                <span><span>연애중</span>&nbsp;<img src="/resources/images/emotion/008-loving.png"></span>
            </div>
        </div>
 
        <!-- 필요할 경우 css 추가 -->
        <div class="profile-message">
            집에 가고싶다...
        </div>

        <!-- 스페이스 주인 번호와 loginMember.memberNo가 같을 경우 -->
        <span id="profileUpdate">프로필 수정</span>

        <div class="line"></div>

        <div>
            <span class="user-nickname">편의점에서썸타는</span>
            <span class="user-name">(김효동)</span>
        </div>

        <span class="user-email">gyehd1230@naver.com</span>

        <div class="surf-container">
            <select id="surf" onchange="window.open(value,'_self');">
                <option>♥ 깐부 파도타기 ♥</option>
                <option value="/minihome/home/1">현진</option>
                <option value="#">수연</option>
                <option value="#">영현</option>
                <option value="#">다원</option>
                <option value="#">동현띠</option>
            </select>
        </div>

        <!-- 스페이스 주인 번호와 loginMember.memberNo가 다를 경우 -->
        <!-- <span id="returnMyHome">내 스페이스로 돌아가기</span> -->
    </div>
</body>

<script src="/resources/js/minihome/home/minihome-profile.js"></script>
</html>