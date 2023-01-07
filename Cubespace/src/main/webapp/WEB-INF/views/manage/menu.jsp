<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/common/checkBox.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/manage/manage.css">
    <link rel="stylesheet" href="/resources/css/manage/menu.css">
    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
    <title></title>
    <style>
        .frame-color {
            background-color : ${minihome.frameColor};
        }
    </style>
    
</head>
<body>


    <%-- 
        미니홈피 접속시 불러와야 하는 정보
        - loginMember.memberNo
        배경음악 -> ownMusicNo
        폰트 -> fontPath
        깐부 -> 깐부
        메뉴 -> List로 담은 폴더정보(folderNo, boardTypeNo, folderName, forderOrder)
        배경 -> frameColor, frameMenuColor, frameFontColor, backgroundSkin

     --%>


    <div class="content-area frame-color">
        <section class="minihome-rayout">
                <div>
                    <jsp:include page="/WEB-INF/views/manage/manageLeftBar.jsp"/>
                </div>
        </section>

        <section class="minihome-rayout">
            <div class="main">
                <header>
                    <span class="rightTitle">메뉴 관리</span>
                </header>
                <div class="backgroundArea">
                    <div>
                        <div>
                            <div class="listTitle backgroundTitleArea">
                                <span class="backgroundTitle">상단메뉴 관리</span>
                                <div class="backgroundExplain">
                                    <p> 내 미니홈피 메뉴를 구성할수 있으며 최소 1개의 메뉴가 존재해야 합니다</p>
                                </div>
                            </div>
                            <div class="fontArea">
                                <div class="fontHeader menuHeader">
                                    <div class="fontTitle">메뉴명</div>
                                    <div class="fontUse">사용</div>
                                    <div class="fontExample">설명</div>
                                </div>

                                <c:if test="${categoryOrder.diary != -1}">
                                    <c:set var="diaryChecked" value="checked"></c:set>
                                </c:if>
                                <c:if test="${categoryOrder.album != -1}">
                                    <c:set var="albumChecked" value="checked"></c:set>
                                </c:if>
                                <c:if test="${categoryOrder.video != -1}">
                                    <c:set var="videoChecked" value="checked"></c:set>
                                </c:if>
                                <c:if test="${categoryOrder.guestBook != -1}">
                                    <c:set var="guestBookChecked" value="checked"></c:set>
                                </c:if>

                                <div class="fontMain menuMain">
                                    <div class="fontTitle">홈</div>
                                    <div class="fontUse">
                                        <div class="useFontRadio checkedImg">필수</div>
                                    </div>
                                    <div class="fontExample menuExample">내 프로필과 미니룸 정보가 표시됩니다</div>
                                </div>

                                <div class="fontMain menuMain">
                                    <div class="fontTitle">다이어리</div>
                                    <div class="fontUse">
                                        <input type="checkbox" name="useMenu" class="useFontRadio" id="" value="diary" ${diaryChecked}>
                                    </div>
                                    <div class="fontExample menuExample">날짜별로 일기를 작성하고, 일정을 등록할 수 있습니다</div>
                                </div>
                            
                                <div class="fontMain menuMain">
                                    <div class="fontTitle">사진첩</div>
                                    <div class="fontUse">
                                        <input type="checkbox" name="useMenu" class="useFontRadio" id="" value="album" ${albumChecked}>
                                    </div>
                                    <div class="fontExample menuExample">사진과 함께 간단한 글을 남길 수 있습니다</div>
                                </div>
                        
                                <div class="fontMain menuMain">
                                    <div class="fontTitle">동영상</div>
                                    <div class="fontUse">
                                        <input type="checkbox" name="useMenu" class="useFontRadio" id="" value="video" ${videoChecked}>
                                    </div>
                                    <div class="fontExample menuExample">짧은 동영상과 간단한 글을 남길 수 있습니다</div>
                                </div>
                            
                                <div class="fontMain menuMain">
                                    <div class="fontTitle">방명록</div>
                                    <div class="fontUse">
                                        <input type="checkbox" name="useMenu" class="useFontRadio" id="" value="guestBook" ${guestBookChecked}>
                                    </div>
                                    <div class="fontExample menuExample">다른 회원들이 짧은 안부인사를 남길 수 있습니다</div>
                                </div>
                            
                                <div class="fontMain menuMain">
                                    <div class="fontTitle">관리</div>
                                    <div class="fontUse">
                                        <div class="useFontRadio checkedImg">필수</div>
                                    </div>
                                    <div class="fontExample menuExample">다양한 설정을 변경하고 친구를 관리할 수 있습니다</div>
                                </div>
                            </div>
                        </div>
                        <div class="menuSaveArea">
                            <button class="whiteBtn" id="menuSelectBtn">변경사항 저장</button>
                            <p class="whiteBtn" id="menuSelectCancelBtn">원래대로</p>
                        </div>
                    </div>
                    <form action="/manage/menu/changeCategory" method="post" onsubmit="return orderCategory()">
                        <div class="listTitle backgroundTitleArea">
                            <span class="backgroundTitle">메뉴설정 변경</span>
                            <div class="backgroundExplain">
                                <p>메뉴 구성을 변경할 수 있으며 메뉴 하단에 폴더를 생성할 수 있습니다</p>
                            </div>
                        </div>
                       
                        <div class="menuLeftRight">
                            <div class="menuLeftArea" >
                                <div class="home" >
                                    <div class=" homeCategoryArea">
                                        <span class="menuTitle">홈</span>
                                    </div>
                                </div>                        
                                <div class="menuListArea" id="sortable1">
                                    <c:if test="${fn:split(realOrder, ',')[0] == 1}"> 
                                    <c:if test="${categoryOrder.diary != -1}"> 
                                        <div class="diary" >
                                            <div class="categoryArea" name="1">
                                                <span class="menuTitle">다이어리</span><i class="fa-solid fa-plus"></i>
                                            </div>
                                            <div class="subCategoryArea" id="sortable2">
                                    <c:forEach var="folder" items="${folderList}">
                                        <c:if test="${folder.boardTypeNo == 1}">
                                            <c:if test="${folder.folderName == '나의 월간달력'}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}" >
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input class="folderTitle" value='${folder.folderName}'  name="${folder.folderNo}" id="${folder.fileCount}" maxlength="20" disabled>
                                                </div>
                                            </c:if>
                                            <c:if test="${folder.folderName != '나의 월간달력'}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input class="folderTitle" value='${folder.folderName}'  name="${folder.folderNo}" id="${folder.fileCount}" maxlength="20"><i class="fa-solid fa-minus" name="${folder.fileCount}"></i>
                                                </div>
                                            </c:if>

                                        </c:if>
                                    </c:forEach>
                                        </div>
                                    </div>
                                    </c:if>
                                    </c:if>
                                             
                                    <c:if test="${fn:split(realOrder, ',')[1] == 1}"> 
                                    <c:if test="${categoryOrder.album != -1}"> 
                                        <div class="album">
                                            <div class="categoryArea" name="2">
                                                <span class="menuTitle">사진첩</span><i class="fa-solid fa-plus"></i>
                                            </div>
                                            <div class="subCategoryArea" id="sortable3">
                                        <c:forEach var="folder" items="${folderList}">
                                            <c:if test="${folder.boardTypeNo == 2}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input  class="folderTitle" value='${folder.folderName}'  name="${folder.folderNo}" id="${folder.fileCount}" maxlength="20"><i class="fa-solid fa-minus" name="${folder.fileCount}"></i>
                                                </div>   
                                            </c:if>          
                                        </c:forEach>
                                            </div>
                                        </div>
                                    </c:if> 
                                    </c:if> 

                                   <c:if test="${fn:split(realOrder, ',')[2] == 1}"> 
                                    <c:if test="${categoryOrder.video != -1}">
                                        <div class="video">
                                            <div class="categoryArea" name="3">
                                                <span class="menuTitle">동영상</span><i class="fa-solid fa-plus"></i>
                                            </div>
                                            <div class="subCategoryArea" id="sortable4">
                                        <c:forEach var="folder" items="${folderList}">
                                            <c:if test="${folder.boardTypeNo == 3}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input  class="folderTitle" value='${folder.folderName}' name="${folder.folderNo}" id="${folder.fileCount}" maxlength="20"><i class="fa-solid fa-minus" name="${folder.fileCount}"></i>
                                                </div>
                                            </c:if>
                                        </c:forEach>
                                            </div>
                                        </div>
                                    </c:if>
                                    </c:if>

                                    <c:if test="${fn:split(realOrder, ',')[3] == 1}"> 
                                    <c:if test="${categoryOrder.guestBook != -1}"> 
                                        <div class="guestBook">
                                            <div class="categoryArea" name="4">
                                                <span class="menuTitle">방명록</span>
                                            </div>
                                        </div>
                                    </c:if>            
                                    </c:if>            

<%-- ---------------------------------------------------------------------------------------------------- --%>
                                    <c:if test="${fn:split(realOrder, ',')[0] == 2}"> 
                                    <c:if test="${categoryOrder.diary != -1}"> 
                                        <div class="diary" >
                                            <div class="categoryArea" name="1">
                                                <span class="menuTitle">다이어리</span><i class="fa-solid fa-plus"></i>
                                            </div>
                                            <div class="subCategoryArea" id="sortable2">
                                    <c:forEach var="folder" items="${folderList}">
                                        <c:if test="${folder.boardTypeNo == 1}">
                                            <c:if test="${folder.folderName == '나의 월간달력'}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input class="folderTitle" value='${folder.folderName}'  name="${folder.folderNo}" id="${folder.fileCount}"  maxlength="20" disabled>
                                                </div>
                                            </c:if>
                                            <c:if test="${folder.folderName != '나의 월간달력'}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input class="folderTitle" value='${folder.folderName}'  name="${folder.folderNo}" id="${folder.fileCount}" maxlength="20"><i class="fa-solid fa-minus" name="${folder.fileCount}"></i>
                                                </div>
                                            </c:if>

                                        </c:if>
                                    </c:forEach>
                                        </div>
                                    </div>
                                    </c:if>
                                    </c:if>
                                             
                                     <c:if test="${fn:split(realOrder, ',')[1] == 2}"> 
                                    <c:if test="${categoryOrder.album != -1}"> 
                                        <div class="album">
                                            <div class="categoryArea" name="2">
                                                <span class="menuTitle">사진첩</span><i class="fa-solid fa-plus"></i>
                                            </div>
                                            <div class="subCategoryArea" id="sortable3">
                                        <c:forEach var="folder" items="${folderList}">
                                            <c:if test="${folder.boardTypeNo == 2}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input  class="folderTitle" value='${folder.folderName}'  name="${folder.folderNo}" id="${folder.fileCount}" 
                                                    maxlength="20"><i class="fa-solid fa-minus" name="${folder.fileCount}"></i>
                                                </div>   
                                            </c:if>          
                                        </c:forEach>
                                            </div>
                                        </div>
                                    </c:if> 
                                    </c:if> 

                                     <c:if test="${fn:split(realOrder, ',')[2] == 2}"> 
                                    <c:if test="${categoryOrder.video != -1}">
                                        <div class="video">
                                            <div class="categoryArea" name="3">
                                                <span class="menuTitle">동영상</span><i class="fa-solid fa-plus"></i>
                                            </div>
                                            <div class="subCategoryArea" id="sortable4">
                                        <c:forEach var="folder" items="${folderList}">
                                            <c:if test="${folder.boardTypeNo == 3}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input  class="folderTitle" value='${folder.folderName}' name="${folder.folderNo}" id="${folder.fileCount}" 
                                                    maxlength="20"><i class="fa-solid fa-minus" name="${folder.fileCount}"></i>
                                                </div>
                                            </c:if>
                                        </c:forEach>
                                            </div>
                                        </div>
                                    </c:if>
                                    </c:if>

                                     <c:if test="${fn:split(realOrder, ',')[3] == 2}"> 
                                    <c:if test="${categoryOrder.guestBook != -1}"> 
                                        <div class="guestBook">
                                            <div class="categoryArea" name="4">
                                                <span class="menuTitle">방명록</span>
                                            </div>
                                        </div>
                                    </c:if>            
                                    </c:if>            

<%-- ---------------------------------------------------------------------------------------------------- --%>
                                    <c:if test="${fn:split(realOrder, ',')[0] == 3}"> 
                                    <c:if test="${categoryOrder.diary != -1}"> 
                                        <div class="diary" >
                                            <div class="categoryArea" name="1">
                                                <span class="menuTitle">다이어리</span><i class="fa-solid fa-plus"></i>
                                            </div>
                                            <div class="subCategoryArea" id="sortable2">
                                    <c:forEach var="folder" items="${folderList}">
                                        <c:if test="${folder.boardTypeNo == 1}">
                                            <c:if test="${folder.folderName == '나의 월간달력'}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input class="folderTitle" value='${folder.folderName}'  name="${folder.folderNo}" id="${folder.fileCount}" 
                                                    maxlength="20" disabled>
                                                </div>
                                            </c:if>
                                            <c:if test="${folder.folderName != '나의 월간달력'}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input class="folderTitle" value='${folder.folderName}'  name="${folder.folderNo}" id="${folder.fileCount}" 
                                                    maxlength="20"><i class="fa-solid fa-minus" name="${folder.fileCount}"></i>
                                                </div>
                                            </c:if>

                                        </c:if>
                                    </c:forEach>
                                        </div>
                                    </div>
                                    </c:if>
                                    </c:if>
                                             
                                    <c:if test="${fn:split(realOrder, ',')[1] == 3}"> 
                                    <c:if test="${categoryOrder.album != -1}"> 
                                        <div class="album">
                                            <div class="categoryArea" name="2">
                                                <span class="menuTitle">사진첩</span><i class="fa-solid fa-plus"></i>
                                            </div>
                                            <div class="subCategoryArea" id="sortable3">
                                        <c:forEach var="folder" items="${folderList}">
                                            <c:if test="${folder.boardTypeNo == 2}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input  class="folderTitle" value='${folder.folderName}'  name="${folder.folderNo}" id="${folder.fileCount}" 
                                                    maxlength="20"><i class="fa-solid fa-minus" name="${folder.fileCount}"></i>
                                                </div>   
                                            </c:if>          
                                        </c:forEach>
                                            </div>
                                        </div>
                                    </c:if> 
                                    </c:if> 

                                    <c:if test="${fn:split(realOrder, ',')[2] == 3}"> 
                                    <c:if test="${categoryOrder.video != -1}">
                                        <div class="video">
                                            <div class="categoryArea" name="3">
                                                <span class="menuTitle">동영상</span><i class="fa-solid fa-plus"></i>
                                            </div>
                                            <div class="subCategoryArea" id="sortable4">
                                        <c:forEach var="folder" items="${folderList}">
                                            <c:if test="${folder.boardTypeNo == 3}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input  class="folderTitle" value='${folder.folderName}' name="${folder.folderNo}" id="${folder.fileCount}" 
                                                    maxlength="20"><i class="fa-solid fa-minus" name="${folder.fileCount}"></i>
                                                </div>
                                            </c:if>
                                        </c:forEach>
                                            </div>
                                        </div>
                                    </c:if>
                                    </c:if>

                                    <c:if test="${fn:split(realOrder, ',')[3] == 3}"> 
                                    <c:if test="${categoryOrder.guestBook != -1}"> 
                                        <div class="guestBook">
                                            <div class="categoryArea" name="4">
                                                <span class="menuTitle">방명록</span>
                                            </div>
                                        </div>
                                    </c:if>            
                                    </c:if>            

<%-- ---------------------------------------------------------------------------------------------------- --%>
                                    <c:if test="${fn:split(realOrder, ',')[0] == 4}"> 
                                    <c:if test="${categoryOrder.diary != -1}"> 
                                        <div class="diary" >
                                            <div class="categoryArea" name="1">
                                                <span class="menuTitle">다이어리</span><i class="fa-solid fa-plus"></i>
                                            </div>
                                            <div class="subCategoryArea" id="sortable2">
                                    <c:forEach var="folder" items="${folderList}">
                                        <c:if test="${folder.boardTypeNo == 1}">
                                            <c:if test="${folder.folderName == '나의 월간달력'}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input class="folderTitle" value='${folder.folderName}'  name="${folder.folderNo}" id="${folder.fileCount}" 
                                                    maxlength="20" disabled>
                                                </div>
                                            </c:if>
                                            <c:if test="${folder.folderName != '나의 월간달력'}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input class="folderTitle" value='${folder.folderName}'  name="${folder.folderNo}" id="${folder.fileCount}"  
                                                    maxlength="20"><i class="fa-solid fa-minus" name="${folder.fileCount}"></i>
                                                </div>
                                            </c:if>

                                        </c:if>
                                    </c:forEach>
                                        </div>
                                    </div>
                                    </c:if>
                                    </c:if>
                                             
                                    <c:if test="${fn:split(realOrder, ',')[1] == 4}"> 
                                    <c:if test="${categoryOrder.album != -1}"> 
                                        <div class="album">
                                            <div class="categoryArea" name="2">
                                                <span class="menuTitle">사진첩</span><i class="fa-solid fa-plus"></i>
                                            </div>
                                            <div class="subCategoryArea" id="sortable3">
                                        <c:forEach var="folder" items="${folderList}">
                                            <c:if test="${folder.boardTypeNo == 2}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input  class="folderTitle" value='${folder.folderName}'  name="${folder.folderNo}" id="${folder.fileCount}" 
                                                    maxlength="20"><i class="fa-solid fa-minus" name="${folder.fileCount}"></i>
                                                </div>   
                                            </c:if>          
                                        </c:forEach>
                                            </div>
                                        </div>
                                    </c:if> 
                                    </c:if> 

                                    <c:if test="${fn:split(realOrder, ',')[2] == 4}"> 
                                    <c:if test="${categoryOrder.video != -1}">
                                        <div class="video">
                                            <div class="categoryArea" name="3">
                                                <span class="menuTitle">동영상</span><i class="fa-solid fa-plus"></i>
                                            </div>
                                            <div class="subCategoryArea" id="sortable4">
                                        <c:forEach var="folder" items="${folderList}">
                                            <c:if test="${folder.boardTypeNo == 3}">
                                                <div class="subCategory" name="${folder.folderOrder}" id="${folder.folderNo}">
                                                    <img src="/resources/images/common/folder.png" class="subCategoryImg">
                                                    <input  class="folderTitle" value='${folder.folderName}' name="${folder.folderNo}" id="${folder.fileCount}" 
                                                    maxlength="20"><i class="fa-solid fa-minus" name="${folder.fileCount}"></i>
                                                </div>
                                            </c:if>
                                        </c:forEach>
                                            </div>
                                        </div>
                                    </c:if>
                                    </c:if>

                                    <c:if test="${fn:split(realOrder, ',')[3] == 4}"> 
                                    <c:if test="${categoryOrder.guestBook != -1}"> 
                                        <div class="guestBook">
                                            <div class="categoryArea" name="4">
                                                <span class="menuTitle">방명록</span>
                                            </div>
                                        </div>
                                    </c:if>            
                                    </c:if>            

<%-- ---------------------------------------------------------------------------------------------------- --%>
                               
                                </div>
                                <div class="home" >
                                    <div class="homeCategoryArea">
                                        <span class="menuTitle">관리</span>
                                    </div>
                                </div>
                            </div>
                            <div class="menuRightArea">
                                <div class="menuRightTitle">
                                    <p>폴더 내 게시글 조회</p>
                                </div>
                            <c:if test="${not empty fileList}"> 
                                <div class="menuRightContent">
                                    <div class="folderNameArea">
                                        <img src="/resources/images/common/folder.png" class="folderImg">
                                        <p class="folderName" id="${fileList[0].folderNo}">${fileList[0].folderName}(${fn:length(fileList)})</p>
                                    </div>
                                    <div class="fileList">
                                    <c:forEach var="file" items="${fileList}">
                                        <div class="myFile">
                                            <div class="myFileNameArea">
                                                <i class="fa-solid fa-file"></i>
                                                <c:if test="${fn:length(file.fileTitle) > 13}">
                                                    <p class="fileName" id="${file.fileNo}">${fn:substring(file.fileTitle, 0,13)}...</p>
                                                </c:if>
                                                <c:if test="${fn:length(file.fileTitle) <= 13}">
                                                    <p class="fileName" id="${file.fileNo}">${file.fileTitle}</p>
                                                </c:if>
                                            </div>
                                            <div class="fileUpdateBtnArea">
                                                <span class="whiteBtn fileDelBtn" id="${file.categoryNo}">삭제</span>
                                                <div  class="dropdown-btn">
                                                    <c:choose>
                                                        <c:when test="${file.openFlag == 1}">
                                                            <span class=" dropdown-btn-icon openStatus allOpen">전체공개</span>
                                                        </c:when>
                                                        <c:when test="${file.openFlag == 2}">
                                                            <span class=" dropdown-btn-icon openStatus friendOpen">깐부공개</span>
                                                        </c:when>
                                                        <c:when test="${file.openFlag == 3}">
                                                            <span class=" dropdown-btn-icon openStatus noOpen">비공개</span>
                                                        </c:when>
                                                    </c:choose>
                                                    <%-- dropdown --%>
                                                    <div class="dropdown">
                                                        <div>전체공개</div>
                                                        <div>깐부공개</div>
                                                        <div>비공개</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </c:forEach>    
                                    </div>
                                </div>
                            </c:if>
                            <c:if test="${empty fileList}"> 
                            <div class="menuRightContent">
                                폴더 아이콘을 더블클릭하면 게시글을 조회할 수 있습니다
                            </div>
                            </c:if>
                            </div> 
                        </div>
                        <div class="menuSaveArea">
                            <button class="whiteBtn" id="menuSaveBtn">변경사항 저장</button>
                            <span class="whiteBtn" id="menuCancelBtn">취소</span>
                        </div>

                        <%-- 카테고리 순서 정하는 input (value=정렬순서(숫자))--%>
                        <input type="hidden" name="diary" id="newDiaryOrder">
                        <input type="hidden" name="album" id="newAlbumOrder">
                        <input type="hidden" name="video" id="newVideoOrder">
                        <input type="hidden" name="guestBook" id="newGuestBookOrder">
                        <input type="hidden" name="memberNo" id="memberNo">

                        <%-- 폴더 순서 정하는 input(value로 폴더no + 구분자(,) String) --%>
                        <input type="hidden" name="diaryFolderOrder" id="diaryFolderOrder">
                        <input type="hidden" name="albumFolderOrder" id="albumFolderOrder">
                        <input type="hidden" name="videoFolderOrder" id="videoFolderOrder">
                        <input hidden="hidden" />
                    </form>

                </div>
            </div>

            <c:if test="${!empty message}">
                <script>
                    alert("${message}")
                </script>
                <c:remove var="message"></c:remove>
                <script>
                    window.parent.location.reload(); 
                </script>
            </c:if>
        </section>
    </div>
</body>
<script>
    const memberNo = "${loginMember.memberNo}";
    let diaryOrder = "${categoryOrder.diary}";
    let albumOrder = "${categoryOrder.album}";
    let videoOrder = "${categoryOrder.video}";
    let guestBookOrder = "${categoryOrder.guestBook}";
    const categoryOrder = "${categoryOrder}";
</script>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script> <%-- jquery --%>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script> <%-- jquery ui --%>
<script src="/resources/js/manage/menu.js"></script>
</html>