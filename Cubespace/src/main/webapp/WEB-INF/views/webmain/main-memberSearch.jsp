<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
    <link rel="stylesheet" href="/resources/css/webmain/main-memberSearch.css">
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>


</head>
<body>
    <div class="modal" id="modal" style="display: none;">
        <div class="modal-box" >
            <div class="modal-back"><</div>

            <div class="modal-head">
                <img class="head-img" src="/resources/images/common/memberSearch.png" alt="깐부찾기이미지">
                <div class="head-font">깐부 찾기</div>
            </div>

            <div class="modal-body">
                <div class="member-search">
                    <a href="" id="memberSearch">깐부 찾기</a>
                    <a href="" id="memberMySearch">내가 신청한 깐부</a>
                </div>
                <div class="member-search-input-div">
                    <input type="text" class="member-search-input" maxlength="33" placeholder="검색할 회원을 입력하세요.">
                    <button>검색</button>
                </div>
                <section class="mebmer-search-profile">

                    <%----------------------------------%>
                    <div class="mebmer-profile">
                        <div class="profile-head">
                            <img class="member-img" src="/resources/images/common/test_user_profile.gif" alt="">
                            <div class="member-nickname">묘동닉네임테스트</div>
                        </div>
                        <div class="profile-body">
                            <div>
                                <img class="apply-img" src="/resources/images/common/check.png" alt="">
                                <div class="member-choice">깐부</div>
                            </div>
                            <div>
                                <img class="minihome-img" src="/resources/images/common/smallCube.png" alt="">
                                <div class="member-choice">미니홈피</div>
                            </div>
                        </div>
                    </div>
                    <%----------------------------------%>
                    <div class="mebmer-profile">
                        <div class="profile-head">
                            <img class="member-img" src="/resources/images/common/test_user_profile.gif" alt="">
                            <div class="member-nickname">묘동닉네임테스트</div>
                        </div>
                        <div class="profile-body">
                            <div>
                                <img class="apply-img" src="/resources/images/common/check2.png" alt="">
                                <div class="member-choice">신청</div>
                            </div>
                            <div>
                                <img class="minihome-img" src="/resources/images/common/smallCube2.png" alt="">
                                <div class="member-choice">미니홈피</div>
                            </div>
                        </div>
                    </div>
                    <%----------------------------------%>
                    <div class="mebmer-profile">
                        <div class="profile-head">
                            <img class="member-img" src="/resources/images/common/test_user_profile.gif" alt="">
                            <div class="member-nickname">묘동닉네임테스트</div>
                        </div>
                        <div class="profile-body">
                            <div>
                                <img class="apply-img" src="/resources/images/common/check.png" alt="">
                                <div>수락대기</div>
                            </div>
                            <div>
                                <img class="minihome-img" src="/resources/images/common/smallCube.png" alt="">
                                <div class="member-choice">미니홈피</div>
                            </div>
                        </div>
                    </div>



                    <div class="mebmer-profile">
                        <div class="profile-head">
                            <img class="member-img" src="/resources/images/common/test_user_profile.gif" alt="">
                            <div class="member-nickname">묘동닉네임테스트</div>
                        </div>
                        <div class="profile-body">
                            <div>
                                <img class="apply-img" src="/resources/images/common/check.png" alt="">
                                <div>수락대기</div>
                            </div>
                            <div>
                                <img class="minihome-img" src="/resources/images/common/smallCube.png" alt="">
                                <div class="member-choice">미니홈피</div>
                            </div>
                        </div>
                    </div>
                    <div class="mebmer-profile">
                        <div class="profile-head">
                            <img class="member-img" src="/resources/images/common/test_user_profile.gif" alt="">
                            <div class="member-nickname">묘동닉네임테스트</div>
                        </div>
                        <div class="profile-body">
                            <div>
                                <img class="apply-img" src="/resources/images/common/check.png" alt="">
                                <div>수락대기</div>
                            </div>
                            <div>
                                <img class="minihome-img" src="/resources/images/common/smallCube.png" alt="">
                                <div class="member-choice">미니홈피</div>
                            </div>
                        </div>
                    </div>
                    <div class="mebmer-profile">
                        <div class="profile-head">
                            <img class="member-img" src="/resources/images/common/test_user_profile.gif" alt="">
                            <div class="member-nickname">묘동닉네임테스트</div>
                        </div>
                        <div class="profile-body">
                            <div>
                                <img class="apply-img" src="/resources/images/common/check.png" alt="">
                                <div>수락대기</div>
                            </div>
                            <div>
                                <img class="minihome-img" src="/resources/images/common/smallCube.png" alt="">
                                <div class="member-choice">미니홈피</div>
                            </div>
                        </div>
                    </div>
                    <div class="mebmer-profile">
                        <div class="profile-head">
                            <img class="member-img" src="/resources/images/common/test_user_profile.gif" alt="">
                            <div class="member-nickname">묘동닉네임테스트</div>
                        </div>
                        <div class="profile-body">
                            <div>
                                <img class="apply-img" src="/resources/images/common/check.png" alt="">
                                <div>수락대기</div>
                            </div>
                            <div>
                                <img class="minihome-img" src="/resources/images/common/smallCube.png" alt="">
                                <div class="member-choice">미니홈피</div>
                            </div>
                        </div>
                    </div>
                    <div class="mebmer-profile">
                        <div class="profile-head">
                            <img class="member-img" src="/resources/images/common/test_user_profile.gif" alt="">
                            <div class="member-nickname">묘동닉네임테스트</div>
                        </div>
                        <div class="profile-body">
                            <div>
                                <img class="apply-img" src="/resources/images/common/check.png" alt="">
                                <div>수락대기</div>
                            </div>
                            <div>
                                <img class="minihome-img" src="/resources/images/common/smallCube.png" alt="">
                                <div class="member-choice">미니홈피</div>
                            </div>
                        </div>
                    </div>
                    <div class="mebmer-profile">
                        <div class="profile-head">
                            <img class="member-img" src="/resources/images/common/test_user_profile.gif" alt="">
                            <div class="member-nickname">묘동닉네임테스트</div>
                        </div>
                        <div class="profile-body">
                            <div>
                                <img class="apply-img" src="/resources/images/common/check.png" alt="">
                                <div>수락대기</div>
                            </div>
                            <div>
                                <img class="minihome-img" src="/resources/images/common/smallCube.png" alt="">
                                <div class="member-choice">미니홈피</div>
                            </div>
                        </div>
                    </div>
                    <div class="mebmer-profile">
                        <div class="profile-head">
                            <img class="member-img" src="/resources/images/common/test_user_profile.gif" alt="">
                            <div class="member-nickname">묘동닉네임테스트</div>
                        </div>
                        <div class="profile-body">
                            <div>
                                <img class="apply-img" src="/resources/images/common/check.png" alt="">
                                <div>수락대기</div>
                            </div>
                            <div>
                                <img class="minihome-img" src="/resources/images/common/smallCube.png" alt="">
                                <div class="member-choice">미니홈피</div>
                            </div>
                        </div>
                    </div>

                </section>

            </div>
        </div>
    </div>

    <script src="/resources/js/webmain/main-memberSearch.js"></script>
</body>
</html>