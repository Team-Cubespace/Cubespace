<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<footer>
    <!------------------ 푸터 메뉴 ------------------>
    <ul class="footer-menu-nav">
        <li><a href="/projectExplain">프로젝트 소개</a></li>
        <li><a href="/termsOfUse">이용약관</a></li>
        <li><a href="/privatePolicy">개인정보처리방침</a></li>
        <li><a href="/copyrightPolicy">저작권정책</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/admin/member">관리자</a></li>
    </ul>
    <!------------------ 헤더 내용 ------------------>
    <div class="footer-content">
        <div class="footer-description">
            <span>대표자 : BDH</span>
            <span>대표전화 : 010 - 8108 - 1399</span>
            <span>사업자등록번호 : 870 - 85 - 01234</span>
            <span>주소 : 서울특별시 중구 남대문로 120 그레이츠 청계(구 대일빌딩) 2F A클래스 E조</span>
            <span>ⓒCubespace. All Rights Reserved.</span>
        </div>
        <div class="footer-logo">
            <img src="/resources/images/common/mark.gif" alt="푸터 로고 이미지">
        </div>
    </div>
</footer>

    <c:if test="${!empty message}">
        <script>
            alert("${message}")
        </script>

        <c:remove var="message"></c:remove>
    </c:if>