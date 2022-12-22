<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="comment-section">
    <div class="comment-header">
        <span class="comment-count">댓글 29개</span>
    </div>
    <div class="comment-write-row">
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
    <ul class="comment-list">
        <li class="comment-row">
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
        <%-- <div class="comment-write-row child-comment">
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
        </div> --%>
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
        </li>
    </ul>
</div>