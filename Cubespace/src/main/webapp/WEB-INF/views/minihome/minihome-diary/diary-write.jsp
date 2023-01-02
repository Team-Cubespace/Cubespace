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
        <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-diary/diary-write.css">

    <!-- include libraries(jQuery, bootstrap) -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

    <!-- CDN 파일 summernote css/js -->
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>

    <!-- CDN 한글화 -->
    <script src=" https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/lang/summernote-ko-KR.min.js"></script>
    <%-- 폰트 어썸 --%>
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
    <%-- summernote css --%>
    <style>
    /* .summernoteBox {
        width: 620px;
        background-color: white;
        border: 1px solid black;
    }

    .summernote {
        height: 500px;
        width: 620px;
        resize: none;
    } */
    </style>
</head>
<body>
    <div class="content-area">
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
                <div class="diary-main">
                    <header>
                        <span>다이어리 작성</span>
                    </header>
                    <form id="writediaryForm" action="/diaryWrite" method="POST" encType="" onsubmit="return false;">
                        <div class="input-row">
                            <label for="">폴더</label>
                            <select name="folderNo" id="">
                            <c:forEach var="folder" items="${folderList}">
                                <option value="${folder.folderNo}">${folder.folderName}</option>
                            </c:forEach>
                            </select>
                        </div>
                        <div class="input-row">
                            <label for="diaryDate">날짜</label>
                            <input id="diaryDate" name="diaryCreateDate" type="datetime-local" value = "2023-01-01">
                        </div>
                        <div class="input-row">
                            <label for="diaryTitle">제목</label>
                            <input id="diaryTitle" name="diaryTitle" type="text" placeholder="제목을 입력하세요">
                        </div>
                        <div class="input-row">
                            <%-- <label for="diaryContent">내용</label> --%>
                            <textarea id="summernote" name = "diaryContent"><p>Hello Summernote</p></textarea>
                            <%-- <div id="summernote" name = "diaryContent"><p>Hello Summernote</p></div>
                            <script>
                            const summmernote = document.getElementById("summernote");
                            </script>
                            <input type="hidden" > --%>
                            <%-- <textarea name="diaryContent" id="diaryContent" rows="6" placeholder="내용을 입력하세요"></textarea> --%>
                        </div>
                        <div class="input-row">
                            <label>공개설정</label>
                            <ul class="radio-list">
                                <li>
                                    <input type="radio" id="scope1" name="diaryOpenFlag" checked value="1">
                                    <%-- <label class="radio" for="scope1">
                                        <i class="fa-solid fa-check"></i>
                                    </label> --%>
                                    <label for="scope1">공개</label>
                                </li>
                                <li>
                                    <input type="radio" id="scope2" name="diaryOpenFlag" value="2">
                                    <%-- <label class="radio" for="scope2">
                                        <i class="fa-solid fa-check"></i>
                                    </label> --%>
                                    <label for="scope2">깐부공개</label>
                                </li>
                                <li>
                                    <input type="radio" id="scope3" name="diaryOpenFlag" value="3">
                                    <%-- <label class="radio" for="scope3">
                                        <i class="fa-solid fa-check"></i>
                                    </label> --%>
                                    <label for="scope3">비공개</label>             
                                </li>
                            </ul>
                        </div>
                        <div class="form-button-area">
                            <button id="submitButton" onclick = "submit()">작성</button>
                            <%-- <button id="submitButton" type="submit">작성</button> --%>
                            <a id="cancelWrite">취소</a>
                        </div>
                    </form>

                    
                </div>
        </section>
    </div>
</body>

<!-- html에서 파일을 include 할 수 있도록 해주는 js (근데 VSCode Live Server에서만 보임) -->
<!-- include 방법 : <section class="minihome-rayout"> 안에 <div data-include-path="파일 경로"></div> 작성 -->
<script src="/resources/js/common/temp.js"></script>
<script>
/* 글쓸 때 오늘 날짜를 기본값으로 집어넣기! */
let diary = new Date();
let fullYear = diary.getFullYear();
let month = ("0"+diary.getMonth() + 1).slice(-2)
let day = ("0"+diary.getDate()).slice(-2)
let hour = ("0" + diary.getHours()).slice(-2)
let minute = ("0" + diary.getMinutes()).slice(-2)

document.getElementById('diaryDate').value =  fullYear+"-"+month+"-"+day+" "+hour+":"+minute;
</script>
<script src="/resources/js/minihome/minihome-diary/diary_write.js"></script>
<%-- <script src = "/resources/js/minihome/minihome-diary/minihome-diary.js"></script> --%>

</html>