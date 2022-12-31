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
                        <div class = "writeBtn" onclick = "writeBtn()">글쓰기</div>
                    </div>
                    <div class = "diary-section-container">
                        <%-- cut.jsp에 잘라냄 --%>
                    </div>
        
                </div>
        </section>
    </div>
</body>

<!-- html에서 파일을 include 할 수 있도록 해주는 js (근데 VSCode Live Server에서만 보임) -->
<!-- include 방법 : <section class="minihome-rayout"> 안에 <div data-include-path="파일 경로"></div> 작성 -->
<script src="/resources/js/common/temp.js"></script>
<script src="https://code.jquery.com/jquery-3.6.2.min.js" integrity="sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA=" crossorigin="anonymous"></script>
<script script type="text/javascript" th:inline="javascript">
    
    function selectDiary(diaryDate,folderNumber,homepageMemberNo,loginMemberNo){
    
    /* 일기 목록 조회하는 ajax */
    $.ajax({
        url : "/diary/selectDiary",
        data : {"diaryDate":diaryDate,"folderNumber":folderNumber,"homepageMemberNo":homepageMemberNo,"loginMemberNo":loginMemberNo},
        dataType : "JSON",
        success :  (diaryList)  => {

            /*확인용*/console.log("해당 날짜의 다이어리 목록 받기 성공")
            /*확인용*/console.log(diaryList);
            /* diaryNo, diaryTitle, diaryContent, diaryCreateDate, diaryOpenFlag 가지고 옴. */
            
            /* 각각의 diary-section의 위치를 잡아주는 기준(부모) */
            const diarySectionContainer = document.querySelector(".diary-section-container");
            /* 기존에 목록 불러온거 지워주는 거..? 누적방지용? */
            diarySectionContainer.innerText = "";
            
            for(diary of diaryList){

                /*확인용*/console.log("각각의 다이어리");
                /*확인용*/console.log(diary);

                const div = document.createElement("div");
                div.classList.add("diary-section");
                
                    const div1 = document.createElement("div");
                    div1.classList.add("title-section");

                        const div1_1 = document.createElement("div");
                        div1_1.classList.add("title");
                        div1_1.innerText = diary.diaryTitle;
                        
                        const div1_2 = document.createElement("div");

                            const div1_2_1 = document.createElement("div");
                            div1_2_1.classList.add("disclosure-option")
                            if(diary.diaryOpenFlag == 1){
                                div1_2_1.innerText = "공개";
                            }
                            if(diary.diaryOpenFlag == 2){
                                div1_2_1.innerText = "깐부공개";
                            }
                            if(diary.diaryOpenFlag == 3){
                                div1_2_1.innerText = "비공개";
                            }
                            const div1_2_2 = document.createElement("div");
                            div1_2_2.classList.add("create-time")
                            div1_2_2.innerText = diary.diaryCreateDate;

                        div1_2.append(div1_2_1,div1_2_2);
                    
                    div1.append(div1_1,div1_2);

                    const div2 = document.createElement("div");
                    div2.classList.add("content");
                    // let diaryContentSetting = diary.diaryContent;

                    /*<![CDATA[*/
                    
                        var current = "[[ ${diary.diaryContent} ]]"

                        console.log("야 제발 돼" +current);
                    
                    /*]]>*/
                    
                    div2.innerText =current;
                    
                    const div3 = document.createElement("div");
                    div3.classList.add("under-section");

                        const div3_1 = document.createElement("div");
                        div3_1.classList.add("under1");

                            const div3_1_1 = document.createElement("div");
                            div3_1_1.classList.add("emoji-and-pop");

                                const div3_1_1_1 = document.createElement("div");
                                div3_1_1_1.classList.add("emoji-section");   
                                /* 클릭하면 나오는 함수의 기능 1. 이모지 목록 비동기로 불러오기 
                                2. 이모지를 누른 사람의 목록 비동기로 불러오기*/
                                //div3_1_1_1.setAttribute("onclick","selectEmojiPeopleList("+diary.diaryNo+")") 
                                // const input3_1_1_1_1 = document.createElement("input");
                                // input3_1_1_1_1.setAttribute("type","hidden");
                                
                                /* 얘가 원래 이 자리였는데 selectEmojiList함수 안에서 만들거야... */
                                // const div3_1_1_2 = document.createElement("div");
                                // div3_1_1_2.classList.add("people-pop-container");
                                
                                selectEmojiList(diary.diaryNo,div3_1_1_1,div3_1_1);

                                const div3_1_1_2 = document.createElement("div");
                                div3_1_1_2.classList.add("people-pop-container");
                                
                                console.log(div3_1_1_2);
                                peoplePopContainer = div3_1_1_2;
                            /* selectEmojiList가서 div3_1_1_2를 beforeend로 넣을 꺼야... */
                        
                            div3_1_1.append(div3_1_1_1,div3_1_1_2);
                            /* mouseover하면, div3_1_1_2에 beforeend로 div3_1_1_2_1를 넣어야될듯?*/
                            /* mouseout하면  div3_1_1_2.innertext = ""*/

                            const div3_1_2 = document.createElement("div");
                            div3_1_2.classList.add("choose-emoji-section");

                                const div3_1_2_1 = document.createElement("div");
                                div3_1_2_1.classList.add("emoji-btn");
                                div3_1_2_1.innerText="공감하기";
                                div3_1_2_1.setAttribute("onclick","chooseEmoji("+diary.diaryNo+",this)")
                                
                            /* 아직 미완성조각 */
                            div3_1_2.append(div3_1_2_1);
                        
                        div3_1.append(div3_1_1,div3_1_2);


                        const div3_2 = document.createElement("div");
                        div3_2.classList.add("under2");

                            const div3_2_1 = document.createElement("div");
                            div3_2_1.setAttribute("onclick","updateDiary("+diary.diaryNo+")")
                            div3_2_1.innerText = "수정";
                            
                            const div3_2_2 = document.createElement("div");
                            div3_2_2.setAttribute("onclick","deleteDiary("+diary.diaryNo+")")
                            div3_2_2.innerText = "삭제";

                        div3_2.append(div3_2_1,div3_2_2);

                    div3.append(div3_1,div3_2);
                
                div.append(div1,div2,div3);

                diarySectionContainer.insertAdjacentElement("beforeend",div);
            }
            

        }, error : () => { 
            
        }
        
    });
}
    
    </script>
<script src="/resources/js/minihome/minihome-diary/calendar.js"></script>
<%-- <script src = "/resources/js/minihome/minihome-diary/minihome-diary.js"></script> --%>

</html>