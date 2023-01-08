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
     .side-folder,  header, /*  .input-row, */ .form-button-area, .under-section,  .title-section,  .write-section{
        font-family : "${myFont}";
    } 
    a{
        color: black !important;
    }

    </style>

