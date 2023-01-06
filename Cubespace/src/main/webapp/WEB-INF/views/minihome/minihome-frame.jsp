<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>미니홈피</title>
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-frame.css">
    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>

    <style>
        .frame-color {
            background-color : ${minihome.frameColor};
        }
        .frame-menu-color a {
            background-color : ${minihome.frameMenuColor};
            color: ${minihome.frameFontColor};
        }
        .frame-menu-color a:hover {
            background-color : white;
            color: black;
        }
    </style>

    <c:if test="${fn:length(minihome.backgroundSkin) > 10}">
    <style>
        .minihome {
            background-image : url(${minihome.backgroundSkin});
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center;
        }
        body{
            width: 1200px;
            height: 725px;
        }
    </style>
    </c:if>
    <c:if test="${fn:length(minihome.backgroundSkin) <= 9}">
    <style>
        .minihome {
            background-color : ${minihome.backgroundSkin};
        }
    </style>
    </c:if>

    <script>
        originalFrameColor = "${minihome.frameColor}";
        originalFrameMenuColor = "${minihome.frameMenuColor}";
        originalFrameFontColor = "${minihome.frameFontColor}";
        originalBackgroundSkin = "${minihome.backgroundSkin}";
    </script>



<jsp:include page="/WEB-INF/views/include/allFontMusic.jsp"/>

</head>
<body>
    <div class="minihome">
        <%-- <button type="button" id="goBackButton" class="go-back-button frame-color" onclick="goBack()">
            <i class="fa-solid fa-house"></i>
            이전 미니홈피
        </button> --%>
        <%-- <div class="audio-container">
            <button class="fa-solid fa-play" id="audioButton"></button>
            <span class="audio-title" id="audioTitle">노래 이름</span>
            <span class="audio-duration" id="audioDuration">00:00</span>
        </div> --%>
        <div class="minihome-frame frame-color">
            <div class="minihome-header">
                <div class="minihome-header-left">
                    <div class="today-area">
                        <div>TODAY <span class="today">${minihome.today}</span></div>
                        <div>TOTAL <span class="total">${minihome.total}</span></div>
                    </div>
                    <div class="active">
                        <span>매력지수 액티브</span>
                        <div class="active-range">
                            <div class="empty"></div>
                            <div class="fill frame-color" style="width: ${(minihome.total * 1.0) / (minihome.maxTotal * 1.0) * 100}%"></div>
                        </div>
                    </div>
                </div>
                <div class="minihome-header-right" id="minihomeHeaderRight">
                    <div class="minihome-title-area">
                        <%-- <input class="minihome-title" value="${minihome.homepageName}" id="minihomeTitle" readOnly maxLength="10"> --%>
                        <div id="minihomeTitleContainer">
                            <p class="minihome-title" id="minihomeTitle">${minihome.homepageName}</p>
                        </div>
                        <button id="updateMinihomeTitleButton" type="button" class="fa-solid fa-gear header-hover"></button>
                        <button type="button" id="confirmUpdateButton">수정</button>
                        <button type="button" id="cancelUpdateButton">
                        취소</button>
                    </div>
                    <c:if test="${not empty minihome.musicPath}">
                        <div class="audio-container">
                            <div class="music-name-box">
                                <div class="marquee">
                                    <p id="minihomeMusicName" class="music-name">${minihome.musicName}</p>
                                </div>
                            </div>
                            <div class="music-controller">
                                <div>
                                    <button id="playButton" class="fa-solid fa-circle-pause"></button>
                                    <%-- <i class="fa-solid fa-circle-pause"></i> --%>
                                    <%-- <i class="fa-solid fa-circle-play"></i> --%>
                                    <span id="duration">00:00</span>
                                </div>
                                <div class="music-volume-area">
                                    <i id="volumeIcon" class="fa-solid fa-volume-high"></i>
                                    <%-- <i class="fa-solid fa-volume-xmark"></i> --%>
                                    <%-- <i class="fa-solid fa-volume-low"></i> --%>
                                    <%-- <i class="fa-solid fa-volume"></i>     --%>
                                    <%-- <i class="fa-solid fa-volume-high"></i> --%>
                                    <input id="musicVolume" type="range" max="99" step="1" value="50">
                                </div>
                            </div>
                        </div>
                    </c:if>
                </div>
            </div>
            <section class="minihome-main">

                <%-- 내꺼 --%>
                <%-- <iframe src="/diary/1" frameborder="0" name="minihomeMenu" scrolling="no"> --%>
                <%-- <iframe src="/diary/write" frameborder="0" name="minihomeMenu" scrolling="no"> --%>

                <%-- <iframe src="/albumList/2" frameborder="0" name="minihomeMenu" scrolling="no"> --%>
                <%-- <c:if test="${empty param.goVideo}">
                    <c:set var="iframeURL" value="${'/albumList/2'}"></c:set>
                </c:if>
                <c:if test="${not empty param.goVideo}">
                    <c:set var="iframeURL" value="${'/videoDetail/' + param.videoNo + '?folrderNo=' + param.folderNo}"></c:set>
                </c:if> --%>

                <iframe src="<c:if test="${not empty param.goVideo}">/videoDetail/${param.videoNo}?folderNo=${param.folderNo}</c:if><c:if test="${empty param.goVideo}">/albumList/2</c:if>" frameborder="0" name="minihomeMenu" scrolling="no">

                </iframe>
                <ul class="minihome-menu frame-menu-color">
                    <li><a href="">홈</a></li>
                    <c:if test="${minihome.categoryOrder.diary != -1}">
                        <li style="order:${minihome.categoryOrder.diary}"><a href="/diary/1" target="minihomeMenu">다이어리</a></li>
                    </c:if>
                    <c:if test="${minihome.categoryOrder.album != -1}">
                        <li style="order:${minihome.categoryOrder.album}"><a href="/albumList/2" target="minihomeMenu">사진첩</a></li>
                    </c:if>
                    <c:if test="${minihome.categoryOrder.video != -1}">
                        <li style="order:${minihome.categoryOrder.video}"><a href="/videoList/3" target="minihomeMenu">동영상</a></li>
                    </c:if>
                    <c:if test="${minihome.categoryOrder.guestBook != -1}">
                        <li style="order:${minihome.categoryOrder.guestBook}"><a href="/guestBook" target="minihomeMenu">방명록</a></li>
                    </c:if>

                    <c:if test="${minihome.memberNo == loginMember.memberNo}">
                        <li class="manage-menu" ><a href="/manage/font" target="minihomeMenu">관리</a></li>
                    </c:if>

                        <li id="goBackButton"><a onclick="goBack()">이전<br>미니홈피</a></li>
                </ul>
            </section>
        </div>
    </div>
    <script>
        let minihomeMusicPath = '${minihome.musicPath}';
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js" integrity="sha512-6+YN/9o9BWrk6wSfGxQGpt3EUK6XeHi6yeHV+TYD2GR0Sj/cggRpXr1BrAQf0as6XslxomMUxXp2vIl+fv0QRA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="/resources/js/common/jQuery-core.js"></script>
    <script src="/resources/js/common/moment.js"></script>
    <script src="/resources/js/minihome/minihome-frame.js"></script>
</body>
</html>