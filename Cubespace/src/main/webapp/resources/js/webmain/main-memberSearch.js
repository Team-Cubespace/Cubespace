/* 값을 저장할 변수 선언 */
let memberNo;

/* 깐부찾기 자동완성 */
document.getElementById("leftChoiceInput").addEventListener("keyup",()=>{

    memberSearch();
})

/* 내가 신청한 깐부 자동완성*/
// document.getElementById("rightChoiceInput").addEventListener("keyup",()=>{

// })


/* 비동기로 회원 목록 조회 함수  */
const memberSearch=()=>{
    
    // input 값 가져오기 
    var leftChoiceInput=$('#leftChoiceInput').val();
    
    $.ajax({
        url : "/memberAllSearch",
        data: {"leftChoiceInput":leftChoiceInput,"loginMemberNo":3},
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
                            a.setAttribute("onclick","/return openMinihome(this.href)");

                            section.append(div);
                            div.append(div1,div2);
                            div1.append(img,div1_div);
                            div2.append(div2_div,div2_div2);
                            div2_div2.append(div2_divimg,a);
            }
        }
    })
}

/* 비동기로 회원깐부신청 함수  */
const addFriend = (memberNo, btn)=>{

    $.ajax ({
        url : "/memberAddFriend",
        data : {"loginMemberNo":3,"memberNo":memberNo},
        success : memberAddFriend =>{
            console.log(memberAddFriend);

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

// 비동기로 내가 신청한 개쉐리들 조회 취소시 바로 없어져야 하니깐 비동기다 맞지 취소가 있으니 