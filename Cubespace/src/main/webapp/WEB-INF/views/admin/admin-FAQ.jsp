<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<c:set var="pagination" value="${map.pagination}"/>
<c:set var="fontList" value="${map.fontList}"/>
<c:set var="allFontCount" value="${map.allFontCount}"/>
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
    <link rel="stylesheet" href="/resources/css/admin/admin-all.css">
    <link rel="stylesheet" href="/resources/css/admin/admin-FAQ.css">

    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>

    </head>
    <body>
        <main>
            
            <jsp:include page="/WEB-INF/views/include/header.jsp" />
            <section class="main-class">
                <div class="member-title">
                    <h3>고객센터(FAQ)</h3>
                    
                </div>
                <div class="allFoldBtnArea">
                    <button type="button" id="foldAll">모두 접기</button>
                </div>
                <div class="search-result-area">
                <c:forEach var="faq" items="${faqList}">
                    <div class="faqArea">
                        <a  class="frequent-question__content-detail"  onclick= "openFAQ(this)">                    
                            <i class="fa-solid fa-caret-up"></i>
                            <span class="faqNoArea">Q${faq.faqNo}</span>
                            <div  class="frequent-question__content">
                                <p>${faq.faqTitle}</P>
                            </div>
                        </a>
                        <div class="area" style="display:none">
                            <div class="profile">
                                <div class="profile-img">
                                    <img src="/resources/images/common/cubes.png" class="admin-img">
                                </div>
                                <div class="name-date">
                                    <p class= "nickname" id="admin-name">큐브스페이스_운영지원팀</p>
                                </div>
                            </div>
                            <div class="question-content">
                                <p name="content" class="user-content" >
                                    ${faq.faqContent}<br>
                                </p>
                            </div>
                        </div>
                    </div>
                </c:forEach>
                </div>

                



               
            </section>
        </main>

        <jsp:include page="/WEB-INF/views/include/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

        <script src="/resources/js/admin/admin-FAQ.js"></script>
    </body>
</html>



