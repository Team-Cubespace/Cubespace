const order = document.getElementById("order");
const orderInput = document.getElementById("orderInput");

const orderBy = () => {

    switch (order.value) {
        case "order1": orderInput.value = 1; break;
        case "order2": orderInput.value = 2; break;
    }
    document.getElementById("frmSearchBase").submit();
};





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
const updateStatusToggle = (e) => {

    if(confirm("처리상태를 처리중 -> 처리완료로 변경하겠습니까?")){

        const complainNo = e.target.getAttribute("name"); // 신고번호
        
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
}

const noStatusList = document.getElementsByClassName("noStatus");
for(let noStatus of noStatusList){
    noStatus.addEventListener("click", e => {
        
        updateStatusToggle(e);
    })
}



//팝업 띄우기
function openPop(complainedNickname, originalBlockStart, originalBlockEnd) {
    document.getElementsByClassName("complainedMemberArea")[0].innerText = complainedNickname + "님 차단하기";
    document.getElementsByClassName("popup_box")[0].style.display = "block";

    // 이미 차단중인 화원이 아니라면
    if(originalBlockStart == "-"){

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


    } else { // 이미 차단당한 회원이라면
        clock2(blockStart, originalBlockEnd);

        // e.target.value : 새로 차단할 일수
        document.getElementById("block1").addEventListener("click", e => {
            clock3(blockEnd, originalBlockEnd,  e.target.value); 
        })
        document.getElementById("block5").addEventListener("click", e => {
            clock3(blockEnd, originalBlockEnd, e.target.value);
        })
        document.getElementById("block7").addEventListener("click", e => {
            clock3(blockEnd, originalBlockEnd, e.target.value);
        })
        document.getElementById("block30").addEventListener("click", e => {
            clock3(blockEnd, originalBlockEnd, e.target.value);
        })
    }

}

// 팝업 닫기
function closePop() {
    document.getElementsByClassName("popup_box")[0].style.display = "none";
}



// 회원 차단하기
var blockStart = document.getElementById("blockStart"); // 팝업창의 차단시작날짜 적히는 란
var blockEnd = document.getElementById("blockEnd"); // 팝업창의 차단종료날짜 적히는 란

let tempComplainedNo; // 전역변수: 차단당한사람 회원번호
let blockedComplainNo; // 차단 후 처리중->완료 위한 차단번호 변수선언
let afterBlockStatusToggle; // 차단 후 해당 처리완료/처리중 버튼
const complainedMemberList = document.getElementsByClassName("complainedMember");
for(let complainedMember of complainedMemberList) {
    complainedMember.addEventListener("click", e => {

        if(confirm("신고당한사람을 차단처리 하겠습니까")){

            const complainedNo = e.target.getAttribute("id"); // 신고당한사람 회원번호
            const complainNo = e.target.getAttribute("name"); // 신고번호
            const complainedNickname = e.target.innerText; // 신고당한사람 닉네임
            tempComplainedNo = complainedNo;


            // 차단중이라면 차단시작일, 종료시작이 조회
            // complainNo 가져오기
            // 신고번호 리스트의 신고번호(complainNo)의 해당 i값을 찾아
            // class originalBlockStart 중 i번째 값을 읽어옴
            // class originalBlockEnd 중 i번째 값을 읽어옴
            const complainNoList = document.getElementsByClassName("complainNo");
            const originalBlockStartList = document.getElementsByClassName("originalBlockStart");
            const originalBlockEndList = document.getElementsByClassName("originalBlockEnd");
            let originalBlockStart; // 날짜 혹은 "-" 출력
            let originalBlockEnd; // 날짜 혹은 "-" 출력

            for(let i = 0; i < complainNoList.length; i++) {
                if(complainNoList[i].innerText == complainNo){
                    if(originalBlockStartList[i] != undefined){originalBlockStart = originalBlockStartList[i].innerText;}
                    if(originalBlockEndList[i] != undefined){originalBlockEnd = originalBlockEndList[i].innerText;}
                }
            }

            blockedComplainNo = e.target.getAttribute("name");
            afterBlockStatusToggle = document.getElementsByClassName(blockedComplainNo)[0];

            openPop(complainedNickname, originalBlockStart, originalBlockEnd);
        }
    })
}


// 회원 차단
document.getElementById("memberBlockBtn").addEventListener("click", e => {
    const realBlockStart = document.getElementById("realBlockStart").value;
    const realBlockEnd = document.getElementById("realBlockEnd").value;

    $.ajax({
        url : "/admin/complain/blockMember",
        data : {"blockStart" : realBlockStart, "blockEnd" : realBlockEnd, "memberNo" : tempComplainedNo},
        success : result => {
            if(result > 0) {
                alert("회원 차단이 성공적으로 이루어졌습니다");
                afterBlockStatus(afterBlockStatusToggle, blockedComplainNo);
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



// 차단 날짜 계산하기(새로 차단당하는 사람)
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
    

    if(addDate == 0) { // blockStart
        document.getElementById("realBlockStart").value = 
            year + "-" + (Number(month) + 1) + "-" + date + " " + hours + ":" + minutes;
    } else { // blockEnd
        document.getElementById("realBlockEnd").value =
            year + "-" + (Number(month) + 1) + "-" + date + " " + hours + ":" + minutes;
    }

    target.innerText = 
    `${year}년 ${month + 1}월 ${date}일 ${week[day]}요일 ` +
    `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;      
}

// 차단날짜 계산하기(이미 차단당한 사람)
const clock2 = (target, originalBlockStart) => {

    const expectedDate = new Date(originalBlockStart);
    expectedDate.setDate(expectedDate.getDate());
    
    var year = expectedDate.getFullYear();
    var month = expectedDate.getMonth();
    var date = expectedDate.getDate();
    var day = expectedDate.getDay();
    var week = ['일', '월', '화', '수', '목', '금', '토'];
    
    var hours = expectedDate.getHours();
    var minutes = expectedDate.getMinutes();
    

    
    document.getElementById("realBlockStart").value = 
        year + "-" + (Number(month) + 1) + "-" + date + " " + hours + ":" + minutes;

    target.innerText = 
    `${year}년 ${month + 1}월 ${date}일 ${week[day]}요일 ` +
    `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`; 

    
}

// 차단날짜 계산하기(이미 차단당한 사람)
const clock3 = (target, originalBlockEnd, addDate) => {

    const expectedDate = new Date(originalBlockEnd);
    expectedDate.setDate(expectedDate.getDate() + Number(addDate));

    var year = expectedDate.getFullYear();
    var month = expectedDate.getMonth();
    var date = expectedDate.getDate();
    var day = expectedDate.getDay();
    var week = ['일', '월', '화', '수', '목', '금', '토'];
    
    var hours = expectedDate.getHours();
    var minutes = expectedDate.getMinutes();
    

    if(addDate == 0) { // blockStart
        document.getElementById("realBlockStart").value = 
            year + "-" + (Number(month) + 1) + "-" + date + " " + hours + ":" + minutes;
    } else { // blockEnd
        document.getElementById("realBlockEnd").value =
            year + "-" + (Number(month) + 1) + "-" + date + " " + hours + ":" + minutes;
    }

    target.innerText = 
    `${year}년 ${month + 1}월 ${date}일 ${week[day]}요일 ` +
    `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`; 
    
}


// 차단 후 처리상태 처리중->완료 변경
const afterBlockStatus = (afterBlockStatusToggle, blockedComplainNo) => {

    $.ajax({
        url : "/admin/complain/updateStatusToggle",
        data : {"complainNo" : blockedComplainNo, "status" : 1},
        type : "get",
        success : result => {
            if(result > 0) {
                alert("처리상태가 변경되었습니다");
                afterBlockStatusToggle.classList.remove("noStatus");
                afterBlockStatusToggle.classList.add("yesStatus");
                afterBlockStatusToggle.innerText = "처리완료";
            } else {
                console.log("처리상태 변경 실패");
            }
        },
        error : e => {
            console.log("처리상태 변경 중 오류 발생");
        }
    })
}