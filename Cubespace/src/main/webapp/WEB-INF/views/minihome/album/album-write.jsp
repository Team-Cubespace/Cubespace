<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/minihome/album/album-write.css">
    <link rel="stylesheet" href="/resources/css/minihome/album/album-common.css">
    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>
    <title></title>
</head>
<body>
    <%-- include side --%>
    <section class="side">
    </section>
    <main>
        <header>
            <span>사진첩 작성</span>
        </header>
        <form action="/albumWrite" method="POST" encType="">
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
                <input type="text" placeholder="제목을 입력하세요">
            </div>
            <div class="input-row">
                <label for="">내용</label>
                <textarea name="" id="" rows="6" placeholder="내용을 입력하세요"></textarea>
            </div>
            <div class="input-row">
                <label for="">위치 설정</label>
                <button>위치설정하기</button>
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
                <label class="add-image" for="">이미지 등록
                    <button id="addImageButton" type="button">
                        <img src="/resources/images/add-image.png" alt="">
                    </button>
                </label>
                <input type="file" multiple>
                <ul></ul>
            </div>
            
        </form>
    </main>
</body>
</html>