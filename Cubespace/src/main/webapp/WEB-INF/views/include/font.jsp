<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    

   
    
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


    <c:if test="${myFont == 2 || myFont == 3 || myFont == 4 
        || myFont == 5 || myFont == 7 || myFont == 8}">
    <style>
    body{font-size = 15px;}
    </style>
    </c:if> 


    
    <style>
    *{
        font-family : "${myFont}";
    }
    </style>


