/* 웹사이트 메인 공용 모달 (깐부찾기, 알림) */

/* 모달 열기 */
function openModal(){
    document.getElementById("modal").style.display = "block";

}
/* 모달 닫기 */
function closeModal(){
    document.getElementById("modal").style.display = "none";
}

/* 모달 상단 선택 */
        const leftChoice = document.getElementById("leftChoice");
        const  rightChoice= document.getElementById("rightChoice");

        rightChoice.addEventListener("mouseover", () => {
            leftChoice.style.border = "none";
            leftChoice.style.borderBottom = "1px solid black";
            rightChoice.style.border = "1px solid black";
            rightChoice.style.borderBottom = "none";

            leftChoice.style.color = "black";
            leftChoice.style.fontWeight = "normal";
            rightChoice.style.color = "var(--subColor)";
            rightChoice.style.fontWeight = "bold";
        })

        rightChoice.addEventListener("mouseout", () => {
            rightChoice.style.border = "none";
            rightChoice.style.borderBottom = "1px solid black";
            leftChoice.style.border = "1px solid black";
            leftChoice.style.borderBottom = "none";

            rightChoice.style.color = "black";
            rightChoice.style.fontWeight = "normal";
            leftChoice.style.color = "var(--subColor)";
            leftChoice.style.fontWeight = "bold";
        })