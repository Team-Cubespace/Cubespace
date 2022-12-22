<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="album-main">
    <header>
        <span>사진첩 작성</span>
    </header>
    <form id="writeAlbumForm" action="/albumWrite" method="POST" encType="">
        <div class="input-row">
            <label for="">폴더</label>
            <select name="" id="">
                <option value="">폴더1</option>
                <option value="">폴더2</option>
                <option value="">폴더3</option>
            </select>
        </div>
        <div class="input-row">
            <label for="">제목</label>
            <input name="albumTitle" type="text" placeholder="제목을 입력하세요">
        </div>
        <div class="input-row">
            <label for="">내용</label>
            <textarea name="" id="" rows="6" placeholder="내용을 입력하세요"></textarea>
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
            <input type="text" name="latitude" hidden>
            <input type="text" name="longitude" hidden>
        </div>
        <div class="input-row">
            <label>공개설정</label>
            <ul class="radio-list">
                <li>
                    <input type="radio" id="scope1" name="scope" checked>
                    <label class="radio" for="scope1">
                        <i class="fa-solid fa-check"></i>
                    </label>
                    <label for="scope1">공개</label>
                </li>
                <li>
                    <input type="radio" id="scope2" name="scope">
                    <label class="radio" for="scope2">
                        <i class="fa-solid fa-check"></i>
                    </label>
                    <label for="scope2">깐부공개</label>
                </li>
                <li>
                    <input type="radio" id="scope3" name="scope">
                    <label class="radio" for="scope3">
                        <i class="fa-solid fa-check"></i>
                    </label>
                    <label for="scope3">비공개</label>             
                </li>
            </ul>
        </div>
        <div class="input-row">
            <label for="">스크랩설정</label>
            <ul class="radio-list">
                <li>
                    <input type="radio" id="scrap1" name="scrap" checked>
                    <label class="radio" for="scrap1">
                        <i class="fa-solid fa-check"></i>
                    </label>
                    <label for="scrap1">허용</label>
                </li>
                <li>    
                    <input type="radio" id="scrap2"  name="scrap">
                    <label class="radio" for="scrap2">
                        <i class="fa-solid fa-check"></i>
                    </label>
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
                
            </ul>
        </div>

        <div class="form-button-area">
            <button id="submitButton" type="submit">작성</button>
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
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ab8d18a2840806f79cff0f4f1542dde4&libraries=services"></script>
<script src="/resources/js/minihome/album/album-write.js"></script>