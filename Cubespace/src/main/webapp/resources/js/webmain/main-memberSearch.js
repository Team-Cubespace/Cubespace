/* 값을 저장할 변수 선언 */
let memberNo;

/* 강사님께 여쭤보기 1 도와주세요 */
/* 이건 왜 안되는 것인가? */
/*  */
// document.querySelector(".member-search-input").addEventListener("keyup",()=>{
//     memberSearch()
// })
/* 이건 왜 위에 있으면 안되는가 */
// document.querySelector(".member-search-input").addEventListener("keyup",memberSearch)

/* 오른쪽 클릭 시 이벤트리스너 제거/추가 */
document.getElementById("rightChoice").addEventListener("click",()=>{

    var reset = document.querySelector(".member-search-input")
    reset.removeEventListener("keyup",memberSearch)
    reset.addEventListener("keyup",memberAddFriendList)
    memberAddFriendList()
})

/* 왼쪽 클릭 시 이벤트리스너 제거/추가 */
document.getElementById("leftChoice").addEventListener("click",()=>{

    var reset = document.querySelector(".member-search-input")
    reset.removeEventListener("keyup",memberAddFriendList)
    reset.addEventListener("keyup",memberSearch)
})

/* 비동기로 회원 목록 조회 함수  */
const memberSearch=()=>{
    
    // input 값 가져오기 
    var leftChoiceInput=$('#leftChoiceInput').val();
    
    $.ajax({
        url : "/memberAllSearch",
        data: {"leftChoiceInput":leftChoiceInput,"loginMemberNo":loginMemberNo},
        dataType : "JSON",
        success : memberSearchList =>{

            const section = document.querySelector(".mebmer-search-profile");
            section.innerHTML=""; // 이전 내용 제거
            
            // 검색된 회원 폼만들어서 출력
            for(let profile of memberSearchList){

                /* 회원번호 전역변수 저장 */
                memberNo= profile.memberNo;
    
                const div = document.createElement("div");
                div.classList.add("mebmer-profile");
    
                    const div1 = document.createElement("div");
                    div1.classList.add("profile-head");
    
                        /* 프로필 사진 생성 */
                        const img  =document.createElement("img");
                        img.classList.add("member-img");

                        /* DB에 프로필 사진이 NUll이라면 */
                        if(profile.profileImage == null){
                            img.setAttribute("src","/resources/images/common/cubes.png")
                        } else{//null이 아니라면
                            img.setAttribute("src",profile.profileImage)
                        } 
    
                        /* 프로필 닉네임 생성 */
                        const div1_div =document.createElement("div");
                        div1_div.classList.add("member-nickname");
                        div1_div.innerText=profile.memberNickname;
    
                    const div2  = document.createElement("div");
                    div2.classList.add("profile-body");
                    
                        const div2_div =document.createElement("div");
                        const i =document.createElement("i");
                        const div2_divdiv =document.createElement("div");
    
                        if(profile.friendAcceptFl==1){ /* 이미 깐부일 경우 */
    
                            i.classList.add("fa-solid","fa-check");
                            i.setAttribute("id","faCheck");
                            div2_divdiv.innerText="깐부";

                            div2_div.append(i,div2_divdiv);
    
                        }else if (profile.friendAcceptFl==0) { /* 수락대기중일 경우 */
    
                            i.classList.add("fa-regular","fa-comment-dots");
                            div2_divdiv.innerText="수락대기";
    
                            div2_div.append(i,div2_divdiv);
                        } else { /* 깐부신청이 가능할 경우 */
                            div2_div.classList.add("member-choice");

                            i.classList.add("fa-regular","fa-paper-plane");
                            div2_divdiv.innerText="신청";
                            div2_divdiv.setAttribute("onclick","addFriend("+profile.memberNo+", this)")

                            div2_div.append(i,div2_divdiv);
                        }
    
                        const div2_div2 =document.createElement("div");
                        div2_div2.classList.add("member-choice");
    
                            const div2_divimg =document.createElement("img");
                            div2_divimg.classList.add("minihome-img");
                            div2_divimg.setAttribute("src","/resources/images/common/smallCube.png");
    
                            const a = document.createElement("a");
                            a.innerText="미니홈피";
                            a.setAttribute("href","/minihome/"+profile.memberNo);
                            a.setAttribute("onclick","return openMinihome(this.href)");

                            section.append(div);
                            div.append(div1,div2);
                            div1.append(img,div1_div);
                            div2.append(div2_div,div2_div2);
                            div2_div2.append(div2_divimg,a);
            }
        }
    })
}
/* 여기둬야 적용됨 */
document.querySelector(".member-search-input").addEventListener("keyup",memberSearch);

/* 비동기로 회원깐부신청 함수  */
const addFriend = (memberNo, btn)=>{

    $.ajax ({
        url : "/memberAddFriend",
        data : {"loginMemberNo":loginMemberNo,"memberNo":memberNo},
        success : memberAddFriend =>{

            if(memberAddFriend==1){// 깐부신청 성공
                //업데이트 신청 -> 대기중 변경
                const friendWaiting = btn.parentElement;
                friendWaiting.classList.remove("member-choice");

                const faPaperPlane = btn.previousElementSibling;
                faPaperPlane.classList.remove("fa-paper-plane");
                faPaperPlane.classList.add("fa-comment-dots");

                const add = btn;
                add.innerText="수락대기"
                add.removeAttribute("onclick");
                add.removeAttribute("id");
            }else{
                alert("깐부신청 실패")
            }
        }
    })
}

/* 비동기로 내가 신청한 회원 목록 조회 함수  */
const memberAddFriendList=()=>{

    // const rightChoiceInput =document.getElementById("rightChoiceInput");
    var rightChoiceInput=$('#rightChoiceInput').val();
    $.ajax ({
        url : "/memberAddFriendList",
        data: {"rightChoiceInput":rightChoiceInput,"loginMemberNo":loginMemberNo},
        dataType : "JSON",
        success : memberAddList =>{

            const section = document.querySelector(".mebmer-search-profile");
            section.innerHTML=""; // 이전 내용 제거
            
            // 검색된 회원 폼만들어서 출력
            for(let profile of memberAddList){

                /* 회원번호 전역변수 저장 */
                memberNo= profile.memberNo;
    
                const div = document.createElement("div");
                div.classList.add("mebmer-profile");
    
                    const div1 = document.createElement("div");
                    div1.classList.add("profile-head");
    
                        /* 프로필 사진 생성 */
                        const img  =document.createElement("img");
                        img.classList.add("member-img");

                        /* DB에 프로필 사진이 NUll이라면 */
                        if(profile.profileImage == null){
                            img.setAttribute("src","/resources/images/common/cubes.png")
                        } else{//null이 아니라면
                            img.setAttribute("src",profile.profileImage)
                        } 
    
                        /* 프로필 닉네임 생성 */
                        const div1_div =document.createElement("div");
                        div1_div.classList.add("member-nickname");
                        div1_div.innerText=profile.memberNickname;
    
                    const div2  = document.createElement("div");
                    div2.classList.add("profile-body");
                    
    
                        const div2_div =document.createElement("div");
                        const i =document.createElement("i");
                        const div2_divdiv =document.createElement("div");
    
    
                        /* 신청취소 생성 */
                            div2_div.classList.add("member-cancel");

                            i.classList.add("fa-solid","fa-xmark");
                            div2_divdiv.innerText="신청 취소";
                            div2_divdiv.setAttribute("onclick","addFriendCancel("+profile.memberNo+", this)")
                        /* 생성완료 */
    
                        const div2_div2 =document.createElement("div");
                        div2_div2.classList.add("member-choice");
    
                            const div2_divimg =document.createElement("img");
                            div2_divimg.classList.add("minihome-img");
                            div2_divimg.setAttribute("src","/resources/images/common/smallCube.png");
    
                            const a = document.createElement("a");
                            a.innerText="미니홈피";
                            a.setAttribute("href","/minihome/"+profile.memberNo);
                            a.setAttribute("onclick","return openMinihome(this.href)");

                            section.append(div);
                            div.append(div1,div2);
                            div1.append(img,div1_div);
                            div2.append(div2_div,div2_div2);
                            div2_div.append(i,div2_divdiv);
                            div2_div2.append(div2_divimg,a);
            }
        }
    })
}

/* 비동기로 회원신청 취소   */
const addFriendCancel = (memberNo, btn)=>{

    $.ajax ({
        url : "/memberAddCancel",
        data : {"loginMemberNo":loginMemberNo,"memberNo":memberNo},
        success : memberAddCancel =>{

            if(memberAddCancel==1){// 깐부신청취소 성공
                //프로필 삭제 
                const mebmerProfile = btn.parentElement.parentElement.parentElement;
                mebmerProfile.remove()
            }else{
                alert("깐부신청취소 실패")
            }
        }
    })
}