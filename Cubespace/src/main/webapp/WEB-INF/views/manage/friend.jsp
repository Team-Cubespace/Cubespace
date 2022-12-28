<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/common/checkBox.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/manage/manage.css">
    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
    <title></title>

    <style>
        .fa-minus {
            border: 2px solid black;
            border-radius: 50%;
            padding: 2px;
        }
        .frame-color {
            background-color : ${minihome.frameColor};
        }
        #searchBtn{
            cursor: default;
        }
    </style>
    <jsp:include page="/WEB-INF/views/include/font.jsp"/>
</head>
<body>
    <div class="content-area frame-color">
        <section class="minihome-rayout">
                <div>
                    <jsp:include page="/WEB-INF/views/manage/manageLeftBar.jsp"/>
                </div>
        </section>

        <section class="minihome-rayout">
            <div class="main">
                <header>
                    <span class="rightTitle">깐부 관리</span>
                    <form class="searchArea" id="searchArea">
                        <i id="allFriend" class="whiteBtn">모든 깐부</i>
                        <input type="text" id="searchInput" name="searchInput" class="headerSearch" placeholder="깐부 닉네임 검색" value="${param.searchInput}">
                        <i class="fa-solid fa-magnifying-glass" id="searchBtn"></i>
                    </form>
                </header>
                <div class="FriendArea">
                    <div class="listTitle">나의 깐부목록 (${fn:length(friendList)}명)</div>
                    <c:forEach var="friend" items="${friendList}">
                        <div class="friendDetail">
                            <div class="friendImgName">
                                <c:if test="${empty friend.profileImage}">
                                    <img src="/resources/images/common/cubes.png" class="profileImg">
                                </c:if>
                                <c:if test="${not empty friend.profileImage}">
                                    <img src="${friend.profileImage}" class="profileImg">
                                </c:if>
                                <span class="nickname">${friend.memberNickname}</span>
                            </div>
                            <div class="friendBtn">
                                <span class="deleteFriend"><i class="fa-solid fa-minus"></i> 깐부끊기</span>
                                <a href="" id="${friend.friendNo}" class="minihomeLink"><img src="/resources/images/common/smallCube.png" id="minihomeImg"> 미니홈피</a>
                            </div>
                        </div>
                    </c:forEach>
                </div>
            </div>
        </section>
    </div>
</body>
<script>
    const memberNo = "${loginMember.memberNo}"
</script>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script> <%-- jquery --%>
<script src="/resources/js/manage/friend.js"></script>
</html>