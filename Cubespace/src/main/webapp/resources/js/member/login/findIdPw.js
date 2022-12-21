const checkObj = {
    "memberEmail"   : false,
    "memberName" : false,
    "memberTel" : false,
}
// 회원 가입 양식이 제출 되었을 때
document.getElementById("findId-frm").addEventListener("submit",function(event){

    for(let key in checkObj){

        let str;

        if(!checkObj[key]){

            switch(key){
                case "memberEmail"              : str = "이메일이 유효하지 않습니다.";        break;
                case "memberName"               : str = "이름이 유효하지 않습니다.";          break;
                case "memberTel"                : str = "전화번호가 유효하지 않습니다.";      break;
            }
            alert(str);
            document.getElementById(key).focus();
            event.preventDefault(); // 제출 이벤트 제거
            return; 
        }
    }
})

/*************************** 이메일 유효성 검사 ***************************/
const memberEmail = document.getElementById("memberEmail");
const emailMessage = document.getElementById("emailMessage");

memberEmail.addEventListener("input",()=>{
    // 미입력시
    if(memberEmail.value.trim().length == 0){
        emailMessage.innerText="인증번호를 받을 수 있는 이메일을 입력해주세요.";
        emailMessage.classList.remove("confirm","error");
        memberEmail.value="";
        checkObj.memberEmail = false;
        return;
    }
    // 정규표현식
    const regEx = /^[A-Za-z\d\-\_]{4,}@[\w\-\_]+(\.\w+){1,3}$/;
    
    if(regEx.test(memberEmail.value)){ // 유효할때
        $.ajax({
            url : "/emailDupCheck",
            data : {"memberEmail" : memberEmail.value}, 
            success : (result) => {
                if(result == 0) {// 중복 아닐떄
                    emailMessage.innerText="사용 가능한 이메일 입니다."
                    emailMessage.classList.remove("error")
                    emailMessage.classList.add("confirm")
                    checkObj.memberEmail = true;

                }else{// 중복 일떄
                    emailMessage.innerText="이미 사용중인 이메일 입니다."
                    emailMessage.classList.remove("confirm")
                    emailMessage.classList.add("error")
                    checkObj.memberEmail = false;
                }
            }, 
            error : () => { 
                console.log("이메일 ajax 중복검사 실패");
            },
            complete : () => {
                console.log("이메일 ajax 중복검사 완료");
            },
        });
    } else { //유효하지 않은 경우
        emailMessage.innerText = "이메일 형식이 유효하지 않습니다.";
        emailMessage.classList.remove("confirm");
        emailMessage.classList.add("error");
        checkObj.memberEmail = false;
    }
});




/*************************** 이름 유효성 검사 ***************************/

const memberName =document.getElementById("memberName");
/* 이름 유효성 검사 */
if(memberName.value.trim().length == 0){
    checkObj.memberName = false;
}else{
    checkObj.memberName = true;
}

memberName.addEventListener("input",()=>{

    // 미입력시
    if(memberName.value.trim().length == 0){
        checkObj.memberName = false;
    }else{
        checkObj.memberName = true;
    }
});




/*************************** 전화번호 유효성 검사 ***************************/
const memberTel = document.getElementById("memberTel");
const temlMessage = document.getElementById("temlMessage");

memberTel.addEventListener("input",()=>{
    // 전화번호 미 입력시
    if(memberTel.value.trim().length == 0){
        temlMessage.innerText="전화번호를 입력해 주세요.(-제외)";
        temlMessage.classList.remove("confirm","error");
        checkObj.memberTel = false;
        return;
    } 

    // 전화번호 정규표현식
    const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;

    if(regEx.test(memberTel.value)){ // 정규표현식이 일치한 경우
        const dbTelCheck ={"memberTel":memberTel.value};
            $.ajax({
                url :"/telDupCheck",
                data: dbTelCheck,
                success : (result)=>{
                    if(result == 0){ // 중복된 전화번호가 없다면
                        temlMessage.innerText="사용 가능한 전화번호 입니다.";
                        temlMessage.classList.remove("error");
                        temlMessage.classList.add("confirm")
                        checkObj.memberTel = true;

                    } else { // 중복된 전화번호가 있다면
                        temlMessage.innerText="이미 사용중인 전화번호 입니다.";
                        temlMessage.classList.remove("confirm");
                        temlMessage.classList.add("error");
                        checkObj.memberTel = false;
                    }
                },
                error : ()=>{
                    console.log("전화번호 ajax 중복검사 실패");
                },
                complete : ()=>{
                    console.log("전화번호 ajax 중복검사 완료");
                }
            });
    } else { // 정규표현식이 일치하지 않는 경우
        telMessage.innerText="전화번호 형식이 유효하지 않습니다.";
        telMessage.classList.remove("confirm");
        telMessage.classList.add("error");
        checkObj.memberTel = false;
    }
})







