<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<c:set var="pagination" value="${map.pagination}"/>
<c:set var="memberList" value="${map.memberList}"/>
<c:set var="allMemberCount" value="${map.allMemberCount}"/>
<c:set var="listCount" value="${map.listCount}"/>

<c:set var="sURL" value="sort=${param.sort}&key=${param.key}&query=${param.query}&isBlock=${param.isBlock}&isDelete=${param.isDelete}&calanderBefore=${param.calanderBefore}&calanderAfter=${param.calanderAfter}"/>



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
    <link rel="stylesheet" href="/resources/css/admin/admin-font.css">
    <link rel="stylesheet" href="/resources/css/admin/admin-member.css">
    <link rel="stylesheet" href="/resources/css/admin/admin-all.css">

    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>

    </head>
    <body>
        <main>
            
            <jsp:include page="/WEB-INF/views/include/header.jsp" />

            <section class="category-lists">
                <a href = "/admin/goods/font" class="detail link-member activate">폰트 등록</a>
                <a href = "/admin/goods/music" class="detail link-product">배경음악 등록</a>
                <a href = "/admin/goods/goods" class="detail link-product">소품 등록</a>
            </section>

            <section class="main-class">
                <div class="member-title">
                    <h3>폰트 리스트</h3>
                    <div>
                        <button id="fontAddBtn">+ 폰트 등록</button>
                    </div>
                </div>


                <form id="frmSearchBase" method="get" class="member-search" action="/manager/memberSearch">
                    <input type="hidden" name="sort" id="orderInput">
                    <p class="search__title">폰트 검색</p>
                    <div class="search-detail-box form-inline">
                        <div class="search-detail-div">
                            <div class="search-detail-keyword">검색어</div>
                            <div class="search-detail-select-box">
                                <select name="key" id="key" class="form-control">


                                <c:if test="${param.key == 'email'}">
                                    <c:set var="emailChk" value="selected"></c:set>
                                </c:if>
                                    
                                <option value="email" ${emailChk} >폰트 이름</option>
                                        
                                        
                                </select>
                                <input type="text" name="query" class="form-control" value="${param.query}">
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
                        <option value="order1" ${order1}>사용횟수 많은순</option>
                        <option value="order2" ${order2}>사용횟수 적은순</option>
                        <option value="order3" ${order3}>등록일 빠른순</option>
                        <option value="order4" ${order4}>등록일 느린순</option>
                    </select>
                </div>

                <div class="pull-left">
                    검색
                    <strong>${listCount}</strong>
                    명 / 전체
                    <strong>${allMemberCount}</strong>
                    개
                </div>

                
                
                <div class="search-result-area">
                    <div class="search-result-div" id="number">
                        <div class="search-result-tab">번호</div>
                        <c:forEach var="font" items="${fontList}">
                            <div class="search-content">${font.fontNo}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div"  id="email">
                        <div class="search-result-tab">폰트 이름</div>
                        <c:forEach var="font" items="${fontList}">
                            <div class="search-content">${font.fontName}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="nickname">
                        <div class="search-result-tab">폰트 예시</div>
                        <c:forEach var="font" items="${fontList}">
                            <%-- form태그 말고 다른 형식으로 수정해야함 --%>
                            <form method="post" class="seller" onsubmit="return false;">
                                <span class="search-content sellerPage">우리들의 작은 공간 큐브스페이스에서 시작하세요</span>
                                <input type="hidden" name="sellerNo" value="">
                            </form>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="signDate">
                        <div class="search-result-tab">폰트 제작자</div>
                        <c:forEach var="font" items="${fontList}">
                            <div class="search-content">${font.fontCreater}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="signDate">
                        <div class="search-result-tab">폰트 사용횟수</div>
                        <c:forEach var="font" items="${fontList}">
                            <div class="search-content">${font.fontCount}</div>
                        </c:forEach>
                    </div>
                </div>



                <%-- 폰트 등록------------------------------------------- --%>
                <div class="popup_layer" id="popup_layer2" style="display: none;">
                    <div class="popup_box scroll">
                        <div style="height: 10px; width: 500px; float: top;">
                            <a href="javascript:closePop2();"><i class="fa-solid fa-x allClose"></i></a>
                        </div>
                        <!--팝업 컨텐츠 영역-->
                        <div class="popup_cont">
                            <div class="payRemainArea">
                                <h1><span>폰트 등록</span></h1>
                            </div>

                            <form  method="get" name="signUp-frm" id="signUp-frm" onsubmit="return false">
                                <div>
                                    <!-- 폰트 이름 -->
                                    <div class="signUp-input-Email textbox">
                                        <input  type="text" name="fontName"  class="inputBox" id="fontName" 
                                            placeholder="폰트 이름"  autocomplete="off" />
                                    </div>
                                    
                                    <!-- 폰트 경로 -->
                                    <div class="signUp-input-password textbox">
                                        <input type="file"  name="fontPath"  class="inputBox" id="fontPath"  />
                                    </div>
                                    

                                    <!-- 폰트 제작자 -->
                                    <div class="signUp-input-Nickname textbox">
                                        <input type="text" name="fontCreater" class="inputBox"  id="fontCreater"
                                            placeholder="폰트 제작자" />
                                    </div>

                                    

                                </div>

                                <div class="SignUpAgreement6">
                                    <button type="button" class="SignUp" id="signUpBtn">폰트 등록 완료</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <%-- ------------------------------------------- --%>

                
                
                <div class="pagination-area">


                    <ul class="pagination">
                    
                        <!-- 첫 페이지로 이동( <<) -->
                        <li><a href="/admin/font?${sURL}">&lt;&lt;</a></li>

                        <!-- 이전 목록 마지막 번호로 이동 ( < ) -->
                        <li><a href="/admin/font?cp=${pagination.prevPage}&${sURL}">&lt;</a></li>

                        
                        <!-- 특정 페이지로 이동 -->
                        <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                            <c:choose>
                                <c:when test="${i == pagination.currentPage}">
                                    <%-- 현재 보고있는 페이지 --%>
                                    <li><a class="current">${i}</a></li>
                                </c:when>
                                <c:otherwise>
                                    <%-- 현재 페이지를 제외한 나머지 --%>
                                    <li><a href="/admin/font?cp=${i}&${sURL}">${i}</a></li>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                        
                        <!-- 다음 목록 시작 번호로 이동 ( > )-->
                        <li><a href="/admin/font?cp=${pagination.nextPage}&${sURL}">&gt;</a></li>

                        <!-- 끝 페이지로 이동 ( >> ) -->
                        <li><a href="/admin/font?cp=${pagination.maxPage}&${sURL}">&gt;&gt;</a></li>

                    </ul>
                </div>



                <%-- <div class="center">
                    <nav>
                        <ul class="pagination pagination-sm">
                            <li class="active">
                                <span>1</span>
                            </li>
                        </ul>
                    </nav>
                </div> --%>
            </section>
            
        </main>

        <jsp:include page="/WEB-INF/views/include/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

        <script src="/resources/js/admin/admin-font.js"></script>
    </body>
</html>



