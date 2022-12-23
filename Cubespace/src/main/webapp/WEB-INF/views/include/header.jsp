<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<header>
    <!------------------ 헤더 메뉴 ------------------>
    <ul class="header-menu-nav">
        <li class="header-menu">
            <a href="">
                <i class="fa-solid fa-shop"></i>
                <span>상점</span>
            </a>
        </li>
        <li class="header-menu">
            <a href="">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>깐부 찾기</span>
            </a>
        </li>
        
        <!-- 로그인 X && 메인 페이지 X -->
        <c:choose>
            <c:when test="${empty loginMember}">
                <li class="header-menu">
                    <a href="">
                        <i class="fa-solid fa-right-to-bracket"></i>
                        <span>로그인</span>
                    </a>
                </li>
            </c:when>
            <c:otherwise>
            <!-- 로그인 O -->
                <li class="header-menu">
                    <a href="">
                        <div class="notice">
                            <span class="notice-new"></span>
                            <i class="fa-solid fa-bell"></i>
                        </div>
                        <span>알림</span>
                    </a>
                </li>
                <li class="header-menu">
                    <button type="button" id="headerDropDownButton">
                        <img src="cat4.jpg" alt="로그인 회원 프로필 이미지" class="header-profile-image">
                        <ul class="header-drop-down" id="headerDropDown">
                            <li><a href="">내 미니홈피</a></li>
                            <li><a href="">내 정보 수정</a></li>
                            <li><a href="">로그아웃</a></li>
                        </ul>
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                </li>
            </c:otherwise>
        </c:choose>
    </ul>
    <!------------------ 헤더 로고 영역 ------------------>
    <div class="header-logo">
        <a href="/">
            <img src="/resources/images/common/cubes.png" alt="메인 로고 이미지">
            <span class="header-logo-title">Cubespace</span>
        </a>
    </div>
</header>