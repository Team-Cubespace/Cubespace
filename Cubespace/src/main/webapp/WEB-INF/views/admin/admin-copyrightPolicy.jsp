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
                    <h3>저작권정책</h3>
                    
                </div>

                <div class="search-result-area">
                    <div class="touArea">
                        <div class="touTitle"></div>
                        <div class="touContent">
저작권법 제24조의2(공공저작물의 자유이용)에 따라 큐브스페이스에서 저작권재산의 전부를 보유하고 있거나 자유이용허락표시에 대한 권리자의 동의를 받은 경우는 “공공저작물 자유이용허락표시기준(공공누리, KOGL)”을 부착하여 별도의 이용허락 없이 자유이용이 가능합니다.<br><br>
단, 위 규정에 따라 “공공저작물 자유이용허락표시기준(제1유형~제4유형)”이 부착된 공공저작물은 제1유형의 경우 출처표시만 하면 자유이용이 가능하나, 제2유형은 상업적 이용을, 제3유형은 변경이용을, 제4유형은 상업적 이용과 변경 이용을 금지하고 있으니, 반드시 그 이용조건을 확인하신 후 해당 이용조건의 범위 안에서 이용하시기 바랍니다.<br><br>
또한, 제1유형을 포함하여 어느 유형이든 출처(발행연도, 해당 공공기관명과 홈페이지 URL, 저작물 작성자의 성명이 표시된 경우에는 그 성명도 포함)는 반드시 표시하여야 함을 유의하시기 바랍니다.<br><br>
[예시] 본 저작물은 큐브스페이스에서 2023년 작성하여 공공누리 제1유형으로 개방한 ‘저작물명(작성자 :큐브스페이스)’를 이용하였으며 해당 저작물은 큐브스페이스(홈페이지) 에서 무료로 다운받으실 수 있습니다.<br><br>
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



