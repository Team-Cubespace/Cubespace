/* 오른쪽 클릭 시 전체삭제 추가 하기*/
/* 다른스크립트에서 선언했는데 변수명이 사용됨!!!! */
rightChoice.addEventListener("click",()=>{
    /* 만들위치 지정 */
    const member_search_input_div = document.querySelector(".member-search-input-div");
    const deleteall = document.createElement("div");
    const delete_all = document.querySelector(".delete-all");

    /* 특정위치에 1번만 요소추가하기 */
    if(delete_all==null){
        /* div태그 생성 */
        member_search_input_div.insertAdjacentElement("afterend",deleteall)
        deleteall.classList.add("delete-all");
        
        /* 자식 전체삭제버튼 생성 */
        const deleteAllButton = document.createElement("div");
        deleteAllButton.classList.add("delete-all-button");
        deleteAllButton.innerHTML="전체삭제";
        deleteall.append(deleteAllButton);
    }
})

/* 왼쪽 클릭시 */
/* 전체삭제버튼 삭제 */
leftChoice.addEventListener("click",()=>{

        const deleteall = document.querySelector(".delete-all");
        deleteall.remove()
})

/* 전체삭제 */
const deleteButton = document.querySelector(".delete-all-button");
if(deleteButton){
    deleteButton.addEventListener("click",()=>{
        const section = document.querySelector(".mebmer-search-profile");
        section.innerHTML="";
    })
}


/* 강사님께 여쭤보기 2 도와주세요 */
/* 삭제 */ //콘솔 오류 왜나냐 ?
const messageDeleteButton =document.querySelector(".message-delete");
messageDeleteButton.addEventListener("click",()=>{
    messageDelete()
})

const messageDelete = (btn)=>{
    /* 강사님께 여쭤보기 3 도와주세요 */
    const remove = btn.parentElement.parentElement.parentElement;
    remove.remove()
}


/* 수락(비동기) */
// 수락 시 알림 삭제 하고 DB깐부상태 업데이트 친구로

/* 거절(비동기) */
// 거절 시 알림 삭제 하고 DB깐부상태 삭제


// main-memberSearch.js 강사님 도움
// 삭제 콘솔오류 강사님 도움
// 부모의부모의부모 선택하는거 강사님 도움(이게 맞는코드인가?)
// 전체삭제 css 더 수정 
