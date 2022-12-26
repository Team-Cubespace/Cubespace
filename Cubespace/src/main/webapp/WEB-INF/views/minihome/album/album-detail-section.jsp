<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<div class="detail-main">
    <header>
        사진첩 > ${folderName}
        <button id="goToList">목록으로</button>
    </header>
    <div class="detail-subtitle">
        <span class="detail-open-flag">공개</span>
        <span class="detail-title-area">${album.albumTitle}</span>
        <span class="detail-create-date">${album.albumCreate}</span>
    </div>
    <div class="slide-container">
        <div class="swiper-container">
            <ul class="swiper-wrapper">
                <c:forEach var="albumImage" items="${album.albumImageList}">
                    <li class="swiper-slide">
                        <img src="${albumImage.imagePath}${albumImage.imageRename}" alt="">
                    </li>
                </c:forEach>
            </ul>
        </div>

        <c:if test="${fn:length(album.albumImageList) > 1}">
            <%-- 페이지 네이션 --%>
            <div class="swiper-pagination"></div>
            <span class="button-next">
                <i class="fa-solid fa-angle-right"></i>
            </span>
            <span class="button-prev">
                <i class="fa-solid fa-angle-left"></i>
            </span>
        </c:if>
    </div>

    <p class="album-content">
        ${album.albumContent}
    </p>
    <div class="album-detail-footer">
        <%-- 게시글에 좌표가 등록 되었을때만 --%>
        <c:if test="${not empty album.latitude}">
            <a href="https://map.kakao.com/link/map/${album.locationName},${album.latitude},${album.longitude}" target="_blank" class="location">
                <i class="fa-solid fa-location-dot"></i>
                ${album.locationName}
            </a>
        </c:if>

        <div class="album-button-area">
            <c:choose>
                <%-- 게시글의 작성자번호와 로그인된 회원의 번호가 일치하지 않을 때 --%>
                <c:when test="${minihome.memberNo != loginMember.memberNo}">
                    <c:if test="${album.albumScrapAllowYN == 'Y'}">
                        <button type="button">스크랩</button>    
                    </c:if>
                </c:when>
                <c:otherwise>
                    <%-- 게시글의 작성자번호와 로그인된 회원의 번호가 일치할 때 --%>
                    <a href="">수정</a>
                    <a href="">삭제</a>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
    <jsp:include page="/WEB-INF/views/include/comment.jsp" />
</div>