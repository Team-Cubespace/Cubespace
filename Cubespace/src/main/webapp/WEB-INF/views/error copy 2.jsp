<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error</title>

    <style>
        body{
            display: flex;
            height: 100vh;
            justify-content: center;
            align-items: center;

            position: relative;

        }

        .error-container{
            width: 800px;
            height: 300px;
            text-align: center;
        }

        .error-container > h1{
            margin-bottom: 50px;
        }

        .error-content-title{
          
            display: block;
            text-align: left;
            font-weight: bold;
        }

        .button-area{
            text-align: center;
        }

        #background {
            position: absolute;
            z-index: -1;
            height: 600px;
            width: 600px;
            opacity: 0.5;
        }

        .explain{
            font-weight: bold;
        }

        a, button{
            text-decoration: none;
            color: white;
            background-color: rgba(0,0,0,0.6);
            padding: 10px 20px;
            border-radius: 10px;
            border: 0;
            font-size: 16px;
            font-weight: bold;
            margin-right: 10px;
            cursor: pointer;
        }

        a:hover, button:hover{
            background-color: black;
        }
    
    </style>
</head>
<body>
	<img src="/resources/images/banana-logo.png" id="background">
    <div class="error-container">
        <h1>404 NOT FOUND(잘못된 요청)</h1>

        <h3>해당 요청에 대한 페이지가 존재하지 않습니다.</h3>
        
        <div class="btn-area">
            <a href="/">메인 페이지</a>
            <%-- onclick="history.back()" : 뒤로가기 --%>
            
        </div>
    </div>
</body>
</html>