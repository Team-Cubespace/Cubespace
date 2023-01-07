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
                            friendNameBtn.classList.add("friend-name", "member-nickname", "nickname-drop-down-button");
                            friendNameBtn.style.fontFamily = "'" + fontNo + "'";
                            friendNameBtn.innerText = friendMessage.memberNickname;
    
                            // nickname-drop-down-box ul
                            const nicknameUl = document.createElement("ul");
                            nicknameUl.classList.add("nickname-drop-down-box");
    
                            // drop-down li1
                            const dropdownLi1 = document.createElement("li");
    
                            // drop-down li2
                            const dropdownLi2 = document.createElement("li");
    
                            // drop-down a1
                            const dropdownA1 = document.createElement("a");
                            dropdownA1.innerText = "미니홈피";
                            dropdownA1.href = "/minihome/" + friendMessage.memberNo;
    
                            // drop-down a2
                            const dropdownA2 = document.createElement("a");
                            dropdownA2.innerText = "신고";
    
                            // drop-down li1 append
                            dropdownLi1.append(dropdownA1);
    
                            // drop-down li2 append
                            dropdownLi2.append(dropdownA2);
    
                            // nickname-drop-down-box ul append
                            nicknameUl.append(dropdownLi1, dropdownLi2);
    
                            // friend-name button append
                            friendNameBtn.append(nicknameUl);
    
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
    
                            // 각 요소 함수 추가
                            friendNameBtn.addEventListener("click", () => {
                                friendNameBtn.firstElementChild.classList.toggle("show");
                                friendNameBtn.firstElementChild.style.left = e.offsetX + "px";
                                friendNameBtn.firstElementChild.style.top = e.offsetY + "px";
                            });
    
                            friendNameBtn.addEventListener("blur", ()=>{
                                setTimeout(()=> {
                                    friendNameBtn.firstElementChild.classList.remove("show");
                                }, 100);
                            })
    
                            dropdownA1.addEventListener("click", e => {openMinihome(dropdownA1.href); e.preventDefault();});
                            dropdownA2.addEventListener("click", () => {reportFriend(friendMessage.memberNo)});
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