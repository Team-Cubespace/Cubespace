<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>미니홈피</title>
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-frame.css">
    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
</head>
<body>
    <div class="minihome">
        <%-- <div class="audio-container">
            <button class="fa-solid fa-play" id="audioButton"></button>
            <span class="audio-title" id="audioTitle">노래 이름</span>
            <span class="audio-duration" id="audioDuration">00:00</span>
        </div> --%>
        <div class="minihome-frame">
            <div class="minihome-header">
                <div class="minihome-header-left">
                    <div class="today-area">
                        <div>TODAY <span class="today">120</span></div>
                        <div>TOTAL <span class="total">1250</span></div>
                    </div>
                    <div class="active">
                        <span>매력지수 액티브</span>
                        <div class="active-range">
                            <div class="empty"></div>
                            <div class="fill"></div>
                        </div>
                    </div>
                </div>
                <div class="minihome-header-right">
                    <div class="minihome-title-area">
                        <input class="minihome-title" value="묘동님의 미니홈피 헤헷~~~">
                        <button id="updateMinihomeTitleButton" type="button" class="fa-solid fa-gear"></button>
                    </div>
                    <div class="audio-container">
                        <button id="playButton" class="fa-solid fa-circle-play"></button>
                        <%-- <i class="fa-solid fa-circle-pause"></i> --%>
                        <%-- <i class="fa-solid fa-circle-play"></i> --%>
                        <span id="duration">00:00</span>
                        <span id="musicName">노래 이름</span>
                        <div class="music-volume-area">
                            <i class="fa-solid fa-volume-high"></i>
                            <input id="musicVolume" type="range">
                        </div>
                    </div>
                </div>
            </div>
            <section class="minihome-main">

                <iframe src="/albumList" frameborder="0" name="minihomeMenu" scrolling="no">

                </iframe>
                <ul class="minihome-menu">
                    <li><a href="">홈</a></li>
                    <li><a href="">다이어리</a></li>
                    <li><a href="/albumList" target="minihomeMenu">사진첩</a></li>
                    <li><a href="">동영상</a></li>
                    <li><a href="">방명록</a></li>
                    <li><a href="/manage/font" target="minihomeMenu">관리</a></li>
                </ul>   

            </section>
        </div>
    </div>
    <script src="/resources/js/common/jQuery-core.js"></script>
    <script src="/resources/js/minihome/minihome-frame.js"></script>
</body>
</html>