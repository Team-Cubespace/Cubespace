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
    <link rel="stylesheet" href="/resources/css/admin/admin-member.css">
    <link rel="stylesheet" href="/resources/css/admin/admin-all.css">
    <link rel="stylesheet" href="/resources/css/admin/admin-block.css">

    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>

    </head>
    <body>
        <main>
            
            <jsp:include page="/WEB-INF/views/include/header.jsp" />

            <section class="category-lists">
                <a href = "/admin/member" class="detail link-member">회원</a>
                <a href = "/admin/block" class="detail link-member activate">신고</a>
            </section>

            <section class="main-class">
                <div class="member-title">
                    <h3>회원 리스트</h3>
                    <div>
                        <button id="memberAddBtn">+ 회원 등록</button>
                        <button id="goodsAddBtn">+ 상품 등록</button>
                    </div>
                </div>


                <form id="frmSearchBase" method="get" class="member-search" action="/manager/memberSearch">
                    <input type="hidden" name="sort" id="orderInput">
                    <p class="search__title">회원 검색</p>
                    <div class="search-detail-box form-inline">
                        <div class="search-detail-div">
                            <div class="search-detail-keyword">검색어</div>
                            <div class="search-detail-select-box">
                                <select name="key" id="key" class="form-control">


                                <c:if test="${param.key == 'email'}">
                                    <c:set var="emailChk" value="selected"></c:set>
                                </c:if>

                                <c:if test="${param.key == 'nickname'}">
                                    <c:set var="nicknameChk" value="selected"></c:set>
                                </c:if>
                                    
                                <option value="email" ${emailChk}>닉네임</option>
                                <option value="nickname" ${nicknameChk}>신고번호</option>
                                        
                                        
                                </select>
                                <input type="text" name="query" class="form-control" value="${param.query}">
                            </div>
                        </div>

                        <div  class="search-detail-div">
                            <div class="search-detail-keyword">처리여부</div>
                            <div>

                                <c:set var="allBlockChk" value="checked"/>
                                <c:if test="${param.isBlock == 'notBlock'}">
                                    <c:set var="notBlockChk" value="checked"></c:set>
                                    <c:set var="allBlockChk" value=""/>
                                </c:if>

                                <c:if test="${param.isBlock == 'yesBlock'}">
                                    <c:set var="yesBlockChk" value="checked"></c:set>
                                    <c:set var="allBlockChk" value=""/>
                                </c:if>

                                <label class="radio-inline">
                                    <input type="radio" name="isBlock" value="allBlock" ${allBlockChk}>전체
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="isBlock" value="notBlock" ${notBlockChk}>처리중
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="isBlock" value="yesBlock" ${yesBlockChk}>처리완료
                                </label>
                            </div>
                        </div>

                        
                        <div class="search-detail-div">
                            <div class="search-detail-keyword">신고일</div>
                            <div>
                                <div class="input-group js-datepicker">
                                    <input type="date"  name="calanderBefore" value="${param.calanderBefore}">
                                </div>
                                ~
                                <div class="input-group js-datepicker">
                                    <input type="date"  name="calanderAfter" value="${param.calanderAfter}">
                            </div>
                        
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
                        <option value="order1" ${order1}>가입일 빠른순</option>
                        <option value="order2" ${order2}>가입일 역순</option>
                        <option value="order3" ${order3}>일일방문자순</option>
                        <option value="order4" ${order4}>총방문자순</option>
                    </select>
                </div>

                <div class="pull-left">
                    검색
                    <strong>${listCount}</strong>
                    명 / 전체
                    <strong>${allMemberCount}</strong>
                    명
                </div>

                
                
                <div class="search-result-area">
                    <div class="search-result-div" id="number">
                        <div class="search-result-tab">번호</div>
                        <c:forEach var="complain" items="${complainList}">
                            <div class="search-content">${complain.complainNo}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div"  id="complainerNickname">
                        <div class="search-result-tab">신고한사람</div>
                        <c:forEach var="complain" items="${complainList}">
                            <div class="search-content">${complain.complainerNickname}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="complainedNickname">
                        <div class="search-result-tab">신고당한사람</div>
                        <c:forEach var="complain" items="${complainList}">
                            <div class="search-content">${complain.complainedNickname}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="complainContent">
                        <div class="search-result-tab">신고내용</div>
                        <c:forEach var="complain" items="${complainList}">
                            <div class="search-content">${complain.complainComment}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="complainCreate">
                        <div class="search-result-tab">작성일</div>
                        <c:forEach var="complain" items="${complainList}">
                            <div class="search-content">${complain.complainCreate}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="complainCreate">
                        <div class="search-result-tab">처리상태</div>
                        <c:forEach var="complain" items="${complainList}">
                            <div class="search-content">${complain.status}</div>
                        </c:forEach>
                    </div>
                </div>

            
                
                
                <div class="pagination-area">


                    <ul class="pagination">
                    
                        <!-- 첫 페이지로 이동( <<) -->
                        <li><a href="/admin/block?${sURL}">&lt;&lt;</a></li>

                        <!-- 이전 목록 마지막 번호로 이동 ( < ) -->
                        <li><a href="/admin/block?cp=${pagination.prevPage}&${sURL}">&lt;</a></li>

                        
                        <!-- 특정 페이지로 이동 -->
                        <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                            <c:choose>
                                <c:when test="${i == pagination.currentPage}">
                                    <%-- 현재 보고있는 페이지 --%>
                                    <li><a class="current">${i}</a></li>
                                </c:when>
                                <c:otherwise>
                                    <%-- 현재 페이지를 제외한 나머지 --%>
                                    <li><a href="/admin/block?cp=${i}&${sURL}">${i}</a></li>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                        
                        <!-- 다음 목록 시작 번호로 이동 ( > )-->
                        <li><a href="/admin/block?cp=${pagination.nextPage}&${sURL}">&gt;</a></li>

                        <!-- 끝 페이지로 이동 ( >> ) -->
                        <li><a href="/admin/block?cp=${pagination.maxPage}&${sURL}">&gt;&gt;</a></li>

                    </ul>
                </div>




            </section>
            
        </main>

        <jsp:include page="/WEB-INF/views/include/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

        <script src="/resources/js/admin/admin-member.js"></script>
    </body>
</html>