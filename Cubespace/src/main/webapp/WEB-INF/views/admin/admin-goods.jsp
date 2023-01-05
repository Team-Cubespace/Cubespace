<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<c:set var="pagination" value="${map.pagination}"/>
<c:set var="goodsList" value="${map.goodsList}"/>
<c:set var="allGoodsCount" value="${map.allGoodsCount}"/>
<c:set var="listCount" value="${map.listCount}"/>

<c:set var="sURL" value="sort=${param.sort}&key=${param.key}&query=${param.query}"/>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cubespace</title>
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/common/header.css">
    <link rel="stylesheet" href="/resources/css/common/footer.css">
    <link rel="stylesheet" href="/resources/css/admin/admin-allGoods.css">
    <link rel="stylesheet" href="/resources/css/admin/admin-goods.css">

    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>

    </head>
    <body>
        <main>
            
            <jsp:include page="/WEB-INF/views/include/header.jsp" />

            <p class="otherPageBtn">
                <a  href="/admin/member">회원관리 페이지</a>
                <a  href="/admin/complain">신고관리 페이지</a>
            </p>
            <section class="category-lists">
                <a href = "/admin/goods/font" class="detail link-member ">폰트</a>
                <a href = "/admin/goods/music" class="detail link-product">배경음악</a>
                <a href = "/admin/goods/goods" class="detail link-product activate">소품</a>
            </section>

            <section class="main-class">
                <div class="member-title">
                    <h3>소품 리스트</h3>
                    <div>
                        <button id="fontAddBtn">+ 소품 등록</button>
                    </div>
                </div>


                <form id="frmSearchBase" method="get" class="member-search" action="/admin/goods/goods">
                    <input type="hidden" name="sort" id="orderInput" value = "1">
                    <p class="search__title">소품 검색</p>
                    <div class="search-detail-box form-inline">
                        <div class="search-detail-div">
                            <div class="search-detail-keyword">소품 이름 검색</div>
                            <div class="search-detail-select-box">
                                <input type="text" name="goodsName" class="form-control" value="${param.goodsName}">
                            </div>
                        </div>
                    </div>
                    <div class="table-btn">
                        <input type="submit" value="검색" class="btn btn-lg btn-black js-search-button">
                    </div>
                </form>

                <div class="selectBox">

                    <c:set var="order1" value="selected"/>
                    <c:if test="${param.sort == '2'}">
                        <c:set var="order2" value="selected"></c:set>
                        <c:set var="order1" value=""/>
                    </c:if>
                    <c:if test="${param.sort == '3'}">
                        <c:set var="order3" value="selected"></c:set>
                        <c:set var="order1" value=""/>
                    </c:if>
                    <c:if test="${param.sort == '4'}">
                        <c:set var="order4" value="selected"></c:set>
                        <c:set var="order1" value=""/>
                    </c:if>

                    


                    <select onchange="orderBy()" id="order">
                        <option value="order1" ${order1}>등록일 빠른순</option>
                        <option value="order2" ${order2}>등록일 느린순</option>
                        <option value="order3" ${order3}>사용횟수 많은순</option>
                        <option value="order4" ${order4}>사용횟수 적은순</option>
                    </select>
                </div>

                <div class="pull-left">
                    검색
                    <strong>${listCount}</strong>
                    개 / 전체
                    <strong>${allGoodsCount}</strong>
                    개
                </div>

                
                
                <div class="search-result-area">
                    <div class="search-result-div" id="goodsNo">
                        <div class="search-result-tab">번호</div>
                        <c:forEach var="goods" items="${goodsList}">
                            <div class="search-content">${goods.goodsNo}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div"  id="email">
                        <div class="search-result-tab">소품 이름</div>
                        <c:forEach var="goods" items="${goodsList}">
                            <div class="search-content">${goods.goodsName}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="nickname">
                        <div class="search-result-tab">소품 예시</div>
                        <c:forEach var="goods" items="${goodsList}">
                            <img class="search-content" src="${goods.goodsPath}">
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="signDate">
                        <div class="search-result-tab">제작자</div>
                        <c:forEach var="goods" items="${goodsList}">
                            <div class="search-content">${goods.goodsCreater}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="signDate">
                        <div class="search-result-tab">사용횟수</div>
                        <c:forEach var="goods" items="${goodsList}">
                            <div class="search-content">${goods.goodsUseCount}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="signDate">
                        <div class="search-result-tab">삭제하기</div>
                        <c:forEach var="goods" items="${goodsList}">
                            <div class="search-content deleteGoods" name="${goods.goodsNo}">삭제</div>
                        </c:forEach>
                    </div>
                </div>



                <%-- 소품 등록------------------------------------------- --%>
                <div class="popup_layer" id="popup_layer2" style="display: none;">
                    <div class="popup_box scroll">
                        <div style="height: 10px; width: 500px; float: top;">
                            <a href="javascript:closePop2();"><i class="fa-solid fa-x allClose"></i></a>
                        </div>
                        <!--팝업 컨텐츠 영역-->
                        <div class="popup_cont">
                            <div class="payRemainArea">
                                <h1><span>소품 등록</span></h1>
                            </div>

                            <form action="/admin/goods/insertGoods" method="post" name="signUp-frm" id="signUp-frm" enctype="multipart/form-data">
                                <div>
                                    <!-- 소품 이름 -->
                                    <div class="signUp-input-Email textbox">
                                        <p>소품 이름</p>
                                        <input  type="text" name="goodsName"  class="inputBox" id="goodsName" 
                                            placeholder="소품 이름"  autocomplete="off" />
                                    </div>
                                    
                                    <!-- 소품 경로 -->
                                    <div class="signUp-input-password textbox">
                                        <p>소품 경로</p>        
                                        <input type="file"  name="goodsPathFile"  class="inputBox" id="goodsPathFile"  />
                                    </div>
                                    

                                    <!-- 소품 제작자 -->
                                    <div class="signUp-input-Nickname textbox">
                                        <p>소품 제작자</p>
                                        <input type="text" name="goodsCreater" class="inputBox"  id="goodsCreater"
                                            placeholder="소품 제작자" />
                                    </div>
                                </div>
                                <div class="SignUpAgreement6">
                                    <button class="SignUp" id="signUpBtn">소품 등록 완료</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <%-- ------------------------------------------- --%>
                <div class="pagination-area">
                    <ul class="pagination">
                    
                        <!-- 첫 페이지로 이동( <<) -->
                        <li><a href="/admin/goods/goods?${sURL}">&lt;&lt;</a></li>

                        <!-- 이전 목록 마지막 번호로 이동 ( < ) -->
                        <li><a href="/admin/goods/goods?cp=${pagination.prevPage}&${sURL}">&lt;</a></li>

                        
                        <!-- 특정 페이지로 이동 -->
                        <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                            <c:choose>
                                <c:when test="${i == pagination.currentPage}">
                                    <%-- 현재 보고있는 페이지 --%>
                                    <li><a class="current">${i}</a></li>
                                </c:when>
                                <c:otherwise>
                                    <%-- 현재 페이지를 제외한 나머지 --%>
                                    <li><a href="/admin/goods/goods?cp=${i}&${sURL}">${i}</a></li>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                        
                        <!-- 다음 목록 시작 번호로 이동 ( > )-->
                        <li><a href="/admin/goods/goods?cp=${pagination.nextPage}&${sURL}">&gt;</a></li>

                        <!-- 끝 페이지로 이동 ( >> ) -->
                        <li><a href="/admin/goods/goods?cp=${pagination.maxPage}&${sURL}">&gt;&gt;</a></li>

                    </ul>
                </div>
            </section>
        </main>
        <jsp:include page="/WEB-INF/views/include/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
        <script src="/resources/js/admin/admin-goods.js"></script>
    </body>
</html>



