// 정렬
const order = document.getElementById("order");
const orderInput = document.getElementById("orderInput");

const orderBy = () => {

    switch (order.value) {
        case "order1": orderInput.value = 1; break;
        case "order2": orderInput.value = 2; break;
        case "order3": orderInput.value = 3; break;
        case "order4": orderInput.value = 4; break;
    }

    document.getElementById("frmSearchBase").submit();
};




/* -------------------------------------------------------------- */

//팝업 띄우기
function openPop() {
    document.getElementsByClassName("popup_box")[0].style.display = "block";
}

// 팝업 닫기
function closePop() {
    document.getElementsByClassName("popup_box")[0].style.display = "none";
}
document.getElementById("fontAddBtn").addEventListener("click", openPop2);

/* -------------------------------------------------------------- */

// 회원정보 등록
document.getElementById("memberAddBtn").addEventListener("click", openPop);
document.getElementById("signUpBtn").addEventListener("click", () => {


    const memberEmail = document.getElementById("inputEmail").value;
    const memberPw = document.getElementById("inputPw").value;
    const memberPw2 = document.getElementById("inputPw2").value;
    const memberNickname = document.getElementById("inputNickname").value;
    const memberName = document.getElementById("inputName").value;
    const memberTel = document.getElementById("inputTel").value;


    if (memberPw != memberPw2) {
        alert("비밀번호가 일치하지 않습니다");
        return;

    } else {
        
        $.ajax({

            url: "/admin/member/insertNewMember",
            data: {
                "memberEmail": memberEmail,
                "memberPw": memberPw,
                "memberNickname": memberNickname,
                "memberName": memberName,
                "memberTel": memberTel,
            },
            type: "post",
            success: result => {
                if (result > 0) {
                    alert("회원 정보가 등록되었습니다.");
                    document.getElementById("frmSearchBase").submit();
                }
            },
            error: () => {
                alert("회원 등록 실패");
            }
        })
    }
});


// 회원정보 삭제
const btnDel = document.getElementsByClassName("btnDel");
for (let btn of btnDel) {
    btn.addEventListener("click", e => {

        const memberNo = e.target.getAttribute("id");
        if (confirm("정말 회원 정보를 삭제하시겠습니까?")) {

            $.ajax({
                url: "/admin/member/deleteMember",
                data: { "memberNo": memberNo },
                type: "post",
                success: result => {
                    if (result > 0) {
                        alert("회원 정보가 삭제되었습니다");
                        document.getElementById("frmSearchBase").submit();
                    } else {
                        alert("회원 정보 삭제 실패");
                    }
                },
                error: () => { console.log("회원 정보 삭제 중 에러 발생"); }

            })
        }
    });
}