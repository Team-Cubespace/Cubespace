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
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/common/swiper.min.css">
    <link rel="stylesheet" href="/resources/css/minihome/album/album-detail.css">
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
</head>
<body>
    <div class="content-area">
        <section class="minihome-rayout">
            <jsp:include page="/WEB-INF/views/include/side-folder.jsp"/>
                <!-- 좌측 section 코드 작성 또는 include -->
                <!-- 전체 내용 div 태그로 한 번 감싸주세요 -->
                <!-- ex) <div class="home-area"> <div></div> <span></span> ... </div> -->
        </section>

        <section class="minihome-rayout">
            <jsp:include page="/WEB-INF/views/minihome/album/album-detail-section.jsp"/>
                <!-- 우측 section 코드 작성 또는 include -->
                <!-- 전체 내용 div 태그로 한 번 감싸주세요 -->
                <!-- ex) <div class="home-area"> <div></div> <span></span> ... </div> -->
        </section>
    </div>
</body>
</html>