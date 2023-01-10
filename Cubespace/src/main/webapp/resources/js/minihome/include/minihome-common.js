// 미니홈 히스토리 저장
const openMinihome = (url) => {
    // 현재 보고있는 미니홈 번호 가져오기
    const minihomeNo = window.parent.location.href.substring(window.parent.location.href.lastIndexOf('/') + 1);
    // localStorage에서 json 가져오기
    let historyArr = localStorage.getItem("minihomeHistory");
    // 히스토리가 없을 때
    if(historyArr == null) {
        // 새로운 배열 생성
        historyArr = new Array();
    } else {
    // 히스토리가 있을 때
        // json을 객체로 파싱
        historyArr = JSON.parse(historyArr);
    }
    // 미니홈 번호 배열 맨끝에 넣기
    historyArr.push(minihomeNo);
    // 배열 다시 json으로 파싱해서 localStorage안에 넣기
    localStorage.setItem("minihomeHistory",JSON.stringify(historyArr));

    let title = "minihome";
    // let name = "_blank";
    let replace = "false";

    let specs = "resizable=no, status=no, menubar=no, width=1203, height=718, top=50, left=300";
    window.open(url,title,specs,false);

    return false;
}


// 닉네임 드롭다운 초기화
const initNicknameDropDown= ()=>{
    const nickNameList = document.getElementsByClassName("nickname-drop-down-button");
    for(let nickName of nickNameList) {
        nickName.addEventListener("click", (e)=>{
            // e.stopPropagation();    
            nickName.firstElementChild.classList.toggle("show");
            nickName.firstElementChild.style.left = e.offsetX + "px";
            nickName.firstElementChild.style.top = e.offsetY + "px";
        });
        nickName.addEventListener("blur", ()=>{
            setTimeout(()=> {
                nickName.firstElementChild.classList.remove("show");
            }, 100);
        })
    }
}

initNicknameDropDown();