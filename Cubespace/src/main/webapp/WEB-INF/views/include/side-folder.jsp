<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<link rel="stylesheet" href="/resources/css/minihome/include/side-folder.css">
<div class="side-folder" id="sideFolder">
    <header>
        <c:choose>
            <c:when test="${boardTypeNo == 1}">
                다이어리
            </c:when>
            <c:when test="${boardTypeNo == 2}">
                사진첩
            </c:when>
            <c:when test="${boardTypeNo == 3}">
                동영상
            </c:when>
        </c:choose>        
    </header>

    <ul class="folder-list">
        <c:forEach var="folder" items="${folderList}">
            <li class="folder">
                <img src="/resources/images/common/folder.png" alt="">
                <a href="${folderRequestURI}?folderNo=${folder.folderNo}&cp=1" class="folder-name">${folder.folderName}</a>
            </li>
        </c:forEach>
    </ul>
</div> 