/* 미니룸 벽지, 바닥 상수 */
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const bottom = document.querySelector(".bottom");

/* input color 상수 */
const inputWallColor = document.getElementById("inputWallColor");
const inputFloorColor = document.getElementById("inputFloorColor");

/* color priview 상수 */
const wallColorPriview = document.getElementById("wallColorPriview");
const floorColorPriview = document.getElementById("floorColorPriview");

/* input image 상수 */
const inputWallImage = document.getElementById("inputWallImage");
const inputFloorImage = document.getElementById("inputFloorImage");

/* input radio 상수 */
const wallRadio = document.getElementsByName("wall");
const floorRadio = document.getElementsByName("floor");

/* color flag */
let wallColorF = 'N';
let floorColorF = 'N';

/* 임시 변수 */
let abc = "#ffe5e5";
let def = "../../../images/help.png";
let wallPatternNo = 2;
let floorPatternNo = 1;

/* 벽지, 바닥 지정 */
const setWallBackground = input => {
    if(input.charAt(0) == "#" && abc.length == 7){
        left.style.backgroundColor = input;
        right.style.backgroundColor = input;
        wallColorF = 'Y';

    } else {
        left.style.backgroundImage = input;
        right.style.backgroundImage = input;
        wallColorF = 'N';
    }
}

const setFloorBackground = input => {
    if(input.charAt(0) == "#" && abc.length == 7){
        bottom.style.backgroundColor = input;
        floorColorF = 'Y';

    } else {
        bottom.style.backgroundImage = input;
        floorColorF = 'N';
    }
}

/* 벽지, 바닥 초기화 */
const resetWallBackground = () => {
    left.style.backgroundColor = "white";
    left.style.backgroundImage = "none";
    right.style.backgroundColor = "white";
    right.style.backgroundImage = "none";
    wallColorF = 'Y';
}

const resetFloorBackground = () => {
    bottom.style.backgroundColor = "white";
    bottom.style.backgroundImage = "none";
    floorColorF = 'Y';
}

/* 벽지 패턴 */
const selectWallPattern = patternNo => {
    if(patternNo == 1) {
        left.style.backgroundSize = "450px 500px";
        right.style.backgroundSize = "450px 500px";

    } else {
        left.style.backgroundSize = "112.5px 125px";
        right.style.backgroundSize = "112.5px 125px";
    }
}

/* 바닥 패턴 */
const selectFloorPattern = patternNo => {
    if(patternNo == 1) {
        bottom.style.backgroundSize = "450px 500px";

    } else {
        bottom.style.backgroundSize = "112.5px 112.5px";
    }
}

/* 벽지 바닥 이미지 패턴 on */
const wallPatternOn = () => {
    const wallPattern = document.getElementById("wallPattern");
    wallPattern.classList.remove("inactive");

    for(let radio of wallRadio) {
        radio.disabled = false;
    }

    wallRadio[0].checked = true;
    selectWallPattern(wallRadio[0].value);
}

const floorPatternOn = () => {
    const floorPattern = document.getElementById("floorPattern");
    floorPattern.classList.remove("inactive");

    for(let radio of floorRadio) {
        radio.disabled = false;
    }
    
    floorRadio[0].checked = true;
    selectFloorPattern(floorRadio[0].value);
}

/* 벽지 바닥 이미지 패턴 off */
const wallPatternOff = () => {
    const wallPattern = document.getElementById("wallPattern");
    wallPattern.classList.add("inactive");

    for(let radio of wallRadio) {
        radio.disabled = true;
        radio.checked = false;
    }
}

const floorPatternOff = () => {
    const floorPattern = document.getElementById("floorPattern");
    floorPattern.classList.add("inactive");

    for(let radio of floorRadio) {
        radio.disabled = true;
        radio.checked = false;
    }
}

/* 벽지, 바닥 불러오기 */
const loadWall = () => {
    if(abc.charAt(0) == "#" && abc.length == 7){
        inputWallColor.value = abc;
        wallColorPriview.style.backgroundColor = abc;
        wallPatternOff();
        setWallBackground(abc);
    
    } else {
        let url = "url('" + abc + "')";
        setWallBackground(url);

        for(let radio of wallRadio) {
            if(radio.value == wallPatternNo){
                radio.checked = true;
                selectWallPattern(radio.value);
            }
        }
    }
}

const loadFloor = () => {
    if(def.charAt(0) == "#" && def.length == 7){
        inputFloorColor.value = abc;
        floorColorPriview.style.backgroundColor = abc;
        floorPatternOff();
        setFloorBackground(def);
    
    } else {
        let url = "url(" + def + ")";
        setFloorBackground(url);
    
        for(let radio of floorRadio) {
            if(radio.value == wallPatternNo){
                radio.checked = true;
                selectFloorPattern(radio.value);
            }
        }
    }
}

loadWall();
loadFloor();

/* 색상 변경 */
inputWallColor.addEventListener("input", () => {
    inputWallImage.value = "";
    resetWallBackground();
    wallPatternOff();
    wallColorPriview.style.backgroundColor = inputWallColor.value;
    setWallBackground(inputWallColor.value);
})

inputFloorColor.addEventListener("input", () => {
    inputFloorImage.value = "";
    resetFloorBackground();
    floorPatternOff();
    floorColorPriview.style.backgroundColor = inputFloorColor.value;
    setFloorBackground(inputFloorColor.value);
})

/* 이미지 변경 */
inputWallImage.addEventListener("change", e => {
    if(e.target.files[0] != undefined) {
        resetWallBackground();
        wallPatternOn();
        wallColorPriview.style.backgroundColor = "white";
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = e => {
            setWallBackground("url('" + e.target.result + "')");
        }

    } else {
        if(wallColorF == 'N') {resetWallBackground(); loadWall();}
    }
})

inputFloorImage.addEventListener("change", e => {
    if(e.target.files[0] != undefined) {
        resetFloorBackground();
        floorPatternOn();
        floorColorPriview.style.backgroundColor = "white";
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        console.log(inputFloorColor.value);
        reader.onload = e => {
            setFloorBackground("url('" + e.target.result + "')");
        }
    } else {
        if(floorColorF == 'N') {resetFloorBackground(); loadFloor();}
    }
})

/* 패턴 변경 */
$("input:radio[name=wall]").change(() => {
    for(let radio of wallRadio) {
        if(radio.checked) {
            selectWallPattern(radio.value);
        }
    }
})

$("input:radio[name=floor]").change(() => {
    for(let radio of floorRadio) {
        if(radio.checked) {
            selectFloorPattern(radio.value);
        }
    }
})

/* 원래대로 */
document.getElementById("rollbackWallBtn").addEventListener("click", () => {
    resetWallBackground();
    wallPatternOn();
    loadWall();
})

document.getElementById("rollbackFloorBtn").addEventListener("click", () => {
    resetFloorBackground();
    floorPatternOn();
    loadFloor();
})

/* 지우기 */
document.getElementById("eraseWallBtn").addEventListener("click", () => {
    inputWallImage.value = "";
    wallColorPriview.style.backgroundColor = "white";
    resetWallBackground();
    wallPatternOff();
})

document.getElementById("eraseFloorBtn").addEventListener("click", () => {
    inputFloorImage.value = "";
    floorColorPriview.style.backgroundColor = "white";
    resetFloorBackground();
    floorPatternOff();
})