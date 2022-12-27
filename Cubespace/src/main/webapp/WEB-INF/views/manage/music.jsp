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
            <main>
                <header>
                    <div class="rightFontTitleArea">
                        <span class="rightTitle">배경음악 관리</span>
                        <div class="searchArea">
                            <input type="text" id="searchInput" class="headerSearch" placeholder="배경음악 검색">
                            <i class="fa-solid fa-magnifying-glass" id="searchBtn"></i>
                        </div>
                    </div>
                    <a href="" class="storeLinkArea"> <%-- 상점 이동 링크 --%>
                        <i class="fa-solid fa-store"></i> 상점이동
                    </a>
                </header>
                <div class="fontArea">
                    <div class="fontHeader backgroundHeader">
                        <div class="fontTitle">노래 제목</div>
                        <div class="fontExample">제작자</div>
                        <div class="fontUse">
                            <button class="useFontBtn whiteBtn">적용하기</button>
                        </div>
                    </div>

                    <%-- 작성자가 unknown이라면 넣을 문구 추가 --%>

                    <div class="fontMain backgroundMain">

                        <div class="fontTitle"><i class="fa-solid fa-music"></i>&nbsp;&nbsp;노래1</div>
                        <div class="fontExample"></div>
                        <div class="fontUse">
                            <input type="radio" name="useFontRadio" class="useFontRadio" id="">
                        </div>
                    </div>
                    <div class="fontMain">
                        <div class="fontTitle"><i class="fa-solid fa-music"></i>&nbsp;&nbsp;노래1</div>
                        <div class="fontExample"></div>
                        <div class="fontUse">
                            <input type="radio" name="useFontRadio" class="useFontRadio" id="">
                        </div>
                    </div>
                    <div class="fontMain">
                        <div class="fontTitle"><i class="fa-solid fa-music"></i>&nbsp;&nbsp;노래1</div>
                        <div class="fontExample"></div>
                        <div class="fontUse">
                            <input type="radio" name="useFontRadio" class="useFontRadio" id="">
                        </div>
                    </div>
                    <div class="fontMain">
                        <div class="fontTitle"><i class="fa-solid fa-music"></i>&nbsp;&nbsp;노래1</div>
                        <div class="fontExample"></div>
                        <div class="fontUse">
                        <input type="radio" name="useFontRadio" class="useFontRadio" id="">
                        </div>
                    </div>
                    <div class="fontMain">
                        <div class="fontTitle"><i class="fa-solid fa-music"></i>&nbsp;&nbsp;노래1</div>
                        <div class="fontExample"></div>
                        <div class="fontUse">
                            <input type="radio" name="useFontRadio" class="useFontRadio" id="">
                        </div>
                    </div>
                    <div class="fontMain">
                        <div class="fontTitle"><i class="fa-solid fa-music"></i>&nbsp;&nbsp;노래1</div>
                        <div class="fontExample"></div>
                        <div class="fontUse">
                            <input type="radio" name="useFontRadio" class="useFontRadio" id="">
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