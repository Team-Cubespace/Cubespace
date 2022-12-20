<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/manage/font.css">
    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
    <title></title>
</head>
<body>
    <%-- include side --%>
    <section class="side">
        <div class="sideBarLink">
            <a href="/manage/music">
                <i class="fa-solid fa-heart"></i> 배경음악 설정
            </a>
            <a href="/manage/font">
                <i class="fa-solid fa-heart"></i> 폰트 설정
            </a>
            <a href="/manage/friend">
                <i class="fa-solid fa-heart"></i> 깐부 관리
            </a>
            <a href="/manage/menu">
                <i class="fa-solid fa-heart"></i> 메뉴 관리
            </a>
            <a href="/manage/background">
                <i class="fa-solid fa-heart"></i> 배경 설정
            </a>
        </div>

    </section>
    <main>
        <header>
            <span class="rightTitle">폰트 관리</span>
            <div class="fontSearchArea">
                <input type="text" id="searchFontInput" class="headerSearch" placeholder="폰트 이름 검색">
                <i class="fa-solid fa-magnifying-glass" id="searchFontBtn"></i>
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
                    <button class="useFontBtn">적용하기</button>
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