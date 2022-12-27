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

    if(document.getElementById("leftChoiceInput")!=null ){
        rightChoice.style.border = "none";
        rightChoice.style.borderBottom = "1px solid black";
        leftChoice.style.border = "1px solid black";
        leftChoice.style.borderBottom = "none";

        rightChoice.style.color = "black";
        rightChoice.style.fontWeight = "normal";
        leftChoice.style.color = "var(--subColor)";
        leftChoice.style.fontWeight = "bold";
    }
})

leftChoice.addEventListener("mouseover", () => {
    rightChoice.style.border = "none";
    rightChoice.style.borderBottom = "1px solid black";
    leftChoice.style.border = "1px solid black";
    leftChoice.style.borderBottom = "none";
    
    rightChoice.style.color = "black";
    rightChoice.style.fontWeight = "normal";
    leftChoice.style.color = "var(--subColor)";
    leftChoice.style.fontWeight = "bold";
})

leftChoice.addEventListener("mouseout", () => {
    
    if(document.getElementById("rightChoiceInput")!=null ){
        leftChoice.style.border = "none";
        leftChoice.style.borderBottom = "1px solid black";
        rightChoice.style.border = "1px solid black";
        rightChoice.style.borderBottom = "none";
        
        leftChoice.style.color = "black";
        leftChoice.style.fontWeight = "normal";
        rightChoice.style.color = "var(--subColor)";
        rightChoice.style.fontWeight = "bold";
    }
})

/* 오른쪽 클릭 시 */
rightChoice.addEventListener("click",()=>{
    
    //검색 id변경 하여 검색시 회원조회가 아닌 내가 신청한 목록조회로 변경
    const leftChoiceInput = document.getElementById("leftChoiceInput");
    if(leftChoiceInput){
        leftChoiceInput.value = null; 
        leftChoiceInput.setAttribute("id","rightChoiceInput")
    }
    
    //기존 검색 목록 제거
    const section = document.querySelector(".mebmer-search-profile");
    section.innerHTML=""; // 이전 내용 제거
})

/* 왼쪽 클릭 시 */
leftChoice.addEventListener("click",()=>{

    //검색 id변경 하여 검색시 내가 신청한 목록조회가 아닌 회원조회로 변경
    const rightChoiceInput = document.getElementById("rightChoiceInput");
    if(rightChoiceInput){
        rightChoiceInput.value = null;
        rightChoiceInput.setAttribute("id","leftChoiceInput")
    }

    //기존 검색 목록 제거
    const section = document.querySelector(".mebmer-search-profile");
    section.innerHTML=""; // 이전 내용 제거
})