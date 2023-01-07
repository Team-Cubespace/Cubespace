/* 값을 저장할 변수 선언 */
// let memberNo;
let alarmNo
let alarmNoList=[];

const alarmLeftChoice =document.getElementById("alarmLeftChoice")
const alarmRightChoice =document.getElementById("alarmRightChoice")
const modalChoice = document.querySelectorAll(".modal-choice")[1]
const alarmSection = document.querySelectorAll(".mebmer-search-profile")[1];
/* 깐부알림 함수선언  */
const selectMemeberAlarm=()=>{
    alarmLeftChoice.classList.add("alarm-select-css")
    alarmLeftChoice.classList.remove("alarm-delete-css")
    alarmRightChoice.classList.add("alarm-delete-css")
    alarmRightChoice.classList.remove("alarm-select-css")
    modalChoice.setAttribute("id","modalChoiceLeft")

    // 전체삭제 버튼 지우기
    const deleteall = document.querySelector(".delete-all");
    if(deleteall){
        deleteall.remove()
    }
    memberNotifications()
}

/* 비동기로 내가 받은 깐부 신청 알림 목록조회 */
const memberNotifications=()=>{

    $.ajax({
        url : "/memberNotifications",
        data: {"loginMemberNo":loginMemberNo},
        dataType : "JSON",
        success : memberNotificationsList =>{
            
        alarmSection.innerHTML="";  // 이전 내용 제거

        for(let alarmProfile of memberNotificationsList){
            /* 회원번호 전역변수 저장 */
            memberNo= alarmProfile.memberNo;
            alarmNo=alarmProfile.alarmProfile;

            const mebmer_profile = document.createElement("div");
            mebmer_profile.classList.add("mebmer-profile");

                const profile_head = document.createElement("div");
                profile_head.classList.add("profile-head");

                    const member_img = document.createElement("img");
                    member_img.classList.add("member-img");

                    /* DB에 프로필 사진이 NUll이라면 */
                    if(alarmProfile.profileImage == null){
                        member_img.setAttribute("src","/resources/images/common/cubes.png")
                    } else{//null이 아니라면
                        member_img.setAttribute("src",alarmProfile.profileImage)
                    } 

                    /* 프로필 닉네임 생성 */
                    const member_nickname =document.createElement("div");
                    member_nickname.classList.add("member-nickname");
                    member_nickname.innerText=alarmProfile.memberNickname;

                /* 바디부분 생성 */
                const profile_body = document.createElement("div");
                profile_body.classList.add("profile-body");

                    /* 수락 생성 */
                    const member_accept = document.createElement("div");
                    member_accept.classList.add("member-accept");
                    member_accept.setAttribute("onclick","return notificationsAccept("+alarmProfile.memberNo+", this)"); //수락함수호출하기

                        const fa_check = document.createElement("i");
                        fa_check.classList.add("fa-check","fa-solid");
                        fa_check.setAttribute("id","faCheck");

                        const member_accept_div = document.createElement("div");
                        member_accept_div.innerText="수락";
                    
                    /* 거절 생성 */
                    const member_cancel = document.createElement("div");
                    member_cancel.classList.add("member-cancel");
                    member_cancel.setAttribute("onclick","return notificationsCancel("+alarmProfile.memberNo+", this)"); //거절함수호출하기

                        const fa_xmark = document.createElement("i");
                        fa_xmark.classList.add("fa-xmark","fa-solid");

                        const member_cancel_div = document.createElement("div");
                        member_cancel_div.innerText="거절";

                    /* 미니홈피 생성 */
                    const member_minihome =document.createElement("a");
                    member_minihome.setAttribute("href","/minihome/"+alarmProfile.memberNo);
                    member_minihome.setAttribute("onclick","return openMinihome(this.href)");

                    member_minihome.classList.add("member-minihome");

                        const minihome_img =document.createElement("img");
                        minihome_img.classList.add("minihome-img");
                        minihome_img.setAttribute("src","/resources/images/common/smallCube.png");

                        const member_minihome_div = document.createElement("div");
                        member_minihome_div.innerText="미니홈피";

            alarmSection.append(mebmer_profile);
                mebmer_profile.append(profile_head, profile_body);
                    profile_head.append(member_img, member_nickname);
                    profile_body.append(member_accept, member_cancel,member_minihome);
                        member_accept.append(fa_check, member_accept_div);
                        member_cancel.append(fa_xmark, member_cancel_div);
                        member_minihome.append(minihome_img, member_minihome_div);
            }
        }
    })
}


/* 모달처음 시작시 깐부알림 함수 즉시 적용 */
// (selectMemeberAlarm)()


/* 깐부알림 클릭 시  함수 호출 */
if(alarmLeftChoice!=null){
    alarmLeftChoice.addEventListener("click",selectMemeberAlarm)
}


if(alarmRightChoice!=null){

    /* 활동 알림 마우스 올라갈시 */
    alarmRightChoice.addEventListener("mouseover", () => {
        alarmLeftChoice.classList.add("alarm-delete-css")
        alarmLeftChoice.classList.remove("alarm-select-css")
        alarmRightChoice.classList.add("alarm-select-css")
        alarmRightChoice.classList.remove("alarm-delete-css")
    })
    
    
    /* 활동 알림 마우스 나갈시 */
    alarmRightChoice.addEventListener("mouseout", () => {
        if(document.getElementById("modalChoiceLeft")!=null ){
            alarmLeftChoice.classList.add("alarm-select-css")
            alarmLeftChoice.classList.remove("alarm-delete-css")
            alarmRightChoice.classList.add("alarm-delete-css")
            alarmRightChoice.classList.remove("alarm-select-css")
        }
    })
}

/* 비동기로 내 알림카운트 함수 선언  */
const notificationsCount = ()=>{

    $.ajax({
        url : "/notificationsCount",
        data: {"loginMemberNo":loginMemberNo},
        dataType : "JSON",
        success : notificationsCount =>{

            // 프로필 알림 숫자 변경
            const mainAlarmCount = document.getElementById("mainAlarmCount")
            if(mainAlarmCount!=null){
                mainAlarmCount.innerText=notificationsCount;
            }
            
            const noticeNew = document.getElementById("alarmCount");
            // 헤더 빨간색 추가 / 제거
            if(notificationsCount > 0){ //카운트 있을시 추가
                noticeNew.classList.add("alarm-count");
            }else{ // 없을시 제거 
                noticeNew.classList.remove("alarm-count");
            }
        }
    })
}
/* 즉시 실행 */
(notificationsCount)()

/* 알람 읽음 처리 함수 선언 */
const alarmRead=(alarmNoList)=>{

    if(alarmNoList.length!=0){

        $.ajax({
            url : "/alarmRead",
            data : {"alarmNoList":alarmNoList},
            success : alarmReadCheck =>{

                /* 알림카운트 */
                notificationsCount()
            }
        })
    } 
}

/* 비동기로 활동알림 DB조회 구문작성 */
const activityNotification=()=>{
    $.ajax({
        url : "/activityNotification",
        data: {"loginMemberNo":loginMemberNo},
        dataType : "JSON",
        success : activityNotificationList =>{

            for(let alarmActivity of activityNotificationList){

                /* 전역변수 저장 */
                memberNo= alarmActivity.memberNo;
                alarmNoList.push(alarmActivity.alarmNo)

                const mebmerProfileAlarm = document.createElement("div");
                mebmerProfileAlarm.classList.add("mebmer-profile-alarm");

                    const div = document.createElement("div");

                        const memberImg = document.createElement("img");
                        memberImg.classList.add("member-img");

                        /* DB에 프로필 사진이 NUll이라면 */
                        if(alarmActivity.profileImage == null){
                            memberImg.setAttribute("src","/resources/images/common/cubes.png");
                        } else{//null이 아니라면
                            memberImg.setAttribute("src",alarmActivity.profileImage);
                        } 

                        const contents = document.createElement("div");
                        contents.classList.add("contents");
                        
                            const profileInfoAlarm = document.createElement("div");
                            profileInfoAlarm.classList.add("profile-info-alarm");

                                /* 프로필 닉네임 생성 */
                                const memberNickname =document.createElement("div");
                                memberNickname.classList.add("member-nickname");
                                memberNickname.innerText=alarmActivity.memberNickname;

                                /* 알림생성된 시간 생성 */
                                const alarmTime = document.createElement("div");
                                alarmTime.classList.add("alarm-time");
                                alarmTime.innerText=alarmActivity.alarmCreate;
                            
                            const alarmInfo = document.createElement("div");
                            alarmInfo.classList.add("alarm-info");

                                /* 카테고리 이름 생성 */
                                const typeName = document.createElement("div");
                                typeName.innerHTML="["+alarmActivity.boardTypeName+"]&nbsp;&nbsp;";

                                /* 게시물 제목 생성 */
                                const boardTitle = document.createElement("div");
                                boardTitle.classList.add("board-title");
                                boardTitle.innerText=alarmActivity.boardTitle;

                                /* 댓글/스크랩  생성 */
                                const boardType = document.createElement("div");
                                boardType.classList.add("board-type");

                                if(alarmActivity.alarmType==1){ // 댓글일때
                                    boardType.innerHTML="&nbsp;게시물에 댓글을 남겼습니다.";

                                }else{ // 스크랩일때
                                    boardType.innerHTML="&nbsp;게시물을 스크랩했습니다.";
                                }
                            
                            const alarmDelete = document.createElement("div");
                            alarmDelete.classList.add("alarm-delete");
                            
                            const messageDelete=document.createElement("i");
                            messageDelete.classList.add("fa-solid","fa-xmark","message-delete");
                            messageDelete.setAttribute("onclick","messageDelete(this,"+alarmActivity.alarmNo+")");

                    alarmSection.append(mebmerProfileAlarm);
                        mebmerProfileAlarm.append(div);
                                div.append(memberImg,contents,alarmDelete);
                                    contents.append(profileInfoAlarm,alarmInfo);
                                        profileInfoAlarm.append(memberNickname,alarmTime);
                                        alarmInfo.append(typeName,boardTitle,boardType);
                                    alarmDelete.append(messageDelete)

            }
            alarmRead(alarmNoList)
        }
    })
}


if(alarmRightChoice!=null){

    /* 활동 알림 클릭 시 */
    alarmRightChoice.addEventListener("click",()=>{
        alarmLeftChoice.classList.add("alarm-delete-css")
        alarmLeftChoice.classList.remove("alarm-select-css")
        alarmRightChoice.classList.add("alarm-select-css")
        alarmRightChoice.classList.remove("alarm-delete-css")
        modalChoice.setAttribute("id","modalChoiceRight") 
        alarmSection.innerHTML="";
        activityNotification()
    })
}

if(alarmLeftChoice!=null){

    /* 깐부알림 마우스 올라갈시 */
    alarmLeftChoice.addEventListener("mouseover", () => {
        alarmLeftChoice.classList.add("alarm-select-css")
        alarmLeftChoice.classList.remove("alarm-delete-css")
        alarmRightChoice.classList.add("alarm-delete-css")
        alarmRightChoice.classList.remove("alarm-select-css")
    })
    
    /* 깐부알림 마우스 나갈시 */
    alarmLeftChoice.addEventListener("mouseout", () => {
        if(document.getElementById("modalChoiceRight")!=null ){
            alarmLeftChoice.classList.add("alarm-delete-css")
            alarmLeftChoice.classList.remove("alarm-select-css")
            alarmRightChoice.classList.add("alarm-select-css")
            alarmRightChoice.classList.remove("alarm-delete-css")
        }
    })
}

/* 전체삭제 비동기 함수 선언 */
const messageDeleteAll =(alarmNoList) =>{

    if(alarmNoList.length!=0){

        $.ajax({
            url : "/messageDeleteAll",
            data : {"alarmNoList":alarmNoList},
            success : messageDeleteAll =>{
                
                if(messageDeleteAll > 0){
                    alarmNoList=[];
                    alarmSection.innerHTML="";
                    /* 활동알림목록 조회 */
                    activityNotification()
                }
            }
        })
    } 
}



/* 오른쪽 클릭 시 전체삭제 추가 하기*/
/* 다른스크립트에서 전역변수로 선언했는데 변수명이 사용됨!!! */

if(alarmRightChoice!=null){

    alarmRightChoice.addEventListener("click",()=>{
        /* 만들위치 지정 */
        const deleteall = document.createElement("div");
        const delete_all = document.querySelector(".delete-all");
        alarmNoList=[];
    
        /* 특정위치에 1번만 요소추가하기 */
        if(delete_all==null){
            /* div태그 생성 */
            modalChoice.insertAdjacentElement("afterend",deleteall)
            deleteall.classList.add("delete-all");
            
            /* 자식 전체삭제버튼 생성 */
            const deleteAllButton = document.createElement("div");
            deleteAllButton.classList.add("delete-all-button");
            deleteAllButton.innerHTML="전체삭제";
            deleteall.append(deleteAllButton);
    
            /* 전체삭제 클릭시 전체 삭제 */
            const deleteButton = document.querySelector(".delete-all-button");
            if(deleteButton){
                deleteButton.addEventListener("click",()=>{
                    /* 전체삭제함수 호출 */
                    messageDeleteAll(alarmNoList)
                })
            }
        }
    })
}



/* 삭제버튼 */
const messageDelete = (btn,alarmNo)=>{
    alarmNoList=[];
    //비동기로 디비 업데이트
    $.ajax({
        url : "/messageDelete",
        data : {"alarmNo":alarmNo},
        success : messageDelete =>{
            
            if(messageDelete == 1){

                alarmSection.innerHTML="";
                /* 활동알림목록 조회 */
                activityNotification()
            }
        }
    })
}

/* 수락(비동기) */
// 수락 시 알림 삭제 하고 DB깐부상태 업데이트 친구로
const notificationsAccept =(memberNo, btn) =>{
    $.ajax ({
        url : "/memberAcceptBtn",
        data : {"loginMemberNo":loginMemberNo,"memberNo":memberNo},
        success : memberAccept =>{

            if(memberAccept==1){// 깐부신청수락 성공
                //프로필 삭제 
                const mebmerProfile = btn.parentElement.parentElement;
                mebmerProfile.remove()
            }else{
                alert("깐부신청수락 실패")
            }
        }
    })
}
/* 거절(비동기) */
// 거절 시 알림 삭제 하고 DB깐부상태 삭제
const notificationsCancel =(memberNo, btn) =>{
    $.ajax ({
        url : "/memberCancelBtn",
        data : {"loginMemberNo":loginMemberNo,"memberNo":memberNo},
        success : memberCancel =>{

            if(memberCancel==1){// 깐부신청거절 성공
                //프로필 삭제 
                const mebmerProfile = btn.parentElement.parentElement;
                mebmerProfile.remove()
            }else{
                alert("깐부신청거절 실패")
            }
        }
    })
}

// 전체삭제 css 더 수정 
/* 모달 열기 */
function openmodalAlarm(){
    document.getElementById("modalAlarm").style.display = "block";
    selectMemeberAlarm()
}
/* 모달 닫기 */
function closeModalAlarm(){
    document.getElementById("modalAlarm").style.display = "none";
}