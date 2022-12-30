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
            
            <div class="shop-rank-box">
                <div class="rank-choose">
                    <div id="newGoodsBox">
                        <i class="fa-sharp fa-solid fa-star"></i>
                        <div>최신폰트</div>
                    </div>
                    <div id="shopRankBox">
                        <i class="fa-solid fa-ranking-star"></i>
                        <div>인기랭킹</div>
                    </div>
                </div>
                <div class="shop-rank-lsit">
                    <%-- 최신폰트/인기랭킹 --%>
                    <div class="goods">
                        <img class="new-img" src="/resources/images/common/shopNew2.png" alt="">
                        <div class="goods-example" style="font-family:'10'">우리들의 작은 공간 큐브스페이스에서 시작하세요</div>
                        <div class="goods-info">
                            <div class="goods-title">${font.fontName}테스트용 폰트이dddddddddddddddddddd름</div>
                            <div class="goods-producer">(주)KH_E조</div>
                            <div>
                                <div class="goods-count">사용횟수 : 1,000,000</div>
                                <div class="goods-holding">보유중</div>
                            </div>
                        </div>
                    </div>

                    <div class="goods">
                        <img class="rank-img" src="/resources/images/crown.png" alt="">
                        <div class="goods-example">우리들의 작은 공간 큐브스</div>
                        <div class="goods-info">
                            <div class="goods-title">테스트용 폰트이름</div>
                            <div class="goods-producer">(주)KH_E조</div>
                            <div>
                                <div class="goods-count">사용횟수 : 1,000,000</div>
                                <div class="goods-btn"onclick="return openMinihome(폰트번호,this)>사용하기</div>
                            </div>
                        </div>
                    </div>
                    <div class="goods">
                        <img class="rank-img" src="/resources/images/crown.png" alt="">
                        <div class="goods-example">우리들의 작은 공간 큐브스</div>
                        <div class="goods-info">
                            <div class="goods-title">테스트용 폰트이름</div>
                            <div class="goods-producer">(주)KH_E조</div>
                            <div>
                                <div class="goods-count">사용횟수 : 1,000,000</div>
                                <button class="goods-btn">사용하기</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="goods-list">
<!---------------------------------------------------------->

                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>
                <div class="goods">
                    <div class="goods-example">우리들의 작은 공간 큐브스</div>
                    <div class="goods-info">
                        <div class="goods-title">테스트용 폰트이름</div>
                        <div class="goods-producer">(주)KH_E조</div>
                        <div>
                            <div class="goods-count">사용횟수 : 1,000,000</div>
                            <button class="goods-btn">사용하기</button>
                        </div>
                    </div>
                </div>

<!--------------------------------------------->
            </div>

            <div class="pagination-area">
                <ul class="pagination">
                    <!-- 첫 페이지로 이동( <<) -->
                    <li><a href="/board/${boardCode}">&lt;&lt;</a></li>
                    <!-- 이전 목록 마지막 번호로 이동 ( < ) -->
                    <li><a href="/board/${boardCode}?cp=${pagination.prevPage}">&lt;</a></li>
                    <!-- 특정 페이지로 이동 -->
                    <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                        <c:choose>
                            <c:when test="${i == pagination.currentPage}">
                                <!-- <%-- 현재 보고있는 페이지 --%> -->
                                <li><a class="current">${i}</a></li>
                            </c:when>
                            <c:otherwise>
                                <!-- <%-- 현재 페이지를 제외한 나머지 --%> -->
                                <li><a href="/board/${boardCode}?cp=${i}">${i}</a></li>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                    <!-- 다음 목록 시작 번호로 이동 ( > )-->
                    <li><a href="/board/${boardCode}?cp=${pagination.nextPage}">&gt;</a></li>
                    <!-- 끝 페이지로 이동 ( >> ) -->
                    <li><a href="/board/${boardCode}?cp=${pagination.maxPage}">&gt;&gt;</a></li>
                </ul>
            </div>
        </div>

    </main>
    <script>
        let shopCathNo=1;
    </script>
    <jsp:include page="/WEB-INF/views/include/footer.jsp"/>
    <script src="/resources/js/webmain/main-shopFont.js"></script>
</body>
</html>