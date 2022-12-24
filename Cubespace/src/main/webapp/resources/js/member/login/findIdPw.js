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
        emailMessage.innerText = "사용 가능한 이메일 형식입니다";
        emailMessage.classList.add("confirm");
        emailMessage.classList.remove("error");
        checkObj.memberEmail = true;
        
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
const telMessage = document.getElementById("telMessage");

memberTel.addEventListener("input",()=>{
    // 전화번호 미 입력시
    if(memberTel.value.trim().length == 0){
        telMessage.innerText="전화번호를 입력해 주세요.(-제외)";
        telMessage.classList.remove("confirm","error");
        checkObj.memberTel = false;
        return;
    } 

    // 전화번호 정규표현식
    const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;

    if(regEx.test(memberTel.value)){ // 정규표현식이 일치한 경우
        telMessage.innerText="전화번호 형식이 유효합니다";
        telMessage.classList.add("confirm");
        telMessage.classList.remove("error");
        checkObj.memberTel = true;
    } else { // 정규표현식이 일치하지 않는 경우
        telMessage.innerText="전화번호 형식이 유효하지 않습니다.";
        telMessage.classList.remove("confirm");
        telMessage.classList.add("error");
        checkObj.memberTel = false;
    }
})







