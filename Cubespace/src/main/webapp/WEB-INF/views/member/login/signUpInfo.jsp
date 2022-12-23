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

</head>

<body>

    <jsp:include page="/WEB-INF/views/include/header.jsp" />


    <div class="signUp">

        <div class="guideArea">
            <div class="guideText">
                <p>01</p>
                <p>약관동의</p>
            </div>
            <div class="chevron">
                <i class="fa-solid fa-chevron-right"></i>
            </div>
            <div class="guideText">
                <p>02</p>
                <p>정보입력</p>
            </div>
            <div class="chevron">
                <i class="fa-solid fa-chevron-right"></i>
            </div>
            <div class="guideText">
                <p>03</p>
                <p>가입완료</p>
            </div>
        </div>


        <form action="/member/signUp/info" method="POST" name="signUp-frm" id="signUp-frm">

            <div>
                <!-- 아이디(이메일) -->
                <div class="questionBox">
                    <div class="signUp-input-Email textbox">
                        <i class="fa-regular fa-envelope"></i>
                        <input type="text" name="memberEmail" id="memberEmail" class="inputBox" placeholder="email.example.com"
                            maxlength="40" autocomplete="off" value="${tempMember.memberEmail}" />
                        <button id="sendAuthKeyBtn" type="button" class="checkButton">인증번호 받기</button>
                    </div>
                    <div class="emailMessageBox firstBox">
                        <span class="signUp-message" id="emailMessage">사용가능한 이메일을 입력해주세요.</span>
                    </div>
                </div>

                <!-- 인증번호 입력 -->
                <div class="questionBox">
                    <div class="signUp-input-EmailCertification textbox">
                        <i class="fa-solid fa-key"></i>
                        <input type="text" name="memberEmailCertification" id="memberEmailCertification" class="inputBox"
                            placeholder="인증번호 입력" maxlength="6" autocomplete="off" />
                        <button id="checkAuthKeyBtn" type="button" class="checkButton">인증하기</button>
                    </div>
                    <div class="firstBox">
                        <span id="authKeyMessage" class="signUp-message ">인증번호를 입력해주세요</span>
                    </div>
                </div>

                <!-- 비밀번호 -->
                <div class="questionBox">
                    <div class="signUp-input-password textbox">
                        <div>
                            <img src="/resources/images/common/lock.png" class="lock">
                            <input type="password" name="memberPw" class="inputBox" id="memberPw" placeholder="비밀번호"
                                maxlength="16" />
                        </div>
                        <i class="fa-regular fa-eye" id="seePw"></i>
                    </div>
                    <div class="firstBox">
                        <span id="pwMessage1" class="signUp-message ">영문자/숫자/특수문자 포함 8~16글자 사이로 입력해주세요.</span>
                    </div>
                </div>

                <!-- 비밀번호확인  -->
                <div class="questionBox">
                    <div class="signUp-input-password textbox">
                        <div>
                            <img src="/resources/images/common/lock.png" class="lock">
                            <input type="password" name="memberPwConfirm" class="inputBox" id="memberPwConfirm"
                                placeholder="비밀번호 확인" maxlength="16" />
                        </div>
                        <i class="fa-regular fa-eye" id="seePwConfirm"></i>
                    </div>
                    <div class="firstBox">
                        <span class="signUp-message" id="pwMessage2">비밀번호를 한 번 더 입력해주세요</span>
                    </div>
                </div>

                <!-- 이름/생년월일/휴대번호 -->
                <!-- 이름 -->
                <div class="questionBox">
                    <div class="signUp-input-Name textbox">
                        <i class="fa-regular fa-user"></i>
                        <input type="text" name="memberName" class="inputBox" id="memberName" placeholder="이름을 입력해주세요"
                            maxlength="10" />
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
                            placeholder="휴대번호 ex)01045459986" maxlength="11" value="${tempMember.memberTel}" />
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
                            maxlength="10" value="${tempMember.memberNickname}" />
                    </div>
                    <div class="firstBox">
                        <span class="signUp-message" id="nickMessage">한글,영어,숫자로만 2~10글자 사이로 입력해주세요</span>
                    </div>
                </div>
                <!-- 생년월일 -->
                <div class="questionBox">
                    <div class="signUp-input-Birth textbox">
                        <i class="fa-solid fa-cake-candles"></i>
                        <input type="text" name="memberBirth" class="inputBox" id="memberBirth"
                            placeholder="생년월일 ex)19910502" maxlength="8" />
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
                <button class="SignUp">회원 가입하기</button>
            </div>
        </form>
    </div>





    <jsp:include page="/WEB-INF/views/include/footer.jsp" />


    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="/resources/js/member/login/signUpInfo.js"></script>
</body>

</html>