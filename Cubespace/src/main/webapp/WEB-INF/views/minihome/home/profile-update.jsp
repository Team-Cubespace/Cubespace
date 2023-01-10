<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<c:set var="profile" value="${profileMap.profile}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/minihome/home/profile-update.css">
    <title>프로필 수정</title>
</head>
<body>
    <div class="profile-update-area">
        <form method="POST" enctype="multipart/form-data" id="profileFrm">
            <div class="image-btn-container">

                <!-- 프로필 이미지 -->
                <c:choose>
                    <c:when test="${profile.profileImage == null}">
                        <img src="/resources/images/common/cubes.png" id="preview">
                    </c:when>

                    <c:otherwise>
                        <img src="${profile.profileImage}" id="preview">
                    </c:otherwise>
                </c:choose>

                <!-- 프로필 이미지 버튼 -->
                <input type="file" id="selectImage" name="profileImage" accept="image/*">
                <label for="selectImage" id="selectImageBtn">프로필 이미지 선택</label>
                <div id="deleteImageBtn">프로필 이미지 삭제</div>
                <div id="rollbackImageBtn">원래대로 되돌리기</div>
            </div>

            <!-- 프로필 메시지 -->
            <div class="message-container">
                <textarea id="updateMessage" name="comment" wrap="physical" spellcheck="false"></textarea>
                <span class="letter">Letter (<span id="letterCount">0</span> / 98)</span>
            </div>

            <!-- 프로필 수정 버튼 -->
            <div class="update-btn-container">
                <span id="cancellBtn">취소</span>
                <span id="updateBtn">수정완료</span>
                <input type="hidden" id="updateFlag" name="updateFlag" value="N">
            </div>
        </form>
    </div>
</body>

<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
<script src="/resources/js/minihome/home/profile-update.js"></script>
</html>