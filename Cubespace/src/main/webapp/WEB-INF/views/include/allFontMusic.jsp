<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    

   
    <%-- 내 폰트 설정 --%>
    <c:forEach var="font" items="${allFontList}">
    <c:if test="${font.fontNo == minihome.fontNo}">
        <c:set var="myFont" value="${font.fontNo}"/>
    </c:if>

    <style>
        @font-face{
            font-family : "${font.fontNo}";
            src : url(${font.fontPath});
        }
    </style>
    </c:forEach>



    <style>
    *:not(.content){
        font-family : "${myFont}";
    }

    input:not(#minihomeTitle), textarea:not(.profile-message) {
        font-family : "${loginMember.ownFontNo}";
    }

    </style>



    <%-- 내 배경음악 설정 --%>
    <c:forEach var="music" items="${allMusicList}">
    <c:if test="${music.musicNo == minihome.musicNo}">
        <c:set var="myMusic" value="${music.musicNo}"/>
    </c:if>

    <%-- 여기에 어떤 코드를 쓰면 될까요 --%>
    </c:forEach>

    <style>
        .content-area{
            background-color : ${minihome.frameColor};
        }
    </style>