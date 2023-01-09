<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<div class="album-main">
    <header>
        <span>동영상 수정</span>
    </header>
    <form id="writeVideoForm" action="/videoWrite" method="POST" encType="">
        <div class="input-row">
            <label for="">폴더</label>
            <select name="folderNo" id="">
            <c:forEach var="folder" items="${minihome.videoFolderList}">
                <option value="${folder.folderNo}" <c:if test="${folderNo == video.folderNo}">selected</c:if>>${folder.folderName}</option>
            </c:forEach>
            </select>
        </div>
        <div class="input-row">
            <label for="videoTitle">제목</label>
            <input id="videoTitle" name="videoTitle" type="text" placeholder="제목을 입력하세요" value="${video.videoTitle}" maxLength="100">
        </div>
        <div class="input-row">
            <label for="videoContent">내용</label>
            <textarea name="videoContent" id="videoContent" rows="6" placeholder="내용을 입력하세요" maxLength="4000">${video.videoContent}</textarea>
        </div>

        <div class="input-row">
            <label>공개설정</label>
            <ul class="radio-list">
                <li>
                    <input type="radio" id="scope1" name="openFlag" <c:if test="${video.openFlag == 1}">checked</c:if> value="1">
                    <%-- <label class="radio" for="scope1">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scope1">공개</label>
                </li>
                <li>
                    <input type="radio" id="scope2" name="openFlag" <c:if test="${video.openFlag == 2}">checked</c:if> value="2">
                    <%-- <label class="radio" for="scope2">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scope2">깐부공개</label>
                </li>
                <li>
                    <input type="radio" id="scope3" name="openFlag" <c:if test="${video.openFlag == 3}">checked</c:if> value="3">
                    <%-- <label class="radio" for="scope3">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scope3">비공개</label>             
                </li>
            </ul>
        </div>
        <div class="input-row">
            <label for="">스크랩설정</label>
            <ul class="radio-list">
                <li>
                    <input type="radio" id="scrap1" name="videoScrapAllowYN" <c:if test="${video.videoScrapAllowYN == 'Y'}">checked</c:if> value="Y">
                    <%-- <label class="radio" for="scrap1">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scrap1">허용</label>
                </li>
                <li>    
                    <input type="radio" id="scrap2"  name="videoScrapAllowYN" <c:if test="${video.videoScrapAllowYN == 'N'}">checked</c:if> value="N">
                    <%-- <label class="radio" for="scrap2">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scrap2">비허용</label> 
                </li>
            </ul>
        </div>
        <div class="input-row">
            <label class="add-image" for="addFileInput">동영상 등록
            <div class="add-image-info">
                <img src="/resources/images/add-image.png" alt="">
                <span><span id="videoSizeSpan">${videoSize}</span> / 100MB</span>
                <span><span id="videoDurationSpan">0</span> / 60초</span>
            </div>
            </label>
            <input type="file" name="inputVideo" onchange="addVideo(this)" id="addFileInput" accept="video/*">
            <div id="addVideoArea">
                <video src="${video.videoPath}" id="myVideo" controls></video>
                <%-- <video id="myVideo" src="" controls></video> --%>
            </div>
        </div>
    
        <div class="form-button-area">
            <button id="submitButton" type="submit">수정</button>
            <a id="cancelWrite">취소</a>
        </div>
    </form>
    <div id="loadingMask">
        <img src="/resources/images/common/loading-mask.gif" alt="">
        <span>파일을 업로드 중입니다.</span>
    </div>
</div>
