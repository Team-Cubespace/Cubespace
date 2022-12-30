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


// 판매자 마이 페이지 이동
const sellerPage = document.getElementsByClassName("sellerPage");

// for(let item of sellerPage) {
for(let i = 0; i < sellerPage.length; i++) {
    sellerPage[i].addEventListener("click", () => {
    const seller = document.getElementsByClassName("seller")[i];
    seller.action = "/member/myPage/yourPageMain?myPageCt=1";
    seller.submit();
  })
}




// 회원정보 수정
const btnModify = document.getElementsByClassName("btnModify");

for (let btn of btnModify) {

    btn.addEventListener("click", e => {



        const memberInfo = e.target.getAttribute("id");

        let editMemberNo = memberInfo.split("||")[0];
        let editMemberNickname = memberInfo.split("||")[1];
        let editMemberName = memberInfo.split("||")[2];
        let editMemberBirth = memberInfo.split("||")[3];
        let editMemberTel = memberInfo.split("||")[4];

        const memberNickname = document.getElementById("memberNickname");
        const memberName = document.getElementById("memberName");
        const memberBirth = document.getElementById("memberBirth");
        const memberTel = document.getElementById("memberTel");

        memberNickname.value = editMemberNickname;
        memberName.value = editMemberName;
        memberBirth.value = editMemberBirth;
        memberTel.value = editMemberTel;

        openPop();

        document.getElementsByClassName("SignUp")[0].addEventListener("click", () => {

            editMemberNickname = document.getElementById("memberNickname").value;
            editMemberName = document.getElementById("memberName").value;
            editMemberBirth = document.getElementById("memberBirth").value;
            editMemberTel = document.getElementById("memberTel").value;


            $.ajax({

                url: "/manager/managerEdit",
                data: {
                    "memberNo": editMemberNo, "memberNickname": editMemberNickname,
                    "memberName": editMemberName, "memberBirth": editMemberBirth, "memberTel": editMemberTel
                },
                type: "get",
                success: result => {
                    if (result > 0) {
                        alert("회원 정보가 수정되었습니다");
                        closePop();
                        document.getElementById("frmSearchBase").submit();

                    } else {
                        alert("회원 정보 수정 실패");
                        closePop();
                    }
                },
                error: () => { alert("회원 정보 수정 중 오류 발생") }
            })
        });



    });
}


// 회원정보 삭제
const btnDel = document.getElementsByClassName("btnDel");
for (let btn of btnDel) {

    btn.addEventListener("click", e => {

        const memberNo = e.target.getAttribute("id");

        if (confirm("정말 회원 정보를 삭제하시겠습니까?")) {

            $.ajax({

                url: "/manager/memberDelete",
                data: { "memberNo": memberNo },
                type: "get",
                success: (result) => {
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

// 회원정보 삭제 복구
const btnDelBack = document.getElementsByClassName("btnDelBack");
for (let btn of btnDelBack) {

    btn.addEventListener("click", e => {

        const memberNo = e.target.getAttribute("id");



        $.ajax({

            url: "/manager/memberDeleteBack",
            data: { "memberNo": memberNo },
            type: "get",
            success: (result) => {
                if (result > 0) {
                    alert("회원 정보가 복구되었습니다");
                    document.getElementById("frmSearchBase").submit();
                } else {
                    alert("회원 정보 복구 실패");
                }
            },
            error: () => { console.log("회원 정보 복구 중 에러 발생"); }

        })

    });
}

// 회원정보 차단
const btnBlock = document.getElementsByClassName("btnBlock");
for (let btn of btnBlock) {

    btn.addEventListener("click", e => {

        const memberNo = e.target.getAttribute("id");

        if (confirm("정말 회원을 차단하시겠습니까?")) {

            $.ajax({

                url: "/manager/memberBlock",
                data: { "memberNo": memberNo },
                type: "get",
                success: (result) => {
                    if (result > 0) {
                        alert("회원이 차단되었습니다");
                        document.getElementById("frmSearchBase").submit();
                    } else {
                        alert("회원 차단 실패");
                    }
                },
                error: () => { console.log("회원 차단 중 에러 발생"); }

            })
        }
    });
}


// 회원정보 차단 복구
const btnBlockBack = document.getElementsByClassName("btnBlockBack");
for (let btn of btnBlockBack) {

    btn.addEventListener("click", e => {

        const memberNo = e.target.getAttribute("id");



        $.ajax({

            url: "/manager/memberBlockBack",
            data: { "memberNo": memberNo },
            type: "get",
            success: (result) => {
                if (result > 0) {
                    alert("회원이 차단 해제되었습니다");
                    document.getElementById("frmSearchBase").submit();
                } else {
                    alert("회원 차단해제 실패");
                }
            },
            error: () => { console.log("회원 차단해제 중 에러 발생"); }

        })

    });
}


//팝업 띄우기
function openPop() {
    document.getElementById("popup_layer").style.display = "block";
}

function openPop2() {
    document.getElementById("popup_layer2").style.display = "block";
}

// 팝업 닫기
function closePop() {
    document.getElementById("popup_layer").style.display = "none";
}
function closePop2() {
    document.getElementById("popup_layer2").style.display = "none";
}



/* 주소검색 api */
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            sample6_postcode.value = data.zonecode;
            sample6_address.value = addr;


            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}


// 회원정보 등록
document.getElementById("memberAddBtn").addEventListener("click", openPop2);


document.getElementById("signUpBtn").addEventListener("click", () => {


    const memberEmail = document.getElementById("inputEmail").value;
    const memberPw = document.getElementById("inputPw").value;
    const memberPw2 = document.getElementById("inputPw2").value;
    const memberNickname = document.getElementById("inputNickname").value;
    const memberName = document.getElementById("inputName").value;
    const memberBirth = document.getElementById("inputBirth").value;
    const memberTel = document.getElementById("inputTel").value;
    // const memberAddress = document.querySelectorAll("input[name='memberAddress']");
    const memberAddress = document.querySelectorAll("input[name='memberAddress']")[0].value
        + ",," + document.querySelectorAll("input[name='memberAddress']")[1].value
        + ",," + document.querySelectorAll("input[name='memberAddress']")[2].value;


    if (memberPw != memberPw2) {

        alert("비밀번호가 일치하지 않습니다");
        return;

    } else {


        (() => {


            $.ajax({

                url: "/manager/memberSignUp",
                data: {
                    "memberEmail": memberEmail,
                    "memberPw": memberPw,
                    "memberNickname": memberNickname,
                    "memberName": memberName,
                    "memberBirth": memberBirth,
                    "memberTel": memberTel,
                    "memberAddress": memberAddress
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
        })();
    }



});



/* 상품등록 페이지 이동 */
document.getElementById("goodsAddBtn").addEventListener("click", e=>{
    location.href = "/admin/goods/font";
})