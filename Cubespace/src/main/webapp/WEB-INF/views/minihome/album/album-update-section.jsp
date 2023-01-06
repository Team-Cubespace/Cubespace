<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<div class="album-main">
    <header>
        <span>사진첩 수정</span>
    </header>
    <form id="writeAlbumForm" action="/albumWrite" method="POST" encType="">
        <div class="input-row">
            <label for="">폴더</label>
            <select name="folderNo" id="">
            <c:forEach var="folder" items="${minihome.albumFolderList}">
                <c:choose>
                    <%-- 앨범이 작성된 폴더라면 --%>
                    <c:when test="${folder.folderNo == album.folderNo}">
                        <option value="${folder.folderNo}" selected>${folder.folderName}</option>
                    </c:when>     
                    <c:otherwise>
                    <%-- 앨범이 작성된 폴더와 다른 폴더라면 --%>
                        <option value="${folder.folderNo}">${folder.folderName}</option>
                    </c:otherwise>           
                </c:choose>
            </c:forEach>
            </select>
        </div>
        <div class="input-row">
            <label for="albumTitle">제목</label>
            <input id="albumTitle" name="albumTitle" type="text" placeholder="제목을 입력하세요" value="${album.albumTitle}">
        </div>
        <div class="input-row">
            <label for="albumContent">내용</label>
            <textarea name="albumContent" id="albumContent" rows="6" placeholder="내용을 입력하세요">${album.albumContent}</textarea>
        </div>
        <div class="input-row">
            <label for="">위치 찾기</label>
            <div id="locationArea">
                <c:choose>
                    <%-- 위치 설정을 했을 때 --%>
                    <c:when test="${not empty album.latitude}">
                        <button type="button" id="addLocationButton" style="display:none">
                            <i class="fa-solid fa-location-dot"></i>
                            <span>위치 설정</span>
                        </button>
                        
                        <div class="location">
                            <a href="https://map.kakao.com/link/map/${album.locationName},${album.latitude},${album.longitude}" target="_blank">
                                <i class="fa-solid fa-location-dot"></i>
                                ${album.locationName}
                            </a>
                            <span class="fa-solid fa-xmark" onclick="initLocation(this)"></span>
                        </div>
                    </c:when>
                    <%-- 위치 설정 하지 않았을 때 --%>
                    <c:otherwise>
                        <button type="button" id="addLocationButton">
                            <i class="fa-solid fa-location-dot"></i>
                            <span>위치 설정</span>
                        </button>
                    </c:otherwise>
                </c:choose>
            </div>
            <input id="latitude" type="text" name="latitude" hidden value="${album.latitude}">
            <input id="longitude" type="text" name="longitude" hidden value="${album.longitude}">
            <input id="locationName" type="text" name="locationName" hidden value="${album.locationName}">
        </div>
        <div class="input-row">
            <label>공개설정</label>
            <ul class="radio-list">
                <li>
                    <input type="radio" id="scope1" name="openFlag" <c:if test="${album.openFlag == 1}">checked</c:if> value="1">
                    <%-- <label class="radio" for="scope1">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scope1">공개</label>
                </li>
                <li>
                    <input type="radio" id="scope2" name="openFlag" <c:if test="${album.openFlag == 2}">checked</c:if> value="2">
                    <%-- <label class="radio" for="scope2">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scope2">깐부공개</label>
                </li>
                <li>
                    <input type="radio" id="scope3" name="openFlag" <c:if test="${album.openFlag == 3}">checked</c:if> value="3">
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
                    <input type="radio" id="scrap1" name="albumScrapAllowYN" <c:if test="${album.albumScrapAllowYN == 'Y'}">checked</c:if> value="Y">
                    <%-- <label class="radio" for="scrap1">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scrap1">허용</label>
                </li>
                <li>    
                    <input type="radio" id="scrap2"  name="albumScrapAllowYN" <c:if test="${album.albumScrapAllowYN == 'N'}">checked</c:if> value="N">
                    <%-- <label class="radio" for="scrap2">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scrap2">비허용</label> 
                </li>
            </ul>
        </div>
        <div class="input-row">
            <label class="add-image" for="addFileInput">이미지 등록
                <img src="/resources/images/add-image.png" alt="">
            </label>
            <input type="file" onchange="addFile(this)" multiple id="addFileInput">
            <ul id="addFileList">
                <c:forEach var="albumImage" items="${album.albumImageList}">
                    <li class="file-item">
                        <span class="file-name">${albumImage.imageOriginalName}</span>
                        <button class="fa-solid fa-xmark" onclick="deleteImage(${albumImage.imageOrder}, this)"></button>
                    </li>
                </c:forEach>
            </ul>
        </div>

        <div class="form-button-area">
            <button id="submitButton" type="submit">수정</button>
            <a id="cancelWrite">취소</a>
        </div>
    </form>

    <section id="mapModal">
        <div class="map-modal-header">
            <form id="searchPlaceForm">
                <input id="searchPlaceInput" type="text" maxLength="15" autocomplete="off">
                <button hidden></button>
                <span id="initLavelButton" class="fa-solid fa-location-crosshairs modal-header-button"></span>
            </form>
            <span id="closdModalButton" class="fa-solid fa-xmark modal-header-button"></span>
        </div>
        <div id="mapContainer">
        
        </div>
    </section>
</div>
