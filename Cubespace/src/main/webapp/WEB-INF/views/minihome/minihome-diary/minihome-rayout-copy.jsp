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
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-diary/minihome_diary.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-diary/calendar.css">
    

    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
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
                    <header><span>다이어리 > </span><span>다이어리1</span></header>
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
                        <div class = "writeBtn">글쓰기</div>
                    </div>
                    <!-- for문 돌릴 하나의 거대한 친구입니다. -->
                    <div class = "diary-section">
                        <div class = "title-section">
                            <div class = "title">제목입니다~~~~~~</div>
                            <div>
                            <div class = "disclosure-option">공개</div>
                            <div class = "create-time">20시 03분</div>
                            </div>
                        </div>
                        <div class = "content">내용입니다.</div>
                        <div class = "under-section">
                            <div class = "under1">
                                <div class = "emoji-and-pop" >
                                    <div class = "emoji-section" id = "emojiSeciton" >
                                        <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/humm.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                55
                                            </div>
                                        </div>
                                        <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/tears.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                44
                                            </div>
                                        </div>
                                        <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/like.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                33
                                            </div>
                                        </div>
                                        <div class = "emoji-row">
                                            <div  class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/cursing.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                22
                                            </div>
                                        </div >
                                        <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/smile.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                11
                                            </div>
                                        </div >
                                        <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/heart.png" alt="">
                                            </div >
                                            <div class = "emoji-number">
                                                2
                                            </div>
                                        </div>
                                    </div>
                                    <div class = "people-pop" id = "peoplePop" style="display: none;">
                                        <!-- 인간을 누르면 미니홈피로 이동고고 -->
                                        <div class = "people-list">공감을 누른 깐부 목록</div>
                                        <div  class = "profile-box">
                                            <div>
                                            <img  class = "profile-image" src="../../images/삐약.gif" alt="">
                                            </div>
                                            <div class = "name">김효동</div>
                                        </div>
                                        <div  class = "profile-box">
                                            <div>
                                            <img  class = "profile-image" src="../../images/삐약.gif" alt="">
                                            </div>
                                            <div class = "name">김효동</div>
                                        </div>    
                                    </div>
                                </div>
                                <div class = "choose-emoji-section">
                                    <div class = "emoji-btn" id = "emojiBtn">
                                        공감하기
                                    </div>
                                    <!-- 튀어나오는 애 2 -->
                                    <div class = "choose-emoji" id = "chooseEmoji" style="display: none;">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/humm.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/tears.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/like.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/cursing.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/smile.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/heart.png" alt="">
                                            </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class = "under2">
                                <div id = "updateBtn">수정</div>
                                <div id = "deleteBtn">삭제</div>
                            </div>
                        </div>
        
                    </div>
                    <!-- 거대한 친구 끝 -->
                     <!-- for문 돌릴 하나의 거대한 친구입니다. -->
                    <div class = "diary-section">
                        <div class = "title-section">
                            <div class = "title">제목입니다~~~~~~</div>
                            <div>
                            <div class = "disclosure-option">공개</div>
                            <div class = "create-time">20시 03분</div>
                            </div>
                        </div>
                        <div class = "content">내용입니다.</div>
                        <div class = "under-section">
                            <div class = "under1">
                                <div class = "emoji-and-pop" >
                                    <div class = "emoji-section">
                                        <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/humm.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                55
                                            </div>
                                        </div>
                                        <!-- <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/tears.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                44
                                            </div>
                                        </div> -->
                                        <!-- <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/like.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                33
                                            </div>
                                        </div> -->
                                        <div class = "emoji-row">
                                            <div  class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/cursing.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                22
                                            </div>
                                        </div >
                                        <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/smile.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                11
                                            </div>
                                        </div >
                                        <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/heart.png" alt="">
                                            </div >
                                            <div class = "emoji-number">
                                                2
                                            </div>
                                        </div>
                                    </div>
                                    <div class = "people-pop">
                                        <!-- 인간을 누르면 미니홈피로 이동고고 -->
                                        <div class = "people-list">공감을 누른 깐부 목록</div>
                                        <div  class = "profile-box">
                                            <div>
                                            <img  class = "profile-image" src="../../images/삐약.gif" alt="">
                                            </div>
                                            <div class = "name">김효동</div>
                                        </div>
                                        <div  class = "profile-box">
                                            <div>
                                            <img  class = "profile-image" src="../../images/삐약.gif" alt="">
                                            </div>
                                            <div class = "name">김효동</div>
                                        </div>
                                    </div>
                                </div>
                                <div class = "choose-emoji-section">
                                    <div class = "emoji-btn">
                                        공감하기
                                    </div>
                                    <!-- 튀어나오는 애 2 -->
                                    <div class = "choose-emoji">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/humm.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/tears.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/like.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/cursing.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/smile.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/heart.png" alt="">
                                            </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class = "under2">
                                <div>수정</div>
                                <div>삭제</div>
                            </div>
                        </div>
        
                    </div>
                    <!-- 거대한 친구 끝 -->
                    <!-- for문 돌릴 하나의 거대한 친구입니다. -->
                    <div class = "diary-section">
                        <div class = "title-section">
                            <div class = "title">제목입니다~~~~~~</div>
                            <div>
                            <div class = "disclosure-option">공개</div>
                            <div class = "create-time">20시 03분</div>
                            </div>
                        </div>
                        <div class = "content">내용입니다.</div>
                        <div class = "under-section">
                            <div class = "under1">
                                <div class = "emoji-and-pop" >
                                    <div class = "emoji-section">
                                        <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/humm.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                55
                                            </div>
                                        </div>
                                        <!-- <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/tears.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                44
                                            </div>
                                        </div> -->
                                        <!-- <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/like.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                33
                                            </div>
                                        </div> -->
                                        <!-- <div class = "emoji-row">
                                            <div  class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/cursing.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                22
                                            </div>
                                        </div >
                                        <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/smile.png" alt="">
                                            </div>
                                            <div class = "emoji-number">
                                                11
                                            </div>
                                        </div >
                                        <div class = "emoji-row">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/heart.png" alt="">
                                            </div >
                                            <div class = "emoji-number">
                                                2
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class = "people-pop">
                                        <!-- 인간을 누르면 미니홈피로 이동고고 -->
                                        <div class = "people-list">공감을 누른 깐부 목록</div>
                                        <div  class = "profile-box">
                                            <div>
                                            <img  class = "profile-image" src="../../images/삐약.gif" alt="">
                                            </div>
                                            <div class = "name">김효동</div>
                                        </div>
                                        <div  class = "profile-box">
                                            <div>
                                            <img  class = "profile-image" src="../../images/삐약.gif" alt="">
                                            </div>
                                            <div class = "name">김효동</div>
                                        </div>
                                    </div>
                                </div>
                                <div class = "choose-emoji-section">
                                    <div class = "emoji-btn">
                                        공감하기
                                    </div>
                                    <!-- 튀어나오는 애 2 -->
                                    <div class = "choose-emoji">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/humm.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/tears.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/like.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/cursing.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/smile.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/heart.png" alt="">
                                            </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class = "under2">
                                <div>수정</div>
                                <div>삭제</div>
                            </div>
                        </div>
        
                    </div>
                    <!-- 거대한 친구 끝 -->
                    <!-- for문 돌릴 하나의 거대한 친구입니다. -->
                    <div class = "diary-section">
                        <div class = "title-section">
                            <div class = "title">제목입니다~~~~~~</div>
                            <div>
                            <div class = "disclosure-option">공개</div>
                            <div class = "create-time">20시 03분</div>
                            </div>
                        </div>
                        <div class = "content">내용입니다.</div>
                        <div class = "under-section">
                            <div class = "under1">
                                <div class = "emoji-and-pop" >
                                    <div class = "emoji-section">
                                    </div>
                                    <div class = "people-pop">
                                        <!-- 인간을 누르면 미니홈피로 이동고고 -->
                                        <div class = "people-list">공감을 누른 깐부 목록</div>
                                        <div  class = "profile-box">
                                            <div>
                                            <img  class = "profile-image" src="../../images/삐약.gif" alt="">
                                            </div>
                                            <div class = "name">김효동</div>
                                        </div>
                                        <div  class = "profile-box">
                                            <div>
                                            <img  class = "profile-image" src="../../images/삐약.gif" alt="">
                                            </div>
                                            <div class = "name">김효동</div>
                                        </div>
                                    </div>
                                </div>
                                <div class = "choose-emoji-section">
                                    <div class = "emoji-btn">
                                        공감하기
                                    </div>
                                    <!-- 튀어나오는 애 2 -->
                                    <div class = "choose-emoji">
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/humm.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/tears.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/like.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/cursing.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/smile.png" alt="">
                                            </div>
                                            <div class = "emoji-box">
                                                <img class = "emoji" src="../../images/diary/heart.png" alt="">
                                            </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class = "under2">
                                <div>수정</div>
                                <div>삭제</div>
                            </div>
                        </div>
        
                    </div>
        
                </div>
        </section>
    </div>
</body>

<!-- html에서 파일을 include 할 수 있도록 해주는 js (근데 VSCode Live Server에서만 보임) -->
<!-- include 방법 : <section class="minihome-rayout"> 안에 <div data-include-path="파일 경로"></div> 작성 -->
<script src="../../js/common/temp.js"></script>
<script src="https://code.jquery.com/jquery-3.6.2.min.js" integrity="sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA=" crossorigin="anonymous"></script>
<script src="/resources/js/minihome/minihome-diary/calendar.js"></script>
<script src = "/resources/js/minihome/minihome-diary/minihome-diary.js"></script>

</html>