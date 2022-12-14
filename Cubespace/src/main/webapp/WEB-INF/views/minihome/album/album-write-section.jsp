<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<div class="album-main">
    <header>
        <span>사진첩 작성</span>
    </header>
    <form id="writeAlbumForm" action="/albumWrite" method="POST" encType="">
        <div class="input-row">
            <label for="">폴더</label>
            <select name="folderNo" id="">
            <c:forEach var="folder" items="${minihome.albumFolderList}">
                <option value="${folder.folderNo}" <c:if test="${param.folderNo == folder.folderNo}">selected</c:if>>${folder.folderName}</option>
            </c:forEach>
            </select>
        </div>
        <div class="input-row">
            <label for="albumTitle">제목</label>
            <input id="albumTitle" name="albumTitle" type="text" placeholder="제목을 입력하세요" maxLength="25">
        </div>
        <div class="input-row">
            <label for="albumContent">내용</label>
            <textarea name="albumContent" id="albumContent" rows="6" placeholder="내용을 입력하세요" maxLength="1000"></textarea>
        </div>
        <div class="input-row">
            <label for="">위치 찾기</label>
            <div id="locationArea">
                <button type="button" id="addLocationButton">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>위치 설정</span>
                </button>
                <%-- <div class="location">
                    <a href="https://map.kakao.com/link/map/우리회사,37.402056,127.108212" target="_blank">
                        <i class="fa-solid fa-location-dot"></i>
                        우리회사
                    </a>
                    <span class="fa-solid fa-xmark"></span>
                </div> --%>
            </div>
            <input id="latitude" type="text" name="latitude" hidden>
            <input id="longitude" type="text" name="longitude" hidden>
            <input id="locationName" type="text" name="locationName" hidden>
        </div>
        <div class="input-row">
            <label>공개설정</label>
            <ul class="radio-list">
                <li>
                    <input type="radio" id="scope1" name="openFlag" checked value="1">
                    <%-- <label class="radio" for="scope1">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scope1">공개</label>
                </li>
                <li>
                    <input type="radio" id="scope2" name="openFlag" value="2">
                    <%-- <label class="radio" for="scope2">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scope2">깐부공개</label>
                </li>
                <li>
                    <input type="radio" id="scope3" name="openFlag" value="3">
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
                    <input type="radio" id="scrap1" name="albumScrapAllowYN" checked value="Y">
                    <%-- <label class="radio" for="scrap1">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scrap1">허용</label>
                </li>
                <li>    
                    <input type="radio" id="scrap2"  name="albumScrapAllowYN" value="N">
                    <%-- <label class="radio" for="scrap2">
                        <i class="fa-solid fa-check"></i>
                    </label> --%>
                    <label for="scrap2">비허용</label> 
                </li>
            </ul>
        </div>
        <div class="input-row">
            <label class="add-image" for="addFileInput">이미지 등록
                <div class="add-image-info">
                    <img src="/resources/images/add-image.png" alt="">
                    <span><span id="addImageCount">0</span> / 10</span>
                </div>
            </label>
            <input type="file" onchange="addFile(this)" multiple id="addFileInput">
            <div class="add-image-list">
                <ul id="addFileList" class="swiper-wrapper">
                    <%-- <li class="file-item swiper-slide" id="file1">
                        <button>x</button>    
                        <img src="/resources/images/common/cubes.png" alt="">
                    </li> --%>
                </ul>
            </div>
        </div>

        <div class="form-button-area">
            <button id="submitButton" type="submit">작성</button>
            <a id="cancelWrite">취소</a>
        </div>
    </form>

    <section id="mapModal">
        <div class="map-modal-header">
            <form id="searchPlaceForm">
                <input id="searchPlaceInput" type="text" maxLength="30" autocomplete="off">
                <button hidden></button>
                <span id="initLavelButton" class="fa-solid fa-location-crosshairs modal-header-button"></span>
            </form>
            <span id="closdModalButton" class="fa-solid fa-xmark modal-header-button"></span>
        </div>
        <div id="mapContainer">
        
        </div>
    </section>
</div>
