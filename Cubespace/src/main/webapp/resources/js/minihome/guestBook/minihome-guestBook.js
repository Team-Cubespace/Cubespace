/* 값을 저장할 변수 선언 */
// let memberNo;
let secretMessage;
let gbNo;
let backUp

/* 방명록 목록 조회 및 생성 함수 선언 */
const listGuestBook=()=>{

    $.ajax({
        url : "/listGuestBook",
        dataType : "JSON",
        success : guestbookList =>{
            
            const guestListBox = document.getElementsByClassName("guest-list-box")[0];
            guestListBox.innerHTML=""; // 이전 내용 제거

            for(let listGuestbook of guestbookList){

                // listGuestbook.gbContent          글내용
                // listGuestbook.gbCreate           작성시간
                // listGuestbook.gbNo               방명록번호
                // listGuestbook.gbSecret           비밀글여부
                // listGuestbook.receiverNo         미니홈피주인
                // listGuestbook.senderNo           글남긴놈  
                // listGuestbook.memberNickname     글남긴놈(닉네임)  
                // listGuestbook.profileImage       글남긴놈프로필경로 

                // 날짜 시간 모양 변경하기
                
                const guest_message = document.createElement("div");
                guest_message.classList.add("guest-message");

                    const message_header = document.createElement("div");
                    message_header.classList.add("message-header");

                        const div = document.createElement("div");

                            /* 닉네임 생성 */
                            const member_nickname = document.createElement("div");
                            member_nickname.classList.add("member-nickname");
                            member_nickname.innerText=listGuestbook.memberNickname;

                            /* 글 작성 날짜 시간 생성 */
                            const time = document.createElement("div");
                            time.innerText="("+listGuestbook.gbCreate+")";

                        const btn_box = document.createElement("div");
                        btn_box.classList.add("btn-box");
                        
                            // 비밀글 변경
                            const btn_secret  = document.createElement("div");
                            // 수정
                            const btn_modify  = document.createElement("div");
                            // 삭제
                            const btn_delete  = document.createElement("div");
                            /* 글 버튼 관련 생성 */
                            if(listGuestbook.receiverNo==loginMemberNo){ // 미니홈주인일때
                                
                                /* 회원번호 전역변수 저장 */
                                gbNo= listGuestbook.gbNo;
                                
                                if(listGuestbook.gbSecret =='N'){ // 방명록 공개
                                    btn_secret.innerText="비밀글변경";
                                    btn_secret.setAttribute("onclick","secretGuestBook("+listGuestbook.gbNo+", this)")
                                    btn_delete.innerText="삭제";
                                    btn_delete.setAttribute("onclick","deleteGuestBook("+listGuestbook.gbNo+", this)")

                                    btn_box.append(btn_secret,btn_delete);

                                }else{ // 방명록 비공개
                                    btn_delete.innerText="삭제";
                                    btn_box.append(btn_delete);
                                }

                            } else{ // 작성자 or 그외사람

                                if(listGuestbook.senderNo==loginMemberNo){ // 방명록 작성자 일때

                                    if(listGuestbook.gbSecret =='N'){ // 방명록 공개
                                        btn_secret.innerText="비밀글변경";
                                        btn_secret.setAttribute("onclick","secretGuestBook("+listGuestbook.gbNo+", this)")
                                        btn_modify.innerText="수정";
                                        btn_modify.setAttribute("onclick","modifyGuestBook("+listGuestbook.gbNo+", this)")
                                        btn_delete.innerText="삭제";
                                        btn_delete.setAttribute("onclick","deleteGuestBook("+listGuestbook.gbNo+", this)")
                                        btn_box.append(btn_secret,btn_modify,btn_delete);
        
                                    }else{ // 방명록 비공개
                                        btn_modify.innerText="수정";
                                        btn_modify.setAttribute("onclick","modifyGuestBook("+listGuestbook.gbNo+", this)")

                                        btn_delete.innerText="삭제";
                                        btn_delete.setAttribute("onclick","deleteGuestBook("+listGuestbook.gbNo+", this)")

                                        btn_box.append(btn_modify,btn_delete);
                                    }

                                } else { // 그외 사람
                                    /* 버튼 안보임 */
                                }
                            }

                    const message_body = document.createElement("div");
                    message_body.classList.add("message-body");

                        const member_img = document.createElement("div");
                        member_img.classList.add("member-img");

                            /* 프로필 이미지 생성 */
                            const img = document.createElement("img");
                            if(listGuestbook.profileImage == null){
                                img.setAttribute("src","/resources/images/common/cubes.png")
                            } else{//null이 아니라면
                                img.setAttribute("src",listGuestbook.profileImage)
                            }      
                    
                        const message_box = document.createElement("div");
                        message_box.classList.add("message-box");

                            /* 비밀글 이미지 및 메시지 생성 */
                            const secret_situation = document.createElement("div");
                            secret_situation.classList.add("secret-situation");

                            const member_message = document.createElement("div");
                            member_message.classList.add("member-message");
                            member_message.setAttribute("style","font-family:"+listGuestbook.memberFontNo+"")


                            const secretImg = document.createElement("img");
                            const secretText = document.createElement("div");
                            /* 작성된 글 내용 생성 */
                            if(listGuestbook.receiverNo==loginMemberNo ||listGuestbook.senderNo==loginMemberNo){ // 미니홈피 주인, 글작성자 일때
                                
                                if(listGuestbook.gbSecret =='N'){ // 방명록 공개
                                    member_message.innerText=listGuestbook.gbContent;
                                    member_message.classList.add("public");
                                    message_box.append(member_message);


                                }else { // 방명록 비공개
                                    secretImg.setAttribute("src","/resources/images/common/guestBook.png")
                                    secretText.innerText="비밀글(이글은 작성자와 주인만 볼수 있어요)";
                                    member_message.innerText=listGuestbook.gbContent;
                                    message_box.append(secret_situation,member_message);
                                    secret_situation.append(secretImg,secretText);
                                }

                            } else { // 그외사람

                                if(listGuestbook.gbSecret =='N'){ // 방명록 공개
                                    member_message.innerText=listGuestbook.gbContent;
                                    member_message.classList.add("public");
                                    message_box.append(member_message);

                                }else { // 방명록 비공개
                                    secretImg.setAttribute("src","/resources/images/common/guestBook.png")
                                    secretText.innerText="비밀글(이글은 작성자와 주인만 볼수 있어요)";
                                    message_box.append(secret_situation);
                                    secret_situation.append(secretImg,secretText);
                                }
                            }

                guestListBox.append(guest_message);
                    guest_message.append(message_header,message_body);
                        message_header.append(div,btn_box);
                            div.append(member_nickname,time);
                        message_body.append(member_img,message_box);
                            member_img.append(img);
            }
        }
    })
}
(listGuestBook)()

const guestInput = document.getElementsByClassName("guest-input")[0];
const checkbox = document.getElementsByClassName("switch")[0];

/* 방명록 작성 함수 선언 */
const writeGuestBook=()=>{
    
    // 입력창에 글이 없을 시
    if(guestInput.value.trim().length == 0 ){ 
        alert("방명록 내용을 입력해주세요.");
        guestInput.value = "";
    }else{
        /* 비밀글 체크 여부 확인 */
        if(checkbox.checked){ // 비밀글 일때
            secretMessage= 'Y';
        }else{ // 비밀글이 아닐때
            secretMessage= 'N';
        }
        
        $.ajax({
            url : "/writeGuestBook",
            data: {"guestInput":guestInput.value,"secretMessage":secretMessage,"loginMemberNo":loginMemberNo},
            success : writeGuestbookInsert =>{
    
                if(writeGuestbookInsert == 1){
                    /* 목록 조회 */
                    listGuestBook()
                    guestInput.value = "";
                    alert("방명록등록 완료")
                }else {
                    alert("방명록작성 실패");
                }
            }
        })
    }
};

/* 방명록 비밀글변경 함수 선언 */
const secretGuestBook =(gbNo,btn)=>{

    $.ajax({
        url : "/secretGuestBook",
        data : {"gbNo":gbNo},
        success : secretChange =>{

            if(secretChange==1){ // 비밀글변경 성공
                /* 목록 조회 */
                listGuestBook()
                alert("비밀글로 변경 되었습니다.")


            }else{ // 비밀글변경 실패
                alert("비밀글변경 실패")
            }
        }
    })
}

/* 방명록 삭제 함수 선언 */
const deleteGuestBook=(gbNo,btn)=>{

    $.ajax({
        url : "/deleteGuestBook",
        data : {"gbNo":gbNo},
        success : guestBookDelete =>{

            if(guestBookDelete==1){ // 방명록삭제 성공
                /* 목록 조회 */
                listGuestBook()
                alert("방명록이 삭제 되었습니다.")

            }else{ // 방명록삭제 실패
                alert("방명록삭제 실패")
            }

        }
    })
}

/* 방명록 수정 함수 선언 */
const modifyGuestBook =(gbNo,btn)=>{

    const btnSecondary =document.querySelector(".btn-secondary")
    btnSecondary.setAttribute("onclick","updateGuestBook("+gbNo+")")
    btnSecondary.innerText="수정하기";

    const test =  btn.parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild

    backUp =test.innerText

    guestInput.value = backUp;
    
    guestInput.onkeyup = () => {test.innerText=guestInput.value;}
}


// 수정 제출 버튼 수정완료
const updateGuestBook=(gbNo)=>{

    //빈문자열 가져오기
    if(guestInput.value.trim().length == 0 ){ 
        alert("방명록 내용을 입력해주세요.");
        guestInput.value = "";
        return;
    }
    if(checkbox.checked){ // 비밀글 일때
        secretMessage= 'Y';
    }else{ // 비밀글이 아닐때
        secretMessage= 'N';
    }

    $.ajax({
        url : "/modifyGuestBook",
        data : {"gbNo":gbNo,"secretMessage":secretMessage,"guestInput":guestInput.value},
        success : guestBookModify =>{
    
            if(guestBookModify==1){ // 방명록수정 성공
                
                /* 목록 조회 */
                listGuestBook()
                alert("방명록이 수정 되었습니다.")
                resetInput()

            }else{ // 방명록삭제 실패
                alert("방명록 수정 실패")
            }
        }
    })
}

const resetInput =()=>{
                // 입력창 값 삭제
                guestInput.value="";
                // 기존 버튼으로 변경 
                const btnSecondary =document.querySelector(".btn-secondary")
                btnSecondary.setAttribute("onclick","writeGuestBook()")
                btnSecondary.innerText="등록하기";
                // 백업변수 값 삭제
                backUp=null
                // 입력창 키업 이벤트 삭제
                guestInput.onkeyup = null;

}




/*
1. 수정 클릭 값 백업
2. textarea에 값 넣어주기 
3. 버튼 원클릭 수정완료 버튼으로 변경 


수정 두번 클릭시 

1.백업본이 null 이 아니라면 메시지출력 = 수정하시겠습니까?
2.수정 클릭하면 이전꺼 백업하고 백업변수에 다시 수정하는 텍스트 삽입
*/




// 수정 시 
/*
기존 값 전역변수에 저장
등록버튼 함수를 a(등록)/ b(수정 )  중 b(수정)함수로 변경(업데이트제출)

취소 시 
- 기존 값으로 돌려둠

수정 누른 후 수정누르면 어캐할까
방법 1)
수정 클릭시 modify 전역변수 체크 1이 아닐 시 수정 가능 
1일때 다른 수정 버튼 클릭 안되게 

방법2)
수정 중 다른 수정 클릭 시 수정을 취소하고 다른 수정을 하겠습니까 메시지 출력
확인 시 기존 수정 중인거 롤백 
다른수정 누르면 백업본 여부 확인하여 알림 띄우고 


*/
