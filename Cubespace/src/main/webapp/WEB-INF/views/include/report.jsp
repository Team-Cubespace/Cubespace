<!-- JSP 파일로 변환할 때 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%> 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minihome Content Area</title>

    <style>

        .home-area {
            /* position : relative; */
        }
        /* 모달창 css */
        .popup_layer {
        /* position: absolute; */
        position :fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        }
        .popup_box {
        border-radius: 20px;
        position: relative;
        top: 50%;
        left: 50%;
        /* overflow-y: scroll; */
        height: 440px;
        width: 500px;
        transform: translate(-50%, -50%);
        z-index: 1002;
        box-sizing: border-box;
        background: white;
        padding : 20px;


        box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.35);
        -webkit-box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.35);
        -moz-box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.35);
        }
    
        .modal-title {
            font-size : 20px;
            font-weight : bold;
            padding-bottom : 10px;
        }
        .input-row{
            border-bottom: 1px solid #ddd;
            padding: 15px 0px;
            display: flex;
            align-items: flex-start;
            letter-spacing: -1px;
        }
        .input-row > div:first-child {
            width: 100px;
            font-weight: bold;
            /* display: inline-block */
        }
        .input-row >textarea{
            resize: none;
            border: none;
            outline: none;
        }
        /*  */
        .modal-footer {
            display: flex;
            justify-content: end;
            padding: 20px 0px;
        }

        .modal-footer > * {
            margin-left :20px;
            width: 100px;
            height: 30px;
            font-weight: bold;
            border-radius: 10px;
        }

        .modal-footer > :first-child {
            background-color: black;
            color :white;
        }

        .modal-footer > :last-child {
            background-color: white;
        }
    </style>
</head>
<body>
    <!-- 모달창 -->
    <div class="popup_layer" id="popup_layer"  style="display: none;"  >
         
        <div class="popup_box">
            <div class="popup_cont" id = "popup_con"> 
                <div>
                    <div class = "input-row">
                        <span class = "modal-title">회원 신고하기</span>
                    </div>
                    <div class = "input-row">
                        <div class="description">신고 대상</div>
                        <div>
                            <span>이슬</span>
                        </div>
                    </div>
                    <div class = "input-row">
                        <div for="description">신고 사유</div>
                        <textarea name="" id="description" 
                        cols="50" rows="10" placeholder = "신고하려는 사유를 상세히 적어주세요."></textarea>  
                    </div>
                    <div class = "modal-footer">
                        <button id = "reportBtn" >신고</button>
                        <button id = "cancleBtn">취소</button>
                    </div>
                </div>
            </div> 
        </div>
    </div>

</body>
<script>

    let memberName;

    function reportFriend(memberNo){
        document.getElementById("popup_layer").style.display = "block";
        // 신고하는 사람은 loginMember니까
        // 1. 신고받은 사람
        // 2. 신고 내용

        //1. 멤버 이름 가져오는 ajax
        $.ajax({
            url:"/selectreportedMember",
            type : "POST",
            data : {"memberNo": memberNo},
            success : function(result){
                memberName = result;
                console.log("memberName" + memberName);
            }, error : function (){
            }
        })
    }
    document.getElementById("reportBtn").addEventListener("click",function(){
        
        let complainContent = document.getElementById("description").value;
        
        if(complainContent.trim().length == 0){
            alert("신고 사유를 입력해주십시오.")
        } else {

            $.ajax({
            url:"/reportingMember",
            type : "POST",
            data : {"memberNo": memberNo,"complainContent":complainContent},
            success : function(result){
                if (result > 0){
                    alert("신고가 완료되었습니다.");
                    document.getElementById("popup_layer").style.display = "none";
                }
            }, error : function (){
            }
        })

        }
    })

</script>
<!-- html에서 파일을 include 할 수 있도록 해주는 js (근데 VSCode Live Server에서만 보임) -->
<!-- include 방법 : <section class="minihome-rayout"> 안에 <div data-include-path="파일 경로"></div> 작성 -->
<script src="/resources/js/common/temp.js"></script>



</html>