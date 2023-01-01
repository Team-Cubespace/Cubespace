<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/common/checkBox.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/manage/manage.css">
    <link rel="stylesheet" href="/resources/css/manage/music.css">
    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
    <title></title>
    <style>
        .frame-color {
            background-color : ${minihome.frameColor};
        }
    </style>
    
</head>
<body>
    <div class="content-area frame-color">
        <section class="minihome-rayout">
                <div><jsp:include page="/WEB-INF/views/manage/manageLeftBar.jsp"/></div>
        </section>

        <section class="minihome-rayout">
            <div class="main">
                <header>
                    <div class="rightMusicTitleArea">
                        <span class="rightTitle">배경음악 관리</span>
                        <form class="searchArea">
                            <i id="allMusic" class="whiteBtn">모든 배경음악</i>
                            <input type="text" id="searchInput" name="searchInput" class="headerSearch" placeholder="배경음악 검색" value="${param.searchInput}">
                            <button class="fa-solid fa-magnifying-glass" id="searchBtn"></button>
                        </form>
                    </div>
                    <a href="" class="storeLinkArea"> <%-- 상점 이동 링크 --%>
                        <i class="fa-solid fa-store"></i> 상점이동
                    </a>
                </header>
                <div class="musicArea">
                    <div>
                        <button class="whiteBtn deleteMusic">배경음악 없애기</button>
                    </div>
                    <div class="fontHeader backgroundHeader musicHeader">
                        <div class="musicTitle">노래 제목</div>
                        <div class="musicExample">제작자</div>
                        <div class="musicListen">듣기</div>
                        <div class="musicUse">
                            <button class="useMusicBtn whiteBtn">적용하기</button>
                        </div>
                    </div>
                    <%-- 작성자가 unknown이라면 넣을 문구 추가 --%>
                <c:if test="${not empty musicList}">
                <c:forEach var="music" items="${musicList}">
                    <div class="fontMain backgroundMain musicMain">
                        <div class="musicTitleArea">
                            <img src="${music.musicThumnail}" class="musicThumbnail">
                        <c:choose>
                            <c:when test="${fn:length(music.musicName) > 70}">
                                <div class="musicTitle">${fn:substring(music.musicName, 0, 69)}...</div>
                            </c:when>
                            <c:otherwise>
                                <span class="musicTitle">${music.musicName}</span>
                            </c:otherwise>
                        </c:choose>
                            
                        </div>
                        <c:choose>
                            <c:when test="${fn:length(music.musicCreater) > 20}">
                                <div class="musicExample">${fn:substring(music.musicCreater, 0, 19)}...</div>
                            </c:when>
                            <c:otherwise>
                                <div class="musicExample">${music.musicCreater}</div>
                            </c:otherwise>
                        </c:choose>
                        <div class="musicListen">
                            <i class="fa-solid fa-play" id="${music.musicPath}"></i>
                            <i class="fa-solid fa-stop"></i>
                        </div>
                        <div class="musicUse">
                            <input type="radio" name="useMusicRadio" class="useMusicRadio" value="${music.musicNo}">
                        </div>
                    </div>
                </c:forEach>
                </c:if>
                <c:if test="${empty musicList}">
                    <p class="emptyMusicArea">
                        내가 보유한 노래가 없습니다. 상점에서 노래를 추가해주세요
                    </p>
                </c:if>
                </div>
            </main>  
        </section>
    </div>
</body>
    <script>
        const memberNo = "${loginMember.memberNo}"
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script> <%-- jquery --%>
    <script src="/resources/js/manage/music.js"></script>
</html>