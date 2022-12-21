//-----------------------------------------------------------------------  
/* 전체-색상변경 */
const chooseBGColor = document.getElementById("chooseBGColor");
const bgColorShow = document.getElementById("bgColorShow");

chooseBGColor.addEventListener("change", () => {
    bgColorShow.style.backgroundColor = chooseBGColor.value;
});





//-----------------------------------------------------------------------  

/* 전체-이미지변경 */
const chooseImg = document.getElementById("chooseImg");
const imageShow = document.getElementById("imageShow");

chooseImg.addEventListener("change", e => {

    if(e.target.files[0] != undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = e => {

            imageShow.src = e.target.result;
            if(!imageShow.classList.contains("bgImage")){
                imageShow.classList.add("bgImage");
            }

        }
    }
})



//-----------------------------------------------------------------------  
/* 전체-프레임변경 */
const chooseFrameColor = document.getElementById("chooseFrameColor");
const frameColorShow = document.getElementById("frameColorShow");

chooseFrameColor.addEventListener("change", () => {
    frameColorShow.style.backgroundColor = chooseFrameColor.value;
});