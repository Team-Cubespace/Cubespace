/* 값을 저장할 변수 선언 */
// let memberNo;
let secretMessage;
let gbNo;
let backUp
let prevText;
let gbSecret;

/* 방명록 목록 조회 및 생성 함수 선언 */
const listGuestBook=()=>{

    $.ajax({
        url : "/listGuestBook",
        dataType : "JSON",
        success : guestbookList =>{
            
            const guestListBox = document.getElementsByClassName("guest-list-box")[0];
            
            if(guestbookList==""||guestbookList==null){ // 방명록이 없다면
                const noGuestBookList = document.createElement("div")
                noGuestBookList.innerText="방명록이 없습니다."
                noGuestBookList.classList.add("no-guest-book-List")
                guestListBox.append(noGuestBookList);
                
            } else{ // 방명록이 있다면

                guestListBox.innerHTML=""; // 이전 내용 제거
                
                for(let listGuestbook of guestbookList){
    
                    /* 전역변수 저장 */
                    gbNo= listGuestbook.gbNo;
                    gbSecret= listGuestbook.gbSecret;

                    // listGuestbook.gbContent          글내용
                    // listGuestbook.gbCreate           작성시간
                    // listGuestbook.gbNo               방명록번호
                    // listGuestbook.gbSecret           비밀글여부
                    // listGuestbook.receiverNo         미니홈피주인
                    // listGuestbook.senderNo           글남긴놈  
                    // listGuestbook.memberNickname     글남긴놈(닉네임)  
                    // listGuestbook.profileImage       글남긴놈프로필경로 
                    
                    const guest_message = document.createElement("div");
                    guest_message.classList.add("guest-message");
    
                        const message_header = document.createElement("div");
                        message_header.classList.add("message-header");
    
                            const div = document.createElement("div");
    
                                /* 닉네임 생성 */
                                const member_nickname = document.createElement("button");
                                member_nickname.classList.add("member-nickname","nickname-drop-down-button");
                                member_nickname.innerText=listGuestbook.memberNickname;
                                
                                const nicknameDropDownBox = document.createElement("ul")
                                nicknameDropDownBox.classList.add("nickname-drop-down-box");
                                
                                        const li1 = document.createElement("li")
                                            const a1 = document.createElement("a")
                                            a1.setAttribute("href","/minihome/"+listGuestbook.senderNo+"")
                                            a1.setAttribute("onclick","return openMinihome(this.href)")
                                            a1.innerText="미니홈피";

                                        const li2 = document.createElement("li")
                                            const a2 = document.createElement("a")
                                            a2.setAttribute("onclick","reportFriend("+listGuestbook.gbNo+")")
                                            a2.innerText="신고";


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
                                            btn_modify.setAttribute("onclick","modifyGuestBook("+listGuestbook.gbNo+",'"+gbSecret+"', this)")
                                            btn_delete.innerText="삭제";
                                            btn_delete.setAttribute("onclick","deleteGuestBook("+listGuestbook.gbNo+", this)")
                                            btn_box.append(btn_secret,btn_modify,btn_delete);
            
                                        }else{ // 방명록 비공개
                                            btn_modify.innerText="수정";
                                            btn_modify.setAttribute("onclick","modifyGuestBook("+listGuestbook.gbNo+",'"+gbSecret+"', this)")
    
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
                                        member_message.innerHTML=listGuestbook.gbContent;
                                        member_message.classList.add("public");
                                        message_box.append(member_message);
    
    
                                    }else { // 방명록 비공개
                                        secretImg.setAttribute("src","/resources/images/common/guestBook.png")
                                        secretText.innerText="비밀글(이글은 작성자와 주인만 볼수 있어요)";
                                        member_message.innerHTML=listGuestbook.gbContent;
                                        message_box.append(secret_situation,member_message);
                                        secret_situation.append(secretImg,secretText);
                                    }
    
                                } else { // 그외사람
    
                                    if(listGuestbook.gbSecret =='N'){ // 방명록 공개
                                        member_message.innerHTML=listGuestbook.gbContent;
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
                                    member_nickname.append(nicknameDropDownBox);
                                    nicknameDropDownBox.append(li1,li2);
                                    li1.append(a1);
                                    li2.append(a2);
                            message_body.append(member_img,message_box);
                                member_img.append(img);
                }
            }
            initNicknameDropDown()
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
                resetInput()
                /* 목록 조회 */
                listGuestBook()
                alert("방명록이 삭제 되었습니다.")


            }else{ // 방명록삭제 실패
                alert("방명록삭제 실패")
            }

        }
    })
}

/* 방명록 수정 버튼 함수 선언 */
const modifyGuestBook =(gbNo,gbSecret,btn)=>{
    const btnSecondary =document.querySelector(".btn-secondary")
    
    // 이미 수정 중일때
    if(backUp!=null){
        let checkUpdate=confirm("다른 방명록이 수정 중입니다.\n현재 방명록을 수정하시겠습니까?")
        
        if(checkUpdate){ // 확인
            /* 수정 제출버튼 생성 */
            btnSecondary.setAttribute("onclick","updateGuestBook("+gbNo+")")

            // 기존 내용 백업
            prevText.innerText=backUp;
            // 입력창 값 삭제
            guestInput.value="";

            /* guestInput요소 선택 */
            prevText =  btn.parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild

            /* 기존 방명록 글 백업 */
            backUp =prevText.innerText

            /* 기존 글 입력창에 넣기  */
            guestInput.value = backUp;
            
            /* 글 수정시 바로바로 변경됨 */
            guestInput.onkeyup = () => {prevText.innerText=guestInput.value;}

            if(gbSecret=='Y'){
                checkbox.checked=true
            }else{
                checkbox.checked=false
            }
        
        }else{ // 취소시 
        }

    }else{
        
        /* 수정 제출버튼 생성 */
        btnSecondary.setAttribute("onclick","updateGuestBook("+gbNo+")")
        btnSecondary.innerText="수정하기";
    
        /*  수정 취소버튼 생성 */
        document.getElementsByClassName("btn-cancellation")[0].style.display = "block";
    
        /* guestInput요소 선택 */
        prevText =  btn.parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild
    
        /* 기존 방명록 글 백업 */
        backUp =prevText.innerText
    
        /* 기존 글 입력창에 넣기  */
        guestInput.value = backUp;
        
        /* 글 수정시 바로바로 변경됨 */
        guestInput.onkeyup = () => {prevText.innerText=guestInput.value;}

        if(gbSecret){
            checkbox.checked=true
        }else{
            checkbox.checked=false
        }
    }
}

// 수정완료 제출 버튼 함수 선언
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

/* 초기화 함수 선언 */
function resetInput (){

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
    // 수정 버튼 제거
    document.getElementsByClassName("btn-cancellation")[0].style.display = "none";
}

// 수정취소 버튼 함수 선언
const cancelUpdate =()=>{

    /* 백업 */
    prevText.innerText=backUp;
    /* 초기화 */
    resetInput()
}
