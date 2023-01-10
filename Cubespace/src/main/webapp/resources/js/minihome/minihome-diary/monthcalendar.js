let loginMember1 = 1;
let defaultEvents =[] ;
let submitFlag = false;

/* [ajax] 캘린더 오픈 시 :  이벤트를 DB에서 조회해서 캘린더에 뿌려주기 */
$.ajax({
  url: "/diary/calendar/selectSchedule",
  type:'POST',
  dataType: 'json',
  data:{"loginMember1":loginMember1},
  aysnc : false,
  success:function(data){

    /* 이벤트객체를 담는 빈 배열 */
    var events=[];
    /* allDay를 조정해주는 변수 설정 */
    let allDayFlag;
        $(data).each(function(index){
          if(data[index].allDayFlag == "Y"){
            allDayFlag = true;
          } else {
            allDayFlag = false;
          }
          events.push({
          planId : data[index].planNo,
          title: data[index].planTitle, //내 vo에서 넘어온 이름이 이거임
          start : data[index].startDate,
          end : data[index].endDate,
          allDay : allDayFlag,
          category : data[index].planCategory,
          color : data[index].color,
          description : data[index].planDescription,
          textColor : '#243763'
          });
          
        });
    defaultEvents = events;

    /* ■ DB값을 defaultEvents라는 변수에 담아서 calendar에 넣어야 되기 때문에 캘린더 만드는 걸 createCalendar() 함수에 넣음 ■  */
    createCalendar();
  },
  error:function(status, request, error){
  alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error"+error);
  }
});//[ajax]: db조회 끝

/* [함수] allDay 예/아니오에 따라 달라지는 세팅 */

function allDayTrue(){ //alDay == true 일 때
  $("#startTime").attr("disabled",true);
  $("#endTime").attr("disabled",true);
  $("#endDate").attr("disabled",true);
  $("#startTime").val("00:00");
  $("#endTime").val("00:00");
  /* 하루 종일이니까 날짜도 동일!!!! */
  /* 원래 있던 위치 */

  /* 하루종일을 [예]로 클릭할 때 */
  if( $("#startTime").attr("disabled") == "disabled"){
    //alert("끝날짜도 바뀐당1~");
    $("#endDate").val($("#startDate").val());
  }
  
  // $("#endDate").val($("#startDate").val());
}
function allDayFalse(){ //alDay == false 일 때
  $("#startTime").attr("disabled",false)
  $("#endTime").attr("disabled",false)
  $("#endDate").attr("disabled",false);

}

/* 강사님 수정 코드 */
/* 하루종일[예]인 상태에서 시작날짜가 바뀔 때 */
document.getElementById("startDate").addEventListener("change",function(){
  if( $("#startTime").attr("disabled") == "disabled"){
    //alert("끝날짜도 바뀐당2~");
    $("#endDate").val($("#startDate").val());
  }
})

/* 이벤트들은 밖으로 빼준당 왜냐면 호출될 때마다 클릭되기를 기다리고 있다가... 쌓이는 듯...*/
document.querySelectorAll("input[name='allDay']")[0].addEventListener("click",function(){
  allDayTrue();
});
/* 이벤트들은 밖으로 빼준당 */
document.querySelectorAll("input[name='allDay']")[1].addEventListener("click",function(){
  allDayFalse()
});


/* [이벤트] :모달창 내에서 닫기버튼 눌렀을 때 팝업 닫기 */
document.getElementById("cancleBtn").addEventListener("click",function(){
  document.getElementById("popup_layer").style.display = "none";
});

/* [이벤트] :모달창2 내에서 (수정하기)버튼 눌렀을 때 팝업 닫기 */
if(minihomeNo == loginMemberNo){
  document.getElementById("updateShowBtn").addEventListener("click",function(){
    document.getElementById("popup_layer2").style.display = "none";

    //수정,등록 모달창은 미니홈피 주인장만 열 수 있도록 처리함.
      document.getElementById("popup_layer").style.display = "block";
    
  })
}
/* [이벤트] :모달창2 내에서 닫기버튼 눌렀을 때 팝업 닫기 */
document.getElementById("cancleShowBtn").addEventListener("click",function(){
  document.getElementById("popup_layer2").style.display = "none";
});



/* [함수] : 팝업 모달창2 = 모든 사람이 볼 수 있는 일정 디테일 모달창  */
function popup2(arg){
  document.getElementById("popup_layer2").style.display = "block";

    /* 날짜 세팅 =  (월은 1 더해줘야 하고 / 월&일 둘다 1자리수일 경우 세팅 필요함.*/
    let startFullYear = arg.event.start.getFullYear();
    let startMonth = ("0" + (arg.event.start.getMonth() + 1)).slice(-2);
    let startDate= ("0" + arg.event.start.getDate()).slice(-2);
    let startHour = ("0" + arg.event.start.getHours()).slice(-2);
    let startMinute = ("0" + arg.event.start.getMinutes()).slice(-2);
    let endFullYear;
    let endMonth; 
    let endDate;
    let endHour;
    let endMinute;
    /* 시작 = 끝이 완전 똑같을 경우 NVL처리를 해줘도...캘린더 자체에서...end가 null이 되기 때문에....세팅을 해줘야해..... */
      if(arg.event.end != null){
        endFullYear = arg.event.end.getFullYear();
        endMonth = ("0" + (arg.event.end.getMonth() + 1)).slice(-2);
        endDate = ("0" + arg.event.end.getDate()).slice(-2);
        endHour = ("0" + arg.event.end.getHours()).slice(-2);
        endMinute  = ("0" + arg.event.end.getMinutes()).slice(-2);
      } else {
        endFullYear = arg.event.start.getFullYear();
        endMonth = startMonth;
        endDate = startDate;
        endHour = startHour;
        endMinute = startMinute;
      }
    //0. 일정 번호
    document.getElementById("number").value =  arg.event.extendedProps.planId;
    //1. 카테고리
    // document.getElementById("categoryShow").innerText =  arg.event.extendedProps.category;
    let category =  arg.event.extendedProps.category;
    let innerText =  document.getElementById("categoryShow").innerText;
    switch(category){
      case 1 : document.getElementById("categoryShow").innerText = "없음"; break;
      case 2 :  document.getElementById("categoryShow").innerText = "직장"; break;
      case 3 :  document.getElementById("categoryShow").innerText = "집";break;
      case 4 :  document.getElementById("categoryShow").innerText = "기념일"; break;
      case 5 :  document.getElementById("categoryShow").innerText = "약속"; break;
    }
    //2. 제목
    document.getElementById("titleShow").innerText = arg.event.title;
    //3. 내용
      if(arg.event.extendedProps.description != undefined){
        document.getElementById("contentShow").innerHTML = arg.event.extendedProps.description;

        // let temp = arg.event.extendedProps.description;
        // temp = temp.replaceAll("&", "&amp;");
        // temp = temp.replaceAll("<", "&lt;");
        // temp = temp.replaceAll(">", "&gt;");
        // temp = temp.replaceAll("\"", "&quot;");
        // temp = temp.replaceAll("(\r\n|\n|\r|\n\r)", "<br>")
        // temp = temp.replaceAll(" ", "&nbsp;");
        // document.getElementById("contentShow").innerHTML = temp;
      } else {
        document.getElementById("contentShow").innerHTML = "";
      }
    //4. 시작 날짜
    let amPm1;
    if (startHour>=12){
      amPm1 = "오후";
    } else {
      amPm1 = "오전";
    }
    let amPm2;
    if (endHour>=12){
      amPm2 = "오후";
    } else {
      amPm2 = "오전";
    }
    document.getElementById("startDateShow").innerText = startFullYear +"-"+startMonth+"-"+startDate + " "+amPm1+ " " +startHour+":"+startMinute ;

    //6. 종료 날짜
    document.getElementById("endDateShow").innerText = endFullYear +"-"+endMonth+"-"+endDate + " " +amPm2+ " " + endHour+":"+endMinute;

    //8. 종일 여부
      if(arg.event.allDay){
        document.getElementById("allDayShow").innerText = "예";
      }else{
        document.getElementById("allDayShow").innerText = "아니오";
    }

}


/* [함수] : 팝업 모달창 = (1) 이벤트 수정  & (2) 신규 이벤트 등록 */
function popup(arg){

  /* (1)이벤트 값이 있는 경우(수정) */
  if(arg.event != undefined){

    document.getElementById("modal-title").innerText = "일정수정";
  
    /* 등록버튼 숨기기 */
    document.getElementById("mainBtn").style.display = "none";
    /* 수정/삭제버튼 띄우기 */
    document.getElementById("updateBtn").style.display = "block";
    // document.getElementById("deleteBtn").style.display = "block";
    /* 날짜 세팅 =  (월은 1 더해줘야 하고 / 월&일 둘다 1자리수일 경우 세팅 필요함.*/
    let startFullYear = arg.event.start.getFullYear();
    let startMonth = ("0" + (arg.event.start.getMonth() + 1)).slice(-2);
    let startDate= ("0" + arg.event.start.getDate()).slice(-2);
    let startHour = ("0" + arg.event.start.getHours()).slice(-2);
    let startMinute = ("0" + arg.event.start.getMinutes()).slice(-2);
    let endFullYear;
    let endMonth; 
    let endDate;
    let endHour;
    let endMinute;
    /* 시작 = 끝이 완전 똑같을 경우 NVL처리를 해줘도...캘린더 자체에서...end가 null이 되기 때문에....세팅을 해줘야해..... */
      if(arg.event.end != null){
        endFullYear = arg.event.end.getFullYear();
        endMonth = ("0" + (arg.event.end.getMonth() + 1)).slice(-2);
        endDate = ("0" + arg.event.end.getDate()).slice(-2);
        endHour = ("0" + arg.event.end.getHours()).slice(-2);
        endMinute  = ("0" + arg.event.end.getMinutes()).slice(-2);
      } else {
        endFullYear = arg.event.start.getFullYear();
        endMonth = startMonth;
        endDate = startDate;
        endHour = startHour;
        endMinute = startMinute;
      }
    //0. 일정 번호
    document.getElementById("number").value =  arg.event.extendedProps.planId;
    //1. 카테고리
    document.getElementById("category").value =  arg.event.extendedProps.category;
    //2. 제목
    document.getElementById("title").value = arg.event.title;
    //3. 내용
      if(arg.event.extendedProps.description != undefined){
        // document.getElementById("description").value = arg.event.extendedProps.description;
        let temp = arg.event.extendedProps.description;
        temp = temp.replaceAll("&amp;","&");
        temp = temp.replaceAll("&lt;","<");
        temp = temp.replaceAll("&gt;",">");
        temp = temp.replaceAll("&quot;","\"");
        temp = temp.replaceAll("<br>","\n");
        temp = temp.replaceAll("&nbsp;"," ");
        document.getElementById("description").value = temp;
      } else {
        document.getElementById("description").value = "";
      }
    //4. 시작 날짜
    document.getElementById("startDate").value = startFullYear +"-"+startMonth+"-"+startDate;
    //5. 시작 시간
    document.getElementById("startTime").value = startHour+":"+startMinute;
    //6. 종료 날짜
    document.getElementById("endDate").value = endFullYear +"-"+endMonth+"-"+endDate;
    //7. 종료 시간
    document.getElementById("endTime").value = endHour+":"+endMinute;
    //8. 종일 여부
      if(arg.event.allDay){
        $("#allDay1").prop("checked", true);
        /* 클릭했을 때 바뀌는 거 말고도 여기도 세팅해줘야 됨... */
        $("#startTime").attr("disabled",true);
        $("#endTime").attr("disabled",true);
        $("#endDate").attr("disabled",true);
        $("#startTime").val("00:00");
        $("#endTime").val("00:00");
      }else{
        $("#allDay2").prop("checked", true);
        allDayFalse();
      }
    
    /* ajax로 이제 수정한 값을 보내줘야지!!!![update] */
    /* 그와 동시에, event도 addEvent되어야 하는데... */

  }else{ /* (2)이벤트 값이 없는 경우(생성) */

  //수정,등록 모달창은 미니홈피 주인장만 열 수 있도록 처리함.
  if(minihomeNo == loginMemberNo){
    document.getElementById("popup_layer").style.display = "block";
  }
  document.getElementById("modal-title").innerText = "일정등록";

    /* 등록버튼 띄우기 */
    document.getElementById("mainBtn").style.display = "block";
    /* 수정,삭제버튼 숨기기 */
    document.getElementById("updateBtn").style.display = "none";
    // document.getElementById("deleteBtn").style.display = "none";

    //0.일정번호 -> 없겠지?
    //1. 카테고리
    document.getElementById("category").value = "1";
    //2. 제목
    document.getElementById("title").value = "";
    //3. 내용
    document.getElementById("description").value = "";
    //4. 시작 날짜
    document.getElementById("startDate").value = arg.startStr;
    //5. 시작 시간
    document.getElementById("startTime").value = "00:00";
    //6. 종료 날짜
    document.getElementById("endDate").value = arg.startStr;
    //7. 종료 시간
    document.getElementById("endTime").value = "00:00";
    //8. 종일 여부
    $("#allDay2").prop("checked", true); 
    allDayFalse();
  
  }
}/* [함수] : 팝업 모달창 = (1) 이벤트 수정  & (2) 신규 이벤트 등록 끝 */

/* ● calendar자체의 addEvent함수를 쓰고 싶어서 전역변수를 먼저 만든 다음, fullCalendar 값을 넣고 걔의 함수를 씀. ● */
var calendar;
/* ▲ 이벤트 수정 시 사용 */
var selectEvent;

/* ■ DB값을 defaultEvents라는 변수에 담아서 calendar에 넣어야 되기 때문에 캘린더 만드는 걸 createCalendar() 함수에 넣음 ■  */
// document.addEventListener('DOMContentLoaded', function() {
function createCalendar(){

  /* 남의 캘린더에는 수정 못하게 하는 코드 */
  const editableFlag = minihomeNo == loginMemberNo;

  /* 캘린더 시작 */
    var calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
      
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
            // right: 'dayGridMonth'
        },
        // initialDate: '2020-09-12',
        navLinks: true, // can click day/week names to navigate views
        
        dayMaxEvents: true, // allow "more" link when too many events
        selectable : true,
        eventTimeFormat: {
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        },
        /* 일자 클릭 시 모달 호출 */
        select : function (arg){  
          popup(arg);
        },

        eventStartEditable : editableFlag,
        
        /* 이벤트 클릭 시 모달 호출 */
        /* arg = 클릭한 그 이벤트의 내용임. 얘를 모달에 담고, 수정버튼을 눌렀을 때, 수정되도록... */
        eventClick : function (arg){ 
          popup2(arg);
          popup(arg);
          selectEvent = arg;
        },
        events : defaultEvents,

        eventMouseEnter : function(arg){
          
        },

/* ****************************************************************************** */
        eventDragStart: function (event, jsEvent, ui, view) {
        
        },
        eventDragStop : function (){
          //alert(" eventDragStop 이건 언제 발생?")
        },
        //일정 드래그앤드롭
        eventDrop: function (arg) {
          //alert(arg.event.start);
          //alert(arg.event.extendedProps.planId);
          //alert("수정된 시작 날짜" + arg.event.startStr +"수정된 끝날짜"+arg.event.endStr );

          /* 날짜 세팅 =  (월은 1 더해줘야 하고 / 월&일 둘다 1자리수일 경우 세팅 필요함.*/
          let startFullYear = arg.event.start.getFullYear();
          let startMonth = ("0" + (arg.event.start.getMonth() + 1)).slice(-2);
          let startDate= ("0" + arg.event.start.getDate()).slice(-2);
          let startHour = ("0" + arg.event.start.getHours()).slice(-2);
          let startMinute = ("0" + arg.event.start.getMinutes()).slice(-2);
          let endFullYear;
          let endMonth; 
          let endDate;
          let endHour;
          let endMinute;
          /* 시작 = 끝이 완전 똑같을 경우 NVL처리를 해줘도...캘린더 자체에서...end가 null이 되기 때문에....세팅을 해줘야해..... */
            if(arg.event.end != null){
              endFullYear = arg.event.end.getFullYear();
              endMonth = ("0" + (arg.event.end.getMonth() + 1)).slice(-2);
              endDate = ("0" + arg.event.end.getDate()).slice(-2);
              endHour = ("0" + arg.event.end.getHours()).slice(-2);
              endMinute  = ("0" + arg.event.end.getMinutes()).slice(-2);
            } else {
              endFullYear = startFullYear;
              endMonth = startMonth;
              endDate = startDate;
              endHour = startHour;
              endMinute = startMinute;
            }
            let planStart = startFullYear +"-"+startMonth+"-"+startDate + " "+ startHour+":"+startMinute;
            //alert(planStart);
            let planEnd = endFullYear +"-"+endMonth+"-"+endDate + " " + endHour+":"+endMinute;
            //alert(planEnd);
            let planId = arg.event.extendedProps.planId;
            //alert(planId);

            $.ajax({
              url: "/diary/calendar/updateScheduleDrop",
              type:'POST',
              data: {"startDate":planStart,"endDate":planEnd,"planNo":planId},
              success:function(result){
          
                if(result > 0){ //성공
                  alert("일정이 수정되었습니다.");
                } else {
                  console.log("데이터베이스에 드래그수정 실패");
                }
              }, 
              error:function(status, request, error){
              
              }
            });
        }
  /* ****************************************************************************** */
    });
    calendar.render();
}

//게시글 작성 유효성 검사


document.getElementById("title").addEventListener("keyup",function(){
  if(document.getElementById("title").value.length > 30){
    alert("제목은 30글자 이하만 입력할 수 있습니다.");
  
  }
});

document.getElementById("title").addEventListener("keyup",function(){
  if(document.getElementById("description").value.length > 1000){
    alert("내용은 1000글자 이하만 입력할 수 있습니다.");
    
  }
});

/* 유효성 검사 */
function submitCommon(){
  submitFlag = true;
  //1. 제목
  if(document.getElementById("title").value.trim().length == 0){
    submitFlag = false;
    alert("제목을 입력해주세요.");
  }
  //2. 시작날짜 > 끝 날짜
  let start = document.getElementById("startDate").value+" "+document.getElementById("startTime").value;
  let end = document.getElementById("endDate").value+" "+document.getElementById("endTime").value;
  if(start > end) {
    alert("시작날짜가 끝날짜보다 클 수 없습니다.");
    submitFlag = false;
  }
  if(end>9999){
    alert("너무 큰 값은 넣을 수 없습니다.");
    submitFlag = false;
  }
}

/* [함수] 일정 등록 = 모달창에 있는 값을 화면에 뿌리기 & DB에 저장하기 */
function addEvent(){
  const category = document.getElementById("category").value;
  const title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  const startDate = document.getElementById("startDate").value;
  const startTime = document.getElementById("startTime").value;
  const endDate = document.getElementById("endDate").value;
  const endTime = document.getElementById("endTime").value;
  let allDay =  document.querySelector("input[name='allDay']:checked").value;
  let allDayvariable;
  /* 이거 맞춰줘야해... */
  let backgroundColor;
  if(category == 1){
    backgroundColor = "#C0EEE4"
  } else if (category == 2){
    backgroundColor = "#F3CCFF"
  } else if (category == 3){
    backgroundColor = "#D8F8B7"
  } else if (category == 4){
    backgroundColor = "#FFCAC8"
  } else {
    backgroundColor = "#95a5a6"
  }
  
  /* description 세팅 */
  
  // description = description.replaceAll("&", "&amp;");
  // description = description.replaceAll("<", "&lt;");
  // description = description.replaceAll(">", "&gt;");
  // description = description.replaceAll("\"", "&quot;");
  // description = description.replaceAll("(\r\n|\n|\r|\n\r)", "<br>")
  // description = description.replaceAll(" ", "&nbsp;");
  // console.log(description);


  /* db에 추가할 데이터 */
  let addEventdata;
  if(allDay =="true"){
    allDayvariable = "Y";
  } else {
    allDayvariable = "N";
  }
  submitCommon();

  if(submitFlag){
    //alert("제출...?" + submitFlag);
    /* 제목 이상 없으면 제출 */
    $.ajax({
      url: "/diary/calendar/addSchedule",
      // contentType: 'application/json',
      type:'POST',
      data: {
        "planCategory": category,
        "planTitle" : title,
        "planDescription" : description,
        "startDate" : startDate+" "+startTime,
        "endDate": endDate+" "+endTime,
        "allDayFlag" : allDayvariable
      },
      success:function(result){
        
        if(result > 0){ //성공
          alert("일정이 등록되었습니다.");
          /* ● calendar자체의 addEvent함수를 쓰고 싶어서 전역변수를 먼저 만든 다음, fullCalendar 값을 넣고 걔의 함수를 씀. ● */
          if(allDay =="true"){
            calendar.addEvent({
              planId : result,
              category: category,
              title : title,
              description : description,
              start: startDate+"T"+startTime+":00",
              end: endDate+"T"+endTime+":00",
              allDay : true,
              color : backgroundColor,
              textColor : "#243763"
            });
          } else {
            calendar.addEvent({
              planId : result,
              category: category,
              title : title,
              description : description,
              start: startDate+"T"+startTime+":00",
              end: endDate+"T"+endTime+":00",
              allDay : false,
              color : backgroundColor,
              textColor : "#243763"
            });
          }

      } else { //실패
          console.log("서버에 저장 실패");
      }
      },
      error:function(status, request, error){
      
      }
    });
    /* 팝업 닫기 */
    document.getElementById("popup_layer").style.display = "none";
  }
} /* [함수] 일정 등록  끝*/

/* [함수] 수정하기 */
function updateEvent(){
  
  const planId = document.getElementById("number").value;
  const category = document.getElementById("category").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const startDate = document.getElementById("startDate").value;
  const startTime = document.getElementById("startTime").value;
  const endDate = document.getElementById("endDate").value;
  const endTime = document.getElementById("endTime").value;
  const allDay =  document.querySelector("input[name='allDay']:checked").value;
    /* 이거 맞춰줘야해... */
    let backgroundColor;
    if(document.getElementById("category").value == 1){
      backgroundColor = "#C0EEE4"
    } else if (document.getElementById("category").value == 2){
      backgroundColor = "#F3CCFF"
    } else if (document.getElementById("category").value == 3){
      backgroundColor = "#D8F8B7"
    } else if (document.getElementById("category").value == 4){
      backgroundColor = "#FFCAC8"
    } else {
      backgroundColor = "#95a5a6"
    }
    /* 수정 시 제목 유효성 검사 */
    submitCommon();
  
    if(submitFlag){

      let updateData;

      if(allDay =="true"){
        updateData = {
            "planNo" : document.getElementById("number").value,
            "planCategory": document.getElementById("category").value,
            "planTitle" : document.getElementById("title").value,
            "planDescription" : document.getElementById("description").value,
            "startDate" : document.getElementById("startDate").value+" "+document.getElementById("startTime").value,
            "endDate": document.getElementById("endDate").value+" "+document.getElementById("endTime").value,
            "allDayFlag" : 'Y'
            
          }
      } else {
        updateData = {
          "planNo" : document.getElementById("number").value,
          "planCategory": document.getElementById("category").value,
          "planTitle" : document.getElementById("title").value,
          "planDescription" : document.getElementById("description").value,
          "startDate" : document.getElementById("startDate").value+" "+document.getElementById("startTime").value,
          "endDate": document.getElementById("endDate").value+" "+document.getElementById("endTime").value,
          "allDayFlag" : 'N'
        }
      }
      $.ajax({
        url: "/diary/calendar/updateSchedule",
        // contentType: 'application/json',
        type:'POST',
        data: updateData,
        success:function(result){

          if(result > 0){ //성공
            alert("일정이 수정되었습니다.");
          
            //1. 카테고리
            selectEvent.event.setExtendedProp("category", document.getElementById("category").value)
            //2. 제목
            selectEvent.event.setProp("title", document.getElementById("title").value)
            //3. 내용
            // if(document.getElementById("description").value = ""){
            //   selectEvent.event.setExtendedProp("description", undefined)
            // } else {
              selectEvent.event.setExtendedProp("description", document.getElementById("description").value);
            // }
            //4.5.6.7 시작 & 종료 날짜 & 시간
            //selectEvent.event.setDates(document.getElementById("startDate").value+"T"+document.getElementById("startTime").value+":00",
            //                          document.getElementById("endDate").value+"T"+document.getElementById("endTime").value+":00")
            selectEvent.event.setStart(document.getElementById("startDate").value+"T"+document.getElementById("startTime").value+":00");
            selectEvent.event.setEnd(document.getElementById("endDate").value+"T"+document.getElementById("endTime").value+":00");
            //console.log(document.getElementById("endDate").value+"T"+document.getElementById("endTime").value+":00");
            //8. 종일 여부
              if(document.querySelector("input[name='allDay']:checked").value =="true"){
                selectEvent.event.setAllDay(true);
              } else {
                selectEvent.event.setAllDay(false);
              }
              /* 색깔 */
              selectEvent.event.setProp("color", backgroundColor);
              
          } else { //실패
                console.log("서버에 저장 실패");
          }
        },
        error:function(status, request, error){
        
        }
      });

      //팝업 닫기
      document.getElementById("popup_layer").style.display = "none";
    }
}/* [함수] 수정하기 끝*/

function deleteEvent(){
  
  const planId = document.getElementById("number").value;
  
  if(confirm("정말 삭제하시겠습니까?")){

    $.ajax({
      url: "/diary/calendar/deleteSchedule",
      type:'POST',
      data: {"planId":planId},
      success:function(result){

        if(result > 0){ //성공
          alert("일정이 삭제되었습니다.");
          selectEvent.event.remove();
          
        } else { //실패
          console.log("서버에 저장 실패");
        }
      },
      error:function(status, request, error){

      }
    });

    //팝업 닫기
    document.getElementById("popup_layer2").style.display = "none";
  }
}
/* ------------------------------------------------------------------------------ */



