<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<c:set var="pagination" value="${map.pagination}"/>
<c:set var="musicList" value="${map.musicList}"/>
<c:set var="allMusicCount" value="${map.allMusicCount}"/>
<c:set var="listCount" value="${map.listCount}"/>

<c:set var="sURL" value="sort=${param.sort}&key=${param.key}&query=${param.query}"/>

<jsp:include page="/WEB-INF/views/include/allFontMusic.jsp" />

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
    <link rel="stylesheet" href="/resources/css/admin/admin-music.css">
    <link rel="stylesheet" href="/resources/css/admin/admin-member.css">
    <link rel="stylesheet" href="/resources/css/admin/admin-allGoods.css">

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
                <a href = "/admin/goods/music" class="detail link-product activate">배경음악</a>
                <a href = "/admin/goods/goods" class="detail link-product">소품</a>
            </section>

            <section class="main-class">
                <div class="member-title">
                    <h3>배경음악 리스트</h3>
                    <div>
                        <button id="fontAddBtn">+ 배경음악 등록</button>
                    </div>
                </div>
                <form id="frmSearchBase" method="get" class="member-search" action="/admin/goods/music">
                    <input type="hidden" name="sort" id="orderInput" value = "1">
                    <p class="search__title">배경음악 검색</p>
                    <div class="search-detail-box form-inline">
                        <div class="search-detail-div">
                            <div class="search-detail-keyword">음악 이름 검색</div>
                            <div class="search-detail-select-box">
                                <input type="text" name="musicName" class="form-control" value="${param.musicName}">
                                <button class="btn btn-lg btn-black js-search-button">검색</button>
                            </div>
                        </div>
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
                    <strong>${allMusicCount}</strong>
                    개
                </div>

                <div class="search-result-area">
                    <div class="search-result-div" id="number">
                        <div class="search-result-tab">번호</div>
                        <c:forEach var="music" items="${musicList}">
                            <div class="search-content">${music.musicNo}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div"  id="email">
                        <div class="search-result-tab">썸네일</div>
                        <c:forEach var="music" items="${musicList}">
                            <img class="search-content" src="${music.musicThumnail}">
                        </c:forEach>
                    </div>
                    <div class="search-result-div"  id="email">
                        <div class="search-result-tab">이름</div>
                        <c:forEach var="music" items="${musicList}">
                            <c:if test="${fn:length(music.musicName) > 54}">
                                <div class="search-content musicName">${fn:substring(music.musicName, 0, 53)}...</div>
                            </c:if>
                            <c:if test="${fn:length(music.musicName) <= 54}">
                                <div class="search-content musicName">${music.musicName}</div>
                            </c:if>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="nickname">
                        <div class="search-result-tab">듣기</div>
                        <c:forEach var="music" items="${musicList}">
                            <%-- 이 태그 말고 다른 형식으로 수정해야함 --%>
                            <div class="search-content">
                                <i class="playMusic fa-solid fa-play " id="${music.musicPath}"></i>
                            </div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="signDate">
                        <div class="search-result-tab">제작자</div>
                        <c:forEach var="music" items="${musicList}">
                            <c:if test="${fn:length(music.musicCreater) > 23}">
                                <div class="search-content musicCreater">${fn:substring(music.musicCreater, 0, 22)}...</div>
                            </c:if>
                            <c:if test="${fn:length(music.musicCreater) <= 23}">
                                <div class="search-content musicCreater">${music.musicCreater}</div>
                            </c:if>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="signDate">
                        <div class="search-result-tab">사용횟수</div>
                        <c:forEach var="music" items="${musicList}">
                            <div class="search-content">${music.musicUseCount}</div>
                        </c:forEach>
                    </div>
                    <div class="search-result-div" id="signDate">
                        <div class="search-result-tab">삭제하기</div>
                        <c:forEach var="music" items="${musicList}">
                            <div class="search-content deleteMusic" name="${music.musicNo}">삭제</div>
                        </c:forEach>
                    </div>
                </div>



                <%-- 음악 등록------------------------------------------- --%>
                <div class="popup_layer" id="popup_layer2" style="display: none;">
                    <div class="popup_box scroll">
                        <div style="height: 10px; width: 500px; float: top;">
                            <a href="javascript:closePop2();"><i class="fa-solid fa-x allClose"></i></a>
                        </div>
                        <!--팝업 컨텐츠 영역-->
                        <div class="popup_cont">
                            <div class="payRemainArea">
                                <h1><span>배경음악 등록</span></h1>
                            </div>

                            <form  action="/admin/goods/insertMusic" method="post" name="signUp-frm" id="signUp-frm" enctype="multipart/form-data">
                                <div>
                                    <!-- 배경음악 이름 -->
                                    <div class="signUp-input-musicName textbox">
                                        <p>배경음악 이름</p>
                                        <input  type="text" name="musicName"  class="inputBox" id="musicName" 
                                            placeholder="배경음악 이름"  autocomplete="off" />
                                    </div>
                                    
                                    <!-- 배경음악 썸네일 경로 -->
                                    <div class="signUp-input-musicThumnail textbox">
                                        <p>썸네일 경로</p>
                                        <input type="file"  name="musicThumnailFile"  class="inputBox" id="musicThumnailFile" accept="image/*" />
                                    </div>

                                    <!-- 배경음악 경로 -->
                                    <div class="signUp-input-musicPath textbox">
                                        <p>배경음악 경로</p>
                                        <input type="file" placeholder="배경음악 경로"  name="musicPathFile"  class="inputBox" id="musicPathFile"  />
                                    </div>

                                    <!-- 배경음악 제작자 -->
                                    <div class="signUp-input-musicCreater textbox">
                                        <p>배경음악 제작자</p>
                                        <input type="text" name="musicCreater" class="inputBox"  id="musicCreater"
                                            placeholder="배경음악 제작자" />
                                    </div>
                                </div>
                                <div class="SignUpAgreement6">
                                    <button class="SignUp" id="signUpBtn">배경음악 등록 완료</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <%-- ------------------------------------------- --%>
                <div class="pagination-area">
                    <ul class="pagination">
                    
                        <!-- 첫 페이지로 이동( <<) -->
                        <li><a href="/admin/goods/music?${sURL}">&lt;&lt;</a></li>

                        <!-- 이전 목록 마지막 번호로 이동 ( < ) -->
                        <li><a href="/admin/goods/music?cp=${pagination.prevPage}&${sURL}">&lt;</a></li>

                        
                        <!-- 특정 페이지로 이동 -->
                        <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                            <c:choose>
                                <c:when test="${i == pagination.currentPage}">
                                    <%-- 현재 보고있는 페이지 --%>
                                    <li><a class="current">${i}</a></li>
                                </c:when>
                                <c:otherwise>
                                    <%-- 현재 페이지를 제외한 나머지 --%>
                                    <li><a href="/admin/goods/music?cp=${i}&${sURL}">${i}</a></li>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                        
                        <!-- 다음 목록 시작 번호로 이동 ( > )-->
                        <li><a href="/admin/goods/music?cp=${pagination.nextPage}&${sURL}">&gt;</a></li>

                        <!-- 끝 페이지로 이동 ( >> ) -->
                        <li><a href="/admin/goods/music?cp=${pagination.maxPage}&${sURL}">&gt;&gt;</a></li>
                    </ul>
                </div>
            </section>           
        </main>
        <jsp:include page="/WEB-INF/views/include/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
        <script src="/resources/js/admin/admin-music.js"></script>
    </body>
</html>



