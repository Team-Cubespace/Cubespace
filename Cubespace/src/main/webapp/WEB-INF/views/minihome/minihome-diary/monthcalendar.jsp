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
        .popup_layer {
        position: fixed;
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
        height: 400px;
        width: 500px;
        transform: translate(-50%, -50%);
        z-index: 1002;
        box-sizing: border-box;
        /* background: rgb(103, 21, 21); */
        box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.35);
        -webkit-box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.35);
        }
        .popup_cont {
        padding : 10px;
        background-color: white;
        border-radius: 20px;
        }
        .input-row{
            border-bottom: 1px solid #ddd;
            padding: 6px 0px;
            display: flex;
            align-items: flex-start;
            letter-spacing: -1px;
        }
        .input-row label {
            width: 100px;
            font-weight: bold;
            /* display: inline-block */
        }
        .input-row input[type = 'text']{
            border:none;
            outline: none;
        }
        .input-row textarea{
            resize: none;
            border: none;
            outline: none;
        }
        .modal-footer {
            display: flex;
            justify-content: end;
            padding: 20px;
        }

    </style>
</head>
<body>
    <div class="content-area">
        <section class="minihome-rayout">
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
                        <div class="popup_cont" id = "popup_con">
                        <!-- <a href="javascript:closePop4();" class="xbtn">
                            <i class="fa-solid fa-x xbtnBack" id = "fa-x"></i>
                        </a> -->
                            <div>
                                <h4>일정등록</h4>
                                <div class = "input-row">
                                    <label for="category">카테고리</label>
                                    <select class="selectBox" id="category" >
                                        <option value="1" style = "background-color: #fbc2eb;" >없음</option>
                                        <option value="2" style = "background-color: #b12a5b;" >직장</option>
                                        <option value="3" style = "background-color: #8ec5fc;">집</option>
                                        <option value="3" style = "background-color: #8ec5fc;">기념일</option>
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
                                <div class = "input-row">
                                    <label for="startDate">시작 날짜</label>
                                    <input type="date" id = "startDate">
                                
                                    <label for="startTime">시작 시간</label>
                                    <input type="time" id = "startTime" value = "00:00">
                                </div>
                                <div class = "input-row">
                                    <label for="endDate">종료 날짜</label>
                                    <input type="date" id = "endDate">
                                
                                    <label for="endTime">종료 시간</label>
                                    <input type="time" id = "endTime" value = "00:00">
                                </div>
                                <div class = "input-row">
                                    <label for="allDay">종일 여부</label>
                                        <input type="radio"  id = "allDay" value="true" name="allDay">예
                                        <input type="radio" id = "allDay"  value="false" name="allDay">아니오
                                    </div>
                                </div>
                                

                                <div class = "modal-footer">
                                    <button id = "mainBtn">등록</button>
                                    <button id = "cancleBtn">취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</body>

<!-- html에서 파일을 include 할 수 있도록 해주는 js (근데 VSCode Live Server에서만 보임) -->
<!-- include 방법 : <section class="minihome-rayout"> 안에 <div data-include-path="파일 경로"></div> 작성 -->
<script src="/resources/js/common/temp.js"></script>
<script src="/resources/js/minihome/minihome-diary/monthcalendar.js"></script>


</html>