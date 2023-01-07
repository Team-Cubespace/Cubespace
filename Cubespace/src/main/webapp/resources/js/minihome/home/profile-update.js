if(minihomeNo == loginNo){
    /* 프로필 이미지 관련 상수 */
    const preview = document.getElementById("preview");
    const profileImage = document.getElementById("selectImage");
    const updateFlag = document.getElementById("updateFlag");

    /* 변경 전 이미지 주소를 저장할 변수 */
    let beforeImage = preview.src;

    /* 프로필 메시지 관련 상수 */
    const profileMessage = document.querySelector('.profile-message');
    const updateMessage = document.getElementById('updateMessage');
    const letterCount = document.getElementById("letterCount");

    /* 기본 이미지로 변경하는 함수 */
    const normalization = () => {
        preview.setAttribute("src", "/resources/images/common/cubes.png");
        profileImage.value = "";
        updateFlag.value = "Y";
    }

    /* 이미지 변경을 취소하는 함수 */
    const initialization = () => {
        preview.setAttribute("src", beforeImage);
        profileImage.value = "";
        updateFlag.value = "N";
    }

    /* 프로필 수정 click */
    document.getElementById("profileUpdate").addEventListener("click", () => {
        document.querySelector(".profile-update-area").style.display = "block";
        document.querySelector(".profile-area").style.display = "none";
        updateMessage.value = profileMessage.value;
        letterCounting();
    })

    /* 프로필 이미지 선택 */
    profileImage.addEventListener("change", e => {
        if(e.target.files[0] != undefined) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = e => {preview.setAttribute("src", e.target.result);}
            updateFlag.value = "Y";
        } else {
            if(preview.src == "/resources/images/common/cubes.png") {normalization();}
            else {initialization();}
        }
    })

    /* 프로필 이미지 삭제 */
    document.getElementById("deleteImageBtn").addEventListener("click", () => {
        normalization();
    })

    /* 원래대로 되돌리기 */
    document.getElementById("rollbackImageBtn").addEventListener("click", () => {
        initialization();
    })

    /* resize */
    function resize(){
        updateMessage.style.height = "126px";
        updateMessage.style.height = updateMessage.scrollHeight - 10 + "px";
    }
    
    /* letterCounting */
    function letterCounting(){
        const count = updateMessage.value.length;
    
        if(count <= 98){
            letterCount.innerText = count;

        }else{
            while(updateMessage.value.length > 98){
                // selectionEnd = 커서의 위치를 반환
                const sel = updateMessage.selectionEnd;
                updateMessage.value = updateMessage.value.substring(0, updateMessage.value.length-1);
                updateMessage.selectionEnd = sel;
                resize();
                letterCount.innerText = updateMessage.value.length;
            }
        }
    }
    
    /* 프로필 메시지 수정 */
    updateMessage.addEventListener("input", () => {
        resize();
    
        while(updateMessage.scrollHeight > 136){
            const sel = updateMessage.selectionEnd;
            updateMessage.value = updateMessage.value.substring(0, updateMessage.value.length-1);
            updateMessage.selectionEnd = sel;
            resize();
        }
    
        letterCounting();
    })

    /* 수정완료 */
    document.getElementById("updateBtn").addEventListener("click", () => {
        var profileFrm = $('#profileFrm')[0];
        var formData = new FormData(profileFrm);

        $.ajax({
            url : "/updateProfile",
            data : formData,
            type : "POST",
            processData: false,
            contentType: false,
            success : (result) => {
                if(result > 0) {
                    document.querySelector(".profile-area").style.display = "flex";
                    document.querySelector(".profile-update-area").style.display = "none";
                    document.querySelector(".profile-img").src = preview.src;
                    beforeImage = preview.src;
                    profileMessage.value = updateMessage.value;
                    initialization();
                } else {
                    console.log("프로필 수정 실패");
                }
            },
            error : () => {console.log("프로필 수정 실패");}
        });
    })

    /* 취소 */
    document.getElementById("cancellBtn").addEventListener("click", () => {
        document.querySelector(".profile-area").style.display = "flex";
        document.querySelector(".profile-update-area").style.display = "none";
        initialization();
    })
}