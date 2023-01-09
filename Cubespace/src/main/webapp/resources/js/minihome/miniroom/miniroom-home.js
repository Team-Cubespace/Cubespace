/* 스크롤 계산 */
const homeArea = document.getElementById("homeArea");

/* 미니룸 컨테이너 좌표 */
const miniroomContainer = document.querySelector(".miniroom-container");
const miniroomX = window.pageYOffset + miniroomContainer.getBoundingClientRect().left;
const miniroomY = window.pageYOffset + miniroomContainer.getBoundingClientRect().top;

/* 배치할 소품 좌표 설정 */
const stayLocation = (props, x, y) => {
    props.style.left = x + "px";
    props.style.top = y + "px";
}

/* 이미 배치된 소품 가져오기 */
(() => {
    $.ajax({
        url : "/miniroom/placeList",
        type : "GET",
        success : (placeList) => {
            for(let place of placeList) {
                // 소품 추가
                const props = document.createElement("div");
                props.classList.add("props");
                props.style.zIndex = place.locationNo;
                
                // 소품 이미지 추가
                const propsImg = document.createElement("img");
                propsImg.classList.add("props-img");
                propsImg.src = place.path;
            
                props.appendChild(propsImg);
                miniroomContainer.appendChild(props);
            
                // 타일 좌표, 소품 좌표
                stayLocation(props, place.left, place.top);
            }
        },
        error : () => {console.log("소품 가져오기 실패");}
    });
})();

/* 미니룸 벽지, 바닥 상수 */
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const bottom = document.querySelector(".bottom");

/* 원본 값을 저장할 변수 */
let wallPath;
let floorPath;
let wallPatternNo;
let floorPatternNo;

(() => {
    $.ajax({
        url : "/miniroom/room",
        type : "GET",
        success : (room) => {
            if (room != null) {
                wallPath = room.wall;
                floorPath = room.floor;
                wallPatternNo = room.wallPattern;
                floorPatternNo = room.floorPattern;

                loadWall();
                loadFloor();
                selectWallPattern(wallPatternNo);
                selectFloorPattern(floorPatternNo);
                

            } else {
                console.log("벽지, 바닥 정보 불러오기 실패");
            }
        },
        error : () => {console.log("벽지, 바닥 정보 불러오기 실패");}
    });
})();

/* 벽지, 바닥 지정 */
const setWallBackground = input => {
    if(input.charAt(0) == "#" && input.length == 7){
        left.style.backgroundColor = input;
        right.style.backgroundColor = input;

    } else {
        left.style.backgroundImage = input;
        right.style.backgroundImage = input;
    }
}

const setFloorBackground = input => {
    if(input.charAt(0) == "#" && input.length == 7){
        bottom.style.backgroundColor = input;

    } else {
        bottom.style.backgroundImage = input;
    }
}

/* 벽지, 바닥 불러오기 */
const loadWall = () => {
    if(wallPath.charAt(0) == "#" && wallPath.length == 7){
        setWallBackground(wallPath);
    
    } else {
        let url = "url('" + wallPath + "')";
        setWallBackground(url);
    }
}

const loadFloor = () => {
    if(floorPath.charAt(0) == "#" && floorPath.length == 7){
        setFloorBackground(floorPath);
    
    } else {
        let url = "url(" + floorPath + ")";
        setFloorBackground(url);
    }
}

/* 벽지, 바닥 패턴 */
const selectWallPattern = patternNo => {
    if(patternNo == 1) {
        left.style.backgroundSize = "450px 500px";
        right.style.backgroundSize = "450px 500px";

    } else {
        left.style.backgroundSize = "112.5px 125px";
        right.style.backgroundSize = "112.5px 125px";
    }
}

const selectFloorPattern = patternNo => {
    if(patternNo == 1) {
        bottom.style.backgroundSize = "450px 500px";

    } else {
        bottom.style.backgroundSize = "112.5px 112.5px";
    }
}