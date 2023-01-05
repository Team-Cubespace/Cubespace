/* [함수] : 팝업 닫기 */
function popDisplayNone(){
  initModal();
  document.getElementById("popup_layer").style.display = "none";
}
/* 모달창 내에서 취소버튼 눌렀을 때 팝업 닫기 */
// document.getElementById("cancleBtn").addEventListener("click",function(){
//   popDisplayNone();
//   document.getElementById("popup_layer").style.display = "none";
// })
/* [함수] : 모달 초기화 - 이게 필요가 있나? */ 
function initModal(arg){
  //1. 카테고리
    document.getElementById("category").value = "3";
    //2. 제목
    document.getElementById("title").value = "";
    //3. 내용
    document.getElementById("description").value = "";
    //4. 시작 날짜
    document.getElementById("startDate").value = arg.event.start.getFullYear() +"-"+startMonth+"-"+startDate;
    //5. 시작 시간
    document.getElementById("startTime").value = startHour+":"+startMinute;
    //6. 종료 날짜
    document.getElementById("endDate").value = arg.event.end.getFullYear() +"-"+endMonth+"-"+endDate;
    //7. 종료 시간
    document.getElementById("endTime").value = endHour+":"+endMinute;
    //8. 종일 여부 (이거 '아니오'를 택하도록 하고 싶은데 못하겠넴)
    // document.querySelector("input[name='allDay']:checked").value = "false";
    document.querySelectorAll("input[name='allDay']")[0].attr("checked",checked);
}