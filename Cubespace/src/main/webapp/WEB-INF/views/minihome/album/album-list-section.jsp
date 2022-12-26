<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="album-main">
    <c:set var="albumList" value="${resultMap.albumList}"/>
    <c:set var="pagination" value="${resultMap.pagination}"/>
    <header>
        <span>${minihome.homepageName}</span>
        <span> > </span>
        <span>폴더 이름</span>
    </header>
    <a href="/albumWrite" id="writeButton" type="button">글쓰기</a>
    <ul class="album-list">
        <c:forEach var="album" items="${resultMap.albumList}">
            <li>
                <a href="">
                    <img src="${album.thumbnailImg}" alt="">
                </a>
            </li>
        </c:forEach>
    </ul>
    <ul id="pagination">
        
        

        <li><a href="/albumList/2?folderNo=${folderList[0].folderNo}&cp=1"><i class="fa-solid fa-angles-left"></i></a></li>
        <li><a href="/albumList/2?folderNo=${folderList[0].folderNo}&cp=${pagination.prevPage}"><i class="fa-solid fa-angle-left"></i></a></li>
        <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
            <c:choose>
                <c:when test="${i == pagination.currentPage}">
                    <li><a class="current-page">${i}</a></li>
                </c:when>
                <c:otherwise>
                    <li><a href="/albumList/2?folderNo=${folderList[0].folderNo}&cp=${i}"></a></li>
                </c:otherwise>
            </c:choose>
        </c:forEach>
        <%-- <li><a href="" class="current-page">1</a></li>
        <li><a href="">2</a></li>
        <li><a href="">3</a></li>
        <li><a href="">4</a></li>
        <li><a href="">5</a></li>
        <li><a href="">6</a></li>
        <li><a href="">7</a></li>
        <li><a href="">8</a></li>
        <li><a href="">9</a></li>
        <li><a href="">10</a></li> --%>
        <li><a href="/albumList/2?folderNo=${folderList[0].folderNo}&cp=${pagination.nextPage}"><i class="fa-solid fa-angle-right"></i></a></li>
        <li><a href="/albumList/2?folderNo=${folderList[0].folderNo}&cp=${pagination.maxPage}"><i class="fa-solid fa-angles-right"></i></a></li>
    </ul>
</div>
