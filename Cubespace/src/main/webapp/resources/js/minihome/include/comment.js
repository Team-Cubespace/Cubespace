/* 댓글 리스트 생성 */
const createCommentList = (commentList) => {
    const commentListArea = document.getElementById("commentListArea");
    commentListArea.innerHTML = "";
    for(let comment of commentList) {
        // 댓글 li
        const commentRow = document.createElement("li");
        commentRow.classList.add("comment-row");
        if(comment.level > 1) {
            commentRow.classList.add("child-comment");
        }
        
        // 댓글 프로필 이미지 영역
        const commentProfileImageArea = document.createElement("div");
        commentProfileImageArea.classList.add("comment-profile-image-area");
        const commentProfileImage = document.createElement("img");
        commentProfileImage.classList.add("comment-profile-image")
        // 조립
        commentProfileImageArea.append(commentProfileImage);


        if(comment.profileImage == null) {    // 프로필 이미지가 비어있으면
            // 기본 이미지 세팅
            commentProfileImage.src = "/resources/images/common/cubes.png";
        } else {
            commentProfileImage.src = comment.profileImage;
        }

        // 댓글 내용 영역
        const commentContent = document.createElement("div");
        commentContent.classList.add("comment-content");
        // 댓글 회원 닉네임 영역
        const commentNicknameArea = document.createElement("div");
        commentNicknameArea.classList.add("comment-nickname-area")
        const memberNickname = document.createElement("span");
        memberNickname.classList.add("member-nickname");
        memberNickname.innerText = comment.memberNickname;

        commentNicknameArea.append(memberNickname);
        if(loginMemberNo == comment.memberNo) { // 자신이 작성한 댓글일 때만 생성
            const commentDropDownButton = document.createElement("button");
            commentDropDownButton.classList.add("comment-drop-down-button", "fa-solid", "fa-ellipsis-vertical");
            commentDropDownButton.addEventListener("click", e=>{
                commentDropDownButton.firstElementChild.style.display = "block";
            });
            
            // 블러 시 메뉴 삭제
            commentDropDownButton.addEventListener("blur", e=>{
                setTimeout(()=>{
                    commentDropDownButton.firstElementChild.style.display = "none";
                }, 100);
            });
            // 드랍다운 메뉴 영역
            const commentDropDownMenu = document.createElement("ul");
            commentDropDownMenu.classList.add("comment-drop-down-menu");
            // 수정 버튼
            const updateComment = document.createElement("li");
            updateComment.innerText = "수정";
            /* 함수 설정 */
            // 삭제 버튼
            const deleteComment = document.createElement("li");
            deleteComment.innerText = "삭제";
            // 조립
            commentDropDownMenu.append(updateComment, deleteComment);
            commentDropDownButton.append(commentDropDownMenu);
            commentNicknameArea.append(commentDropDownButton);
        }
        commentContent.append(commentNicknameArea);

        // 댓글 내용
        const commentContentP = document.createElement("P");
        commentContentP.innerText = comment.commentContent;

        // 답글 버튼 영역
        const commentButtonArea = document.createElement("div");
        commentButtonArea.classList.add("comment-button-area");

        const commentDate = document.createElement("span");
        commentDate.classList.add("comment-date");
        commentDate.innerText = comment.commentCreate;

        
        // 조립
        commentButtonArea.append(commentDate);
        commentContent.append(commentContentP, commentButtonArea);
        
        commentRow.append(commentProfileImageArea, commentContent);
        
        // 댓글 리스트에 댓글 추가
        commentListArea.append(commentRow);
        if(comment.level == 1) {
            const addCommentArea = document.createElement("button");
            addCommentArea.innerText = "답글";
            /* 함수 추가 */
            commentButtonArea.append(addCommentArea);

            // 자식댓글 펼치기 버튼 추가
            const childCommentCount = document.createElement("button");
            childCommentCount.classList.add("child-comment-count")
            childCommentCount.setAttribute("type", "button");
            childCommentCount.setAttribute("onclick", "toggleChildComment(this)");
            childCommentCount.innerText = `댓글 ${comment.childCommentCount}개`;
            commentListArea.append(childCommentCount);
        }
    }
}

// 댓글 목록 조회
const selectCommentList = (albumNo) => {
    $.ajax({
        url: "/selectCommentList",
        data: {
            boardNo: albumNo,
            boardTypeNo: 2
        },
        dataType: "JSON",
        success: result => {
            console.log(result);
            createCommentList(result);
        }
    })
}
/* 답글 작성 */
const insertComment = (commentNo) => {
    // ajax 코드

    // 댓글 리스트 재요청
}

/* 자식 댓글 출력/삭제 */
const toggleChildComment = (target) => {
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


