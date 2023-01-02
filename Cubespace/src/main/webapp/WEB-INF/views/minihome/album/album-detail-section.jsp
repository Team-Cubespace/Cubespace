<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<div class="detail-main">
    <header>
        사진첩 > ${folderName}
        <button id="goToList">목록으로</button>
    </header>
    <div class="detail-subtitle">
        <span class="detail-open-flag">공개</span>
        <span class="detail-title-area">${board.albumTitle}</span>
        <span class="detail-create-date">${board.albumCreate}</span>
    </div>
    <div class="slide-container">
        <div class="swiper-container">
            <ul class="swiper-wrapper">
                <c:forEach var="albumImage" items="${board.albumImageList}">
                    <li class="swiper-slide">
                        <img src="${albumImage.imagePath}${albumImage.imageRename}" alt="">
                    </li>
                </c:forEach>
            </ul>
        </div>

        <c:if test="${fn:length(board.albumImageList) > 1}">
            <%-- 페이지 네이션 --%>
            <div class="swiper-pagination"></div>
            <span class="button-next">
                <i class="fa-solid fa-angle-right"></i>
            </span>
            <span class="button-prev">
                <i class="fa-solid fa-angle-left"></i>
            </span>
        </c:if>
    </div>

    <p class="album-content">
        ${board.albumContent}
    </p>
    <div class="album-detail-footer">
        <%-- 게시글에 좌표가 등록 되었을때만 --%>
        <c:if test="${not empty board.latitude}">
            <a href="https://map.kakao.com/link/map/${board.locationName},${board.latitude},${board.longitude}" target="_blank" class="location">
                <i class="fa-solid fa-location-dot"></i>
                ${board.locationName}
            </a>
        </c:if>

        <div class="album-button-area">
            <c:choose>
                <%-- 게시글의 작성자번호와 로그인된 회원의 번호가 일치하지 않을 때 --%>
                <c:when test="${minihome.memberNo != loginMember.memberNo}">
                    <c:if test="${board.albumScrapAllowYN == 'Y'}">
                           <button id="showScrapModal" type="button">스크랩</button> 
                    </c:if>
                </c:when>
                <c:otherwise>
                    <%-- 게시글의 작성자번호와 로그인된 회원의 번호가 일치할 때 --%>
                    <a href="/albumUpdate/${board.albumNo}?folderNo=${board.folderNo}&cp=${param.cp}">수정</a>
                    <a href="/albumDelete/${board.albumNo}?folderNo=${board.folderNo}&cp=${param.cp}">삭제</a>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
    <%-- 스크랩 모달 --%>
    <div id="boardScrapModal">
        <div id="boardScrap">
            <div class="scrap-modal-header">
                <button id="modalCloseButton" type="button">
                    <i class="fa-solid fa-xmark"></i>
                </button>   
            </div>

            <div class="scrap-modal-main">
                <span>이 게시글을 스크랩 하시겠습니까?</span>
                <form id="scrapForm">
                    <label class="modal-label" for="">저장위치
                        <select name="folderNo" id="folderSelectBox">
                            <%-- <option value="">내 사진</option>
                            <option value="">안비밀폴더</option> --%>
                        </select>
                    </label>

                    <div class="modal-comment-content">
                        <label class="modal-label" for="">흔적남기기</label>
                        <textarea id="modalCommentContent" name="commentContent" rows="5">퍼가요~</textarea>
                    </div>

                    <div class="modal-scrap-allow">
                        <label class="modal-label" for="">공개 설정</label>
                        <div class="modal-radio-area">
                            <input type="radio" name="openFlag" value="1" id="modalOpenFlag1">
                            <label for="modalOpenFlag1">전체공개</label>

                            <input type="radio" name="openFlag" value="2" id="modalOpenFlag2">
                            <label for="modalOpenFlag2">깐부공개</label>

                            <input type="radio" name="openFlag" value="3" id="modalOpenFlag3">
                            <label for="modalOpenFlag3">비공개</label>
                        </div>
                    </div>

                    <div class="modal-button-area">
                        <button type="submit" id="ScrapButton">
                            확인
                        </button>
                        <button type="button" id="scrapCancelButton">
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script>
        window.parent.postMessage("3", "*");
    </script>
    <jsp:include page="/WEB-INF/views/include/comment.jsp"/>
</div>