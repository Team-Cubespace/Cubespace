if(minihomeNo == loginNo){
    /* 프로필 이미지 관련 상수 */
    const preview = document.getElementById("preview");

    /* 프로필 메시지 관련 상수 */
    const profileMessage = document.querySelector('.profile-message');
    const updateMessage = document.getElementById('updateMessage');
    const letterCount = document.getElementById("letterCount");

    /* 지정된 높이를 초과하지 않을 때 문자열의 길이를 저장하기 위한 변수 */
    let saveLength = 0;

    /* 프로필 수정 click */
    document.getElementById("profileUpdate").addEventListener("click", () => {
        document.querySelector(".profile-update-area").style.display = "flex";
        document.querySelector(".profile-area").style.display = "none";
        updateMessage.value = profileMessage.value;
        letterCounting();
    })

    /* 프로필 이미지 선택 */
    document.getElementById("selectImage").addEventListener("change", e => {
        if(e.target.files[0] != undefined) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = e => {preview.setAttribute("src", e.target.result);}
        }
    })

    /* 원래대로 되돌리기 */
    document.getElementById("rollbackImageBtn").addEventListener("click", () => {
        preview.src = "/resources/images/삐약.gif";
    })

    /* 글자 수 세기 */
    const letterCounting = () => {
        letterCount.innerText = "Letter (" + updateMessage.value.length + " / 98)";

        if(updateMessage.value.length > 98) {
                $('#updateMessage').val($('#updateMessage').val().substring(0, 98));
                letterCount.innerText = "Letter (98 / 98)";
        }
    }

    /* 행 수 제한 */
    updateMessage.addEventListener("input", e => {
        console.log(updateMessage.offsetHeight);
        letterCounting();

        // 지정된 높이(138)에서 입력을 받았을 때 문자열의 길이를 저장
        if(updateMessage.scrollHeight == 138) {
            saveLength = updateMessage.value.length;
        }

        // 지정된 높이를 초과했을 때 입력된 문자열을 이전의 문자열 길이만큼 잘라냄
        if(updateMessage.scrollHeight > 138) {
            updateMessage.value = updateMessage.value.substring(0, saveLength);
        }
    })

    /* 복사 붙여넣기 방지 */
    $("#updateMessage").on("copy", () => {
        return false;
    })

    $("#updateMessage").on("paste", () => {
        return false;
    })

    /* 수정완료 */
    document.getElementById("updateBtn").addEventListener("click", () => {
        document.querySelector(".profile-area").style.display = "flex";
        document.querySelector(".profile-update-area").style.display = "none";
        document.querySelector(".profile-img").src = preview.src;
        profileMessage.value = updateMessage.value;
    })

    /* 취소 */
    document.getElementById("cancellBtn").addEventListener("click", () => {
        document.querySelector(".profile-area").style.display = "flex";
        document.querySelector(".profile-update-area").style.display = "none";
        preview.src = "/resources/images/삐약.gif";
        updateMessage.value = profileMessage.value;
    })
}