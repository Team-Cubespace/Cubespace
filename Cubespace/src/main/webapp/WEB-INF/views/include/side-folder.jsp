<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> --%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<link rel="stylesheet" href="/resources/css/minihome/include/side-folder.css">
<div class="side-folder" id="sideFolder">
    <header>
        ${folderList[0].boardTypeName}   
    </header>

    <ul class="folder-list">
        <c:forEach var="folder" items="${folderList}">
            <li class="folder">
                <img src="/resources/images/common/folder.png" alt="">
                <c:choose>
                    <c:when test="${folder.folderName == '나의 월간달력'}">
                        <a href="/monthCalendar"class="folder-name">${folder.folderName}</a>
                    </c:when>     
                    <c:otherwise>
                        <a href="${folderRequestURI}?folderNo=${folder.folderNo}&cp=1" class="folder-name">${folder.folderName}</a>
                    </c:otherwise>           
                </c:choose>
            </li>
        </c:forEach>
    </ul>
</div> 