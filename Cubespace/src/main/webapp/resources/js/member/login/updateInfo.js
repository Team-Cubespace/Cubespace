const checkObj = {
    "memberNickname" : true,
    "memberName" : true,
    "memberBirth" : true,
    "memberTel" : true,
}
// 회원 가입 양식이 제출 되었을 때
document.getElementById("signUp-frm").addEventListener("submit",function(event){

    const memberBirth = document.getElementById("memberBirth");
    const birthYear = document.getElementById("birthYear");
    const birthDay = document.getElementById("birthDay");


    // memberBirth가 비어있거나 꽉 채워져있을 때 유효성검사 통과
    if(checkObj.memberBirth){
        birthYear.value = (memberBirth.value).substr(0,4);
        birthDay.value = (memberBirth.value).substr(4,4);
    } else if(memberBirth.value.trim().length == 0){
        checkObj.memberBirth = true;
    }


    if(memberBirth.value != ""){
        birthYear.value = (memberBirth.value).substr(0,4);
        birthDay.value = (memberBirth.value).substr(4,4);

    } else {
        checkObj.memberBirth = true;
    }
    
    for(let key in checkObj){

        let str;

        if(!checkObj[key]){

            switch(key){
                case "memberNickname"           : str = "닉네임이 유효하지 않습니다.";        break;
                case "memberName"               : str = "이름을 입력해주세요.";          break;
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

    checkObj.memberNickname = false;

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

    checkObj.memberName = false;

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

    checkObj.memberBirth = false;

    // 생년월일 미 입력시
    if(memberBirth.value.trim().length == 0){
        birthMessage.innerText="숫자로 생년월일 8자리를 입력해주세요.";
        birthMessage.classList.remove("confirm","error");
        checkObj.memberBirth = true;
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
const telMessage = document.getElementById("telMessage");

memberTel.addEventListener("input",()=>{

    checkObj.memberTel = false; 
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
        const dbTelCheck ={"memberTel":memberTel.value};
            $.ajax({
                url :"/telDupCheck",
                data: dbTelCheck,
                success : (result)=>{
                    if(result == 0){ // 중복된 전화번호가 없다면
                        telMessage.innerText="사용 가능한 전화번호 입니다.";
                        telMessage.classList.remove("error");
                        telMessage.classList.add("confirm")
                        checkObj.memberTel = true;

                    } else { // 중복된 전화번호가 있다면
                        telMessage.innerText="이미 사용중인 전화번호 입니다.";
                        telMessage.classList.remove("confirm");
                        telMessage.classList.add("error");
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



