<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cubespace</title>
    <%-- 공통 css --%>
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/style-web.css">
    <%-- 웹 메인 모달 공통 css --%>
    <link rel="stylesheet" href="/resources/css/webmain/modalSettings.css">
    <%-- 해당 모달 개인 css --%>
    <link rel="stylesheet" href="/resources/css/webmain/main-memberSearch.css">
    <%-- 폰트어썸 Key --%>
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
</head>
<body>
    <%-- 모달 --%>
    <div class="modal" id="modal" style="display: none;">
        <%-- 모달 창 --%>
        <div class="modal-box" >
            <div class="modal-close" id="modalClose" onclick="closeModal()"><</div>
            <%-- 모달 헤더 --%>
            <div class="modal-head">
                <img class="head-img" src="/resources/images/common/memberSearch.png" alt="깐부찾기이미지">
                <div>깐부 찾기</div>
            </div>
            <%-- 모달 바디 --%>
            <div class="modal-body">
                <%-- 모달선택변경 --%>
                <div class="modal-choice">
                    <a id="leftChoice">깐부 찾기</a>
                    <a id="rightChoice">내가 신청한 깐부</a>
                </div>
                <%-- 회원검색 --%>
                <div class="member-search-input-div">
                    <input type="text" class="member-search-input" id="leftChoiceInput" maxlength="10" placeholder="검색할 회원을 입력하세요.">
                    <button>검색</button>
                </div>
                <%-- 검색된 회원 목록 --%>
                <section class="mebmer-search-profile">

                </section>
            </div>
        </div>
    </div>
    <script>
    		// 로그인한 회원 번호
		const loginMemberNo = "${loginMember.memberNo}";
    </script>
    <!-- jQuery 라이브러리(.js 파일) 추가(CDN 방식) -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <%-- 해당 모달 개인 js --%>
    <script src="/resources/js/webmain/main-memberSearch.js"></script>
</body>
</html>