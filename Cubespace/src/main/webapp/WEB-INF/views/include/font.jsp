<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
    
    
    <c:forEach var="font" items="${fontList}">
    <c:if test="${font.fontNo == loginMember.ownFontNo}">
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
    *{
        font-family : "${myFont}";
    }
    </style>


