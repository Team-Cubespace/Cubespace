/* 깐부 끊기 */
const deleteFriendBtnList = document.getElementsByClassName("deleteFriend");

for(let deleteFriendBtn of deleteFriendBtnList){
    deleteFriendBtn.addEventListener("click", e => {

        let friendNo = 0;
        if(e.target.classList.contains("fa-minus")){
            friendNo = e.target.parentElement.parentElement.lastElementChild.getAttribute("id");
        } else {
            friendNo = e.target.parentElement.lastElementChild.getAttribute("id");
        }


        if(confirm("정말 깐부를 끊겠습니까?")){
            $.ajax({
                url : "/manage/friend/deleteFriend",
                type:"get",
                data : {"friendNo" : friendNo, "memberNo" : memberNo},
                success : result => {
                    if(result > 0) {
                        alert("깐부끊기가 완료되었습니다");
                        location.href = location.href;
                    } else {
                        alert("깐부끊기 실패");
                    }
                },
                error : () => {console.log("깐부끊기 중 오류 발생");}
            })
        }
    
    })
}


/* 깐부 닉네임 검색 */
const searchArea = document.getElementById("searchArea");
const searchInput = document.getElementById("searchInput");


searchArea.addEventListener("submit", e => {
    console.log(searchInput.value);

    if(searchInput.value.trim().length > 0){

        location.href="/manage/friend?searchInput=" + searchInput.value;
        
    } 

})


/* 모든깐부 조회(모든깐부 버튼) */
const allFriend = document.getElementById("allFriend");
allFriend.addEventListener("click", e => {
    searchInput.value="";
    location.href="/manage/friend?searchInput=" + searchInput.value;
})



// /* 깐부 미니홈페이지 오픈 */
// const openMinihome = (url) => {
//     console.log(url);
//     let title = "minihome";
//     // let name = "_blank";
//     let replace = "false";

//     let specs = "resizable=no, status=no, menubar=no, width=1203, height=718, top=50, left=300";
//     window.open(url,title,specs,false);

//     return false;
// }