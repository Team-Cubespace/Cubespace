/* 값을 저장할 변수 선언 */
let memberNo;
let secretMessage;

const guestInput = document.getElementsByClassName("guest-input")[0];
const checkbox = document.getElementsByClassName("switch")[0];


// guestInput.addEventListener("keyup",()=>{
//     console.log(guestInput.value);
//     console.log(checkbox.checked);
// })

// 작성 시 호출할 함수 선언
const WriteGuestbook=()=>{
    
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
        console.log(guestInput.value); // 글내용 확인
        console.log(secretMessage); // 비밀글 체크여부 확인
        console.log(loginMemberNo); // 로그인 번호 확인
        
        $.ajax({
            url : "/writeGuestbook",
            data: {"guestInput":guestInput.value,"secretMessage":secretMessage,"loginMemberNo":loginMemberNo},
            success : writeGuestbookInsert =>{
    
                if(writeGuestbookInsert == 1){
                    console.log("작성 성공");
                }else {
                    console.log("작성 실패");
                }
            }
        })
    }
};

/////////////////////////////////////////////////////////////
/*
목록조회 함수
쓰기 함수
수정 함수 

게시글 작성(a함수)시
1. 글 내용이 없다면 제출 안되고 메시지 출력 
2. 글이 있다면 비밀글 값 가지고 이동 후 INSERT
3. INSERT 성공 시 방명록 다시 조회하여 JSON파일로 스크립트로 
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

if(){ //주인일때
    
    if(){ //공개일떄

    }else{ //비공개일때
    }

}else{ // 아닐때
    if(){ // 작성자일때

        if(){ // 공개일때

        }else{ //비공개일때
        }

    }else{ //그 외 닝갠

        if(){ // 공개일때

        }else{ //비공개일때
        }
    }
}
*/
