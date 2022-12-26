<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<link rel="stylesheet" href="/resources/css/minihome/include/side-folder.css">
<div class="side-folder" id="sideFolder">
    <header>
        메뉴 이름
    </header>

    <ul class="folder-list">
        <c:forEach var="folder" items="${folderList}">
            <li class="folder">
                <img src="/resources/images/common/folder.png" alt="">
                <a href="/albumList/2?folderNo=${folder.folderNo}&cp=1" class="folder-name">${folder.folderName}</a>
            </li>
        </c:forEach>
    </ul>
</div> 