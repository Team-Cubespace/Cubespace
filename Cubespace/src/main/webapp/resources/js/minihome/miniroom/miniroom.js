/* 미니룸 컨테이너 좌표 */
const miniroomContainer = document.querySelector(".miniroom-container");
const tileContainer = document.querySelector(".tile-container");
const miniroomX = window.pageYOffset + miniroomContainer.getBoundingClientRect().left;
const miniroomY = window.pageYOffset + miniroomContainer.getBoundingClientRect().top;

/* 소품이 배치된 타일 */
const alreadyTile = tileNumber => {
    const tile = document.getElementById("tile" + tileNumber);
    tile.classList.remove("empty");
    tile.classList.add("already");
}

/* 소품 좌표 */
const propsLocation = (tile, props) => {
    const tileX = window.pageYOffset + tile.getBoundingClientRect().left;
    const tileY = window.pageYOffset + tile.getBoundingClientRect().top;

    let propsX = tileX-miniroomX-props.offsetWidth/2;
    let propsY = tileY-miniroomY-props.offsetHeight/1.2;

    props.style.left = propsX + "px";
    props.style.top = propsY + "px";
}

/* dropdown */
const dropdown = document.querySelector(".dropdown");
let toggleFlag = true;

const hideDropdown = () => {
    dropdown.style.height = "0px";
    dropdown.style.border = "none";
    toggleFlag = true;
}

const dropdownEvent = () => {
    if(toggleFlag){
        dropdown.style.height = "50px";
        dropdown.style.border = "1px solid black";
        toggleFlag = false;
        
    }else{
        hideDropdown();
    }
}

/* 이미 배치된 소품 */
(() => {
    // 소품이 여러 개이기 때문에 for문을 사용할 예정

    // 소품의 자리 번호를 가져오는 코드 추가 예정
    alreadyTile(5);

    const tileLocation = document.getElementById("tileLocation" + 5);

    // 소품 추가
    const props = document.createElement("div");
    props.classList.add("props");
    
    // 소품 이미지 추가
    const propsImg = document.createElement("img");
    propsImg.src = "../../../images/ribbit.png";

    props.appendChild(propsImg);
    miniroomContainer.appendChild(props);

    // 타일 좌표, 소품 좌표
    propsLocation(tileLocation, props);

    const propsList = document.getElementsByClassName("props");   

    // 소품이 여러 개이기 때문에 for문을 사용할 예정
    for(let moveProps of propsList){
        moveProps.addEventListener("click", () => {
            dropdownEvent();

            document.getElementById("moveBtn").addEventListener("click", () => {
                $(document).mousemove(function(e){
                    var mouseX = e.pageX - miniroomX - moveProps.offsetWidth/2;
                    var mouseY = e.pageY - miniroomY - moveProps.offsetHeight/2;
            
                    $(moveProps).css({
                        left: mouseX + "px",
                        top : mouseY + "px"
                    })
                })

                $('#homeArea').addClass('scrollDisable').on('scroll touchmove mousewheel', function(e){
                    e.preventDefault();
                });

                moveProps.style.opacity = "0.7";
                moveProps.style.pointerEvents = "none";

                tileContainer.style.opacity = "1";
                tileContainer.style.transitionDuration = "0.3s";
                tileContainer.style.cursor = "pointer";
                hideDropdown();

                const empty = document.getElementsByClassName("empty");
                
            })
        })
    }
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