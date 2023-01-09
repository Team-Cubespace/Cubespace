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
    <link rel="stylesheet" href="/resources/css/minihome/miniroom/miniroom-decorating.css">
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
    <jsp:include page="/WEB-INF/views/include/allFontMusic.jsp"/>
</head>
<body>
    <div class="content-area">
        <section class="minihome-rayout">
            <jsp:include page="/WEB-INF/views/minihome/home/minihome-profile.jsp"/>
        </section>

        <section class="minihome-rayout">
            <div id="homeArea">
                <form method="POST" enctype="multipart/form-data" id="miniroomFrm">
                    <header class="miniroom-header">
                        <span><i class="fa-solid fa-wand-magic-sparkles"></i> 미니룸 꾸미기</span>
                    </header>

                    <div class="miniroom-container">
                        <div class="miniroom">
                            <div class="left"></div>
                            <div class="right"></div>
                            <div class="bottom"></div>
                        </div>
                    
                        <div class="tile-container">
                            <div class="empty" id="tile1"><div id="tileLocation1"></div></div>
                            <div class="empty" id="tile2"><div id="tileLocation2"></div></div>
                            <div class="empty" id="tile3"><div id="tileLocation3"></div></div>
                            <div class="empty" id="tile4"><div id="tileLocation4"></div></div>
                            <div class="empty" id="tile5"><div id="tileLocation5"></div></div>
                            <div class="empty" id="tile6"><div id="tileLocation6"></div></div>
                            <div class="empty" id="tile7"><div id="tileLocation7"></div></div>
                            <div class="empty" id="tile8"><div id="tileLocation8"></div></div>
                            <div class="empty" id="tile9"><div id="tileLocation9"></div></div>
                            <div class="empty" id="tile10"><div id="tileLocation10"></div></div>
                        </div>

                        <div class="dropdown">
                            <span id="moveBtn">이동하기</span>
                            <span id="removeBtn">삭제하기</span>
                        </div>
                    </div>

                    <div class="save-btn-container">
                        <button type="button" id="pictureBtn">미니룸 사진 저장</button>
                        <button type="button" id="saveBtn">현재 상태 저장</button>
                    </div>

                    <header>벽지</header>

                    <div class="wall-container">
                        <div class="wall-color-container">
                            <input type="color" id="inputWallColor">
                            <label for="inputWallColor" class="setting-btn" id="selectWallColor">색상변경</label>
                            <div id="wallColorPriview"></div>
                        </div>

                        <div class="wall-image-container">
                            <input type="file" id="inputWallImage">
                            <label for="inputWallImage" class="setting-btn" id="selectWallImage" accept="image/*">이미지변경</label>
                            <div class="pattern-container" id="wallPattern">
                                <input type="radio" class="wall-radio" name="wall" value="1">&nbsp;채우기
                                <input type="radio" class="wall-radio" name="wall" value="2">&nbsp;반복
                            </div>
                        </div>

                        <div class="btn-container">
                            <div class="setting-btn" id="rollbackWallBtn">원래대로</div>
                            <div class="setting-btn" id="eraseWallBtn">지우기</div>
                        </div>
                    </div>

                    <header>바닥</header>

                    <div class="floor-container">
                        <div class="floor-color-container">
                            <input type="color" id="inputFloorColor">
                            <label for="inputFloorColor" class="setting-btn" id="selectFloorColor">색상변경</label>
                            <div id="floorColorPriview"></div>
                        </div>

                        <div class="floor-image-container">
                            <input type="file" id="inputFloorImage" accept="image/*">
                            <label for="inputFloorImage" class="setting-btn" id="selectFloorImage">이미지변경</label>
                            <div class="pattern-container" id="floorPattern">
                                <input type="radio" class="floor-radio" name="floor" value="1">&nbsp;채우기
                                <input type="radio" class="floor-radio" name="floor" value="2">&nbsp;반복
                            </div>
                        </div>

                        <div class="btn-container">
                            <div class="setting-btn" id="rollbackFloorBtn">원래대로</div>
                            <div class="setting-btn" id="eraseFloorBtn">지우기</div>
                        </div>
                    </div>

                    <header class="goods-header">
                        <span>미니미 & 소품</span>
                        <span class="select-container">
                            <span id="selectMinimee">미니미</span><span>|</span><span id="selectGoods">소품</span>
                        </span>
                    </header>

                    <div class="goods-container">
                        <!-- <div class="goods-list">
                            <div class="goods-info goods-info-right">
                                <img src="/resources/miniroomGoods/miniroom-bear.png" class="goods-img">
                                <div title="곰도리" class="goods-name">곰도리</div>
                                <div class="goods-btn">
                                    <button class="move-goods-btn">배치</button>
                                    <button class="delete-goods-btn">삭제</button>
                                </div>
                            </div>
                        </div> -->

                        <%-- <div class="no-goods">보유한 소품이 없습니다&nbsp;<i class="fa-solid fa-face-sad-tear"></i></div> --%>
                    </div>

                    <!-- <div class="page-container">
                        <a href="#" class="page"><i class="fa-solid fa-angle-left"></i></a>
                        <a href="#" class="page current">1</a>
                        <a href="#" class="page">2</a>
                        <a href="#" class="page"><i class="fa-solid fa-angle-right"></i></a>
                    </div> -->

                    <input type="hidden" name="wallFlag" id="wallFlag" value="N">
                    <input type="hidden" name="floorFlag" id="floorFlag" value="N">
                </form>
            </div>
        </section>
    </div>
</body>

<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script> 
<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
<script src="/resources/js/minihome/miniroom/miniroom.js"></script>
<script src="/resources/js/minihome/miniroom/miniroom-fill.js"></script>
<script src="/resources/js/minihome/include/minihome-common.js"></script>
</html>