<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/manage/manage.css">
    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
    <title></title>
</head>
<body>
    <%-- include side --%>
    <jsp:include page="/WEB-INF/views/include/manageLeftBar.jsp"/>

    <main>
        <header>
            <span class="rightTitle">폰트 관리</span>
            <div class="searchArea">
                <input type="text" id="searchInput" class="headerSearch" placeholder="폰트 이름 검색">
                <i class="fa-solid fa-magnifying-glass" id="searchBtn"></i>
            </div>
            <a href="" class="storeLinkArea"> <%-- 상점 이동 링크 --%>
                <i class="fa-solid fa-store"></i> 상점이동
            </a>
        </header>
        <div class="fontArea">
            <div class="fontHeader">
                <div class="fontTitle">폰트 이름</div>
                <div class="fontExample">예시 문구</div>
                <div class="fontUse">
                    <button class="useFontBtn whiteBtn">적용하기</button>
                </div>
            </div>

            <div class="fontMain">
                <div class="fontTitle">나눔고딕</div>
                <div class="fontExample">우리들의 작은 공간 큐브스페이스에서 시작하세요</div>
                <div class="fontUse">
                    <input type="radio" name="useFontRadio" class="useFontRadio" id="">
                </div>
            </div>
            <div class="fontMain">
                <div class="fontTitle">나눔고딕</div>
                <div class="fontExample">우리들의 작은 공간 큐브스페이스에서 시작하세요</div>
                <div class="fontUse">
                    <input type="radio" name="useFontRadio" class="useFontRadio" id="">
                </div>
            </div>
            <div class="fontMain">
                <div class="fontTitle">나눔고딕</div>
                <div class="fontExample">우리들의 작은 공간 큐브스페이스에서 시작하세요</div>
                <div class="fontUse">
                    <input type="radio" name="useFontRadio" class="useFontRadio" id="">
                </div>
            </div>
            <div class="fontMain">
                <div class="fontTitle">나눔고딕</div>
                <div class="fontExample">우리들의 작은 공간 큐브스페이스에서 시작하세요</div>
                <div class="fontUse">
                   <input type="radio" name="useFontRadio" class="useFontRadio" id="">
                </div>
            </div>
            <div class="fontMain">
                <div class="fontTitle">나눔고딕</div>
                <div class="fontExample">우리들의 작은 공간 큐브스페이스에서 시작하세요</div>
                <div class="fontUse">
                    <input type="radio" name="useFontRadio" class="useFontRadio" id="">
                </div>
            </div>
            <div class="fontMain">
                <div class="fontTitle">나눔고딕</div>
                <div class="fontExample">우리들의 작은 공간 큐브스페이스에서 시작하세요</div>
                <div class="fontUse">
                    <input type="radio" name="useFontRadio" class="useFontRadio" id="">
                </div>
            </div>
        </div>
    </main>
    <script src="/resources/js/manage/font.js"></script>
</body>
</html>