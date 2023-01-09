<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<jsp:include page="/WEB-INF/views/include/report.jsp"></jsp:include>
<link rel="stylesheet" href="/resources/css/minihome/include/minihome-common.css">
<div class="comment-section">
    <div class="comment-header">
        <span class="comment-count">댓글 ${fn:length(board.commentList)}개</span>
    </div>
    <div class="comment-write-row">
        <div class="comment-profile-image-area">
            <c:choose>
                <c:when test="${not empty loginMember.profileImage}">
                    <img class="comment-profile-image" src="${loginMember.profileImage}" alt="" class="comment-profile-image">
                </c:when>
                <c:otherwise>
                    <img class="comment-profile-image" src="/resources/images/common/cubes.png" alt="" class="comment-profile-image">
                </c:otherwise>
            </c:choose>
        </div>
        <div class="comment-content">
            <textarea name="" id="addComment" placeholder="댓글 추가.." rows="1" onkeyup="resizeTextarea(this)"></textarea>
            <div class="comment-write-button-area">
                <button id="addCommentCencel" class="cancel-button" type="button">취소</button>
                <button id="addCommentInsert" class="insert-button" type="button">등록</button>
            </div>
        </div>
    </div>
    <ul id="commentListArea" class="comment-list">
        <c:forEach var="comment" items="${board.commentList}">
            <c:choose>
                <%-- 부모 댓글이라면 --%>
                <c:when test="${comment.level == 1}">
                    <li class="comment-row">
                        <div class="comment-profile-image-area">
                            <c:choose>
                                <c:when test="${not empty comment.profileImage}">
                                    <img class="comment-profile-image" src="${comment.profileImage}" alt="">
                                </c:when>
                                <c:otherwise>
                                    <img class="comment-profile-image" src="/resources/images/common/cubes.png" alt="">
                                </c:otherwise>
                            </c:choose>
                        </div>
                        <div class="comment-content">
                            <div class="comment-nickname-area">
                                <c:choose>
                                    <c:when test="${loginMember.memberNo != comment.memberNo}">
                                        <button class="member-nickname nickname-drop-down-button">
                                            ${comment.memberNickname}
                                            <ul class="nickname-drop-down-box">
                                                <li>
                                                    <a href="/minihome/${comment.memberNo}" onclick="return openMinihome(this.href)">스페이스</a>
                                                </li>
                                                <li><a onclick="reportFriend(${comment.memberNo})">신고</a></li>
                                            </ul>
                                        </button>
                                    </c:when>
                                    <c:otherwise>
                                        <button class="member-nickname">
                                            ${comment.memberNickname}
                                        </button>
                                    </c:otherwise>
                                </c:choose>
                                <!-- 로그인 회원번호와 댓글의 회원번호가 일치할때만 생성 -->
                                <c:if test="${loginMember.memberNo == comment.memberNo || minihome.memberNo == loginMember.memberNo}">
                                    <button class="comment-drop-down-button fa-solid fa-ellipsis-vertical">
                                        <ul class="comment-drop-down-menu">
                                            <li onclick="showUpdateComment(${comment.commentNo}, this)">수정</li>
                                            <li onclick="deleteComment(${comment.commentNo})">삭제</li>
                                        </ul>
                                    </button>
                                </c:if>
                            </div>
                            <div class="comment-content-area">
                                <p style="font-family: '${comment.ownFontNo}'">
                                    ${comment.commentContent}
                                </p>                            
                            </div>
                            <div class="comment-button-area">
                                <span class="comment-date">${comment.commentCreate}</span><button type="button" onclick="addCommentArea(${comment.commentNo}, this)">답글</button>
                            </div>
                        </div>
                    </li>
                    <%-- 자식 댓글이 있을 때 --%>
                    <c:if test="${comment.childCommentCount > 0}">
                        <button class="child-comment-count" type="button" onclick="toggleChildComment(this)">댓글 ${comment.childCommentCount}개</button>
                    </c:if>
                </c:when>
                <c:otherwise>
                    <li class="comment-row child-comment">
                        <div class="comment-profile-image-area">
                            <c:choose>
                                <c:when test="${not empty comment.profileImage}">
                                    <img class="comment-profile-image" src="${comment.profileImage}" alt="">
                                </c:when>
                                <c:otherwise>
                                    <img class="comment-profile-image" src="/resources/images/common/cubes.png" alt="">
                                </c:otherwise>
                            </c:choose>
                        </div>
                        <div class="comment-content">
                            <div class="comment-nickname-area">
                                <span class="member-nickname">${comment.memberNickname}</span>
                                <!-- 로그인 회원번호와 댓글의 회원번호가 일치할때만 생성 -->
                                <c:if test="${loginMember.memberNo == comment.memberNo || minihome.memberNo == loginMember.memberNo}">
                                    <button class="comment-drop-down-button fa-solid fa-ellipsis-vertical">
                                        <ul class="comment-drop-down-menu">
                                            <li onclick="showUpdateComment(${comment.commentNo}, this)">수정</li>
                                            <li onclick="deleteComment(${comment.commentNo})">삭제</li>
                                        </ul>
                                    </button>
                                </c:if>
                            </div>
                            <div class="comment-content-area">
                                <p class="comment-content">
                                    ${comment.commentContent}
                                </p>

                            </div>
                            <div class="comment-button-area">
                                <span class="comment-date">${comment.commentCreate}</span>
                            </div>
                        </div>
                    </li>
                </c:otherwise>
            </c:choose>
        </c:forEach>

        <%-- <li class="comment-row">
            <div class="comment-profile-image-area">
                <img class="comment-profile-image" src="/resources/images/zz.png" alt="" class="comment-profile-image">
            </div>
            <div class="comment-content">
                <div class="comment-nickname-area">
                    <span class="member-nickname">닉네임1</span>
                    <!-- 로그인 회원번호와 댓글의 회원번호가 일치할때만 생성 -->
                    <button class="comment-drop-down-button fa-solid fa-ellipsis-vertical">
                        <ul class="comment-drop-down-menu">
                            <li>수정</li>
                            <li>삭제</li>
                        </ul>
                    </button>
                </div>
                <p class="comment-content">
                    ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                </p>
                <span class="comment-"></span>
                <div class="comment-button-area">
                    <span class="comment-date">1분전</span>
                    <button type="button" onclick="addCommentArea(0, this)">답글</button>
                </div>
            </div>
        </li>
        <div class="comment-write-row child-comment">
            <div class="comment-profile-image-area">
                <img class="comment-profile-image" src="/resources/images/zz.png" alt="" class="comment-profile-image">
            </div>
            <div class="comment-content">
                <textarea name="" id="" placeholder="댓글 추가.."></textarea>
                <div class="comment-write-button-area">
                    <button class="cancel-button" type="button">취소</button>
                    <button class="insert-button" type="button">등록</button>
                </div>
            </div>
        </div>
        <button class="child-comment-count" type="button" onclick="toggleChildComment(this)">댓글 2개</button>
        <li class="comment-row child-comment">
            <div class="comment-profile-image-area">
                <img class="comment-profile-image" src="/resources/images/zz.png" alt="" class="comment-profile-image">
            </div>
            <div class="comment-content">
                <div class="comment-nickname-area">
                    <span class="member-nickname">닉네임1</span>
                    <!-- 로그인 회원번호와 댓글의 회원번호가 일치할때만 생성 -->
                    <button class="comment-drop-down-button fa-solid fa-ellipsis-vertical">
                        <ul class="comment-drop-down-menu">
                            <li>수정</li>
                            <li>삭제</li>
                        </ul>
                    </button>
                </div>
                <p class="comment-content">
                    ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                </p>
                <span class="comment-"></span>
                <div class="comment-button-area">
                    <span class="comment-date">1분전</span>
                </div>
            </div>
        </li>
        <li class="comment-row child-comment">
            <div class="comment-profile-image-area">
                <img class="comment-profile-image" src="/resources/images/zz.png" alt="" class="comment-profile-image">
            </div>
            <div class="comment-content">
                <div class="comment-nickname-area">
                    <span class="member-nickname">닉네임1</span>
                    <!-- 로그인 회원번호와 댓글의 회원번호가 일치할때만 생성 -->
                    <button class="comment-drop-down-button fa-solid fa-ellipsis-vertical">
                        <ul class="comment-drop-down-menu">
                            <li>수정</li>
                            <li>삭제</li>
                        </ul>
                    </button>
                </div>
                <p class="comment-content">
                    ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                </p>
                <span class="comment-"></span>
                <div class="comment-button-area">
                    <span class="comment-date">1분전</span>
                </div>
            </div>
        </li> --%>
    </ul>
</div>