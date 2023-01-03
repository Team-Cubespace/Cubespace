const order = document.getElementById("order");
const orderInput = document.getElementById("orderInput");

const orderBy = () => {

    switch (order.value) {
        case "order1": orderInput.value = 1; break;
        case "order2": orderInput.value = 2; break;
    }
    document.getElementById("frmSearchBase").submit();
};


/* 상품등록 페이지 이동 */
document.getElementById("goodsAddBtn").addEventListener("click", e => {
    location.href = "/admin/goods/font";
})



// 긴 신고내용 전체보기
const seeComplainContentList = document.getElementsByClassName("seeComplainContent");
const allComplainContentList = document.getElementsByClassName("allComplainContent");
for(let i = 0; i < seeComplainContentList.length; i++){

    seeComplainContentList[i].addEventListener("mouseover", e => {
        allComplainContentList[i].style.display = "block";

    })
    allComplainContentList[i].addEventListener("mouseout", e => {
        allComplainContentList[i].style.display = "none";
    })
}






// 처리완료 -> 처리중 변경
const yesStatusList = document.getElementsByClassName("yesStatus");
for(let yesStatus of yesStatusList){
    yesStatus.addEventListener("click", e => {
        const complainNo = e.target.getAttribute("name"); // 신고번호

        if(confirm("처리상태를 처리완료 -> 처리중으로 변경하겠습니까?")){
            $.ajax({
                url : "/admin/complain/updateStatusToggle",
                data : {"complainNo" : complainNo, "status" : 0},
                type : "get",
                success : result => {
                    if(result > 0) {
                        alert("처리상태가 변경되었습니다");
                        e.target.classList.add("noStatus");
                        e.target.classList.remove("yesStatus");
                        e.target.innerText = "처리중";
                    } else {
                        console.log("처리상태 변경 실패");
                    }
                },
                error : e => {
                    console.log("처리상태 변경 중 오류 발생");
                }
            })
        }
    })
}

// 처리중 -> 처리완료 변경
const noStatusList = document.getElementsByClassName("noStatus");
for(let noStatus of noStatusList){
    noStatus.addEventListener("click", e => {
        const complainNo = e.target.getAttribute("name"); // 신고번호
        


        

        if(confirm("처리상태를 처리중 -> 처리완료로 변경하겠습니까?")){
            
            $.ajax({
                url : "/admin/complain/updateStatusToggle",
                data : {"complainNo" : complainNo, "status" : 1},
                type : "get",
                success : result => {
                    if(result > 0) {
                        alert("처리상태가 변경되었습니다");
                        e.target.classList.remove("noStatus");
                        e.target.classList.add("yesStatus");
                        e.target.innerText = "처리완료";
                        
                    } else {
                        console.log("처리상태 변경 실패");
                    }
                },
                error : e => {
                    console.log("처리상태 변경 중 오류 발생");
                }
            })
        }
    })
}



//팝업 띄우기
function openPop(complainedNickname) {
    document.getElementsByClassName("complainedMemberArea")[0].innerText = complainedNickname + "님 차단하기";
    document.getElementsByClassName("popup_box")[0].style.display = "block";

    clock(blockStart, 0);

    document.getElementById("block1").addEventListener("click", e => {
        clock(blockStart, 0);
        clock(blockEnd, e.target.value); 
    })
    document.getElementById("block5").addEventListener("click", e => {
        clock(blockStart, 0);
        clock(blockEnd, e.target.value);
    })
    document.getElementById("block7").addEventListener("click", e => {
        clock(blockStart, 0);
        clock(blockEnd, e.target.value);
    })
    document.getElementById("block30").addEventListener("click", e => {
        clock(blockStart, 0);
        clock(blockEnd, e.target.value);
    })
}

// 팝업 닫기
function closePop() {
    document.getElementsByClassName("popup_box")[0].style.display = "none";
}



// 회원 차단하기
const complainedMemberList = document.getElementsByClassName("complainedMember");
for(let complainedMember of complainedMemberList) {
    complainedMember.addEventListener("click", e => {

        if(confirm("신고당한사람을 차단처리 하겠습니까")){

            const complainedNo = e.target.getAttribute("id"); // 신고번호
            const complainedNickname = e.target.innerText;

            openPop(complainedNickname);

            document.getElementById("memberBlockBtn").addEventListener("click", e => {

                const realBlockStart = document.getElementById("realBlockStart");
                const readBlockEnd = document.getElementById("realBlockEnd");

                $.ajax({
                    url : "/admin/complain/blockMember",
                    data : {"blockStart" : realBlockStart, "blockEnd" : readBlockEnd, "memberNo" : complainedNo},
                    type : "get",
                    success : result => {
                        if(result > 0) {
                            alert("회원 차단이 성공적으로 이루어졌습니다");
                            document.getElementById("frmSearchBase").submit();
                        } else {
                            console.log("회원 차단 실패");
                        }
                    },
                    error : e => {
                        console.log("회원 차단 중 오류 발생");
                    }
                })

            })
        }
    })
}



// 차단 날짜 계산하기
var blockStart = document.getElementById("blockStart");
var blockEnd = document.getElementById("blockEnd");


const clock = (target, addDate) => {

    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() + Number(addDate));

    
    var year = expectedDate.getFullYear();
    var month = expectedDate.getMonth();
    var date = expectedDate.getDate();
    var day = expectedDate.getDay();
    var week = ['일', '월', '화', '수', '목', '금', '토'];
    
    var hours = expectedDate.getHours();
    var minutes = expectedDate.getMinutes();
    var seconds = expectedDate.getSeconds();
    

    if(addDate == 0) { // blockStart
        document.getElementById("realBlockStart").value = 
            year + "-" + (Number(month) + 1) + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    } else { // blockEnd
        document.getElementById("realBlockEnd").value =
            year + "-" + (Number(month) + 1) + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    }

    target.innerText = 
    `${year}년 ${month + 1}월 ${date}일 ${week[day]}요일 ` +
    `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;      
}
