<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<jsp:include page="/WEB-INF/views/include/allFontMusic.jsp"/>

<style>
    .fa-gear {
        margin: 0 5px;
    }
</style>

<section class="side">
        <div class="sideBarLink">
            <a href="/manage/music" class="musicTab">
                <i class="fa-solid fa-gear"></i> 배경음악 설정
            </a>
            <a href="/manage/font" class="fontTab">
                <i class="fa-solid fa-gear"></i> 폰트 설정
            </a>
            <a href="/manage/friend" class="friendTab">
                <i class="fa-solid fa-gear"></i> 깐부 관리
            </a>
            <a href="/manage/menu" class="menuTab">
                <i class="fa-solid fa-gear"></i> 메뉴 관리
            </a>
            <a href="/manage/background" class="backgroundTab">
                <i class="fa-solid fa-gear"></i> 배경 설정
            </a>
        </div>

    </section>