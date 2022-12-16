// 드랍다운 버튼 이벤트 달기
(()=>{
    // header 드랍다운 버튼 가져오기
    const headerDropDownButton = document.getElementById("headerDropDownButton");
    // header 드랍다운이 null이 아닐 때(로그인 상태 시)
    if(headerDropDownButton != null) {
        // 클릭 이벤트
        headerDropDownButton.addEventListener("click", ()=>{
            document.getElementById("headerDropDown").style.display = "block";
        });
        // 블러 이벤트
        headerDropDownButton.addEventListener("blur", ()=>{
            setTimeout(()=>{
                document.getElementById("headerDropDown").style.display = "none";
            }, 100);
            
        });
    }
})();