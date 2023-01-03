<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<div class="album-main">
    <c:set var="albumList" value="${resultMap.albumList}"/>
    <c:set var="pagination" value="${resultMap.pagination}"/>
    <header>
        <span>사진첩</span>
        <span> > </span>
        <span>${folderName}</span>
    </header>
    <c:if test="${loginMember.memberNo == minihome.memberNo}">
        <a href="/albumWrite?folderNo=${folderNo}&cp=${pagination.currentPage}" id="writeButton" type="button">글쓰기</a>
    </c:if>

    <c:choose>
        <c:when test="${fn:length(albumList) == 0}">
            <div class="empty-space">
                <i class="fa-regular fa-folder-open"></i>
            </div>
        </c:when>
        <c:otherwise>
            <ul class="album-list">
                <c:forEach var="album" items="${resultMap.albumList}">
                    <li>
                        <a href="/albumDetail/${album.albumNo}?folderNo=${folderNo}&cp=${cp}">
                            <img src="${album.thumbnailImage}" alt="">
                        </a>
                    </li>
                </c:forEach>
            </ul>
            <ul id="pagination">
                <li><a href="/albumList/2?folderNo=${folderNo}&cp=1"><i class="fa-solid fa-angles-left"></i></a></li>
                <li><a href="/albumList/2?folderNo=${folderNo}&cp=${pagination.prevPage}"><i class="fa-solid fa-angle-left"></i></a></li>
                <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                    <c:choose>
                        <c:when test="${i == pagination.currentPage}">
                            <li><a class="current-page">${i}</a></li>
                        </c:when>
                        <c:otherwise>
                            <li><a href="/albumList/2?folderNo=${folderNo}&cp=${i}">${i}</a></li>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>

                <li><a href="/albumList/2?folderNo=${folderNo}&cp=${pagination.nextPage}"><i class="fa-solid fa-angle-right"></i></a></li>
                <li><a href="/albumList/2?folderNo=${folderNo}&cp=${pagination.maxPage}"><i class="fa-solid fa-angles-right"></i></a></li>
            </ul>
        </c:otherwise>
    </c:choose>
</div>
