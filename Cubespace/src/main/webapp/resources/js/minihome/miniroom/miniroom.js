/* 미니룸 컨테이너 좌표 */
const miniroomContainer = document.querySelector(".miniroom-container");
const miniroomX = window.pageYOffset + miniroomContainer.getBoundingClientRect().left;
const miniroomY = window.pageYOffset + miniroomContainer.getBoundingClientRect().top;

/* 자주 쓰이는 요소 */
const homeArea = document.getElementById("homeArea");
const tileContainer = document.querySelector(".tile-container");

/* 움직일 소품 변수 */
let movedProps;

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
        toggleFlag = false;
        
    }else{
        hideDropdown();
    }
}

/* 임시 변수 (이미 배치된 소품 자리번호) */
let i = 2;

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
        })
        movedProps = props;
    }
}

clickProps();

// 이동하기 click
document.getElementById("moveBtn").addEventListener("click", () => {
    hideDropdown();

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

    let clientX=0;
    let clientY=0;

    /* 소품 좌표 설정 */
    const mousemoveEvent = (mouseX, mouseY) => {
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
})

/* tile click */
const tileList = document.querySelectorAll(".tile-container > div");

for(let tile of tileList){
    if(tile.classList.contains)
    tile.addEventListener("click", e => {
        $(tileContainer).off("mousemove");
        $(homeArea).off("scroll");

        const already2 = document.getElementsByClassName("already");
        for(let alreadyTile2 of already2){
            afterAlreadyTile($(alreadyTile2).attr('id').substring(4));
        }

        // 소품 위치 변경
        propsLocation(tile.firstChild, movedProps);
    
        console.log($(tile).attr('id').substring(4));

        // 타일 변경
        afterAlreadyTile($(tile).attr('id').substring(4));
        afterEmptyTile(i);

        movedProps.style.opacity = "1";
        movedProps.style.pointerEvents = "auto";

        tileContainer.style.opacity = "0";

        for(let hideTile of tileList){
            hideTile.style.cursor = "default";
            hideTile.style.pointerEvents = "none";
        }
        
        // 임시 변수 값 변경
        i = $(tile).attr('id').substring(4);
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