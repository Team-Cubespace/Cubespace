<!-- JSP 파일로 변환할 때 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%> 

<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minihome Content Area</title>
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-diary/minihome_diary.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-diary/diary_calendar.css">
    

    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>



<%-- 내 폰트 설정 --%>
    <c:forEach var="font" items="${allFontList}">
    <c:if test="${font.fontNo == minihome.fontNo}">
        <c:set var="myFont" value="${font.fontNo}"/>
    </c:if>

    <style>
        @font-face{
            font-family : "${font.fontNo}";
            src : url(${font.fontPath});
        }
    </style>
    </c:forEach>

    <style>
    .side-folder,  header,  .input-row, .form-button-area, .under-section,  .title-section,  .write-section, .calendar-container{
        font-family : "${myFont}";
    } 

    input:not(#minihomeTitle), textarea:not(.profile-message) {
        font-family : "${loginMember.ownFontNo}";
    }

    .frame-color {
            background-color : ${minihome.frameColor};
        }

    </style>
</head>
<body>
    <%-- <jsp:include page="/WEB-INF/views/include/allFontMusic.jsp"/> --%>
    <div class="content-area frame-color">
        <section class="minihome-rayout">
                <jsp:include page="/WEB-INF/views/include/side-folder.jsp"/>

                <style>
                    .side-folder{
        font-family : "${myFont}";
    }
                </style>


                <!-- 좌측 section 코드 작성 또는 include -->
                <!-- 전체 내용 div 태그로 한 번 감싸주세요 -->
                <!-- ex) <div class="home-area"> <div></div> <span></span> ... </div> -->
        </section>

        <section class="minihome-rayout">
                <!-- 우측 section 코드 작성 또는 include -->
                <!-- 전체 내용 div 태그로 한 번 감싸주세요 -->
                <!-- ex) <div class="home-area"> <div></div> <span></span> ... </div> -->
                <div class = "home-area">
                    <header>
                        <span>다이어리 > </span>
                        <span>${folderName}</span>
                    </header>
                    <div class = "calendar-box">
                        <div class = "calendar-section">
                            <!-- jsp인 경우 include할 거...? -->
                            <div class="calendar-container">
                    
                                <div class="calendar-left-area">
                                    <span class="today">12.19</span>
                                    <span class="today-day">Mon</span>
                                </div>
                        
                        
                                <div class="calendar-right-area">
                                    <div class="calendar-header">
                                        <button id="prevMonth"><i class="fa-solid fa-caret-left"></i></button>
                                        <span class="year-month">2022.12</span>
                                        <button id="nextMonth"><i class="fa-solid fa-caret-right"></i></button>
                                    </div>
                        
                                    <ul class="calendar-day">
                                        <!-- <li><a>1</a></li>
                                        <li><a>2</a></li>
                                        <li><a>3</a></li>
                                        <li class="holiday"><a>4</a></li>
                                        <li><a>5</a></li> 
                                        <li><a>6</a></li>
                                        <li><a>7</a></li>
                                        <li><a>8</a></li>
                                        <li><a>9</a></li>
                                        <li><a>10</a></li>
                                        <li class="holiday"><a>11</a></li>
                                        <li><a>12</a></li>
                                        <li class="day-active"><a>13</a></li> -->
                                    </ul>
                            
                                    <ul class="calendar-day">
                                        <!-- <li><a>14</a></li>
                                        <li class="day-active"><a>15</a></li>
                                        <li class="day-active"><a>16</a></li>
                                        <li><a>17</a></li>
                                        <li class="holiday"><a>18</a></li>
                                        <li class="day-click"><a>19</a></li>
                                        <li><a>20</a></li>
                                        <li><a>21</a></li>
                                        <li><a>22</a></li>
                                        <li><a>23</a></li>
                                        <li><a>24</a></li>
                                        <li class="holiday"><a>25</a></li>
                                        <li><a>26</a></li>
                                        <li><a>27</a></li>
                                        <li><a>28</a></li>
                                        <li><a>29</a></li>
                                        <li><a>30</a></li>
                                        <li><a>31</a></li> -->
                                    </ul>
                                </div>
                            </div>
                            <!-- include 끝 -->
                        </div>
                    </div>
                    <div class = "write-section">
                        <c:if test = "${minihome.memberNo==loginMember.memberNo}">
                            <div  class = "writeBtn whiteBtn" onclick="writeBtn()">
                                <span>글쓰기</span>
                            </div>
                        </c:if>
                    </div>
                    <div class = "diary-section-container">
                        <%-- cut.jsp에 잘라냄 /어차피 js로 다 만드는 거라서...ㅋ --%>
                    </div>
        
                </div>
        </section>
    </div>
</body>

<!-- html에서 파일을 include 할 수 있도록 해주는 js (근데 VSCode Live Server에서만 보임) -->
<!-- include 방법 : <section class="minihome-rayout"> 안에 <div data-include-path="파일 경로"></div> 작성 -->

<script src="https://code.jquery.com/jquery-3.6.2.min.js" integrity="sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA=" crossorigin="anonymous"></script>
<script>
    const folderNo = "${folderNo}";
    console.log(folderNo);
    const datedatedate = "${datedatedate}";
    const flagNo = "${flagNo}";
    /* 세션에 있으니까 model에 안 담아줘도 jsp에서 바로 쓸 수 있음. */
    const minihomeNo = "${minihome.memberNo}";
    const loginMemberNo = "${loginMember.memberNo}";
</script>
<script src="/resources/js/minihome/minihome-diary/diary-main.js"></script>
<%-- <script src="/resources/js/minihome/minihome-diary/try1.js"></script> --%>
<%-- <script src = "/resources/js/minihome/minihome-diary/minihome-diary.js"></script> --%>

</html>