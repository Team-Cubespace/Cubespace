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
    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
    <title></title>
</head>
<body>
    <div class="content-area">
        <section class="minihome-rayout">
            <jsp:include page="/WEB-INF/views/include/manageLeftBar.jsp"/>
        </section>

        <section class="minihome-rayout">
            <main>
                <header>
                    <span class="rightTitle">배경 설정</span>
                </header>
                <div class="backgroundArea">
                    <div>
                        <div class="listTitle backgroundTitleArea">
                            <span class="backgroundTitle">전체 배경설정</span>
                            <div class="backgroundExplain">
                                <p>미니홈피를 감싸는 회색 배경을 바꿀 수 있습니다</p>
                                <p>색상이나 원하는 이미지를 등록할 수 있습니다</p>
                            </div>
                        </div>
                
                        <div class="changeColorArea">
                            <div>
                                <label for="chooseBGColor" class="changeColorTitle">색상변경</label>
                                <input type="color" id="chooseBGColor" name="chooseBGColor" />
                                <span class="colorShow" id="bgColorShow"></span>
                            </div>
                            <div class="backgroundBtnArea">
                                <span class="whiteBtn" id="bgColorPreview">미리보기</span>
                                <span class="whiteBtn" id="bgColorUse">적용하기</span>
                                <span class="whiteBtn" id="bgColorReturn">원래대로</span>
                            </div>
                        </div>
                        <div class="changeImgArea">
                            <div>
                                <label for="chooseImg" class="changeColorTitle">이미지 변경</label>
                                <input type="file" id="chooseImg" name="chooseImg" accept="image/*" multiple/>
                            </div>
                            <div class="backgroundBtnArea">
                                <span class="whiteBtn" id="bgImagePreview">미리보기</span>
                                <span class="whiteBtn" id="bgImageUse">적용하기</span>
                                <span class="whiteBtn" id="bgImageReturn">원래대로</span>
                            </div>
                            
                        </div>
                        <img src="" alt="" id="imageShow">
                    </div>
                    <div>
                        <div class="listTitle backgroundTitleArea">
                            <span class="backgroundTitle">프레임 배경설정</span>
                            <div class="backgroundExplain">
                                <p >화면을 감싸는 프레임 색상을 바꿀 수 있습니다</p>
                            </div>
                        </div>
                        <div class="changeColorArea">
                            <div>
                                <label for="chooseFrameColor" class="changeColorTitle">색상변경</label>
                                <input type="color" id="chooseFrameColor" name="chooseFrameColor" />
                                <p class="colorShow" id="frameColorShow"></p>
                            </div>
                            <div class="backgroundBtnArea">
                                <span class="whiteBtn" id="framePreview">미리보기</span>
                                <span class="whiteBtn" id="frameUse">적용하기</span>
                                <span class="whiteBtn" id="frameReturn">원래대로</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </div>
</body>
<script src="/resources/js/manage/background.js"></script>
</html>