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
    <style>
        .touArea {
            line-height: 120%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
             align-items: flex-start;
        }
        .touTitle {
            padding: 20px 0 15px;
            font-weight: bold;
            width: 100%;
        }
        .touContent{
            width: 100%;
        }
        .search-result-area {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }
    </style>
    <body>
        <main>
            
            <jsp:include page="/WEB-INF/views/include/header.jsp" />
            <section class="main-class">
                <div class="member-title">
                    <h3>프로젝트 소개</h3>
                    
                </div>

                <div class="search-result-area">
                    <div class="touArea">
                        <div class="touTitle">제목 쓰면 됨</div>
                        <div class="touContent">내용 쓰면 됨
                        </div>
                    </div>
                    

                </div>

                



               
            </section>
        </main>

        <jsp:include page="/WEB-INF/views/include/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

        <script src="/resources/js/admin/admin-FAQ.js"></script>
    </body>
</html>



