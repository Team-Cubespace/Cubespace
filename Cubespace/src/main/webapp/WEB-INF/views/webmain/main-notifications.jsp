<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cubespace</title>
    <!-- <%-- 공통 css --%> -->
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/style-web.css">
    <!-- <%-- 웹 메인 모달 공통 /css --%> -->
    <link rel="stylesheet" href="/resources/css/webmain/modalSettings.css">
    <link rel="stylesheet" href="/resources/css/webmain/main-memberSearch.css">
    <!-- <%-- 해당 모달 개인 css --%> -->
    <link rel="stylesheet" href="/resources/css/webmain/main-notifications.css">

    <!-- <%-- 폰트어썸 Key --%> -->
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
    <!-- 폰트어썸 같은 곳 개쩔음 https://remixicon.com/ -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

</head>
<body>
    <!-- <%-- 모달 --%> -->
    <div class="modal" id="modalAlarm" style="display: none;">
        <!-- <%-- 모달 창 --%> -->
        <div class="modal-box" >
            <div class="modal-close" id="modalAlarmClose" onclick="closeModalAlarm()"><</div>
            <!-- <%-- 모달 헤더 --%> -->
            <div class="modal-head">
                <img class="head-img-bell" src="/resources/images/common/bell.png" alt="알림">
                <div>알림</div>
            </div>
            <!-- <%-- 모달 바디 --%> -->
            <div class="modal-body">
                <!-- <%-- 모달선택변경 --%> -->
                <div class="modal-choice">
                    <a id="alarmLeftChoice">깐부 알림</a>
                    <a id="alarmRightChoice">활동 알림</a>
                </div>
                
                <!-- <%-- 회원검색이거 없으면 선택기 고장남 히든으로 숨겨둠 --%> -->
                <%-- <div class="member-search-input-div">
                    <input type="hidden" class="member-search-input" id="alarmLeftChoiceInput" maxlength="10" placeholder="검색할 회원을 입력하세요.">
                </div> --%>

                <!-- 활동 알림 클릭 시 전첵삭제 추가되는 위치 -->
                <%-- <div class="delete-all">
                    <div class="delete-all-button">전체삭제</div>
                </div> --%>

                <!-- <%-- 검색된 회원 목록 --%> -->
                <section class="mebmer-search-profile">
                    <!-- <%----------------------------------%> -->
                    <!-- <%-- 깐부알림 --%> -->
                    <div class="mebmer-profile">
                        <div class="profile-head">
                            <img class="member-img" src="/resources/images/common/Mokoko1.gif" alt="">
                            <div class="member-nickname">묘동닉네임글자테스트</div>
                        </div>

                        <div class="profile-body">
                            <div class="member-accept" onclick="return openMinihome(this.href)">
                                <i class="fa-solid fa-check" id="faCheck"></i>
                                <div >수락</div>
                            </div>

                            <div class="member-cancel" onclick="return openMinihome(this.href)">
                                <i class="fa-solid fa-xmark"></i>
                                <div >거절</div>
                            </div>

                            <a class="member-minihome" onclick="return openMinihome(this.href)">
                                <img class="minihome-img" src="/resources/images/common/smallCube.png" alt="">
                                <div >미니홈피</div><!--  <%-- a --%> -->
                            </a>
                        </div>
                    </div>

                    <!-- <%-- 깐부알림 --%> -->
                    <!-- 사진첩 스크랩 -->
                    <div class="mebmer-profile-alarm">
                        <div>
                            <img class="member-img" src="/resources/images/common/Mokoko1.gif" alt="">
                            <div class="contents">
                                <div class="profile-info-alarm">
                                    <div class="member-nickname">묘동닉네임글자테스트</div>
                                    <div class="alarm-time">5시간전</div>
                                </div>
                                <div class="alarm-info">
                                    <div>{사진첩}</div>
                                    <div class="board-title">{제로투 5시간춤춰봄ddddddddddd}</div>
                                    <div class="board-type">게시물을 스크랩했습니다.</div>
                                </div>                    
                            </div>
                            <div class="alarm-delete">
                                <i class="fa-solid fa-xmark message-delete" onclick="messageDelete(this)"></i>
                            </div>
                        </div>
                    </div>
                    <!-- 사진첩 댓글 -->
                    <div class="mebmer-profile-alarm">
                        <div>
                            <img class="member-img" src="/resources/images/common/Mokoko1.gif" alt="">
                            <div class="contents">
                                <div class="profile-info-alarm">
                                    <div class="member-nickname">묘동닉네임글자테스트</div>
                                    <div class="alarm-time">5시간전</div>
                                </div>
                                <div class="alarm-info">
                                    <div>{사진첩}</div>
                                    <div class="board-title">{제로투 5시간춤춰봄ddddddddddd}</div>
                                    <div class="board-type">게시물에 댓글을 남겼습니다.</div>
                                </div>          
                            </div>
                            <div class="alarm-delete">
                                <i class="fa-solid fa-xmark message-delete" onclick="messageDelete(this)"></i>
                            </div>
                        </div>
                    </div>
                    <!-- 동영상 스크랩 -->
                    <div class="mebmer-profile-alarm">
                        <div>
                            <img class="member-img" src="/resources/images/common/Mokoko1.gif" alt="">
                            <div class="contents">
                                <div class="profile-info-alarm">
                                    <div class="member-nickname">묘동닉네임글자테스트</div>
                                    <div class="alarm-time">5시간전</div>
                                </div>
                                <div class="alarm-info">
                                    <div>[동영상]</div>
                                    <div class="board-title">제로투 5시간춤춰봄ddddddddddd</div>
                                    <div class="board-type">게시물을 스크랩했습니다.</div>
                                </div>           
                            </div>
                            <div class="alarm-delete">
                                <i class="fa-solid fa-xmark message-delete" onclick="messageDelete(this)"></i>
                            </div>
                        </div>
                    </div>

                    <!-- 동영상 댓글 -->
                    <div class="mebmer-profile-alarm" >
                        <div>
                            <img class="member-img" src="/resources/images/common/Mokoko1.gif" alt="">
                            <div class="contents">
                                <div class="profile-info-alarm">
                                    <div class="member-nickname">묘동닉네임글자테스트</div>
                                    <div class="alarm-time">5시간전</div>
                                </div>
                                <div class="alarm-info">
                                    <div>{동영상}</div>
                                    <div class="board-title">{제로투 5시간춤춰봄dddddddddddddd}</div>
                                    <div class="board-type">게시물에 댓글을 남겼습니다.</div>
                                </div>
                            </div>
                            <div class="alarm-delete">
                                <i class="fa-solid fa-xmark message-delete" onclick="messageDelete(this)"></i>
                            </div>
                        </div>
                    </div>

                </section>

            </div>
        </div>
    </div>
    <!-- jQuery 라이브러리(.js 파일) 추가(CDN 방식) -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <!-- <%-- 해당 모달 개인 js --%> -->
    <script src="/resources/js/webmain/main-notifications.js"></script>
</body>
</html>