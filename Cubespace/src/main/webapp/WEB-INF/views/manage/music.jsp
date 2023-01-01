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
    <jsp:include page="/WEB-INF/views/include/font.jsp"/>
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
                            <i id="allFont" class="whiteBtn">모든 배경음악</i>
                            <input type="text" id="searchInput" class="headerSearch" placeholder="배경음악 검색" value="${param.searchInput}">
                            <i class="fa-solid fa-magnifying-glass" id="searchBtn"></i>
                        </form>
                    </div>
                    <a href="" class="storeLinkArea"> <%-- 상점 이동 링크 --%>
                        <i class="fa-solid fa-store"></i> 상점이동
                    </a>
                </header>
                <div class="musicArea">
                    <div class="fontHeader backgroundHeader musicHeader">
                        <div class="musicTitle">노래 제목</div>
                        <div class="musicExample">제작자</div>
                        <div class="musicListen">듣기</div>
                        <div class="musicUse">
                            <button class="useMusicBtn whiteBtn">적용하기</button>
                        </div>
                    </div>

                    <%-- 작성자가 unknown이라면 넣을 문구 추가 --%>

                    <div class="fontMain backgroundMain musicMain">
                        <div class="musicTitleArea">
                            <img src="" class="musicThumbnail">
                            <span class="musicTitle">노래1</span>
                        </div>
                        <div class="musicExample"></div>
                        <div class="musicListen"></div>
                        <div class="musicUse">
                            <input type="radio" name="useMusicRadio" class="useMusicRadio" id="">
                        </div>
                    </div>

                    <div class="fontMain backgroundMain musicMain">
                        <div class="musicTitleArea">
                            <img src="" class="musicThumbnail">
                            <span class="musicTitle">노래1</span>
                        </div>
                        <div class="musicExample"></div>
                        <div class="musicListen"></div>
                        <div class="musicUse">
                            <input type="radio" name="useMusicRadio" class="useMusicRadio" id="">
                        </div>
                    </div>
                    
                    
                </div>
            </main>  
        </section>
    </div>
</body>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script> <%-- jquery --%>
    <script src="/resources/js/manage/music.js"></script>
</html>