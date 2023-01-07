<!-- JSP 파일로 변환할 때 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minihome Content Area</title>
    <link rel="stylesheet" href="/resources/css/minihome/include/minihome-common.css">
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/common/checkBox.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-home/minihome-home.css">
    <link rel="stylesheet" href="/resources/css/minihome/guestBook/minihome-guestBook.css">

    
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
    <style>
        .frame-color {
            background-color : ${minihome.frameColor};
        }
    </style>
</head>
<body>
    <jsp:include page="/WEB-INF/views/include/allFontMusic.jsp"/>
    <jsp:include page="/WEB-INF/views/include/report.jsp"/>
    <div class="content-area frame-color">
        <section class="minihome-rayout " >
        
            <jsp:include page="/WEB-INF/views/minihome/home/minihome-profile.jsp"/>

        </section>

        <section class="minihome-rayout">
            <!-- 우측 section 코드 작성 또는 inclue -->
            <!-- 전체 내용 div 태그로 한 번 감싸주세요 -->
            <!-- ex) <div class="home-area"> <div></div> <span></span> ... </div> -->
            <div>
                <header>
                    <span>나의 미니홈피</span>
                    <span>></span>
                    <span>방명록</span>
                </header>
                <div class="guest-list-box <c:if test="${loginMember.memberNo == minihome.memberNo}">test</c:if>">
<!----------------------------------------------->
                    <%-- <div class="guest-message">
                        <div class="message-header">
                            <div>
                                <div class="member-nickname">이글을쓴본인</div>
                                
                                <button class="member-nickname nickname-drop-down-button">
                                글을쓴본인
                                    <ul class="nickname-drop-down-box">
                                        <li>
                                            <a href="/minihome/방명록남긴회원번호" onclick= return openMinihome(this.href)>미니홈피</a>
                                        </li>
                                        <li>
                                            <a onclick="reportFriend()">신고</a>
                                        </li>
                                    </ul>
                                </button>




                                <div>(2022.12.15 오후03:30)</div>
                            </div>
                            
                            <div class="btn-box">
                                <div onclick="secretGuestBook()">비밀글변경</div>
                                <div>수정</div>
                                <div onclick="deleteGuestBook()">삭제</div>
                            </div>
                        </div>

                        <div class="message-body">
                            <div class="member-img">
                                <img src="/resources/images/삐약.gif" alt="">
                            </div>

                            <div class="message-box">
                                <div class="secret-situation">
                                    <img src="/resources/images/common/guestBook.png" alt="">
                                    <div>비밀글(이글은 작성자와 주인만 볼수 있어요)</div>
                                </div>
                                <div class="member-message" style="font-family:5">작성자 시점 비밀글 아닐때 : 인데 길이가 길어지면 어떠한 현상이 벌어질까요? 너무너무 궁금합니다</div>
                            </div>
                        </div>
                    </div> --%>

                </div>
<!----------------------------------------------->
                <!-- 방명록쓰기 -->
                <div class="guest-box <c:if test="${loginMember.memberNo == minihome.memberNo}">test</c:if>">
                    <div class="guest-img">
                        <%-- 로그인한 회원 프로필 --%>
                        <c:choose>
                            <c:when test="${loginMember.profileImage==null}">
                                <img src="/resources/images/common/cubes.png">
                            </c:when>
                            <c:otherwise>
                                    <img src="${loginMember.profileImage}">
                                </c:otherwise>
                        </c:choose>
                    </div>
                    <%-- 작성글 제출 --%>
                    <form action="" class="guest-content">
                        <textarea  class="guest-input" placeholder="내용을 입력해 주세요." maxlength="333"></textarea>
                        <div class="guest-btn">
                            <div>
                                <span class="secret-message">비밀글로 작성</span>
                                <input type="checkbox" class="switch">
                            </div>
                            <button type="button" class="btn-cancellation btn" style="display: none;"  onclick="cancelUpdate()" >수정취소</button>
                            <button type="button" class="btn-secondary btn" onclick=" writeGuestBook()">등록하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</body>
    <script>
        // 로그인한 회원 번호
		const loginMemberNo = "${loginMember.memberNo}";
    </script>
<!-- jQuery 라이브러리(.js 파일) 추가(CDN 방식) -->
<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
<script src="/resources/js/minihome/include/minihome-common.js "></script>
<script src="/resources/js/minihome/guestBook/minihome-guestBook.js"></script>
</html>