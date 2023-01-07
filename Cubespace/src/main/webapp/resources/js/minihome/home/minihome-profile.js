if(minihomeNo == loginNo){
    /* today dropdown */
    const todayDropdownBtn = document.querySelector(".today-dropdown-btn");
    const todayDropdownBtnIcon = document.querySelector(".today-dropdown-btn-icon");
    const todayDropdown = document.querySelector(".today-dropdown");
    let toggleFlag = true;
    
    const hideTodayDropdown = () => {
        todayDropdown.style.height = "0px";
        todayDropdown.style.border = "none";
        todayDropdownBtnIcon.classList.add("fa-caret-down");
        todayDropdownBtnIcon.classList.remove("fa-caret-up");
        toggleFlag = true;
    }
    
    const todayDropdownEvent = () => {
        if(toggleFlag){
            todayDropdown.style.height = "200px";
            todayDropdown.style.border = "1px solid var(--ink)";
            todayDropdownBtnIcon.classList.add("fa-caret-up");
            todayDropdownBtnIcon.classList.remove("fa-caret-down");
            toggleFlag = false;
    
        }else{
            hideTodayDropdown();
        }
    }
    
    todayDropdownBtn.addEventListener("click", () => {
        todayDropdownEvent();
    })
    
    window.addEventListener("click", e => {
        if(!e.target.matches('.today-dorpdown, .today-dropdown-btn, .today-dropdown-btn-icon')) hideTodayDropdown();
    })

    /* today emotion 변경 */
    const todayEmotion = document.querySelectorAll(".today-dropdown > span");
    
    for(let i = 0; i < todayEmotion.length; i++) {
        todayEmotion[i].addEventListener("click", () => {
            $.ajax({
                url : "/emotion",
                data : {"emotionNo" : i+1,
                        "memberNo" : loginNo},
                type : "GET",
                success : (result) => {
                    if(result > 0) {
                        document.getElementById("emotionText").innerText = todayEmotion[i].firstChild.innerText;
                        document.getElementById("emotionImg").src = todayEmotion[i].lastChild.src;
                    } else {
                        console.log("today emotion 변경 실패");
                    }
                },
                error : () => {console.log("today emotion 변경 실패");}
            });
        })
    }
}