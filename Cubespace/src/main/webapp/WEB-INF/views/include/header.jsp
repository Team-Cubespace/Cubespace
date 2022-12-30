<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- <c:if test="${not empty sessionScope.loginMember}">
    <c:set var="loginMember" value="${sessionScope.loginMember}"/>
</c:if> --%>
    <script>
        // 로그인한 회원 번호
		const loginMemberNo = "${loginMember.memberNo}";
    </script>
    <script>
        const loginMember = "${loginMember}";
    </script>
<header>
    <!------------------ 헤더 메뉴 ------------------>
    <ul class="header-menu-nav">
        <li class="header-menu">
            <a href="/cubespace/shop">
                <i class="fa-solid fa-shop"></i>
                <span>상점</span>
            </a>
        </li>
        <li class="header-menu" onclick="openModal()">
            <a>
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>깐부 찾기</span>
            </a>
        </li>
        <jsp:include page="/WEB-INF/views/webmain/main-memberSearch.jsp"/>
        <!-- 로그인 X && 메인 페이지 X -->
        <c:choose>
            <c:when test="${empty loginMember}">
                <li class="header-menu">
                    <a href="/member/login">
                        <i class="fa-solid fa-right-to-bracket"></i>
                        <span>로그인</span>
                    </a>
                </li>
            </c:when>
            <c:otherwise>
            <li class="header-menu">
                <a href="">
                    <i class="fa-solid fa-shop"></i>
                    <span>상점</span>
                </a>
            </li>
            <li class="header-menu" onclick="openModal()">
                <a>
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <span>깐부 찾기</span>
                </a>
            </li>
            <!-- 로그인 O -->
                <li class="header-menu" onclick="openmodalAlarm()">
                    <a>
                        <div class="notice">
                            <span class="notice-new"></span>
                            <i class="fa-solid fa-bell"></i>
                        </div>
                        <span>알림</span>
                    </a>
                </li>
                <jsp:include page="/WEB-INF/views/webmain/main-notifications.jsp"/>

                <li class="header-menu">
                    <button type="button" id="headerDropDownButton">
                        <c:if test="${empty loginMember.profileImage}">
                            <img src="/resources/images/common/cubes.png" alt="로그인 회원 프로필 이미지" class="header-profile-image">
                        </c:if>
                        <c:if test="${not empty loginMember.profileImage}">
                            <img src="${loginMember.profileImage}" alt="로그인 회원 프로필 이미지" class="header-profile-image">
                        </c:if>
                        <ul class="header-drop-down" id="headerDropDown">
                            <li><a href="">내 미니홈피</a></li>
                            <li><a href="/member/login/updateInfo">내 정보 수정</a></li>
                            <li><a href="/member/logout">로그아웃</a></li>
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