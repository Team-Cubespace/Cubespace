// 목록으로 버튼
(()=>{
    const goToList = document.getElementById("goToList");
    goToList.addEventListener("click", ()=>{
        location.href = "/videoList/3" + location.search;
    });
})()