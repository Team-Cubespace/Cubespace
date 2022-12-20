<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/minihome/album/album-list.css">
    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
    <title></title>
</head>
<body>
    <%-- include side --%>
    <section class="side">
    </section>
    <main>
        <header>
            <span>메뉴 이름</span>
            <span> > </span>
            <span>폴더 이름</span>
        </header>
        <a href="/albumWrite" id="writeButton" type="button">글쓰기</a>
        <ul class="album-list">
            <li>
                <a href="">
                    <img src="/resources/images/phone.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="/resources/images/phone.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="/resources/images/phone.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="/resources/images/phone.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="/resources/images/phone.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="/resources/images/phone.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="/resources/images/phone.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="/resources/images/phone.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="/resources/images/phone.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="/resources/images/phone.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="/resources/images/phone.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="/resources/images/phone.png" alt="">
                </a>
            </li>
        </ul>
        <ul id="pagination">
            
            <li><a href=""><i class="fa-solid fa-angles-left"></i></a></li>
            <li><a href=""><i class="fa-solid fa-angle-left"></i></a></li>
            <li><a href="" class="current-page">1</a></li>
            <li><a href="">2</a></li>
            <li><a href="">3</a></li>
            <li><a href="">4</a></li>
            <li><a href="">5</a></li>
            <li><a href="">6</a></li>
            <li><a href="">7</a></li>
            <li><a href="">8</a></li>
            <li><a href="">9</a></li>
            <li><a href="">10</a></li>
            <li><a href=""><i class="fa-solid fa-angle-right"></i></a></li>
            <li><a href=""><i class="fa-solid fa-angles-right"></i></a></li>
        </ul>
    </main>
</body>
</html>