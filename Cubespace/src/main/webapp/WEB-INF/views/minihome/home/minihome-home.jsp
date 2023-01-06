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
    <title>홈</title>
    <link rel="stylesheet" href="/resources/css/minihome/include/minihome-common.css">
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/minihome/home/minihome-home.css">
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
    <jsp:include page="/WEB-INF/views/include/allFontMusic.jsp"/>
</head>
<body>
    <div class="content-area">
        <section class="minihome-rayout">
            <jsp:include page="/WEB-INF/views/minihome/home/minihome-profile.jsp"/>
        </section>

        <section class="minihome-rayout">
            <div id="homeArea">
                <header>최근 게시물</header>

                <!-- 최근 게시물 -->
                <div class="new-post-container">
                    <c:choose>
                        <c:when test="${fn:length(newPost) == 0}">
                            <div class="nothing">최근 게시물이 없습니다&nbsp;<i class="fa-solid fa-face-sad-tear"></i></div>
                        </c:when>

                        <c:otherwise>
                            <c:forEach var="newPost" items="${newPost}">
                                <div class="new-post">
                                    <div class="post-content">
                                        <span class="post-category">
                                            <c:if test="${newPost.category == '사진첩'}"><a href="/albumList/2"></c:if>
                                            <c:if test="${newPost.category == '동영상'}"><a href="/videoList/3"></c:if>
                                            ${newPost.category}</a>
                                        </span>

                                        <span>::</span>

                                        <span class="post-title">
                                            <c:set var="title" value="${newPost.title}"/>

                                            <c:if test="${newPost.scrapYN == 'Y'}">
                                                <c:set var="title" value="[스크랩] ${newPost.title}"/>
                                            </c:if>

                                            <c:if test="${newPost.category == '사진첩'}">
                                                <a href="/albumDetail/${newPost.postNo}?folderNo=${newPost.folderNo}" title="${title}">
                                            </c:if>

                                            <c:if test="${newPost.category == '동영상'}">
                                                <a href="/videoDetail/${newPost.postNo}?folderNo=${newPost.folderNo}" title="${title}">
                                            </c:if>

                                            <c:if test="${newPost.openFL == 3}"><i class="fa-solid fa-lock"></i></c:if>${title}</a>
                                        </span>
                                    </div>

                                    <div class="post-time">${newPost.create}</div>
                                </div>
                            </c:forEach>
                        </c:otherwise>
                    </c:choose>
                </div>
        
                <header class="miniroom-header">
                    <span>미니룸</span>

                    <c:if test="${minihome.memberNo == loginMember.memberNo}">
                        <a href="#" class="miniroom-deco"><i class="fa-solid fa-gear"></i>&nbsp;미니룸 꾸미기</a>
                    </c:if>
                </header>

                <!-- 미니룸 -->
                <div class="miniroom-container">
                    <div class="miniroom">
                        <div class="left"></div>
                        <div class="right"></div>
                        <div class="bottom"></div>
                    </div>
                </div>
        
                <header>깐부 메시지</header>

                <!-- 깐부 메시지 남기기 (기능 구현 예정) -->
                <div class="write-message">
                    <span>메시지 남기기</span>
                    <input type="text" id="dearFriend" placeholder="깐부에게 메시지를 남겨보세요!">
                    <span id="writeBtn">등록</span>
                </div>

                <!-- 깐부 메시지 목록 -->
                <div class="friend-message-container">
                    <c:choose>
                        <c:when test="${fn:length(friendMessage) == 0}">
                            <div class="nothing">깐부 메시지가 없습니다&nbsp;<i class="fa-solid fa-face-sad-tear"></i></div>
                        </c:when>

                        <c:otherwise>
                            <c:forEach var="message" items="${friendMessage}">
                                <div class="friend-message">
                                    <div class="message-content">
                                        <button class="friend-name member-nickname nickname-drop-down-button" style="font-family: '${message.ownFontNo}';">
                                            ${message.memberNickname}
                                            <ul class="nickname-drop-down-box">
                                                <li><a href="/minihome/${message.memberNo}" onclick="return openMinihome(this.href)">미니홈피</a></li>
                                                <li><a onclick="reportFriend()">신고</a></li>
                                            </ul>
                                        </button>
                                        
                                        <span style="font-family: '${message.ownFontNo}';">::</span>
                                        <span class="message"><span title="${message.content}" style="font-family: '${message.ownFontNo}';">${message.content}</span></span>
                                    </div>

                                    <div class="message-time">
                                        <span style="font-family: '${message.ownFontNo}';">${message.create}</span>

                                        <c:if test="${minihome.memberNo == loginMember.memberNo || message.memberNo == loginMember.memberNo}">
                                            <button class="delete-btn" value="${message.commentNo}"><i class="fa-solid fa-xmark"></i></button>
                                        </c:if>
                                    </div>
                                </div>
                            </c:forEach>
                        </c:otherwise>
                    </c:choose>
                </div>

                <!-- 버튼 영역 -->
                <div id="btnArea">
                    <span id="moreBtn">메시지 더보기</span>
                    <span id="topBtn">상단으로 가기</span>
                </div>
            </div>
        </section>
    </div>
</body>

<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
<script src="/resources/js/minihome/home/minihome-content.js"></script>
<script src="/resources/js/minihome/include/minihome-common.js"></script>
</html>