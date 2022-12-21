const checkObj = {
    "memberNickname" : false,
    "memberName" : false,
    "memberBirth" : false,
    "memberTel" : false,
}
// 회원 가입 양식이 제출 되었을 때
document.getElementById("signUp-frm").addEventListener("submit",function(event){

    for(let key in checkObj){

        let str;

        if(!checkObj[key]){

            switch(key){
                case "memberNickname"           : str = "닉네임이 유효하지 않습니다.";        break;
                case "memberName"               : str = "이름이 유효하지 않습니다.";          break;
                case "memberBirth"              : str = "생년월일이 유효하지 않습니다.";      break;
                case "memberTel"                : str = "전화번호가 유효하지 않습니다.";      break;
            }
            alert(str);
            document.getElementById(key).focus();
            event.preventDefault(); // 제출 이벤트 제거
            return; 
        }
    }
})

/*************************** 닉네임 확인 유효성 검사 ***************************/
const memberNickname = document.getElementById("memberNickname");
const nickMessage = document.getElementById("nickMessage");

memberNickname.addEventListener("input",()=>{

    // 닉네임 미입력 시
    if(memberNickname.value.trim().length == 0){
        nickMessage.innerText="한글,영어,숫자로만 2~10글자 사이로 입력해주세요.";
        nickMessage.classList.remove("confirm","error");
        checkObj.memberNickname= false;
        return;
    }
    // 닉네임 정규 표현식
    const regEx =/^[가-힣\w]{2,10}$/;

    if(regEx.test(memberNickname.value)){ // 정규표현식 일치하는 경우

        // 닉네임 중복검사
        const dbNicknameCheck = {"memberNickname":memberNickname.value};
        $.ajax({
            url  : '/nicknameDupCheck',
            data : dbNicknameCheck,
            success : (result)=>{
                if(result == 0){ // 중복된 닉네임이 없다면
                    nickMessage.innerText="유효한 닉네임 형식 입니다.";
                    nickMessage.classList.remove("error");
                    nickMessage.classList.add("confirm");
                    checkObj.memberNickname=true;

                }else{ // 중복된 닉네임이 있다면
                    nickMessage.innerText="이미 사용중인 닉네임 입니다.";
                    nickMessage.classList.remove("confirm");
                    nickMessage.classList.add("error");
                    checkObj.memberNickname = false;
                }
            },
            error : ()=>{
                console.log("닉네임 ajax 중복검사 실패");
            },
            complete : ()=>{
                console.log("닉네임 ajax 중복검사 완료");
            }
        });
    } else { // 정규표현식 일치하지 않은 경우
        nickMessage.innerText="유효한 닉네임 형식이 아닙니다.";
        nickMessage.classList.remove("confirm");
        nickMessage.classList.add("error");
        checkObj.memberNickname= false;
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


/*************************** 생년월일 유효성 검사 ***************************/
const memberBirth = document.getElementById("memberBirth");
const birthMessage = document.getElementById("birthMessage");

memberBirth.addEventListener("input",()=>{

    // 생년월일 미 입력시
    if(memberBirth.value.trim().length == 0){
        birthMessage.innerText="숫자로 생년월일 8자리를 입력해주세요.";
        birthMessage.classList.remove("confirm","error");
        checkObj.memberBirth = false;
        return;
    }

    //생년월일 정규표현식 검사
    const regEx =/^[\d]{8}$/;

    if(regEx.test(memberBirth.value)){ // 정규표현식이 일치한 경우
        birthMessage.innerText="유효한 생년월일 형식 입니니다.";
        birthMessage.classList.remove("error");
        birthMessage.classList.add("confirm");
        checkObj.memberBirth = true;
    } else { // 정규표현식이 일치 하지 않는 경우
        birthMessage.innerText="유효하지 않은 생년월일 형식 입니다.";
        birthMessage.classList.remove("confirm");
        birthMessage.classList.add("error");
        checkObj.memberBirth = false;
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



/*************************** 이메일 인증번호 ***************************/
// 이메일 인증코드 발송 / 확인
const sendAuthKeyBtn = document.getElementById("sendAuthKeyBtn");
const authKeyMessage = document.getElementById("authKeyMessage");
let authTimer;
let authMin = 4;
let authSec = 59;
sendAuthKeyBtn.addEventListener("click", function(){
    authMin = 4;
    authSec = 59;
    checkObj.memberEmailCertification = false;
    if(checkObj.memberEmail){ // 중복이 아닌 이메일인 경우
        $.ajax({
            url : "/sendEmail/signUp",
            data : {"email": memberEmail.value},
            success : (result) => {
                if(result > 0){
                    console.log("인증 번호가 발송되었습니다.")
                }else{
                    console.log("인증번호 발송 실패")
                }
            }, error : () => {
                console.log("이메일 발송 중 에러 발생");
            }
        })
        alert("인증번호가 발송 되었습니다.");
        authKeyMessage.innerText = "05:00";
        authKeyMessage.classList.remove("confirm");
        authTimer = window.setInterval(()=>{

            authKeyMessage.innerText = "0" + authMin + ":" + (authSec<10 ? "0" + authSec : authSec);
            
            // 남은 시간이 0분 0초인 경우
            if(authMin == 0 && authSec == 0){
                checkObj.memberEmailCertification = false;
                clearInterval(authTimer);
                return;
            }

            // 0초인 경우
            if(authSec == 0){
                authSec = 60;
                authMin--;
            }
            authSec--; // 1초 감소
        }, 1000)

    } else{
        alert("중복되지 않은 이메일을 작성해주세요.");
        memberEmail.focus();
    }
});


// 인증 확인
const memberEmailCertification = document.getElementById("memberEmailCertification");
const checkAuthKeyBtn = document.getElementById("checkAuthKeyBtn");

checkAuthKeyBtn.addEventListener("click", function(){
    authKeyMessage.classList.remove("confirm");

    if(authMin > 0 || authSec > 0){ // 시간 제한이 지나지 않은 경우에만 인증번호 검사 진행

        $.ajax({
            url : "/sendEmail/checkAuthKey",
            data : {"inputKey": memberEmailCertification.value},
            success : (result) => {

                if(result > 0){
                    clearInterval(authTimer);
                    authKeyMessage.innerText = "인증되었습니다.";
                    authKeyMessage.classList.add("confirm");
                    checkObj.memberEmailCertification = true;

                } else{
                    alert("인증번호가 일치하지 않습니다.")
                    authKeyMessage.classList.remove("confirm");
                    checkObj.memberEmailCertification = false;
                }
            }, 
            error : () => {
                console.log("인증코드 확인 오류");
            }
        })

    } else{
        alert("인증 시간이 만료되었습니다. 다시 시도해주세요.")
    }
});



// --------------------------------------------
// 비밀번호 눈팅
const seePw = document.getElementById("seePw");
const seePwConfirm = document.getElementById("seePwConfirm");

seePw.addEventListener("click", e => {

    if(seePw.classList.contains("fa-eye")){
        seePw.classList.remove("fa-eye");
        seePw.classList.add("fa-eye-slash");
        memberPw.removeAttribute("type");
    } else {
        seePw.classList.add("fa-eye");
        seePw.classList.remove("fa-eye-slash");
        memberPw.setAttribute("type", "password");
    }
})

seePwConfirm.addEventListener("click", e => {

    if(seePwConfirm.classList.contains("fa-eye")){
        seePwConfirm.classList.remove("fa-eye");
        seePwConfirm.classList.add("fa-eye-slash");
        memberPwConfirm.removeAttribute("type");
    } else {
        seePwConfirm.classList.add("fa-eye");
        seePwConfirm.classList.remove("fa-eye-slash");
        memberPwConfirm.setAttribute("type", "password");
    }
})
