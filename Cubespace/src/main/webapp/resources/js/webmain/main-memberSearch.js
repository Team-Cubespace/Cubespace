
/* 깐부찾기 자동완성 */
// 비동기로 회원 목록 조회 함수 
document.getElementById("memberSearchInput").addEventListener("keyup",()=>{

    // input 값 가져오기 
    var memberSearchInput=$('#memberSearchInput').val();

    $.ajax({
        url : "/memberAllSearch",
        data: {"memberSearchInput":memberSearchInput},
        dataType : "JSON",
        success : memberSearchList =>{

            /* 가져와야할 값 */
            // 회원 닉네임
            // 회원 프로필사진
            // 미니홈피 번호(회원번호)
            // 이미깐부인지 아닌
            // 신청 가능한지
            // 수락대기중

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
                        img.setAttribute("src",/* 프로필사진 */)

                        /* 프로필 닉네임 생성 */
                        const div1_div =document.createElement("div");
                        div1_div.classList.add("member-nickname");
                        div1_div.innerText=/* 닉네임 *7/;

                    const div2  = document.createElement("div")
                    div2.classList.add("profile-body")
                    
                    /* 이미친구일때 */
                    if(){}
            }

        }

    })


})