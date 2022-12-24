const deleteFriendBtnList = document.getElementsByClassName("fa-minus");

for(let deleteFriendBtn of deleteFriendBtnList){
    deleteFriendBtn.addEventListener("click", e => {

        console.log(deleteFriendBtn);

        const friendNo = e.target.parentElement.parentElement.lastElementChild.getAttribute("id");
        if(confirm("정말 깐부를 끊겠습니까?")){
            $.ajax({
                url : "/manage/friend/deleteFriend",
                type:"get",
                data : {"friendNo" : friendNo, "memberNo" : memberNo},
                success : result => {
                    if(result > 0) {
                        alert("깐부끊기가 완료되었습니다");
                    } else {
                        alert("깐부끊기 실패");
                    }
                },
                error : () => {console.log("깐부끊기 중 오류 발생");}
            })
        }
    
    })
}