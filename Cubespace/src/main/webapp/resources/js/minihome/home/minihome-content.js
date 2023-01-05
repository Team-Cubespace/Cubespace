/* 메시지 남기기 */
document.getElementById("writeBtn").addEventListener("click", e => {
    // if(minihomeNo == loginNo){
    //     alert("자기 자신에게 깐부 메시지를 남길 수 없습니다.");
    //     e.preventDefault();
    // }

    var arr = [1, 2, 3];

    $.ajax({
        url : "/friendFlag",
        data : {
                "arr" : arr},
        type : "GET",
        success : (friendFlag) => {
            // if(friendFlag > 0) {
            //     const 

            //     $.ajax({
            //         url : "/friendFlag",
            //         data : {"homeNo" : homeNo,
            //                 "loginNo" : loginNo},
            //         type : "GET",
            //         success : (result) => {

            //         }
            //     })

            // } else {
            //     alert("깐부 상태일 때 메시지를 남길 수 있습니다.");
            // }
        },
        error : () => {console.log("깐부 사이 확인 실패");}
    });
})

/* 메시지 더보기 */
function more(){
    $(".friend-message:hidden").slice(0, 5).css("display", "flex");
    if($(".friend-message:hidden").length == 0){
        $("#moreBtn").css("display", "none");
    }
}

$(() => {
    more();
    
    $("#moreBtn").click(e => {
        e.preventDefault();
        more();
    });
})

/* 상단으로 가기 */
$("#topBtn").click(() => {
	$("#homeArea").animate({scrollTop : 0}, 400);
	return false;
});