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
    <link rel="stylesheet" href="/resources/css/common/checkBox.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/manage/manage.css">
    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
    <title></title>

    <style>
        .fa-minus {
            border: 2px solid black;
            border-radius: 50%;
            padding: 2px;
        }
        .frame-color {
            background-color : ${minihome.frameColor};
        }
    </style>
</head>
<body>
    <div class="content-area frame-color">
        <section class="minihome-rayout">
                <div>
                    <jsp:include page="/WEB-INF/views/manage/manageLeftBar.jsp"/>
                </div>
        </section>

        <section class="minihome-rayout">
            <main>
                <header>
                    <span class="rightTitle">깐부 관리</span>
                    <div class="searchArea">
                        <input type="text" id="searchInput" class="headerSearch" placeholder="깐부 닉네임 검색">
                        <i class="fa-solid fa-magnifying-glass" id="searchBtn"></i>
                    </div>

                </header>
                <div class="FriendArea">
                    <div class="listTitle">나의 깐부목록</div>
                    <div class="friendDetail">
                        <div class="friendImgName">
                            <img src="/resources/images/toy.jpg" class="profileImg">
                            <span class="nickname">김효동(묘동)</span>
                        </div>
                        <div class="friendBtn">
                            <span class="deleteFriend"><i class="fa-solid fa-minus"></i> 깐부끊기</span>
                            <a href="" id="" class="minihomeLink"><img src="/resources/images/common/smallCube.png" id="minihomeImg"> 미니홈피</a>
                        </div>
                    </div>
                    <div class="friendDetail">
                        <div class="friendImgName">
                            <img src="/resources/images/toy.jpg" class="profileImg">
                            <span class="nickname">김효동(묘동)</span>
                        </div>
                        <div class="friendBtn">
                            <span class="deleteFriend"><i class="fa-solid fa-minus"></i> 깐부끊기</span>
                            <a href="" id="" class="minihomeLink"><img src="/resources/images/common/smallCube.png" id="minihomeImg"> 미니홈피</a>
                        </div>
                    </div>
                    <div class="friendDetail">
                        <div class="friendImgName">
                            <img src="/resources/images/toy.jpg" class="profileImg">
                            <span class="nickname">김효동(묘동)</span>
                        </div>
                        <div class="friendBtn">
                            <span class="deleteFriend"><i class="fa-solid fa-minus"></i> 깐부끊기</span>
                            <a href="" id="" class="minihomeLink"><img src="/resources/images/common/smallCube.png" id="minihomeImg"> 미니홈피</a>
                        </div>
                    </div>
                    <div class="friendDetail">
                        <div class="friendImgName">
                            <img src="/resources/images/toy.jpg" class="profileImg">
                            <span class="nickname">김효동(묘동)</span>
                        </div>
                        <div class="friendBtn">
                            <span class="deleteFriend"><i class="fa-solid fa-minus"></i> 깐부끊기</span>
                            <a href="" id="" class="minihomeLink"><img src="/resources/images/common/smallCube.png" id="minihomeImg"> 미니홈피</a>
                        </div>
                    </div>
                    <div class="friendDetail">
                        <div class="friendImgName">
                            <img src="/resources/images/toy.jpg" class="profileImg">
                            <span class="nickname">김효동(묘동)</span>
                        </div>
                        <div class="friendBtn">
                            <span class="deleteFriend"><i class="fa-solid fa-minus"></i> 깐부끊기</span>
                            <a href="" id="" class="minihomeLink"><img src="/resources/images/common/smallCube.png" id="minihomeImg"> 미니홈피</a>
                        </div>
                    </div>
                    <div class="friendDetail">
                        <div class="friendImgName">
                            <img src="/resources/images/toy.jpg" class="profileImg">
                            <span class="nickname">김효동(묘동)</span>
                        </div>
                        <div class="friendBtn">
                            <span class="deleteFriend"><i class="fa-solid fa-minus"></i> 깐부끊기</span>
                            <a href="" id="" class="minihomeLink"><img src="/resources/images/common/smallCube.png" id="minihomeImg"> 미니홈피</a>
                        </div>
                    </div>
                    <div class="friendDetail">
                        <div class="friendImgName">
                            <img src="/resources/images/toy.jpg" class="profileImg">
                            <span class="nickname">김효동(묘동)</span>
                        </div>
                        <div class="friendBtn">
                            <span class="deleteFriend"><i class="fa-solid fa-minus"></i> 깐부끊기</span>
                            <a href="" id="" class="minihomeLink"><img src="/resources/images/common/smallCube.png" id="minihomeImg"> 미니홈피</a>
                        </div>
                    </div>
                    <div class="friendDetail">
                        <div class="friendImgName">
                            <img src="/resources/images/toy.jpg" class="profileImg">
                            <span class="nickname">김효동(묘동)</span>
                        </div>
                        <div class="friendBtn">
                            <span class="deleteFriend"><i class="fa-solid fa-minus"></i> 깐부끊기</span>
                            <a href="" id="" class="minihomeLink"><img src="/resources/images/common/smallCube.png" id="minihomeImg"> 미니홈피</a>
                        </div>
                    </div>
                    
                </div>
            </main>
        </section>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script> <%-- jquery --%>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script> <%-- jquery ui --%>
<script src="/resources/js/manage/font.js"></script>
</html>