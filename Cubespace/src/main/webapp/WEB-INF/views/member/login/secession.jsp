<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cubespace</title>
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/common/header.css">
    <link rel="stylesheet" href="/resources/css/common/footer.css">
    <link rel="stylesheet" href="/resources//css/member/login/findIdPw.css">
    <link rel="stylesheet" href="/resources//css/member/login/secession.css">


    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>

</head>

<body>

    <jsp:include page="/WEB-INF/views/include/header.jsp" />

    <div class="secessionTitle">
        회원 탈퇴
    </div>
    <div class="findIdPw">



        <form action="/member/secession" method="POST" name="findId-frm" id="findId-frm" onsubmit="return verifySecession()">

            <div>
                <!-- 이름/생년월일/휴대번호 -->
                <!-- 아이디(이메일) -->
                <div class="questionBox">
                    <div class="signUp-input-Email textbox">
                        <i class="fa-regular fa-envelope"></i>
                        <input type="text" name="memberEmail" id="memberEmail" class="inputBox" placeholder="아이디 정보를 받을 새 이메일을 입력해주세요"
                            maxlength="40" autocomplete="off" value="${loginMember.memberEmail}"/>
                    </div>
                </div>

                <!-- 비밀번호 -->
                <div class="questionBox">
                    <div class="signUp-input-Tel textbox">
                        <i class="fa-solid fa-mobile-screen"></i>
                        <input type="password" name="memberPw" class="inputBox" id="memberPw"
                            placeholder="비밀번호" maxlength="11" />
                    </div>
                </div>

                <!-- 이름 -->
                <div class="questionBox">
                    <div class="signUp-input-Name textbox">
                        <i class="fa-regular fa-user"></i>
                        <input type="text" name="memberName" class="inputBox" id="memberName" placeholder="회원가입한 계정 이름"
                            maxlength="10" value="${loginMember.memberName}"/>
                    </div>
                    <div class="firstBox">
                        <span class="signUp-message" id="nameMessage">회원 탈퇴를 위해 본인 회원정보를 입력해주세요.</span>
                    </div>
                </div>






            </div>



            <!--------------------- 회원 정보 입력 끝  --------------------->
            <!-- 회원 가입 다음 단계 -->
            <div class="SignUpAgreement6">
                <button class="SignUp">회원 탈퇴하기</button>
            </div>
        </form>
    </div>

     <c:if test="${!empty message}">
        <script>
            alert("${message}")
        </script>
        <c:remove var="message"></c:remove>
    </c:if>



    <jsp:include page="/WEB-INF/views/include/footer.jsp" />


    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="/resources/js/member/login/secession.js"></script>
</body>

</html>