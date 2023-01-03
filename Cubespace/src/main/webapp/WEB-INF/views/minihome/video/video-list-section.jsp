<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<div class="album-main">
    <c:set var="videoList" value="${resultMap.videoList}"/>
    <c:set var="pagination" value="${resultMap.pagination}"/>

    <header>
        <span>동영상</span>
        <span> > </span>
        <span>${folderName}</span>
    </header>
    <c:if test="${loginMember.memberNo == minihome.memberNo}">
        <a href="/videoWrite?folderNo=${folderNo}&cp=${pagination.currentPage}" id="writeButton">글쓰기</a>
    </c:if>

    <c:choose>
        <c:when test="${fn:length(videoList) == 0}">
            <div class="empty-space">
                <i class="fa-regular fa-folder-open"></i>
            </div>
        </c:when>
        <c:otherwise>
            <ul class="album-list">
                <c:forEach var="video" items="${videoList}">
                    <li>
                        <a href="/videoDetail/${video.videoNo}?folderNo=${folderNo}&cp=${cp}">
                            <div class="album-hover">
                                <span class="album-title"><c:if test="${video.videoScrapYN == 'Y'}">[스크랩] </c:if>${video.videoTitle}</span>
                                <div>
                                    <span class="open-flag">
                                        <c:choose>
                                            <c:when test="${video.openFlag == 1}">
                                                전체공개
                                            </c:when>
                                            <c:when test="${video.openFlag == 2}">
                                                깐부공개
                                            </c:when>
                                            <c:when test="${video.openFlag == 3}">
                                                비공개
                                            </c:when>
                                        </c:choose>
                                    </span>
                                    <span class="video-create">${video.videoCreate}</span>
                                </div>

                                <div class="video-count">
                                    <span>
                                        <i class="fa-solid fa-eye"></i>
                                        ${video.videoReadCount}
                                    </span>
                                    <span>
                                        <i class="fa-solid fa-comment"></i>
                                        ${video.commentCount}
                                    </span>
                                </div>
                            </div>
                            <img src="${video.videoThumbnail}" alt="">
                        </a>
                    </li>
                </c:forEach>
            </ul>
            <ul id="pagination">
                <li><a href="/videoList/2?folderNo=${folderNo}&cp=1"><i class="fa-solid fa-angles-left"></i></a></li>
                <li><a href="/videoList/2?folderNo=${folderNo}&cp=${pagination.prevPage}"><i class="fa-solid fa-angle-left"></i></a></li>
                <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                    <c:choose>
                        <c:when test="${i == pagination.currentPage}">
                            <li><a class="current-page">${i}</a></li>
                        </c:when>
                        <c:otherwise>
                            <li><a href="/videoList/2?folderNo=${folderNo}&cp=${i}">${i}</a></li>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>

                <li><a href="/videoList/3?folderNo=${folderNo}&cp=${pagination.nextPage}"><i class="fa-solid fa-angle-right"></i></a></li>
                <li><a href="/videoList/3?folderNo=${folderNo}&cp=${pagination.maxPage}"><i class="fa-solid fa-angles-right"></i></a></li>
            </ul>
        </c:otherwise>
    </c:choose>
</div>
