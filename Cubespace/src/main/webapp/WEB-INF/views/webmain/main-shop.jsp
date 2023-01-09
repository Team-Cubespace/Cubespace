<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<c:set var="pagination" value = "${shopMap.pagination}"/>
<c:set var="shopGoodsList" value = "${shopMap.shopGoodsList}"/>
<c:set var="shopCt" value = "${shopMap.shopCt}"/>

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
    <link rel="stylesheet" href="/resources/css/webmain/main-shop.css">

    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>

</head>
<body>
    <jsp:include page="/WEB-INF/views/include/allFontMusic.jsp"/>
    <jsp:include page="/WEB-INF/views/include/header.jsp"/>
    <jsp:include page="/WEB-INF/views/webmain/MiniMusicPlayer.jsp"/>

    <main>
        <c:if test="${not empty param.shopSearch}">
            <c:set var = "sURL" value = "&shopSearch=${param.shopSearch}"></c:set>
        </c:if>
    
        <div class="shop-main-frame">
            <div class="shop-header">
                <div class="shop-move">
                    <a href="/cubespace/shop/1" class="shop-font"> 
                        <img class="cube-img" src="/resources/images/common/smallCube.png"> 
                        <div>폰트</div> 
                    </a>
                    <a href="/cubespace/shop/2" class="shop-music"> 
                        <img class="cube-img" src="/resources/images/common/smallCube.png"> 
                        <div >배경음악</div> 
                    </a>
                    <a href="/cubespace/shop/3" class="shop-miniroom"> 
                        <img class="cube-img" src="/resources/images/common/smallCube.png"> 
                        <div>미니룸 소품</div> 
                    </a>
                </div>
                <%-- 검색기능 --%>
                <form class="shop-search" onsubmit="return true">
                    <img class="search-img" src="/resources/images/common/Magnifying Glass.png">
                    <input class="goods-search" type="text" name="shopSearch" id="shopSearch">
                    <button>검색</button>
                </form>
            </div>
            <div class="shop-rank-box"> <%-- 최신/인기 전체 --%>
                <div class="rank-choose"> <%-- 최신/인기 선택 --%>
                    <div id="newGoodsBox">
                        <i class="fa-sharp fa-solid fa-star"></i>
                        <div>최신상품</div>
                    </div>
                    <div id="shopRankBox">
                        <i class="fa-solid fa-ranking-star"></i>
                        <div>인기랭킹</div>
                    </div>
                </div>
                <div class="shop-rank-lsit"> <%-- 최신/ 인기 목록 --%>
                    <%-- 생성되는 모양 --%>
                    <%-- <div class="goods">
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
                <c:choose>
                    <c:when test="${empty shopGoodsList}">
                        <div class="not-search">검색결과가 존재하지 않습니다.</div>
                    </c:when>
                    <c:otherwise>
                        <c:forEach var="shopList" items="${shopGoodsList}" varStatus="vs">
                            <div class="goods">
                                <c:choose>
                                    <%-- 폰트 페이지 예시화면 --%>
                                    <c:when test="${shopCt==1}">
                                        <div class="goods-example" style="font-family:'${shopList.goodsNo}'">우리들의 작은 공간 큐브스페이스에서 시작하세요</div>
                                    </c:when>
                                    <%-- 배경음악 페이지 예시화면 --%>
                                    <c:when test="${shopCt==2}">
                                        <div class="goods-example goods-lpimg" onclick="MusicPlayerOpen(${vs.index})">
                                            <img class="goods-exampleimg-music" src="${shopList.goodsImagePath}">
                                        </div>    
                                    </c:when>
                                    <%-- 소품 페이지 예시화면 --%>
                                    <c:otherwise>
                                        <div class="goods-example" >
                                            <img class="goods-exampleimg-miniroom" src="${shopList.goodsPath}">
                                        </div>   
                                    </c:otherwise>
                                </c:choose>
                                <div class="goods-info">
                                    <div class="goods-title">${shopList.goodsName}</div><%-- 상품이름 --%>
                                    <div class="goods-producer">${shopList.goodsCreater}</div><%-- 상품제작자 --%>
                                    <div>
                                        <div class="goods-count">사용횟수 : ${shopList.goodsCount}</div> <%-- 사용횟수 --%>
                                        <c:choose>
                                            <c:when test="${shopList.useGoodsNo!=shopList.goodsNo}">
                                                <div class="goods-btn goods_${shopList.goodsNo}" onclick="goodsAdd(${shopList.goodsNo},shopCathNo,this)">사용하기</div>
                                            </c:when>
                                            <c:otherwise>
                                                <div class="goods-holding">보유중</div>
                                            </c:otherwise>
                                        </c:choose>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </c:otherwise>
                </c:choose>

            </div>
            <%----------------------------%>
            <div class="pagination-area"> <%-- 페이징네이션 --%>
                <ul class="pagination">
                    <!-- 첫 페이지로 이동( <<) -->
                    <li><a href="/cubespace/shop/1?cp=1${sURL}">&lt;&lt;</a></li>
                    <!-- 이전 목록 마지막 번호로 이동 ( < ) -->
                    <li><a href="/cubespace/shop/${shopCt}?cp=${pagination.prevPage}${sURL}">&lt;</a></li>
                    <!-- 특정 페이지로 이동 -->
                    <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                        <c:choose>
                            <c:when test="${i == pagination.currentPage}">
                                <!-- <%-- 현재 보고있는 페이지 --%> -->
                                <li><a class="current">${i}</a></li>
                            </c:when>
                            <c:otherwise>
                                <!-- <%-- 현재 페이지를 제외한 나머지 --%> -->
                                <li><a href="/cubespace/shop/${shopCt}?cp=${i}${sURL}">${i}</a></li>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                    <!-- 다음 목록 시작 번호로 이동 ( > )-->
                    <li><a href="/cubespace/shop/${shopCt}?cp=${pagination.nextPage}${sURL}">&gt;</a></li>
                    <!-- 끝 페이지로 이동 ( >> ) -->
                    <li><a href="/cubespace/shop/${shopCt}?cp=${pagination.maxPage}${sURL}">&gt;&gt;</a></li>
                </ul>
            </div>
        </div>
    </main>
    <script>
        const currentPage = '${param.cp}';
        let shopCathNo;

        if(${shopCt != null}){
        shopCathNo=  ${shopCt};
        } else {
            shopCathNo = 1; 
        }
    </script>
    <jsp:include page="/WEB-INF/views/include/footer.jsp"/>
    <script src="/resources/js/webmain/main-shop.js"></script>
    <script src="/resources/js/webmain/shop-common.js"></script>
    <%-- 재생플레이어 js --%>
    <script src="/resources/js/webmain/MiniMusicPlayer.js"></script>

</body>
</html>