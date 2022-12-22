
/* 깐부찾기 자동완성 */
// 비동기로 회원 목록 조회 함수 
document.getElementById("memberSearchInput").addEventListener("keyup",()=>{

    // input 값 가져오기 
    var memberSearchInput=$('#memberSearchInput').val();

    $.ajax({
        url : "/memberAllSearch",
        data: {"memberSearchInput":memberSearchInput,"loginMemberNo":3},
        dataType : "JSON",
        success : memberSearchList =>{
            // console.log(memberSearchList);

            const section = document.querySelector(".mebmer-search-profile");
            section.innerHTML=""; // 이전 내용 제거
            
            // 검색된 회원 폼만들어서 출력
            for(let profile of memberSearchList){

                const div = document.createElement("div")
                div.classList.add("mebmer-profile");

                    const div1 = document.createElement("div")
                    div1.classList.add("profile-head");

                        /* 프로필 사진 생성 */
                        const img  =document.createElement("img");
                        img.classList.add("member-img");
                        /* DB에 프로필 사진이 NUll이라면 */
                        if(profile.profileImage==""){
                            img.setAttribute("src","/resources/images/common/cubes.png")
                        } else{//null이 아니라면
                            img.setAttribute("src",profile.profileImage)
                        }

                        /* 프로필 닉네임 생성 */
                        const div1_div =document.createElement("div");
                        div1_div.classList.add("member-nickname");
                        div1_div.innerText=profile.memberNickname;

                    const div2  = document.createElement("div")
                    div2.classList.add("profile-body")
                    
                        if(profile.friendAcceptFl==1){ /* 이미 깐부일 경우 */
                            const div2_1 =document.createElement("div");

                                const i =document.createElement("i");
                                i.classList.add("fa-solid","fa-check");
                                i.setAttribute("id","faCheck");

                                const div2_1div =document.createElement("div");
                                div2_1div.innerText="깐부"

                            div2_1.append(i,div2_1div);

                        }else if (profile.friendAcceptFl==0) { /* 수락대기중일 경우 */
                            const div2_0 =document.createElement("div");

                            const i =document.createElement("i");
                            i.classList.add("fa-regular","fa-comment-dots");
                            i.setAttribute("id","faCommentDots");

                            const div2_0div =document.createElement("div");
                            div2_0div.innerText="수락대기"

                            div2_0.append(i,div2_0div);
                        } else { /* 깐부신청이 가능할 경우 */
                            const div2_2 =document.createElement("div");
                            div2_2.classList.add("member-choice");

                            const i =document.createElement("i");
                            i.classList.add("fa-regular","fa-paper-plane");
                            i.setAttribute("id","faPaperPlane");

                            const div2_2div =document.createElement("div");
                            div2_2div.innerText="신청"

                            div2_2.append(i,div2_2div);
                        }



            }

        }

    })


})