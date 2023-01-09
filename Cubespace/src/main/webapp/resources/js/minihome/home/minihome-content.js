/* 깐부 메시지 관련 상수 */
const dearFriend = document.getElementById("dearFriend");

/* 깐부 메시지 길이 제한 */
dearFriend.addEventListener("input", () => {
    if(dearFriend.value.length > 100) {
        const sel = dearFriend.selectionEnd;
        dearFriend.value = dearFriend.value.substring(0, dearFriend.value.length-1);
        dearFriend.selectionEnd = sel;
    }
})

/* 깐부 메시지 남기기 */
document.getElementById("writeBtn").addEventListener("click", e => {
    if(minihomeNo == loginNo){
        alert("자기 자신에게 메시지를 남길 수 없습니다.");
        return;
    }

    $.ajax({
        url : "/friendFlag",
        data : {"homeNo" : minihomeNo,
                "loginNo" : loginNo},
        type : "GET",
        success : (friendFlag) => {
            if(dearFriend.value.length > 0) {
                if(friendFlag > 0) {
                    $.ajax({
                        url : "/insertMessage",
                        data : {"content" : dearFriend.value,
                                "homeNo" : minihomeNo,
                                "loginNo" : loginNo,},
                        type : "GET",
                        success : (friendMessage) => {
                            // friend-message div
                            const firendMessageDiv = document.createElement("div");
                            firendMessageDiv.classList.add("friend-message");
                            firendMessageDiv.style.display = "flex";
    
                            // message-content div
                            const messageContentDiv = document.createElement("div");
                            messageContentDiv.classList.add("message-content");
    
                            // friend-name button
                            const friendNameBtn = document.createElement("button");
                            friendNameBtn.classList.add("friend-name");
                            friendNameBtn.style.fontFamily = "'" + fontNo + "'";
                            friendNameBtn.style.cursor = "text";
                            friendNameBtn.innerText = friendMessage.memberNickname;
    
                            // colon span
                            const colonSpan = document.createElement("span");
                            colonSpan.innerText = "::";
                            colonSpan.style.fontFamily = "'" + fontNo + "'";
    
                            // message span1
                            const messageSpan1 = document.createElement("span");
                            messageSpan1.classList.add("message");
    
                            // message span2
                            const messageSpan2 = document.createElement("span");
                            messageSpan2.title = dearFriend.value;
                            messageSpan2.innerText = dearFriend.value;
                            messageSpan2.style.fontFamily = "'" + fontNo + "'";
    
                            // message span1 append
                            messageSpan1.append(messageSpan2);
    
                            // message-content div append
                            messageContentDiv.append(friendNameBtn, colonSpan, messageSpan1);
    
                            // message-time div
                            const messageTimeDiv = document.createElement("div");
                            messageTimeDiv.classList.add("message-time");
    
                            // message-time span
                            const messageTimeSpan = document.createElement("span");
                            messageTimeSpan.innerText = "방금 전";
                            messageTimeSpan.style.fontFamily = "'" + fontNo + "'";
    
                            // delete-btn button
                            const deleteBtnButton = document.createElement("button");
                            deleteBtnButton.classList.add("delete-btn");
                            deleteBtnButton.value = friendMessage.commentNo;
                            deleteBtnButton.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    
                            // message-time div append
                            messageTimeDiv.append(messageTimeSpan, deleteBtnButton);
    
                            // friend-message div append
                            firendMessageDiv.append(messageContentDiv, messageTimeDiv);
    
                            // append end
                            document.querySelector(".friend-message-container").prepend(firendMessageDiv);
    
                            deleteBtnButton.addEventListener("click", () => {deleteMessage(deleteBtnButton);});
                            
                            dearFriend.value = "";
                        },
                        error : () => {console.log("깐부 메시지 등록 실패");}
                    })

                } else {
                    alert("깐부 상태일 때 메시지를 남길 수 있습니다.");
                }

            } else {
                alert("메시지를 입력해주세요.");
            }
        },
        error : () => {console.log("깐부 사이 확인 실패");}
    });
})

/* 깐부 메시지 지우기 */
const deleteBtn = document.getElementsByClassName("delete-btn");

for(let btn of deleteBtn) {
    btn.addEventListener("click", () => {
        deleteMessage(btn);
    })
}

const deleteMessage = (btn) => {
    if(confirm("메시지를 삭제하시겠습니까?")) {
        $.ajax({
            url : "/deleteMessage",
            data : {"commentNo" : btn.value},
            type : "GET",
            success : (result) => {
                if(result > 0) {
                    alert("메시지가 삭제되었습니다.");
                    btn.parentElement.parentElement.remove();
                    $(".friend-message").slice(0, 5).css("display", "flex");
                }
                
                else {console.log("깐부 메시지 삭제 실패");}
            },
            error : () => {console.log("깐부 메시지 삭제 실패");}
        })
    }
}

/* 깐부 메시지 더보기 */
function more(){
    $(".friend-message:hidden").slice(0, 5).css("display", "flex");
    if($(".friend-message:hidden").length == 0){
        $("#moreBtn").css("display", "none");
    }
}

$(() => {
    more();
    
    $("#moreBtn").click(e => {
        e.preventDefault();
        more();
    });
})

/* 상단으로 가기 */
$("#topBtn").click(() => {
	$("#homeArea").animate({scrollTop : 0}, 400);
	return false;
});