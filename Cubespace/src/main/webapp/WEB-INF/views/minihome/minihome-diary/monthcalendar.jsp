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
    <%-- 공통css --%>
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">

    <%-- 캘린더 --%>
    <link rel="stylesheet" href="/resources/css/minihome/minihome-diary/main.css">
    <script src="/resources/js/minihome/minihome-diary/main.js"></script>

    <%-- 제이쿼리 --%>
    <script src="https://code.jquery.com/jquery-3.6.2.min.js" integrity="sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA=" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>

    
    <style>
        .frame-color {
            background-color : ${minihome.frameColor};
        }

        /* 캘린더 css */
        .calendar-container {
            /* margin: 40px 10px; */
            padding: 0;
            font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
            font-size: 8px;
        }

        #calendar {
            max-width: 1100px;
            margin: 0 auto;
        }

        /* 모달창 css */
        .home-area {
            /* position : relative; */
        }
        .popup_layer {
        /* position: absolute; */
        position :fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        }
        .popup_box {
        border-radius: 20px;
        position: relative;
        top: 50%;
        left: 50%;
        /* overflow-y: scroll; */
        height: 440px;
        width: 500px;
        transform: translate(-50%, -50%);
        z-index: 1002;
        box-sizing: border-box;
        background: white;
        padding : 10px;


        box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.35);
        -webkit-box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.35);
        }
        /* .popup_cont {
        padding : 10px;
        background-color: white;
        border-radius: 20px;
        } */
        .modal-title {
            font-size : 20px;
            font-weight : bold;
            padding-bottom : 10px;
        }
        .input-row{
            border-bottom: 1px solid #ddd;
            padding: 10px 0px;
            display: flex;
            align-items: flex-start;
            letter-spacing: -1px;
        }
        .input-row label {
            width: 100px;
            font-weight: bold;
            /* display: inline-block */
        }
        .margin {
            width : 20px;
        }
        .input-row input[type = 'time'] {
            width : 100px;
        } 
        .input-row input[type = 'text']{
            border:none;
            outline: none;
            width : 80%;
        }
        .input-row >textarea{
            resize: none;
            border: none;
            outline: none;
            height: 92px;
            width: 75%;
        }
        .modal-footer {
            display: flex;
            justify-content: end;
            padding: 10px;
            height: 44px;
        }

        /* 모달창2 css */
        .popup_layer2 {
        /* position: absolute; */
        position :fixed;
        top: 0;
        left: 0;
        z-index: 10001;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        }

        .input-row2{
            height : 37px;
            border-bottom: 1px solid #ddd;
            padding: 13px 0px;
            display: flex;
            align-items: flex-start;
            letter-spacing: -1px;
        }

        .input-row2:nth-child(4){
            height : 125px;
        }
        .input-row2 > div:nth-child(1) {
            width: 100px;
            font-weight: bold;
            /* display: inline-block */
        }

        .contentShow {
            overflow : auto;
            height: 100px !important;
            width: 79%;
            word-break: break-all;
            /* 개행문자 대신 처리... */
            white-space: pre-wrap;
        }
      
        .cancle {
            display: flex;
            justify-content: end;
            padding: 5px 30px 0px 0px;
        }

        /* 버튼들 cursor pointer */
        .fa-x {
            cursor: pointer;
        }
        button {
            cursor: pointer;
            margin-right : 10px;
        }

    </style>
</head>
<body>
<jsp:include page="/WEB-INF/views/include/diaryFont.jsp"/>
    <div class="content-area frame-color">
        <section class="minihome-rayout">
            <jsp:include page="/WEB-INF/views/include/side-folder.jsp"/>
            <!-- 좌측 section 코드 작성 또는 include -->
            <!-- 전체 내용 div 태그로 한 번 감싸주세요 -->
            <!-- ex) <div class="home-area"> <div></div> <span></span> ... </div> -->
        </section>

        <section class="minihome-rayout">
            <!-- 우측 section 코드 작성 또는 include -->
            <!-- 전체 내용 div 태그로 한 번 감싸주세요 -->
            <!-- ex) <div class="home-area"> <div></div> <span></span> ... </div> -->
            <div class = "home-area">
                <div id='calendar-container' class = "calendar-container">
                    <div id='calendar'></div>
                </div>

                <%-- 새로 가져왔어요 --%>
                
                <!-- 모달창 -->
                <div class="popup_layer" id="popup_layer" style ="display:none;">
                    <!-- style="display: none;" -->
                    <div class="popup_box">
                            <div class = "cancle">
                                <i id = "cancleBtn" class="fa-solid fa-x xbtnBack" ></i>
                            </div>
                            <div class = "container">
                                <div class = "input-row2-title">
                                    <div class = "modal-title" id = "modal-title">일정등록</div>
                                    <input type="hidden" id = "number">
                                </div>
                                <div class = "input-row">
                                    <label for="category">카테고리</label>
                                    <select class="selectBox" id="category" >
                                        <option value="1" style = "color: #C0EEE4; font-weight : bold;" >없음</option>
                                        <option value="2" style = "color: #F3CCFF; font-weight : bold;" >직장</option>
                                        <option value="3" style = "color: #D8F8B7; font-weight : bold;">집</option>
                                        <option value="4" style = "color: #FFCAC8; font-weight : bold;">기념일</option>
                                        <option value="5" style = "color: #95a5a6; font-weight : bold;">약속</option>
                                    </select>
                                </div>
                                <div class = "input-row">
                                    <label for="title">일정 제목</label>
                                    <input type="text" id = "title" placeholder="제목을 입력해주세요.">
                                </div>
                                <div class = "input-row">
                                    <label for="description">일정 내용</label>
                                    <textarea name="" id="description" 
                                    cols="50" rows="10" placeholder = "일정에 필요한 설명을 입력해주세요."></textarea>  
                                </div>
                                <div class = "input-row ">
                                    <label for="startDate">시작 날짜</label>
                                    <input type="date" id = "startDate">
                                    <div class = "margin"></div>
                                    <label for="startTime">시작 시간</label>
                                    <input type="time" id = "startTime" value = "00:00">
                                </div>
                                <div class = "input-row ">
                                    <label for="endDate">종료 날짜</label>
                                    <input type="date" id = "endDate">
                                    <div class = "margin"></div>
                                    <label for="endTime ">종료 시간</label>
                                    <input type="time" id = "endTime" value = "00:00">
                                </div>
                                <div class = "input-row">
                                    <label for="allDay">하루 종일</label>
                                    <%-- 이거 라벨 잘못 붙인 듯.... 먼가 css할때 조정 필요할 듯? --%>
                                        <input type="radio"  id = "allDay1" value="true" name="allDay">예
                                        <input type="radio" id = "allDay2"  value="false" name="allDay">아니오
                                    
                                </div>
                                <div class = "modal-footer">
                                    <button id = "mainBtn" onClick = "addEvent()">등록</button>

                                    <button id = "updateBtn" onClick = "updateEvent()">수정완료</button>


                                </div>
                            </div>
                        
                    </div>
                </div>

                <!-- 모달창2 -->
                <div class="popup_layer2" id="popup_layer2" style ="display:none;">
                    <!-- style="display: none;" -->
                    <div class="popup_box">
                        <%-- <div class="popup_cont" id = "popup_con"> --%>
                        <div class = "cancle">
                            <i id = "cancleShowBtn" class="fa-solid fa-x xbtnBack" ></i>
                        </div>
                            <div>
                                <div class = "input-row2-title">
                                    <div class = "modal-title">일정확인</div>
                                    <input type="hidden" id = "number">
                                </div>
                                <div class = "input-row2">
                                    <div >카테고리</div>
                                    <div id = "categoryShow"></div>
                                </div>
                                <div class = "input-row2">
                                    <div >일정 제목</div>
                                    <div id = "titleShow"></div>
                                </div>
                                <div class = "input-row2">
                                    <div >일정 내용</div>
                                    <div id = "contentShow" class =  "contentShow" ></div>
                                </div>
                                <div class = "input-row2 ">
                                    <div>시작</div>
                                    <div id = "startDateShow"></div>
                                </div>
                                <div class = "input-row2 ">
                                    <div>종료</div>
                                    <div id = "endDateShow"></div>
                                </div>
                                <div class = "input-row2">
                                    <div>하루 종일</div>
                                    <div id = "allDayShow"></div>
                                </div>
                                <div class = "modal-footer">
                                <c:if test = "${loginMember.memberNo == minihome.memberNo}">
                                    <button id = "updateShowBtn">수정하기</button>
                                    <button id = "deleteBtn" onClick = "deleteEvent()">삭제하기</button>
                                </c:if>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</body>
<script>
const minihomeNo = "${minihome.memberNo}";
const loginMemberNo = "${loginMember.memberNo}";
</script>
<!-- html에서 파일을 include 할 수 있도록 해주는 js (근데 VSCode Live Server에서만 보임) -->
<!-- include 방법 : <section class="minihome-rayout"> 안에 <div data-include-path="파일 경로"></div> 작성 -->
<script src="/resources/js/minihome/minihome-diary/monthcalendar.js"></script>
</html>