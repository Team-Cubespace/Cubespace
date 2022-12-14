/* 스크롤 계산 */
const homeArea = document.getElementById("homeArea");

/* 미니룸 컨테이너 좌표 */
const miniroomContainer = document.querySelector(".miniroom-container");
const miniroomX = window.pageYOffset + miniroomContainer.getBoundingClientRect().left;
const miniroomY = window.pageYOffset + miniroomContainer.getBoundingClientRect().top;

/* 타일 요소 */
const tileContainer = document.querySelector(".tile-container");
const tileList = document.querySelectorAll(".tile-container > div");

/* 이동할 소품 관련 변수 */
let movedProps;
let movedPropsX;
let movedPropsY;

/* 미니미, 소품 카테고리 */
const selectMinimee = document.getElementById("selectMinimee");
const selectGoods = document.getElementById("selectGoods");

/* 카테고리 플래그 변수 */
let categoryFlag;

/* 리스트 개수 변수 */
let listCount;

/* 페이지네이션 변수 */
let paginationObject;

/* 페이지네이션 플래그 */
let pageFlag = "Y";

/* 현재 페이지 변수 */
let curPage;

/* 소품 배치 O -> 소품 배치 X */
const afterEmptyTile = tileNo => {
    const tile = document.getElementById("tile" + tileNo);
    tile.classList.add("empty");
    tile.classList.remove("already");
}

/* 소품 배치 X -> 소품 배치 O */
const afterAlreadyTile = tileNo => {
    const tile = document.getElementById("tile" + tileNo);
    tile.classList.add("already");
    tile.classList.remove("empty");
}

/* 배치할 소품 좌표 설정 */
const stayLocation = (props, x, y) => {
    props.style.left = x + "px";
    props.style.top = y + "px";
}

/* 이동할 소품 좌표 설정 */
const moveLocation = (tile, props) => {
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
let clickFlag = true;

const dropdownEvent = (x, y) => {
    if(toggleFlag){
        dropdown.style.display = "block";
        dropdown.style.left = x + "px";
        dropdown.style.top = y + "px";
        toggleFlag = false;

        window.addEventListener("click", e => {
            if(!e.target.matches('.props, .props-img, .dorpdown')) hideDropdown();
        })

    }else{
        hideDropdown();
    }
}

const hideDropdown = () => {
    dropdown.style.display = "none";
    toggleFlag = true;
}

/* 이미 배치된 소품 가져오기 */
(() => {
    $.ajax({
        url : "/miniroom/placeList",
        type : "GET",
        success : (placeList) => {
            for(let place of placeList) {
                /* 이미 배치된 타일 표시 */
                afterAlreadyTile(place.locationNo);

                // 소품 추가
                const props = document.createElement("div");
                props.classList.add("props");
                props.id = place.locationNo + "-" + place.shopCathNo + "-" + place.goodsNo;
                props.style.zIndex = place.locationNo;
                
                // 소품 이미지 추가
                const propsImg = document.createElement("img");
                propsImg.classList.add("props-img");
                propsImg.src = place.path;
            
                props.appendChild(propsImg);
                miniroomContainer.appendChild(props);
            
                // 타일 좌표, 소품 좌표
                stayLocation(props, place.left, place.top);

                /* 소품 클릭 이벤트 */
                clickProps(props);
            }
        },
        error : () => {console.log("소품 가져오기 실패");}
    });
})();

/* 소품 click -> dropdown */
const clickProps = props => {
    props.addEventListener("click", e => {
        if(clickFlag){
            movedProps = props;
            movedPropsX = movedProps.style.left.substring(0, movedProps.style.left.length-2);
            movedPropsY = movedProps.style.top.substring(0, movedProps.style.top.length-2);
    
            let mouseX = e.pageX - miniroomX - movedProps.offsetWidth/2 + homeArea.scrollLeft;
            let mouseY = e.pageY - miniroomY - movedProps.offsetHeight/2 + homeArea.scrollTop;
            dropdownEvent(mouseX, mouseY);
        }
    })
}

/* esc and tile click */
const hideTile = () => {
    // event off
    $(tileContainer).off("mousemove");
    $(homeArea).off("scroll");
    $(document).off("keydown");
    clickFlag = true;
    
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
    clickFlag = false;

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
        if(mouseX > 570) mouseX = 570;
        if(mouseY > 270) mouseY = 270;
    
        $(movedProps).css({
            left: mouseX + "px",
            top : mouseY + "px"
        })
    }

    // 소품이 마우스를 따라다니게 함
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
            stayLocation(movedProps, movedPropsX, movedPropsY);
        }
    });
})

/* tile click */
for(let tile of tileList){
    tile.addEventListener("click", e => {
        if(tile.classList.contains('empty')) {
            hideTile();
            clickFlag = true;

            // 소품 좌표 변경
            moveLocation(tile.firstChild, movedProps);
    
            // 타일 변경
            const propsArray = movedProps.id.split("-");

            afterEmptyTile(propsArray[0]);

            afterAlreadyTile($(tile).attr('id').substring(4));
            propsArray[0] = $(tile).attr('id').substring(4);
            movedProps.style.zIndex = $(tile).attr('id').substring(4);

            movedProps.id = propsArray.join("-");
        }
    })
}

/* 삭제하기 */
document.getElementById("removeBtn").addEventListener("click", () => {
    const propsArray = movedProps.id.split("-");
    afterEmptyTile(propsArray[0]);
    movedProps.remove();
})

/* 미니미 목록 조회 */
const selectminimeeList = cp => {
    $.ajax({
        url : "/miniroom/minimeeList",
        type : "GET",
        async : false,
        data : {"cp" : cp},
        success : map => {
            const goodsContainer = document.querySelector(".goods-container");
            goodsContainer.innerHTML = "";
            listCount = map.minimeeList.length;

            if(listCount < 6) {goodsContainer.style.height = "167.8px";}
            else {goodsContainer.style.height = "335.6px";}

            // goodsList div
            const goodsList = document.createElement("div");
            goodsList.classList.add("goods-list");

            for(let i = 0; i < map.minimeeList.length; i++) {
                // goods-info div
                const goodsInfo = document.createElement("div");
                goodsInfo.classList.add("goods-info");
                if((i+1) % 5 != 0) {goodsInfo.classList.add("goods-info-right");}

                // goods-img img
                const goodsImg = document.createElement("img");
                goodsImg.classList.add("goods-img");
                goodsImg.src = map.minimeeList[i].minimeePath;

                // goods-name div
                const goodsName = document.createElement("div");
                goodsName.classList.add("goods-name");
                goodsName.innerText = map.minimeeList[i].minimeeName;

                // goods-btn div
                const goodsBtn = document.createElement("div");
                goodsBtn.classList.add("goods-btn");

                // move-goods-btn button
                const moveGoodsBtn = document.createElement("button");
                moveGoodsBtn.classList.add("move-goods-btn");
                moveGoodsBtn.type = "button";
                moveGoodsBtn.innerText = "배치";

                // goods-btn div append
                goodsBtn.append(moveGoodsBtn);

                // goods-info div append
                goodsInfo.append(goodsImg, goodsName, goodsBtn);

                // goodsList div append
                goodsList.append(goodsInfo);

                // last append
                goodsContainer.append(goodsList);

                let minimeePath = map.minimeeList[i].minimeePath;
                let cathNo = map.minimeeList[i].shopCathNo;
                let minimeeNo = map.minimeeList[i].minimeeNo;

                paginationObject = map.pagination;

                moveGoodsBtn.addEventListener("click", () => {putMinimee(minimeePath, cathNo, minimeeNo);})
            }
        },
        error : () => {console.log("미니미 목록 불러오기 실패");}
    });
}

/* 소품 목록 조회 */
const selectgoodsList = cp => {
    $.ajax({
        url : "/miniroom/goodsList",
        type : "GET",
        async : false,
        data : {"cp" : cp},
        success : (map) => {
            const goodsContainer = document.querySelector(".goods-container");
            goodsContainer.innerHTML = "";
            listCount = map.goodsList.length;

            if(listCount < 6) {goodsContainer.style.height = "167.8px";}
            else {goodsContainer.style.height = "335.6px";}

            if(listCount > 0) {
                // goodsList div
                const goodsList = document.createElement("div");
                goodsList.classList.add("goods-list");
    
                for(let i = 0; i < map.goodsList.length; i++) {
                    // goods-info div
                    const goodsInfo = document.createElement("div");
                    goodsInfo.classList.add("goods-info");
                    if((i+1) % 5 != 0) {goodsInfo.classList.add("goods-info-right");}
    
                    // goods-img img
                    const goodsImg = document.createElement("img");
                    goodsImg.classList.add("goods-img");
                    goodsImg.src = map.goodsList[i].goodsPath;
    
                    // goods-name div
                    const goodsName = document.createElement("div");
                    goodsName.classList.add("goods-name");
                    goodsName.innerText = map.goodsList[i].goodsName;
    
                    // goods-btn div
                    const goodsBtn = document.createElement("div");
                    goodsBtn.classList.add("goods-btn");
    
                    // move-goods-btn button
                    const moveGoodsBtn = document.createElement("button");
                    moveGoodsBtn.classList.add("move-goods-btn");
                    moveGoodsBtn.type = "button";
                    moveGoodsBtn.innerText = "배치";
    
                    // move-goods-btn button
                    const deleteGoodsBtn = document.createElement("button");
                    deleteGoodsBtn.classList.add("delete-goods-btn");
                    deleteGoodsBtn.type = "button";
                    deleteGoodsBtn.innerText = "삭제";
    
                    // goods-btn div append
                    goodsBtn.append(moveGoodsBtn, deleteGoodsBtn);
    
                    // goods-info div append
                    goodsInfo.append(goodsImg, goodsName, goodsBtn);
    
                    // goodsList div append
                    goodsList.append(goodsInfo);
    
                    // last append
                    goodsContainer.append(goodsList);
    
                    let goodsPath = map.goodsList[i].goodsPath;
                    let cathNo = map.goodsList[i].shopCathNo;
                    let goodsNo = map.goodsList[i].goodsNo;
                    let name = map.goodsList[i].goodsName;

                    paginationObject = map.pagination;
    
                    moveGoodsBtn.addEventListener("click", () => {putGoods(goodsPath, cathNo, goodsNo);})
                    deleteGoodsBtn.addEventListener("click", () => {deleteGoods(goodsInfo, name, cathNo, goodsNo, goodsPath);})
                }

            } else {
                // goodsList div
                const noGoods = document.createElement("div");
                noGoods.classList.add("no-goods");
                noGoods.innerHTML = "보유한 소품이 없습니다&nbsp;<i class='fa-solid fa-face-sad-tear'></i>";

                // last append
                const goodsContainer = document.querySelector(".goods-container");
                goodsContainer.style.height = "70px";
                goodsContainer.append(noGoods);

                const pageContainer = document.querySelector(".page-container");
                pageContainer.remove();

                pageFlag == "Y";
            }
        },
        error : () => {console.log("소품 가져오기 실패");}
    });
}

/* 페이지네이션 */
const categoryPage = () => {
    const pageContainer = document.querySelector(".page-container");
    pageContainer.innerHTML = "";
    curPage = paginationObject.currentPage;

    const leftArrow = document.createElement("span");
    leftArrow.classList.add("page");
    leftArrow.innerHTML = "<i class='fa-solid fa-angle-left'></i>";
    pageContainer.append(leftArrow);

    leftArrow.addEventListener("click", () => {
        if(categoryFlag == "M") {selectminimeeList(paginationObject.prevPage);}
        else {selectgoodsList(paginationObject.prevPage);}
        categoryPage();
    })

    let page;

    for(let i = paginationObject.startPage; i < paginationObject.endPage + 1; i++) {
        page = document.createElement("span");
        page.innerText = i;
        page.classList.add("page");
        pageContainer.append(page);

        if(page.innerText == paginationObject.currentPage) {page.classList.add("current");}

        page.addEventListener("click", () => {
            console.log("이벤트발생");

            const pageList = document.getElementsByClassName("page");
            for(let pl of pageList) {pl.classList.remove("current");}

            page.classList.add("current");

            if(categoryFlag == "M") {selectminimeeList(i);}
            else {selectgoodsList(i);}

            categoryPage();
        })
    }

    const rightArrow = document.createElement("span");
    rightArrow.classList.add("page");
    rightArrow.innerHTML = "<i class='fa-solid fa-angle-right'></i>";
    pageContainer.append(rightArrow);

    rightArrow.addEventListener("click", () => {
        if(categoryFlag == "M") {selectminimeeList(paginationObject.nextPage);}
        else {selectgoodsList(paginationObject.nextPage);}
        categoryPage();
    })
}

/* 미니미 카테고리 선택 */
const clickMinimee = () => {
    if(!selectMinimee.classList.contains("select-category")){
        categoryFlag = "M";
        selectMinimee.classList.add("select-category");
        selectGoods.classList.remove("select-category");
        selectminimeeList(1);

        if(pageFlag == "Y") {
            const pageContainer = document.createElement("div");
            pageContainer.classList.add("page-container");
            homeArea.append(pageContainer);
            pageFlag == "N";
        }

        categoryPage();
    }
}

selectMinimee.addEventListener("click", () => {
    clickMinimee();
})

clickMinimee();

/* 소품 카테고리 선택 */
selectGoods.addEventListener("click", () => {
    if(!selectGoods.classList.contains("select-category")){
        categoryFlag = "G";
        selectGoods.classList.add("select-category");
        selectMinimee.classList.remove("select-category");
        selectgoodsList(1);

        if(listCount > 0) {
            categoryPage();
            pageFlag = "N";
        }
    }
})

/* 미니미 배치 */
const putMinimee = (minimeePath, cathNo, minimeeNo) => {
    const propsList = document.getElementsByClassName("props");
    let minimeeCount = 0;

    for(let pl of propsList){
        plArray = pl.id.split("-");
        if(plArray[1] == 4) {
            minimeeCount++;
            break;
        }
    }

    if(minimeeCount == 0) {
        const empty = document.getElementsByClassName("empty");

        if(empty[0]) {
        // 미니미 추가
        const props = document.createElement("div");
        props.classList.add("props");
        props.id = empty[0].id.substring(4) + "-" + cathNo + "-" + minimeeNo;
        
        // 미니미 이미지 추가
        const propsImg = document.createElement("img");
        propsImg.classList.add("props-img");
        propsImg.src = minimeePath;
    
        props.appendChild(propsImg);
        miniroomContainer.appendChild(props);
        props.style.zIndex = empty[0].id.substring(4);
    
        // 타일 좌표, 미니미 좌표
        moveLocation(empty[0].firstChild, props);

        afterAlreadyTile(empty[0].id.substring(4));
    
        // 미니미 클릭 이벤트
        clickProps(props);

        } else {
            alert("더 이상 미니미를 추가할 수 없습니다.");
        }

    } else {
        alert("미니미는 하나만 놓을 수 있습니다.");
    }
}

/* 소품 배치 */
const putGoods = (goodsPath, cathNo, goodsNo) => {
    const empty = document.getElementsByClassName("empty");

    if(empty[0]) {
        // 소품 추가
        const props = document.createElement("div");
        props.classList.add("props");
        props.id = empty[0].id.substring(4) + "-" + cathNo + "-" + goodsNo;
        
        // 소품 이미지 추가
        const propsImg = document.createElement("img");
        propsImg.classList.add("props-img");
        propsImg.src = goodsPath;
    
        props.appendChild(propsImg);
        miniroomContainer.appendChild(props);
        props.style.zIndex = empty[0].id.substring(4);
    
        // 타일 좌표, 소품 좌표
        moveLocation(empty[0].firstChild, props);

        afterAlreadyTile(empty[0].id.substring(4));
    
        // 소품 클릭 이벤트
        clickProps(props);

    } else {
        alert("더 이상 소품을 추가할 수 없습니다.");
    }
}

/* 소품 삭제 */
const deleteGoods = (goodsInfo, goodsName, cathNo, goodsNo, goodsPath) => {
    if(confirm(goodsName + "을(를) 목록에서 삭제하시겠습니까?\n(이미 배치되어 있던 " + goodsName + "도 함께 삭제됩니다!)")) {     
        $.ajax({
            url : "/miniroom/delete",
            data : {"shopCathNo" : cathNo,
                    "goodsNo" : goodsNo},
            type : "GET",
            success : (result) => {
                if(result > 0) {
                    const propsImg = document.getElementsByClassName("props-img");
                    
                    for(let i = 0; i < propsImg.length; i++) {
                        if(propsImg[i].getAttribute("src") == goodsPath) {
                            propsArray = propsImg[i].parentElement.id.split("-");
                            afterEmptyTile(propsArray[0]);
                            propsImg[i].parentElement.remove();
                            i--;
                        }
                    }

                    goodsInfo.remove();
                    const goodsList = document.querySelector(".goods-list");
                    const pageContainer = document.querySelector(".page-container");

                    alert("삭제되었습니다.");

                    if((goodsList.innerHTML == "") && (curPage == 1)){
                        goodsList.remove();
                        pageContainer.remove();

                        // goodsList div
                        const noGoods = document.createElement("div");
                        noGoods.classList.add("no-goods");
                        noGoods.innerHTML = "보유한 소품이 없습니다&nbsp;<i class='fa-solid fa-face-sad-tear'></i>";

                        // last append
                        const goodsContainer = document.querySelector(".goods-container");
                        goodsContainer.style.height = "70px";
                        goodsContainer.append(noGoods);

                    } else if((goodsList.innerHTML == "") && (curPage != 1)) {
                        selectgoodsList(curPage-1);
                        categoryPage();

                    } else {
                        selectgoodsList(curPage);
                        categoryPage();
                    }
            
                } else {console.log("소품 삭제 실패");}
            },
            error : () => {console.log("소품 삭제 실패");}
        });
    }
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

/* 현재 상태 저장 */
document.getElementById("saveBtn").addEventListener("click", () => {
    if(confirm("저장하시겠습니까?")) {
        alert("저장되었습니다.");

        const propsList = document.getElementsByClassName("props");
        let inputProps;
    
        for(let props of propsList) {
            inputProps = document.createElement("input");
            inputProps.type = "hidden";
            inputProps.name = "propsArray";
            inputProps.value = props.id;
            miniroomContainer.append(inputProps);
        }
    
        var miniroomFrm = $('#miniroomFrm')[0];
        miniroomFrm.submit();
    }
})