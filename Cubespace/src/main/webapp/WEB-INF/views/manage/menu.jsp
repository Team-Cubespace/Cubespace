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
    <link rel="stylesheet" href="/resources/css/common/checkBox.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/manage/manage.css">
    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
    <title></title>
    <style>
        .fa-minus{
            height: 20px;
            width: 20px;
            position:absolute;
            right: 0;
            top: 0px;

            display:flex;
            align-items: center;
            justify-content: center;
        }
        .fa-minus:hover{
            background-color: black;
            color: white;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="content-area">
        <section class="minihome-rayout">
                <div>
                    <jsp:include page="/WEB-INF/views/include/manageLeftBar.jsp"/>
                </div>
        </section>

        <section class="minihome-rayout">
            <main>
                <header>
                    <span class="rightTitle">메뉴 관리</span>
                </header>
                <div class="backgroundArea">
                    <div>
                        <div class="listTitle backgroundTitleArea">
                            <span class="backgroundTitle">상단메뉴 관리</span>
                            <div class="backgroundExplain">
                                <%-- <p></p> --%>
                                <p> 내 미니홈피 메뉴를 구성할수 있으며 최소 1개의 메뉴가 존재해야 합니다</p>
                            </div>
                        </div>
                        <div class="fontArea">
                            <div class="fontHeader menuHeader">
                                <div class="fontTitle">메뉴명</div>
                                <div class="fontUse">사용</div>
                                <div class="fontExample">설명</div>
                            </div>

                            <c:if test="${diary != null}">
                                <c:set var="diaryChecked" value="checked"></c:set>
                            </c:if>
                            <c:if test="${album != null}">
                                <c:set var="albumChecked" value="checked"></c:set>
                            </c:if>
                            <c:if test="${video != null}">
                                <c:set var="videoChecked" value="checked"></c:set>
                            </c:if>
                            <c:if test="${guestBook != null}">
                                <c:set var="guestBookChecked" value="checked"></c:set>
                            </c:if>

                            <div class="fontMain menuMain">
                                <div class="fontTitle">홈</div>
                                <div class="fontUse">
                                    <img class="useFontRadio checkedImg" src="/resources/images/common/checked.png">
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
                                    <img class="useFontRadio checkedImg" src="/resources/images/common/checked.png">
                                </div>
                                <div class="fontExample menuExample">다양한 설정을 변경하고 친구를 관리할 수 있습니다</div>
                            </div>
                        </div>
                    </div>
                    <div class="menuSaveArea">
                        <button class="whiteBtn" id="menuSelectBtn">변경사항 저장</button>
                        <button class="whiteBtn" id="menuSelectCancelBtn">원래대로</button>
                    </div>
                    <div>
                        <div class="listTitle backgroundTitleArea">
                            <span class="backgroundTitle">메뉴설정 변경</span>
                            <div class="backgroundExplain">
                                <p>메뉴 구성을 변경할 수 있으며 메뉴 하단에 폴더를 생성할 수 있습니다</p>
                            </div>
                        </div>
                        <div class="menuLeftRight">
                            <div class="menuLeftArea" >
                                <%-- <c:choose>
                                    <c:when></c:when>
                                </c:choose> --%>

                                <div class="home" >
                                    <div class="categoryArea homeCategoryArea">
                                        <span class="menuTitle">홈</span>
                                    </div>
                                </div>

                                <div class="menuListArea" id="sortable1">
                                <c:if test="${diary != -1}">
                                    <div class="diary">
                                        <div class="categoryArea" name="1">
                                            <span class="menuTitle">다이어리</span><%-- <i class="fa-solid fa-plus"></i> --%>
                                        </div>
                                        <div class="subCategoryArea" id="sortable2">
                                            <div class="subCategory" name="1">
                                                <img src="/resources/images/common/folder.png" class="subCategoryImg">&nbsp;
                                                <span class="folderTitle">나의 월간일정</span><%-- <i class="fa-solid fa-minus"></i> --%>
                                            </div>
                                            <div class="subCategory" name="2">
                                                <img src="/resources/images/common/folder.png" class="subCategoryImg">&nbsp;
                                                <span class="folderTitle">나의 다이어리</span><%-- <i class="fa-solid fa-minus"></i> --%>
                                            </div>
                                            <div class="subCategory" name="3">
                                                <img src="/resources/images/common/folder.png" class="subCategoryImg">&nbsp;
                                                <span class="folderTitle">나의 뭐시기기록장</span><%-- <i class="fa-solid fa-minus"></i> --%>
                                            </div>
                                        </div>
                                    </div>
                                </c:if>
                                <c:if test="${album != -1}">
                                    <div class="album">
                                        <div class="categoryArea" name="2">
                                            <span class="menuTitle">사진첩</span>
                                        </div>
                                        <div class="subCategoryArea" id="sortable3">
                                            <div class="subCategory" name="1">
                                                <img src="/resources/images/common/folder.png" class="subCategoryImg">&nbsp;
                                                <span  class="folderTitle">나의 사진첩</span>
                                            </div>
                                        </div>
                                    </div>
                                </c:if>
                                <c:if test="${video != -1}">
                                    <div class="video">
                                        <div class="categoryArea" name="3">
                                            <span class="menuTitle">동영상</span>
                                        </div>
                                        <div class="subCategoryArea" id="sortable4">
                                            <div class="subCategory" name="1">
                                                <img src="/resources/images/common/folder.png" class="subCategoryImg">&nbsp;
                                                <span  class="folderTitle">나의 동영상</span>
                                            </div>
                                        </div>
                                    </div>
                                </c:if>
                                <c:if test="${guestBook != -1}">
                                    <div class="guestBook">
                                        <div class="categoryArea" name="4">
                                            <span class="menuTitle">방명록</span>
                                        </div>
                                    </div>
                                </c:if>
                                </div>
                                <div class="home" >
                                    <div class="categoryArea homeCategoryArea">
                                        <span class="menuTitle">관리</span>
                                    </div>
                                </div>
                            </div>
                            <div class="menuRightArea">
                                <div class="menuRightTitle">폴더 추가, 삭제</div>
                                <div class="menuRightContent">

                                </div>
                            </div> 
                        </div>
                        <div class="menuSaveArea">
                            <button class="whiteBtn" id="menuSaveBtn">변경사항 저장</button>
                            <button class="whiteBtn" id="menuCancelBtn">취소</button>
                        </div>
                    </div>


                    

                </div>
            </main>
        </section>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script> <%-- jquery --%>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script> <%-- jquery ui --%>
<script src="/resources/js/manage/menu.js"></script>
</html>