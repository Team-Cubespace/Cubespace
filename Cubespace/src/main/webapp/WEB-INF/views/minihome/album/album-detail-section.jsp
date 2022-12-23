<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="detail-main">
    <header>
        메뉴 이름 > 폴더 이름
    </header>
    <div class="detail-subtitle">
        <span class="detail-open-flag">공개</span>
        <span class="detail-title-area">글 제목</span>
        <span class="detail-create-date">2022.12.19</span>
    </div>
    <div class="slide-container">
        <div class="swiper-container">
            <ul class="swiper-wrapper">
                <li class="swiper-slide">
                    <img src="/resources/images/phone.png" alt="">
                </li>
                <li class="swiper-slide">
                    <img src="/resources/images/qurwl.png" alt="">
                </li>
                <li class="swiper-slide">
                    <img src="/resources/images/zz.png" alt="">
                </li>
                <li class="swiper-slide">
                    <img src="/resources/images/삐약.gif" alt="">
                </li>
                <li class="swiper-slide">
                    <img src="/resources/images/제로투.png" alt="">
                </li>
            </ul>
        </div>

        <%-- 페이지 네이션 --%>
        <div class="swiper-pagination"></div>
        <span class="button-next">
            <i class="fa-solid fa-angle-right"></i>
        </span>
        <span class="button-prev">
            <i class="fa-solid fa-angle-left"></i>
        </span>

    </div>

    <p class="album-content">
        하하하하하하하ㅏㅎ하ㅏ하하ㅏ하하ㅏ하하ㅏㅎ하ㅏ하하ㅏ하ㅏ핳
        하ㅏ하하하ㅏ하ㅏㅎ하ㅏ하하ㅏ하하하ㅏ하ㅏ하하ㅏ하ㅏㅎ
        하ㅏ하하ㅏ하하ㅏ하ㅏ하하ㅏ하하    
    </p>
    <jsp:include page="/WEB-INF/views/include/comment.jsp" />
</div>