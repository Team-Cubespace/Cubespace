/* 값을 저장할 변수 선언 */
// let memberNo;

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
    // alarmSection.innerHTML=""; 임시 주석

    // 전체삭제 버튼 지우기
    const deleteall = document.querySelector(".delete-all");
    if(deleteall){
        deleteall.remove()
    }
    
    /* 비동기로 내가 받은 깐부 신청 알림 목록조회 */
    $.ajax({
        url : "/memberNotifications",
        data: {"loginMemberNo":loginMemberNo},
        dataType : "JSON",
        success : memberNotificationsList =>{

            alarmSection.innerHTML="";  // 이전 내용 제거

            for(let alarmProfile of memberNotificationsList){
                /* 회원번호 전역변수 저장 */
                memberNo= alarmProfile.memberNo;


            }
        }
    })
}

/* 모달처음 시작시 깐부알림 함수 즉시 적용 */
(selectMemeberAlarm)()

/* 깐부알림 클릭 시  함수 호출 */
alarmLeftChoice.addEventListener("click",selectMemeberAlarm)

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

/* 활동 알림 클릭 시 */
alarmRightChoice.addEventListener("click",()=>{
    alarmLeftChoice.classList.add("alarm-delete-css")
    alarmLeftChoice.classList.remove("alarm-select-css")
    alarmRightChoice.classList.add("alarm-select-css")
    alarmRightChoice.classList.remove("alarm-delete-css")
    modalChoice.setAttribute("id","modalChoiceRight") 
    alarmSection.innerHTML="";

    /* 비동기로 활동알림 DB조회 구문작성 */
})

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

/* 오른쪽 클릭 시 전체삭제 추가 하기*/
/* 다른스크립트에서 선언했는데 변수명이 사용됨!!!! */
alarmRightChoice.addEventListener("click",()=>{
    /* 만들위치 지정 */
    const deleteall = document.createElement("div");
    const delete_all = document.querySelector(".delete-all");

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
                alarmSection.innerHTML="";
            })
        }
    }
})

/* 삭제버튼 */
const messageDelete = (btn)=>{
    const remove = btn.parentElement.parentElement.parentElement;
    remove.remove()
}


/* 수락(비동기) */
// 수락 시 알림 삭제 하고 DB깐부상태 업데이트 친구로

/* 거절(비동기) */
// 거절 시 알림 삭제 하고 DB깐부상태 삭제


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