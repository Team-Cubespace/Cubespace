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
    <link rel="stylesheet" href="/resources/css/member/login/signUpInfo.css">


    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
    <style>
        #findIdLink {
            color: var(--mainColor);
            font-weight: bold;
        }
        #findPwLink{
            color: black;
            font-weight: normal;
        }
    </style>
</head>

<body>

    <jsp:include page="/WEB-INF/views/include/header.jsp" />


    <div class="signUp">

        <div class="signUpInfoLink">
            <a href="/member/findId" id="findIdLink" class="idHover">내 정보 수정</a>
            <a href="/member/findPw" id="findPwLink" class="pwNotHover">비밀번호 변경</a>
        </div>


        <form action="/member/updateInfo" method="POST" name="signUp-frm" id="signUp-frm">

            <div>

                <!-- 이름/생년월일/휴대번호 -->
                <!-- 이름 -->
                <div class="questionBox">
                    <div class="signUp-input-Name textbox">
                        <i class="fa-regular fa-user"></i>
                        <input type="text" name="memberName" class="inputBox" id="memberName" placeholder="이름을 입력해주세요"
                            maxlength="10" value="${loginMember.memberName}"/>
                    </div>
                    <div class="firstBox">
                        <span class="signUp-message" id="nameMessage"></span>
                    </div>
                </div>
                <!-- 휴대번호 -->
                <div class="questionBox">
                    <div class="signUp-input-Tel textbox">
                        <i class="fa-solid fa-mobile-screen"></i>
                        <input type="text" name="memberTel" class="inputBox" id="memberTel"
                            placeholder="휴대번호 ex)01045459986" maxlength="11" value="${loginMember.memberTel}" />
                    </div>
                    <div class="firstBox">
                        <span class="signUp-message" id="telMessage">"-" 기호를 제외하고 숫자만 입력해주세요"</span>
                    </div>
                </div>
                <!-- 닉네임 -->
                <div class="questionBox">
                    <div class="signUp-input-Nickname textbox">
                        <img src="/resources/images/common/smallCube.png" id="smallCube">
                        <input type="text" name="memberNickname" class="inputBox" id="memberNickname" placeholder="닉네임"
                            maxlength="10" value="${loginMember.memberNickname}" />
                    </div>
                    <div class="firstBox">
                        <span class="signUp-message" id="nickMessage">한글,영어,숫자로만 2~10글자 사이로 입력해주세요</span>
                    </div>
                </div>
                <!-- 생년월일 -->
                <div class="questionBox">
                    <div class="signUp-input-Birth textbox">
                        <i class="fa-solid fa-cake-candles"></i>
                        <%-- birtyYear과 birthDay가 둘다 값이 있어야만 input에 값을 넣어줌 --%>
                        <c:if test="${empty loginMember.birthYear || empty loginMember.birthDay}">
                        <input type="text" name="memberBirth" class="inputBox" id="memberBirth"
                            placeholder="생년월일 ex)19910502" maxlength="8"/>
                        </c:if>
                        <c:if test="${not empty loginMember.birthYear && not empty loginMember.birthDay}">
                        <input type="text" name="memberBirth" class="inputBox" id="memberBirth"
                            placeholder="생년월일 ex)19910502" maxlength="8" value="${loginMember.birthYear}${loginMember.birthDay}"/>
                        </c:if>
                    </div>
                    <input type="hidden" name="birthYear" id="birthYear">
                    <input type="hidden" name="birthDay" id="birthDay">
                    <div class="firstBox" id="selectText">
                        <span>선택사항입니다</span>
                        <span class="signUp-message" id="birthMessage">8자리의 숫자로 입력해주세요(ex-19940210)</span>
                    </div>
                </div>


            </div>


            <!--------------------- 회원 정보 입력 끝  --------------------->
            <!-- 회원 가입 다음 단계 -->
            <div class="SignUpAgreement6">
                <button class="SignUp">내 정보 수정 완료</button>
            </div>
        </form>
    </div>





    <jsp:include page="/WEB-INF/views/include/footer.jsp" />
    <script>
        const findIdLink = document.getElementById("findIdLink");
        const findPwLink = document.getElementById("findPwLink");
        findPwLink.addEventListener("mouseover", e=> {
            findIdLink.classList.add("idNotHover");
            findIdLink.classList.remove("idHover");
            findPwLink.classList.add("pwHover");
            findPwLink.classList.remove("pwNotHover");
        })
        findPwLink.addEventListener("mouseout", e=> {
            findIdLink.classList.add("idHover");
            findIdLink.classList.remove("idNotHover");
            findPwLink.classList.add("pwNotHover");
            findPwLink.classList.remove("pwHover");
        })
    </script>

    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="/resources/js/member/login/updateInfo.js"></script>
</body>

</html>