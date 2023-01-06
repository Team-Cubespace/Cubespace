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
    <link rel="stylesheet" href="/resources/css/manage/font.css">
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
                    <a href="/cubespace/shop/1" target="_blank" class="storeLinkArea"> <%-- 상점 이동 링크 --%>
                        <i class="fa-solid fa-store"></i> 상점이동
                    </a>
                    <div class="rightFontTitleArea">
                        <span class="rightTitle">폰트 관리</span>
                        <form class="searchArea" id="searchArea">
                            <i id="allFont" class="whiteBtn">모든 폰트</i>
                            <input type="text" id="searchInput" class="headerSearch" name="searchInput" placeholder="폰트 이름 검색" maxlength="10" value="${param.searchInput}">
                            <i class="fa-solid fa-magnifying-glass" id="searchBtn"></i>
                        </form>
                    </div>
                </header>
                <div class="fontArea">
                    <div class="fontHeader">
                        <div class="fontTitle">폰트 이름</div>
                        <div class="fontExample">예시 문구</div>
                        <div class="fontUse">
                            <button class="useFontBtn whiteBtn" id="useFontBtn">적용하기</button>
                        </div>
                    </div>

                    <c:if test="${empty fontList}">
                    <div class="fontMain">
                        폰트가 없습니다
                    </div>
                    </c:if>

                    <c:if test="${not empty fontList}">
                    <c:forEach var="font" items="${fontList}">
                    <c:if test='${loginMember.ownFontNo == font.fontNo}'>
                        <div class="fontMain originalFont">
                    </c:if>
                    <c:if test='${loginMember.ownFontNo != font.fontNo}'>
                        <div class="fontMain">
                    </c:if>
                        <div class="fontTitle" style="font-family:'${font.fontNo}'">${font.fontName}</div>
                        <div class="fontExample" style="font-family:'${font.fontNo}'">우리들의 작은 공간 큐브스페이스에서 시작하세요</div>
                        <div class="fontUse">
                        <c:if test='${loginMember.ownFontNo == font.fontNo}'>
                            <input type="radio" name="useFontRadio" class="useFontRadio" value="${font.fontNo}" checked>
                        </c:if>
                        <c:if test='${loginMember.ownFontNo != font.fontNo}'>
                            <input type="radio" name="useFontRadio" class="useFontRadio" value="${font.fontNo}">
                        </c:if>
                        </div>
                    </div>
                    </c:forEach>
                    </c:if>
                    
                </div>
            </main>  
        </section>
    </div>
</body>
    <script>
        const memberNo = "${loginMember.memberNo}";
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script> <%-- jquery --%>
    <script src="/resources/js/manage/font.js"></script>
</html>