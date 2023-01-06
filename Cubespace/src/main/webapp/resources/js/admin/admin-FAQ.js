
// 전체보기
(() => {

    const questionList = document.getElementById("questionList");
    if(questionList != null){

        questionList.addEventListener("click", () =>{
            location.href = "/board/3";
        });
    }
})();


// 열기
const openFAQ = e => {

    console.log(e);
    e.nextElementSibling.style.display=
        (e.nextElementSibling.style.display=='none')?'block':'none'; 

    const caret = e.firstElementChild;

    caret.classList.toggle("fa-caret-up");
    caret.classList.toggle("fa-caret-down");


}


// board1 - 모두 접기
const foldAll = document.getElementById("foldAll");
if(foldAll != null){
    foldAll.addEventListener("click", ()=>{
    
        const area = document.getElementsByClassName("area");
        for(let content of area){
            content.style.display = "none";
        }
    });

}



