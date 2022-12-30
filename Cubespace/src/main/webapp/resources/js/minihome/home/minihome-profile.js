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

/* today emoji 변경 */
const todayEmoji = document.querySelectorAll(".today-dropdown > span");

for(let emoji of todayEmoji) {
    emoji.addEventListener("click", () => {
        const emojiText = document.getElementById("emojiText");
        const emojiImg = document.getElementById("emojiImg");

        emojiText.innerText = emoji.firstChild.innerText;
        emojiImg.src = emoji.lastChild.src;
    })
}