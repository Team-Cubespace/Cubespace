document.addEventListener("DOMContentLoaded", function(){
    

    // ------------------------------------ 슬라이드 기능 ---------------------------------------------------
    // section을 가져옴
    let placeListArea = document.querySelector(".place-list-area");

    // section 안에서 클릭이벤트가 발생하면
    placeListArea.addEventListener("click", function (e) {

        // 현재 Node = 
        currentNode = e.target;
        if (e.target.nodeName == "I") {
            currentNode = currentNode.parentElement;
        }

        // console.log(currentNode);
        if (currentNode.className == "prev-arrow") {
            prevMove(currentNode);
        } else if(currentNode.className == "next-arrow") {
            nextMove(currentNode);
        } else {
            return;
        }
    })


    // 공통 
    let offset = 1220;
    // let placeListWidth = document.querySelector(".place-list").clientWidth;
    let placeItemWidth = 305;

    // 이전 슬라이드로 이동
    function prevMove(currentNode) {
        let prevBtn = currentNode;
        let nextBtn = prevBtn.nextElementSibling;
        let placeList = nextBtn.nextElementSibling;
        let placeListWidth = placeList.clientWidth;
        nextBtn.style.display = "flex";
        let currentLeft = placeList.offsetLeft;

        // 더많이 남았을 때
        if(offset + currentLeft < 0) {
            placeList.style.left = placeList.offsetLeft + offset + "px";
        } else {
            placeList.style.left = 0 + "px";
            prevBtn.style.display = "none";
        }
    }

    // 다음 슬라이드로 이동
    function nextMove(currentNode) {
        let nextBtn = currentNode;

        let prevBtn = nextBtn.previousElementSibling;
        let placeList = nextBtn.nextElementSibling;
        let placeListWidth = placeList.clientWidth;

        prevBtn.style.display = "flex";
        let currentLeft = placeList.offsetLeft;
        let newOffset = offset + -currentLeft;
        let nextOffset = placeListWidth - newOffset;

        if (nextOffset > offset) {
            placeList.style.left = placeList.offsetLeft - offset + "px";
        } else if (nextOffset <= offset) {
            placeList.style.left = placeList.offsetLeft - nextOffset + "px";
            nextBtn.style.display = "none";
        }
    }

    // var mySwiper = new Swiper('.swiper-container', {
    //     autoplay: true,
    //     loop: true
    // });
})