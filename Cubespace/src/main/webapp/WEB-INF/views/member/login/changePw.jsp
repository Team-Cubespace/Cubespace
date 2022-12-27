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
        #findPwLink {
        color: var(--mainColor);
        font-weight: bold;
        }
        #findIdLink{
            color: black;
            font-weight: normal;
        }
        .SignUpAgreement6 {
            display: flex;
            flex-direction: column;
        }
    </style>
</head>

<body>

    <jsp:include page="/WEB-INF/views/include/header.jsp" />


    <div class="signUp">

        <div class="signUpInfoLink">
            <a href="/member/updateInfo" id="findIdLink" class="idNotHover">내 정보 수정</a>
            <a href="/member/changePw" id="findPwLink" class="pwHover">비밀번호 변경</a>
        </div>


        <form action="/member/changePw" method="POST" name="signUp-frm" id="signUp-frm">

            <div>

                
                <!-- 아이디(이메일) -->
                <div class="questionBox">
                    <div class="signUp-input-Name textbox">
                        <i class="fa-regular fa-user"></i>
                        <input type="text" name="memberEmail" class="inputBox" id="memberEmail"
                             value="${loginMember.memberEmail}" disabled/>
                    </div>
                </div>

                <!-- 새 비밀번호 -->
                <div class="questionBox">
                    <div class="signUp-input-Tel textbox">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" name="memberPw" class="inputBox" id="memberPw"
                            placeholder="새 비밀번호" maxlength="16"  />
                    </div>
                </div>
                <!-- 새 비밀번호확인 -->
                <div class="questionBox">
                    <div class="signUp-input-Nickname textbox">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" name="memberPwConfirm" class="inputBox" id="memberPwConfirm" placeholder="새 비밀번호 확인"
                            maxlength="16"  />
                    </div>
                    <div class="firstBox">
                        <span class="signUp-message" id="pwMessage">영문자/숫자/특수문자 포함 8~16글자 사이로 입력해주세요</span>
                    </div>
                </div>


            </div>


            <!--------------------- 회원 정보 입력 끝  --------------------->
            <!-- 회원 가입 다음 단계 -->
            <div class="SignUpAgreement6">
                <button class="SignUp">비밀번호 수정 완료</button>
                <a href="/member/secession" class="secessionBtn">회원 탈퇴하기</a>
            </div>
        </form>
    </div>





    <jsp:include page="/WEB-INF/views/include/footer.jsp" />
    <script>
        const findIdLink = document.getElementById("findIdLink");
        const findPwLink = document.getElementById("findPwLink");
        findIdLink.addEventListener("mouseover", e=> {
            findIdLink.classList.add("idHover");
            findIdLink.classList.remove("idNotHover");
            findPwLink.classList.add("pwNotHover");
            findPwLink.classList.remove("pwHover");
        })
        findIdLink.addEventListener("mouseout", e=> {
            findIdLink.classList.add("idNotHover");
            findIdLink.classList.remove("idHover");
            findPwLink.classList.add("pwHover");
            findPwLink.classList.remove("pwNotHover");
        })
    </script>

    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="/resources/js/member/login/changePw.js"></script>
</body>

</html>