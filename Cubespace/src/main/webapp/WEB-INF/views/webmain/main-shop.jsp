<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<c:set var="pagination" value = "${shopFontMap.pagination}"/>
<c:set var="shopFontList" value = "${shopFontMap.shopFontList}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cubespace</title>
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/style-web.css">
    <link rel="stylesheet" href="/resources/css/common/checkBox.css">
    <link rel="stylesheet" href="/resources/css/webmain/main-shopFont.css">

    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>

</head>
<body>
    <jsp:include page="/WEB-INF/views/include/font.jsp"/>
    <jsp:include page="/WEB-INF/views/include/header.jsp"/>
    <main>
        <div class="shop-main-frame">
            <div class="shop-header">
                <div class="shop-move">
                    <div class="shop-font"> 
                        <img class="cube-img" src="/resources/images/common/smallCube.png"> 
                        <a  >폰트</a> 
                    </div>
                    <div class="shop-music"> 
                        <img class="cube-img" src="/resources/images/common/smallCube.png"> 
                        <a >배경음악</a> 
                    </div>
                    <div class="shop-miniroom"> 
                        <img class="cube-img" src="/resources/images/common/smallCube.png"> 
                        <a >미니룸 소품</a> 
                    </div>
                </div>

                <div class="shop-search">
                    <img class="search-img" src="/resources/images/common/Magnifying Glass.png" alt="">
                    <input class="goods-search" type="text">
                    <div>검색</div>
                </div>
            </div>
            <div class="shop-rank-box"> <%-- 최신/인기 전체 --%>
                <div class="rank-choose"> <%-- 최신/인기 선택 --%>
                    <div id="newGoodsBox">
                        <i class="fa-sharp fa-solid fa-star"></i>
                        <div>최신폰트</div>
                    </div>
                    <div id="shopRankBox">
                        <i class="fa-solid fa-ranking-star"></i>
                        <div>인기랭킹</div>
                    </div>
                </div>

                <div class="shop-rank-lsit"> <%-- 최신/ 인기 목록 --%>
                    <%-- 생성되는 모양 --%>
                <%--<div class="goods">
                        <img class="new-img" src="/resources/images/common/shopNew2.png">
                        <div class="goods-example" style="font-family:'10'">우리들의 작은 공간 큐브스페이스에서 시작하세요</div>
                        <div class="goods-info">
                            <div class="goods-title">테스트용 폰트이름</div>
                            <div class="goods-producer">(주)KH_E조</div>
                            <div>
                                <div class="goods-count">사용횟수 : 1,000,000</div>
                                <div class="goods-holding">보유중</div>
                            </div>
                        </div>
                    </div> --%>
                </div>
            </div>
            <%----------------------------%>
            <div class="goods-list"> <%-- 상품 전체 목록 --%>

                <c:forEach var="shopList" items="${shopFontList}">
                
                    <div class="goods">
                        <div class="goods-example">우리들의 작은 공간 큐브스</div>
                        <div class="goods-info">
                            <div class="goods-title">${shopList.fontName}</div><%-- 상품이름 --%>
                            <div class="goods-producer">${shopList.fontCreater}</div><%-- 상품제작자 --%>
                            <div>
                                <div class="goods-count">사용횟수 : ${shopList.fontCount}</div> <%-- 사용횟수 --%>
                                
                                
                                
                                <div class="goods-btn" onclick="goodsAdd(${shopList.fontNo},shopCathNo,this)">사용하기</div>

                                
                                
                            </div>
                        </div>
                    </div>

                </c:forEach>


            </div>
            <%----------------------------%>
            <div class="pagination-area"> <%-- 페이징네이션 --%>
                <ul class="pagination">
                    <!-- 첫 페이지로 이동( <<) -->
                    <li><a href="/cubespace/shop?cp=1">&lt;&lt;</a></li>
                    <!-- 이전 목록 마지막 번호로 이동 ( < ) -->
                    <li><a href="/cubespace/shop?cp=${pagination.prevPage}">&lt;</a></li>
                    <!-- 특정 페이지로 이동 -->
                    <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                        <c:choose>
                            <c:when test="${i == pagination.currentPage}">
                                <!-- <%-- 현재 보고있는 페이지 --%> -->
                                <li><a class="current">${i}</a></li>
                            </c:when>
                            <c:otherwise>
                                <!-- <%-- 현재 페이지를 제외한 나머지 --%> -->
                                <li><a href="/cubespace/shop?cp=${i}">${i}</a></li>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                    <!-- 다음 목록 시작 번호로 이동 ( > )-->
                    <li><a href="/cubespace/shop?cp=${pagination.nextPage}">&gt;</a></li>
                    <!-- 끝 페이지로 이동 ( >> ) -->
                    <li><a href="/cubespace/shop?cp=${pagination.maxPage}">&gt;&gt;</a></li>
                </ul>
            </div>
        </div>

    </main>
    <script>
        let shopCathNo=1; // 상점 번호
    </script>
    <jsp:include page="/WEB-INF/views/include/footer.jsp"/>
    <script src="/resources/js/webmain/main-shopFont.js"></script>
    <script src="/resources/js/webmain/shop-common.js"></script>
</body>
</html>