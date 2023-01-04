<!-- JSP 파일로 변환할 때 -->
<!-- <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%> -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minihome Content Area</title>
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/minihome/album/album-write.css">
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
    <style>
        .frame-color {
            background-color : ${minihome.frameColor};
        }
    </style>
    <jsp:include page="/WEB-INF/views/include/allFontMusic.jsp"/>
</head>
<body>
    <div class="content-area frame-color">
        <section class="minihome-rayout">
            <jsp:include page="/WEB-INF/views/include/side-folder.jsp"/>
                <!-- 좌측 section 코드 작성 또는 include -->
                <!-- 전체 내용 div 태그로 한 번 감싸주세요 -->
                <!-- ex) <div class="home-area"> <div></div> <span></span> ... </div> -->
        </section>

        <section class="minihome-rayout">
            <jsp:include page="/WEB-INF/views/minihome/album/album-write-section.jsp"/>
                <!-- 우측 section 코드 작성 또는 include -->
                <!-- 전체 내용 div 태그로 한 번 감싸주세요 -->
                <!-- ex) <div class="home-area"> <div></div> <span></span> ... </div> -->
        </section>
    </div>
    <c:if test="${not empty message}">
        <script>
                alert("${message}");
        </script>
    </c:if>
</body>

<!-- html에서 파일을 include 할 수 있도록 해주는 js (근데 VSCode Live Server에서만 보임) -->
<!-- include 방법 : <section class="minihome-rayout"> 안에 <div data-include-path="파일 경로"></div> 작성 -->
<script src="/resources/js/common/jQuery-core.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ab8d18a2840806f79cff0f4f1542dde4&libraries=services"></script>
<script src="/resources/js/minihome/album/album-write.js"></script>
</html>