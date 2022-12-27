/* 이미 배치되어 있던 소품 좌표 불러오기 */

// 미니룸 컨테이너 좌표
const miniroomContainer = document.querySelector(".miniroom-container");
const miniroomX = window.pageYOffset + miniroomContainer.getBoundingClientRect().left;
const miniroomY = window.pageYOffset + miniroomContainer.getBoundingClientRect().top;

const tileContainer = document.querySelector(".tile-container");

(() => {
    let i = 5;

    // 해당 요소 아이디로 가져오기
    let tileId = "tile" + i;
    const tile = document.getElementById(tileId);
    tile.classList.add("already");
    tile.classList.remove("empty");

    let tileLocationId = "tileLocation" + i;
    let tileLocation = document.getElementById(tileLocationId);

    // 타일의 좌표
    const tileX = window.pageYOffset + tileLocation.getBoundingClientRect().left;
    const tileY = window.pageYOffset + tileLocation.getBoundingClientRect().top;

    // 소품 추가
    const prop = document.createElement("div");
    prop.classList.add("prop");
    
    // 소품 이미지 추가
    const propImg = document.createElement("img");
    propImg.src = "../../../images/ribbit.png";

    prop.appendChild(propImg);
    miniroomContainer.appendChild(prop);

    // 소품의 좌표
    let propX = tileX-miniroomX-prop.offsetWidth/2;
    let propY = tileY-miniroomY-prop.offsetHeight/1.2;

    prop.style.left = propX + "px";
    prop.style.top = propY + "px";
    // tileContainer.style.display = "none";

    prop.addEventListener("click", () => {
        const dropdown = document.querySelector(".dropdown");
        dropdown.style.height = "50px";
        dropdown.style.border = "1px solid black";
        dropdown.style.left = propX + "px";
        dropdown.style.top = propY - 50 + "px";
    })
})();

const testBtn = document.getElementById("testBtn");
const testArea = document.getElementById("testArea");

/* 화면 캡처... 고민중 */
$(function(){
    $("#testBtn").click(function(e){
        html2canvas(miniroomContainer).then(function(canvas) {
            var el = document.createElement("a")
            el.href = canvas.toDataURL("image/png")
            el.download = 'image.png' //다운로드 할 파일명 설정
            el.click()
        })
    })
})

document.getElementById("moveBtn").addEventListener("click", () => {
    // tileContainer.style.transitionDuration = "0.5s";
})