/* 미니룸 컨테이너 좌표 */
const miniroomContainer = document.querySelector(".miniroom-container");
const miniroomX = window.pageYOffset + miniroomContainer.getBoundingClientRect().left;
const miniroomY = window.pageYOffset + miniroomContainer.getBoundingClientRect().top;

/* 자주 쓰이는 요소 */
const homeArea = document.getElementById("homeArea");
const tileContainer = document.querySelector(".tile-container");
const tileList = document.querySelectorAll(".tile-container > div");

/* 움직일 소품 변수 */
let movedProps;

/* 임시 변수 (자리번호, x좌표, y좌표) */
let i = 2;
let locationX = 0;
let locationY = 0;

/* 소품 배치 O -> 소품 배치 X */
const afterEmptyTile = tileNumber => {
    const tile = document.getElementById("tile" + tileNumber);
    tile.classList.add("empty");
    tile.classList.remove("already");
}

/* 소품 배치 X -> 소품 배치 O */
const afterAlreadyTile = tileNumber => {
    const tile = document.getElementById("tile" + tileNumber);
    tile.classList.add("already");
    tile.classList.remove("empty");
}

/* 소품 좌표 설정 */
const propsLocation = (tile, props) => {
    const tileX = window.pageYOffset + tile.getBoundingClientRect().left;
    const tileY = window.pageYOffset + tile.getBoundingClientRect().top;

    let propsX = tileX - miniroomX - props.offsetWidth/2 + homeArea.scrollLeft;
    let propsY = tileY - miniroomY - props.offsetHeight/1.2 + homeArea.scrollTop;

    props.style.left = propsX + "px";
    props.style.top = propsY + "px";

    // 임시 변수 좌표 값 변경
    locationX = propsX;
    locationY = propsY;
}

/* dropdown */
const dropdown = document.querySelector(".dropdown");
let toggleFlag = true;

const hideDropdown = () => {
    dropdown.style.display = "none";
    toggleFlag = true;
}

const dropdownEvent = () => {
    if(toggleFlag){
        dropdown.style.display = "block";
        dropdown.style.left = locationX + "px";
        dropdown.style.top = (locationY - 50) + "px";
        toggleFlag = false;
    }else{
        hideDropdown();
    }
}

/* 이미 배치된 소품 가져오기 */
(() => {
    // 소품이 여러 개이기 때문에 for문을 사용할 예정
    // 소품의 자리번호를 가져오는 코드 추가 예정

    afterAlreadyTile(i);

    const tileLocation = document.getElementById("tileLocation" + i);

    // 소품 추가
    const props = document.createElement("div");
    props.classList.add("props");
    
    // 소품 이미지 추가
    const propsImg = document.createElement("img");
    propsImg.classList.add("props-img");
    propsImg.src = "../../../images/ribbit.png";

    props.appendChild(propsImg);
    miniroomContainer.appendChild(props);

    // 타일 좌표, 소품 좌표
    propsLocation(tileLocation, props);
})();

/* 소품 click -> dropdown */
const clickProps = () => {
    const propsList = document.getElementsByClassName("props");
    
    for(let props of propsList){
        props.addEventListener("click", () => {
            dropdownEvent();
            movedProps = props;
        })
    }
}

clickProps();

/* dropdown */
window.addEventListener("click", e => {
    if(!e.target.matches('.props, .props-img, dorpdown')) hideDropdown();
})

/* esc and tile click */
const hideTile = () => {
    // event off
    $(tileContainer).off("mousemove");
    $(homeArea).off("scroll");
    $(document).off("keydown");
    
    // 소품 불투명하게, 포인터 이벤트 O
    movedProps.style.opacity = "1";
    movedProps.style.pointerEvents = "auto";
    
    // 타일을 안보이게 함
    tileContainer.style.opacity = "0";
    
    for(let oneTile of tileList){
        oneTile.style.cursor = "default";
        oneTile.style.pointerEvents = "none";
    }

    document.getElementById("esc").remove();
}

/* 이동하기 click */
document.getElementById("moveBtn").addEventListener("click", () => {
    hideDropdown();

    const miniroomHeader = document.querySelector(".miniroom-header");

    miniroomHeader.innerHTML += "<span id='esc'>esc를 눌러 이동을 취소할 수 있습니다.</span>";

    // 소품 투명하게, 포인터 이벤트 X
    movedProps.style.opacity = "0.7";
    movedProps.style.pointerEvents = "none";

    // 타일을 보이게 함
    tileContainer.style.opacity = "1";
    tileContainer.style.transitionDuration = "0.3s";

    // 타일에 포인터 커서와 포인터 이벤트를 줌
    const empty = document.getElementsByClassName("empty");

    for(let emptyTile of empty){
        emptyTile.style.cursor = "pointer";
        emptyTile.style.pointerEvents = "auto";
    }

    let clientX = 0;
    let clientY = 0;

    // 소품 좌표 설정 
    const mousemoveEvent = (mouseX, mouseY) => {
        // 위치 값 수정 필요
        if(mouseX > 570) mouseX = 570;
        if(mouseY > 290) mouseY = 290;
    
        $(movedProps).css({
            left: mouseX + "px",
            top : mouseY + "px"
        })
    }

    // 소품 이미지가 마우스를 따라다니게 함
    $(tileContainer).on("mousemove", e => {
        var mouseX = e.pageX - miniroomX - movedProps.offsetWidth/2 + homeArea.scrollLeft;
        var mouseY = e.pageY - miniroomY - movedProps.offsetHeight/2 + homeArea.scrollTop;

        clientX = e.pageX;
        clientY = e.pageY;

        mousemoveEvent(mouseX, mouseY);
    })

    $(homeArea).on("scroll", () => {
        var mouseX = clientX - miniroomX - movedProps.offsetWidth/2 + homeArea.scrollLeft;
        var mouseY = clientY - miniroomY - movedProps.offsetHeight/2 + homeArea.scrollTop;
        
        mousemoveEvent(mouseX, mouseY);
    });

    // esc를 눌러서 취소
    $(document).on("keydown", e => {
        var code = e.keyCode || e.which;
     
        if(code == 27) {
            hideTile();

            movedProps.style.left = locationX + "px";
            movedProps.style.top = locationY + "px";
        }
    });
})

/* tile click */
for(let tile of tileList){
    tile.addEventListener("click", e => {
        if(tile.classList.contains('empty')) {
            hideTile();

            // 소품 좌표 변경
            propsLocation(tile.firstChild, movedProps);
    
            // 타일 변경
            afterEmptyTile(i);
            afterAlreadyTile($(tile).attr('id').substring(4));
            
            // 임시 변수 자리번호 값 변경
            i = $(tile).attr('id').substring(4);
        }
    })
}

/* 미니룸 사진 저장 */
$("#pictureBtn").click(e => {
    html2canvas(miniroomContainer).then(canvas => {
        var a = document.createElement("a")
        a.href = canvas.toDataURL("image/png")
        a.download = 'image.png'
        a.click()
    })
})