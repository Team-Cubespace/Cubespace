function verifySecession(){

    const memberEmail = document.getElementById("memberEmail");
    const memberName = document.getElementById("memberName");
    const memberPw = document.getElementById("memberPw");


    if(memberEmail.value.trim().length == 0){
        alert("아이디(이메일)를 입력해주세요");
        return false;
    }
    if(memberName.value.trim().length == 0){
        alert("이름을 입력해주세요");
        return false;
    }
    if(memberPw.value.trim().length == 0){
        alert("비밀번호를 입력해주세요");
        return false;
    }

    if(confirm("정말 탈퇴하겠습니까?")){
        return true;

    } else {
        alert("탈퇴 취소");
        return false;
    }
}


