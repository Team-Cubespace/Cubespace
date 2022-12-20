/* 색상변경 */
const chooseBGColor = document.getElementById("chooseBGColor");
const bgColorShow = document.getElementById("bgColorShow");

chooseBGColor.addEventListener("change", () => {
    bgColorShow.style.backgroundColor = chooseBGColor.value;
});






/* 이미지변경 */
const chooseImg = document.getElementById("chooseImg");
const imageShow = document.getElementById("imageShow");

chooseImg.addEventListener("change", () => {
    const img = document.createElement("img");
    img.src = chooseImg.value;
    img.classList.add("bgImage");
    imageShow.append(img);
})





if(e.target.files[0] != undefined) {
    
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = e => {

        preview[i].setAttribute("src", e.target.result);
        deleteSet.delete(i);
    }

    const xButton = document.createElement("span");
    xButton.innerHTML = "&times;";
    xButton.classList.add("delete-image");
    inputImage[i].after(xButton);


    const count = deleteImage.length;
        document.getElementsByClassName("img__pic-count")[0].innerText = "(" + count + "/5)";

    // xButton에 삭제기능 추가
    xButton.addEventListener("click", (e) => {

        if(inputImage[i].previousElementSibling.children[0].getAttribute("src") != "/resources/images/image-upload.png") { // 기본이미지가 아닐 경우

            e.target.remove();

            inputImage[i].previousElementSibling.children[0].setAttribute("src", "/resources/images/image-upload.png");
            inputImage[i].value = "";

            // e.target.delete;

            deleteSet.add(i);

        }
    });

    


} else { // 취소
    return; // 아무일도 일어나지 않음
}