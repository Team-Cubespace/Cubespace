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