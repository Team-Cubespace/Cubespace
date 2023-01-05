<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<c:set var="profile" value="${profileMap.profile}"/>
<c:set var="friendList" value="${profileMap.friendList}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/minihome/home/minihome-profile.css">
    <title>프로필</title>
    <script>
        const minihomeNo = "${minihome.memberNo}";
        const loginNo = "${loginMember.memberNo}";
    </script>
</head>
<body>
    <div class="profile-area">

        <!-- 프로필 이미지 -->
        <c:choose>
            <c:when test="${profile.profileImage == null}">
                <img src="/resources/images/common/cubes.png" class="profile-img">
            </c:when>

            <c:otherwise>
                <img src="${profile.profileImage}" class="profile-img">
            </c:otherwise>
        </c:choose>

        <!-- 기분 -->
        <div class="emotion-container">
            <div class="today-emotion">
                <span>Today is</span>&nbsp;
                <span id="emotionText">${profile.emotionName}</span>&nbsp;
                <img id="emotionImg" src="${profile.emotionPath}">
            </div>

            <c:if test="${minihome.memberNo == loginMember.memberNo}">
                <div class="today-dropdown-btn"><i class="fa-solid fa-caret-down today-dropdown-btn-icon"></i></div>
            </c:if>

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
 
        <!-- 프로필 메시지 (수정 필요) -->
        <textarea class="profile-message" spellcheck="false" readonly>${profile.comment}</textarea>

        <!-- 프로필 수정 -->
        <c:if test="${minihome.memberNo == loginMember.memberNo}">
            <div><span id="profileUpdate">프로필 수정</span></div>
        </c:if>

        <!-- 닉네임, 이름, 이메일 -->
        <div class="user-info-container">
            <span class="user-nickname">${profile.memberNickname}</span>
            <span class="user-name">(${profile.memberName})</span>
        </div>

        <span class="user-email">${profile.memberEmail}</span>

        <!-- 깐부 파도타기 -->
        <div class="surf-container">
            <select id="surf" onchange="return openMinihome(this.value)">
                <option>~ 깐부 파도타기 ~</option>
                <c:forEach var="friend" items="${friendList}">
                    <option value="/minihome/${friend.memberNo}">${friend.memberNickname}(${friend.memberName})</option>
                </c:forEach>
            </select>
        </div>

        <!-- 내 스페이스로 돌아가기 -->
        <c:if test="${minihome.memberNo != loginMember.memberNo}">
            <div><a href="/minihome/${loginMember.memberNo}" id="returnMyHome" onclick="return openMinihome(this.href)">내 스페이스로 돌아가기</a></div>
        </c:if>
    </div>

    <jsp:include page="/WEB-INF/views/minihome/home/profile-update.jsp"/>
</body>

<script src="/resources/js/minihome/home/minihome-profile.js"></script>
</html>