<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<div class="detail-main">
    <header>
        동영상 > <c:if test="${board.videoScrapYN == 'Y'}">[스크랩] </c:if>${folderName}
        <button id="goToList">목록으로</button>
    </header>
    <div class="detail-subtitle">
        <span class="detail-open-flag">
            <c:choose>
                <c:when test="${board.openFlag == 1}">
                    전체공개
                </c:when>
                <c:when test="${board.openFlag == 2}">
                    깐부공개
                </c:when>
                <c:when test="${board.openFlag == 3}">
                    비공개
                </c:when>
            </c:choose>
        </span>
        <span class="detail-title-area">${board.videoTitle}</span>
        <span class="detail-create-date">${board.videoCreate}</span>
    </div>
    <div class="slide-container">
        <video-js id="vid1" class="video-js vjs-big-play-button vjs-big-play-centered vjs-fluid"
            data-setup='{"controls":true, "playbackRates": [0.5, 1, 1.5, 2]}'>
            <source src="${board.videoPath}" type="video/webm">
            <source src="${board.videoPath}" type="video/mp4">
        </video-js>
    </div>

    <p class="video-content">
        ${board.videoContent}
    </p>
    <div class="video-detail-footer">
        <div class="video-button-area">
            <c:choose>
                <%-- 게시글의 작성자번호와 로그인된 회원의 번호가 일치하지 않을 때 --%>
                <c:when test="${minihome.memberNo != loginMember.memberNo}">
                    <c:if test="${board.videoScrapAllowYN == 'Y'}">
                           <button id="showScrapModal" type="button">스크랩</button> 
                    </c:if>
                </c:when>
                <c:otherwise>
                    <%-- 게시글의 작성자번호와 로그인된 회원의 번호가 일치할 때 --%>
                    <a href="/videoUpdate/${board.videoNo}?folderNo=${board.folderNo}&cp=${param.cp}">수정</a>
                    <a href="/videoDelete/${board.videoNo}?folderNo=${board.folderNo}&cp=${param.cp}">삭제</a>
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