/* 댓글 리스트 생성 */
const createCommentList = (commentList) => {
    const commentListArea = document.getElementById("commentListArea");
    commentListArea.innerHTML = "";
    console.log(commentList);
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
        const memberNickname = document.createElement("button");
        memberNickname.classList.add("member-nickname");
        memberNickname.innerText = comment.memberNickname;
        // 댓글작성자가 로그인한 회원이 아닐경우
        if(loginMemberNo != comment.memberNo) { // 드롭다운 생성
            memberNickname.classList.add("nickname-drop-down-button");
            const nickNameDropDownBox = document.createElement("ul");
            nickNameDropDownBox.classList.add("nickname-drop-down-box");

            const menu1 = document.createElement("li");
            const openMinihome = document.createElement("a");
            openMinihome.href = `/minihome/${comment.memberNo}`;
            openMinihome.setAttribute("onclick", "return openMinihome(this.href)");
            openMinihome.innerText = "스페이스";

            const menu2 = document.createElement("li");
            const report = document.createElement("a");
            report.setAttribute("onclick", `reportFriend(${comment.memberNo})`);
            report.innerText = "신고";

            menu1.append(openMinihome);
            menu2.append(report);

            nickNameDropDownBox.append(menu1, menu2);
            memberNickname.append(nickNameDropDownBox);
        }

        commentNicknameArea.append(memberNickname);
        if(loginMemberNo == comment.memberNo || loginMemberNo == minihomeHostNo) { // 자신이 작성한 댓글일 때만 생성
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
            // 삭제 버튼
            const deleteComment = document.createElement("li");
            deleteComment.innerText = "삭제";
            deleteComment.setAttribute("onclick", `deleteComment(${comment.commentNo})`);

            // 수정 버튼
            if(loginMemberNo == comment.memberNo) {
                const updateComment = document.createElement("li");
                updateComment.innerText = "수정";
                updateComment.setAttribute("onclick", `showUpdateComment(${comment.commentNo}, this)`);
                commentDropDownMenu.append(updateComment);
            }
            // 조립
            commentDropDownMenu.append(deleteComment);
            commentDropDownButton.append(commentDropDownMenu);
            commentNicknameArea.append(commentDropDownButton);
        }
        commentContent.append(commentNicknameArea);

        // 댓글 내용
        const commentContentArea = document.createElement("div");
        commentContentArea.classList.add("comment-content-area");

        const commentContentP = document.createElement("P");
        commentContentP.innerHTML = comment.commentContent;
        commentContentP.style.fontFamily = `"${comment.ownFontNo}"`;
        // 답글 버튼 영역
        const commentButtonArea = document.createElement("div");
        commentButtonArea.classList.add("comment-button-area");

        const commentDate = document.createElement("span");
        commentDate.classList.add("comment-date");
        commentDate.innerText = comment.commentCreate;
        // 부모 댓글이면
      
        // 조립
        commentButtonArea.append(commentDate);
        commentContentArea.append(commentContentP);
        commentContent.append(commentContentArea, commentButtonArea);
        
        commentRow.append(commentProfileImageArea, commentContent);
        
        // 댓글 리스트에 댓글 추가
        commentListArea.append(commentRow);
        if(comment.level == 1) {
            const addCommentArea = document.createElement("button");
            addCommentArea.innerText = "답글";
            commentButtonArea.setAttribute("onclick", `addCommentArea(${comment.commentNo}, this)`)
            commentButtonArea.append(addCommentArea);
        }
        if(comment.childCommentCount > 0) {
            // 자식댓글 펼치기 버튼 추가
            const childCommentCount = document.createElement("button");
            childCommentCount.classList.add("child-comment-count")
            childCommentCount.setAttribute("type", "button");
            childCommentCount.setAttribute("onclick", "toggleChildComment(this)");
            childCommentCount.innerText = `댓글 ${comment.childCommentCount}개`;
            commentListArea.append(childCommentCount);
        }
    }
    initNicknameDropDown();
}

// 댓글 목록 조회
const selectCommentList = (boardNo) => {
    $.ajax({
        url: "/comment/selectCommentList",
        data: {
            boardNo: boardNo,
            boardTypeNo: boardTypeNo
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

/* 댓글 작성 */
(()=>{
    // 댓글 textarea
    const addComment = document.getElementById("addComment");
    // 취소 버튼
    const addCommentCancel = document.getElementById("addCommentCencel");
    // 등록 버튼
    const addCommentInsert = document.getElementById("addCommentInsert");

    addCommentCancel.addEventListener("click", ()=>{
        addComment.value = "";
    });
    addCommentInsert.addEventListener("click", ()=>{
        // 로그인상태가 아닐 때 제출 x
        if(loginMemberNo == "") {
            alert("로그인 후 이용해주세요")
            return;
        }

        // 입력값이 없을 때 제출 x
        if(addComment.value.trim().length == 0 ) {
            return;
        }

        $.ajax({
            url:"/comment/insert",
            data: {
                boardNo: boardNo,
                memberNo: loginMemberNo,
                boardTypeNo: boardTypeNo,
                commentContent : addComment.value.trim()
            },
            type: "POST",
            success:result=>{
                // 댓글 작성 성공 시
                if(result > 0) {
                    // 댓글 작성 인풋 초기화
                    addComment.value = ""
                    addComment.style.height = "auto";
                    // 댓글 목록 재요청
                    selectCommentList(boardNo);
                }
            }
        })
    });
})();



/* 댓글 수정 함수 */
// 수정전 원래 행의 상태를 저장할 변수
let beforeCommentRow;

const showUpdateComment= (commentNo, btn) =>{
    // 댓글 수정이 한 개만 열릴 수 있도록 함
    const temp = document.getElementsByClassName("update-textarea");

    if(temp.length > 0) {
        if(confirm("다른 댓글이 수정 중입니다.\n현재 댓글을 수정하시겠습니까?")) {
            temp[0].parentElement.innerHTML = beforeCommentRow;
        } else {
            return;
        }
    }

    // p태그 찾기
    let currentElement = btn;
    for(; !currentElement.classList.contains("comment-content"); currentElement = currentElement.parentElement);

    const commentContentArea = currentElement.getElementsByClassName("comment-content-area")[0];
    console.log(commentContentArea);

    // 수정전 p태그 백업
    beforeCommentRow = commentContentArea.innerHTML;

    // 수정전 내용 얻어오기
    let beforeContent = commentContentArea.firstElementChild.innerHTML.trim();

    // 댓글 행 내부 내용 모두 삭제
    commentContentArea.innerHTML = "";

    const textarea = document.createElement("textarea");
    textarea.classList.add("update-textarea");
    textarea.setAttribute("maxLength", 300);
    // XSS 방지 처리 해제
    beforeContent =  beforeContent.replaceAll("&amp;", "&");
    beforeContent =  beforeContent.replaceAll("&lt;", "<");
    beforeContent =  beforeContent.replaceAll("&gt;", ">");
    beforeContent =  beforeContent.replaceAll("&quot;", "\"");
    
    // 개행문자 처리 해제
    beforeContent =  beforeContent.replaceAll("<br>", "\n");

    textarea.value = beforeContent;
    textarea.setAttribute("rows", 1);
    textarea.setAttribute("onkeyup", "resizeTextarea(this)");
    commentContentArea.append(textarea);
    textarea.style.height = textarea.scrollHeight - 12 + "px";

    // 수정 버튼
    const updateButtonArea = document.createElement("div");
    updateButtonArea.classList.add("update-button-area");

    const updateButton = document.createElement("button");
    updateButton.innerText = "수정";
    updateButton.addEventListener("click", ()=>{
        if(loginMemberNo == "") {
            alert("로그인 후 이용해주세요.");
            return;
        }
        if(textarea.value.trim().length == 0) {
            return;
        }
        $.ajax({
            url:"/comment/update",
            data: {
                commentNo:commentNo,
                commentContent: textarea.value
            },
            type:"POST",
            success: result => {
                if(result > 0) {
                    alert("댓글이 수정되었습니다");
                    selectCommentList(boardNo);
                }
            }
        })
    });

    const updateCancelButton = document.createElement("button");
    updateCancelButton.innerText = "취소";
    updateCancelButton.addEventListener("click", ()=>{
        if(confirm("작성한 내용은 저장되지 않습니다.\n정말 취소하시겠습니까?")) {
            commentContentArea.innerHTML = beforeCommentRow;
        }
    });

    // 조립
    updateButtonArea.append(updateCancelButton, updateButton);
    commentContentArea.append(updateButtonArea);
}

/* 댓글 삭제 함수 */
const deleteComment = (commentNo) => {
    if(confirm("정말 삭제하시겠습니까?")) {
        $.ajax({
            url:"/comment/delete",
            data: {
                commentNo: commentNo
            },
            type:"POST",
            success: result=>{
                if(result > 0) {
                    alert("댓글이 삭제되었습니다.");
                    selectCommentList(boardNo);
                }
            },
        })
    }
}

// 페이지 로딩시 댓글관련 이벤트 초기화
(()=>{
    document.addEventListener("DOMContentLoaded", ()=>{
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
    });
})();

/* 답글 작성 영역 생성 */
function addCommentArea(parentCommentNo, target) {
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

    const commentProfileImageArea = document.createElement("div");
    commentProfileImageArea.classList.add("comment-profile-image-area")
    const commentProfileImage = document.createElement("img");
    // 이미지 소스 대입
    // commentProfileImage.src = "/resources/images/zz.png";
    // 댓글 프로필 이미지
    if(profileImage == "") {    // 프로필 이미지가 비어있으면
        // 기본 이미지 세팅
        commentProfileImage.src = "/resources/images/common/cubes.png";
    } else {
        commentProfileImage.src = profileImage;
    }

    const commentContent = document.createElement("div");
    commentContent.classList.add("comment-content");
    const textarea = document.createElement("textarea");
    textarea.setAttribute("maxLength", 300);
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
    // 등록버튼 이벤트 등록
    insertButton.addEventListener("click", ()=>{
        if(loginMemberNo == "") {
            alert("로그인 후 이용해주세요.");
            return;
        }
        if(textarea.value.trim().length == 0) {
            return;
        }

        $.ajax({
            url: "/comment/insert",
            data: {
                boardNo: boardNo,
                memberNo: loginMemberNo,
                boardTypeNo: boardTypeNo,
                commentContent: textarea.value.trim(),
                parentCommentNo: parentCommentNo
            },
            type: "POST",
            success: result=>{
                if(result > 0) {
                    selectCommentList(boardNo);
                }
            }
        });
    });

    // 요소 조립
    commentWriteButtonArea.append(cancelButton, insertButton);
    commentContent.append(textarea, commentWriteButtonArea);
    commentProfileImageArea.append(commentProfileImage);
    commentWriteRow.append(commentProfileImageArea, commentContent);
    
    // 요소 출력
    commentRow.after(commentWriteRow);
}


