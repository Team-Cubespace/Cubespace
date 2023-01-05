<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<c:set var="pagination" value="${map.pagination}"/>
<c:set var="complainList" value="${map.complainList}"/>
<c:set var="allComplainCount" value="${map.allComplainCount}"/>
<c:set var="listCount" value="${map.listCount}"/>

<c:set var="sURL" value="sort=${param.sort}&key=${param.key}&query=${param.query}&status=${param.status}&calanderBefore=${param.calanderBefore}&calanderAfter=${param.calanderAfter}"/>



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
    <link rel="stylesheet" href="/resources/css/admin/admin-complain.css">

    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>

    </head>
    <body>
        <main>
            
            <jsp:include page="/WEB-INF/views/include/header.jsp" />

            <p class="otherPageBtn"><a href="/admin/goods/font">상품 등록 페이지</a></p>
            <section class="category-lists">
                <a href = "/admin/member" class="detail link-member">회원</a>
                <a href = "/admin/complain" class="detail link-member activate">신고</a>
            </section>

            <section class="main-class">
                <div class="member-title">
                    <h3>신고 리스트</h3>
                    <%-- <div>
                        <button id="goodsAddBtn">+ 상품 등록</button>
                    </div> --%>
                </div>


                <form id="frmSearchBase" method="get" class="member-search" action="/admin/complain/complainSearch">
                    <input type="hidden" name="sort" id="orderInput">
                    <p class="search__title">신고 검색</p>
                    <div class="search-detail-box form-inline">
                        <div class="search-detail-div">
                            <div class="search-detail-keyword">검색어</div>
                            <div class="search-detail-select-box">
                                <select name="key" id="key" class="form-control">


                                <c:if test="${param.key == 'nickname'}">
                                    <c:set var="nicknameChk" value="selected"></c:set>
                                </c:if>

                                <c:if test="${param.key == 'complainNo'}">
                                    <c:set var="complainNoChk" value="selected"></c:set>
                                </c:if>
                                    
                                <option value="nickname" ${nicknameChk}>닉네임</option>
                                <option value="complainNo" ${complainNoChk}>신고번호</option>
                                        
                                        
                                </select>
                                <input type="text" name="query" class="form-control" value="${param.query}">
                            </div>
                        </div>

                        <div  class="search-detail-div">
                            <div class="search-detail-keyword">처리여부</div>
                            <div>
                                <c:set var="allStatusChk" value="checked"/>
                                <c:if test="${param.status == '1'}"> <%-- 처리완료 --%>
                                    <c:set var="yesStatusChk" value="checked"></c:set>
                                    <c:set var="allStatusChk" value=""/>
                                </c:if>

                                <c:if test="${param.status == '0'}"> <%-- 처리중 --%>
                                    <c:set var="noStatusChk" value="checked"></c:set>
                                    <c:set var="allStatusChk" value=""/>
                                </c:if>

                                <label class="radio-inline">
                                    <input type="radio" name="status" value="" ${allStatusChk}>전체
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="status" value="0" ${noStatusChk}>처리중
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="status" value="1" ${yesStatusChk}>처리완료
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
                    
                    <select onchange="orderBy()" id="order">
                        <option value="order1" ${order1}>최신 신고순</option>
                        <option value="order2" ${order2}>오래된 신고순</option>
                    </select>
                </div>

                <div class="pull-left">
                    검색
                    <strong>${listCount}</strong>
                    건 / 전체
                    <strong>${allComplainCount}</strong>
                    건
                </div>

                <%-- 회원 차단------------------------------------------- --%>
                    <div class="popup_box scroll" style="display: none;">
                    <%-- <div class="popup_box scroll" > --%>
                        <div style="height: 10px; width: 500px; float: top;">
                            <a href="javascript:closePop();"><i class="fa-solid fa-x allClose"></i></a>
                        </div>
                        <!--팝업 컨텐츠 영역-->
                        <div class="popup_area">
                            <div class="payRemainArea">
                                <h1><span>회원 차단</span></h1>
                            </div>
                            <div class="complainedMemberArea"></div>

                            <form  method="get" name="signUp-frm" id="block-frm" onsubmit="return false">
                                <div class="search-detail-div">
                                    <div class="search-detail-expectedDate">차단 예상일</div>
                                    <div class="dateArea">
                                        <div class="input-group js-datepicker blockStart">
                                            <p id="blockStart"></p>
                                        </div>
                                        &nbsp;&nbsp;~&nbsp;&nbsp;
                                        <div class="input-group js-datepicker blockEnd">
                                            <p id="blockEnd"></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="search-detail-div blockDaySelectArea">
                                    <div class="selectDate">차단 날짜 지정</div>
                                    <div class="search-detail-date">
                                        <label class="radio-inline">
                                            <input type="radio" name="blockDayCount" value="1" id="block1">&nbsp;+ 1일
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="blockDayCount" value="5" id="block5">&nbsp;+ 5일
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="blockDayCount" value="7" id="block7">&nbsp;+ 7일
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="blockDayCount" value="30" id="block30">&nbsp;+ 30일
                                        </label>
                                    </div>
                                </div>
                                <input type="hidden" id="realBlockStart">
                                <input type="hidden" id="realBlockEnd">
                            
                                <div class="SignUpAgreement6">
                                    <button type="button" class="SignUp" id="memberBlockBtn">차단 등록</button>
                                </div>
                            </form>
                        </div>
                    </div>

                <%-- ------------------------------------------- --%>

                <div class="search-result-area">
                    <div class="search-result-div" id="number">
                        <div class="search-result-tab">번호</div>
                        <c:forEach var="complain" items="${complainList}">
                            <div class="search-content complainNo">${complain.complainNo}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div"  id="complainerNickname">
                        <div class="search-result-tab">신고한사람</div>
                        <c:forEach var="complain" items="${complainList}">
                            <c:if test='${complain.complainerDelYN == "Y"}'> <%-- 신고한사람 & 탈퇴회원 --%>
                                <div class="search-content deleteMember">${complain.complainerNickname}(탈퇴)</div>
                            </c:if>
                            <c:if test='${complain.complainerDelYN == "N"}'> 
                                <c:if test='${complain.complainerBlockFL > 0}'> <%-- 신고한사람 & 차단회원 --%>
                                    <div class="search-content blockMember">${complain.complainerNickname}(차단중)</div>
                                </c:if>
                                <c:if test='${complain.complainerBlockFL == 0}'> <%-- 신고한사람 --%>
                                    <div class="search-content">${complain.complainerNickname}</div>
                                </c:if>
                            </c:if>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="complainedNickname">
                        <div class="search-result-tab">신고당한사람</div>
                        <c:forEach var="complain" items="${complainList}">
                            <c:if test='${complain.complainedDelYN == "Y"}'> <%-- 신고당한사람 & 탈퇴회원 --%>
                                    <div class="search-content deleteMember complainedMember">${complain.complainedNickname}(탈퇴)</div>
                                </c:if>
                                <c:if test='${complain.complainedDelYN == "N"}'> 
                                    <c:if test='${complain.complainedBlockFL > 0}'> <%-- 신고당한사람 & 차단회원 --%>
                                        <div class="search-content blockMember complainedMember" name="${complain.complainNo}" id="${complain.complainedNo}">${complain.complainedNickname}(차단중)</div>
                                    </c:if>
                                    <c:if test='${complain.complainedBlockFL == 0}'> <%-- 신고당한사람 --%>
                                        <div class="search-content complainedMember" name="${complain.complainNo}" id="${complain.complainedNo}">${complain.complainedNickname}</div>
                                    </c:if>
                                </c:if>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="blockFlag">
                        <div class="search-result-tab">차단시작일</div>
                        <c:forEach var="complain" items="${complainList}">
                            <c:if test="${empty complain.blockStart}">
                                <div class="search-content originalBlockStart">-</div>
                            </c:if>
                            <c:if test="${not empty complain.blockStart}">
                                <div class="search-content originalBlockStart">${complain.blockStart}</div>
                            </c:if>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="blockFlag">
                        <div class="search-result-tab">차단종료일</div>
                        <c:forEach var="complain" items="${complainList}">
                            <c:if test="${empty complain.blockEnd}">
                                <div class="search-content originalBlockEnd">-</div>
                            </c:if>
                            <c:if test="${not empty complain.blockEnd}">
                                <div class="search-content originalBlockEnd">${complain.blockEnd}</div>
                            </c:if>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="complainContent">
                        <div class="search-result-tab">신고내용</div>
                        <c:forEach var="complain" items="${complainList}">
                            <c:choose>
                                <c:when test="${fn:length(complain.complainContent) > 45}">
                                    <div class="search-content seeComplainContent">
                                        <p>${fn:substring(complain.complainContent, 0, 44)}...</p>
                                        <p class="allComplainContent" style="display: none; word-break:break-all;">${complain.complainContent}</p>
                                    </div>
                                </c:when>
                                <c:when test="${fn:length(complain.complainContent) <= 44}">
                                    <div class="search-content">${complain.complainContent}</div>
                                </c:when>         
                            </c:choose>                   
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
                            <c:if test="${complain.status == '1'}">
                                <div class="search-content yesStatus ${complain.complainNo}" name="${complain.complainNo}">처리완료</div>
                            </c:if>
                            <c:if test="${complain.status == '0'}">
                                <div class="search-content noStatus ${complain.complainNo}"  name="${complain.complainNo}">처리중</div>
                            </c:if>
                        </c:forEach>
                    </div>
                </div>


                <div class="pagination-area">
                    <ul class="pagination">
                    
                        <!-- 첫 페이지로 이동( <<) -->
                        <li><a href="/admin/complain/complainSearch?${sURL}">&lt;&lt;</a></li>

                        <!-- 이전 목록 마지막 번호로 이동 ( < ) -->
                        <li><a href="/admin/complain/complainSearch?cp=${pagination.prevPage}&${sURL}">&lt;</a></li>

                        
                        <!-- 특정 페이지로 이동 -->
                        <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                            <c:choose>
                                <c:when test="${i == pagination.currentPage}">
                                    <%-- 현재 보고있는 페이지 --%>
                                    <li><a class="current">${i}</a></li>
                                </c:when>
                                <c:otherwise>
                                    <%-- 현재 페이지를 제외한 나머지 --%>
                                    <li><a href="/admin/complain/complainSearch?cp=${i}&${sURL}">${i}</a></li>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                        
                        <!-- 다음 목록 시작 번호로 이동 ( > )-->
                        <li><a href="/admin/complain/complainSearch?cp=${pagination.nextPage}&${sURL}">&gt;</a></li>

                        <!-- 끝 페이지로 이동 ( >> ) -->
                        <li><a href="/admin/complain/complainSearch?cp=${pagination.maxPage}&${sURL}">&gt;&gt;</a></li>

                    </ul>
                </div>




            </section>
            
        </main>

        <jsp:include page="/WEB-INF/views/include/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

        <script src="/resources/js/admin/admin-complain.js"></script>
    </body>
</html>