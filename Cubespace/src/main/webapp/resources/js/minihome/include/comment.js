// 페이지 로딩시 댓글관련 이벤트 초기화
(()=>{
    // 댓글 드롭박스 초기화
    const commentDropDownButtonList = document.getElementsByClassName("comment-drop-down-button");
    for(let button of commentDropDownButtonList) {
        // 클릭 시 메뉴 출력
        button.addEventListener("click", e=>{
            e.currentTarget.firstElementChild.style.display = "block";
        });
        
        // 블러 시 메뉴 삭제
        button.addEventListener("blur", e=>{
            setTimeout(()=>{
                button.firstElementChild.style.display = "none";
            }, 100);
        });
    }
})();

/* 답글 작성 영역 생성 */
function addCommentArea(commentNo, target) {
    // 현재 눌린 버튼이 속한 li 찾기
    let commentRow = target;
    for(;commentRow.nodeName != "LI"; commentRow = commentRow.parentElement);

    // 이미 작성 영역이 존재하면
    if(commentRow.nextElementSibling != null && commentRow.nextElementSibling.classList.contains("comment-write-row")) {
        return; // 리턴
    }
    
    // 댓글 작성 영역 요소 생성
    const commentWriteRow = document.createElement("div");
    commentWriteRow.classList.add("comment-write-row", "child-comment");

    // 댓글 프로필 이미지
    const commentProfileImageArea = document.createElement("div");
    commentProfileImageArea.classList.add("comment-profile-image-area")
    const commentProfileImage = document.createElement("img");
    // 이미지 소스 대입
    commentProfileImage.src = "/resources/images/zz.png";

    const commentContent = document.createElement("div");
    commentContent.classList.add("comment-content");
    const textarea = document.createElement("textarea");
    // name값 세팅
    // textarea.setAttribute("name", "");
    textarea.setAttribute("placeholder", "댓글 추가..");
    textarea.setAttribute("onkeyup", "resizeTextarea(this)");
    textarea.setAttribute("rows", 1);
    // 버튼 영역 생성
    const commentWriteButtonArea = document.createElement("div");
    commentWriteButtonArea.classList.add("comment-write-button-area");
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.setAttribute("type", "button");
    cancelButton.innerText = "취소";
    // 취소버튼 이벤트 등록 필요
    cancelButton.addEventListener("click", e=>{
        // 취소 버튼을 누르면 
        // 눌린 버튼에서 가장 가까이 있는 클래스 명이 comment-write-row인 요소를 찾아 삭제

        // 시작을 자신으로 초기화
        let commentWriteRow = e.currentTarget;

        // 반복문으로 요소 찾기
        for(; !commentWriteRow.classList.contains("comment-write-row"); commentWriteRow = commentWriteRow.parentElement);
        
        // 찾은 요소 삭제
        commentWriteRow.remove();
    });

    const insertButton = document.createElement("button");
    cancelButton.classList.add("insert-button");
    insertButton.setAttribute("type", "button");
    insertButton.innerText = "등록";
    // 등록버튼 이벤트 등록 필요

    // 요소 조립
    commentWriteButtonArea.append(cancelButton, insertButton);
    commentContent.append(textarea, commentWriteButtonArea);
    commentProfileImageArea.append(commentProfileImage);
    commentWriteRow.append(commentProfileImageArea, commentContent);
    
    // 요소 출력
    commentRow.after(commentWriteRow);
}

/* 답글 작성 */
function insertComment(commentNo) {
    // ajax 코드

    // 댓글 리스트 재요청
}

/* 자식 댓글 출력/삭제 */
function toggleChildComment(target) {
    // 자식 댓글 초기화
    console.log(target);
    let childComment = target.nextElementSibling;
    console.log(childComment);

    while(childComment.classList.contains("child-comment")) {
        childComment.classList.toggle("show");
        childComment = childComment.nextElementSibling;
    }
}

/* 댓글 textarea */
const resizeTextarea = (textarea)=>{
   textarea.style.height = "auto"   // height 초기화
   textarea.style.height = textarea.scrollHeight - 12 + "px";
}
/* 댓글 리스트 비동기 조회 및 출력 */

/* 댓글 수정 함수 */

/* 댓글 삭제 함수 */
