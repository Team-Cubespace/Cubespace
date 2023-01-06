<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
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
                <a href="/cubespace/shop/1">
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
                <jsp:include page="/WEB-INF/views/webmain/main-notifications.jsp"/>
                <li class="header-menu" onclick="openmodalAlarm()">
                    <a>
                        <div class="notice">
                            <span class="notice-new" id="alarmCount"></span>
                            <i class="fa-solid fa-bell"></i>
                        </div>
                        <span>알림</span>
                    </a>
                </li>
                <c:set var="fileName" value="${fn:split(pageContext.request.requestURI, '/')}"></c:set>
                <c:if test="${fileName[fn:length(fileName) - 1] != 'home.jsp'}">
                    <li class="header-menu">
                        <button type="button" id="headerDropDownButton">
                            <c:if test="${empty loginMember.profileImage}">
                                <img src="/resources/images/common/cubes.png" alt="로그인 회원 프로필 이미지" class="header-profile-image">
                            </c:if>
                            <c:if test="${not empty loginMember.profileImage}">
                                <img src="${loginMember.profileImage}" alt="로그인 회원 프로필 이미지" class="header-profile-image">
                            </c:if>
                            <ul class="header-drop-down" id="headerDropDown">
                                <li><a href="/minihome/${loginMember.memberNo}" onclick="return openMinihome(this.href)">내 미니홈피</a></li>
                                <li><a href="/member/updateInfo">내 정보 수정</a></li>
                                <li><a href="/member/logout">로그아웃</a></li>
                            </ul>
                            <i class="fa-solid fa-angle-down"></i>
                        </button>
                    </li>
                </c:if>
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
    <script src="/resources/js/common/header.js"></script>
    <!-- jQuery 라이브러리(.js 파일) 추가(CDN 방식) -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <%-- include 모달 깐부창찾기 --%>
    <script src="/resources/js/webmain/main-memberSearch.js"></script>
    <%-- include 모달 알림 --%>
    <script src="/resources/js/webmain/main-notifications.js"></script>

</header>