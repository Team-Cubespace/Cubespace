const initScrapModal = () => {
    // 흔점남기기 초기화
    document.getElementById("modalCommentContent").value = "퍼가요♡";

    // 공개 설정 초기화
    document.querySelectorAll("input[name='openFlag']")[0].checked = true;
}

const createFolderList = (folderList) => {
    const folderSelectBox = document.getElementById("folderSelectBox");
    folderSelectBox.innerHTML = "";
    for(let folder of folderList) {
        const option = document.createElement("option");
        option.value = folder.folderNo;
        option.innerText = folder.folderName;
        folderSelectBox.append(option);
    }
}

// 모달 버튼 가져오기
(()=>{
    const showScrapModal = document.getElementById("showScrapModal");
    if(showScrapModal != null) {
    
        // 모달 열기 이벤트 달기
        showScrapModal.addEventListener("click", ()=>{
            const boardScrapModal = document.getElementById("boardScrapModal");
            // 폴더리스트 가져오기
            $.ajax({
                url: "/selectFolderList",
                data: {
                    hostMemberNo: loginMemberNo,
                    boardTypeNo: boardTypeNo
                },
                dataType: "JSON",
                success: result=>{
                    console.log(result);
                    createFolderList(result);
                }
            })

            // 모달 폼 가져오기
            
            // const modalCommentContent = document.createElement("div");
            // modalCommentContent.classList.add("modal-comment-content");
            // const contentModalLavel = document.createElement("label");
            // contentModalLavel.classList.add("modal-label");
            // contentModalLavel.innerText = "흔적 남기기";
            
            // const commentContent = document.createElement("textarea");
            // commentContent.setAttribute("name", "commentContent");
            // commentContent.setAttribute("rows", 5);
            // commentContent.value = "퍼가요~";
            
            // const modalScrapAllow = document.createElement("div");
            // modalScrapAllow.classList.add("modal-scrap-allow");
            // const scrapAllowModalLabel = document.createElement("label");
            // scrapAllowModalLabel.classList.add("modal-labe");
            // scrapAllowModalLabel.innerText = "공개 설정";

            // const modalRadioArea = document.createElement("div");
            // modalRadioArea.classList.add("modal-radio-area");
        
            boardScrapModal.style.display = "flex";
        });
    }

    const boardScrapModal = document.getElementById("boardScrapModal");
    boardScrapModal.addEventListener("click", e=>{
        if(e.target.getAttribute("id") == "boardScrapModal") {
            boardScrapModal.style.display = "none";
            initScrapModal();
        }
    });

    const modalCloseButton = document.getElementById("modalCloseButton");
    // 모달 닫기 버튼 이벤트 달기
    modalCloseButton.addEventListener("click", ()=>{
        boardScrapModal.style.display = "none";
        initScrapModal();
    });

    document.getElementById("scrapCancelButton").addEventListener("click", ()=>{
        boardScrapModal.style.display = "none";
        initScrapModal();
    });
})();

// 스크랩 모달 제출
(()=>{
    // 폼 가져오기
    const scrapForm = document.getElementById("scrapForm");
    scrapForm.addEventListener("submit", e=>{
        e.preventDefault();

        const scrapFormData = new FormData(scrapForm);
        scrapFormData.append("memberNo", loginMemberNo);
        scrapFormData.append("boardNo", boardNo);
        scrapFormData.append("boardTypeNo", boardTypeNo);

        // 폴더 번호
        const folderNo = document.getElementById("folderSelectBox").value;
        console.log(folderNo);

        // 남길 댓글 내용
        const modalCommentContent = document.getElementById("modalCommentContent").value.trim();
        console.log(modalCommentContent);

        // 공개 범위
        const openFlag = document.querySelector("input[name='openFlag']:checked").value;
        console.log(openFlag);
        $.ajax({
            url:"/boardScrap/" + boardTypeNo,
            data: {
                memberNo: loginMemberNo,
                boardNo: boardNo,
                boardTypeNo: boardTypeNo,
                folderNo: folderNo,
                commentContent: modalCommentContent,
                openFlag: openFlag,
            },
            type:"POST",
            success: result =>{
                if(result > 0) {
                    console.log(result);
                    alert("게시글을 스크랩 하였습니다.");

                    

                    document.getElementById("boardScrapModal").style.display = "none";
                    document.getElementById("modalCommentContent").value = "";
                    document.getElementById("modalOpenFlag1").checked = true;
                    selectCommentList(boardNo);
                }
            }
        })
    });
})();