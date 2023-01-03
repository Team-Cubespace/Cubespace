let loginMember = 1;
let defaultEvents =[] ;

/* [ajax] 캘린더 오픈 시 :  이벤트를 DB에서 조회해서 캘린더에 뿌려주기 */
$.ajax({
  url: "/diary/calendar/selectSchedule",
  type:'POST',
  dataType: 'json',
  data:{"loginMember":loginMember},
  aysnc : false,
  success:function(data){
    console.log("스케줄리스트가 잘 불러져 왔니?");
    console.log(data);

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
    console.log("이벤트 목록입니다.");
    defaultEvents = events;
    console.log(defaultEvents);

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
    alert("끝날짜도 바뀐당1~");
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
    alert("끝날짜도 바뀐당2~");
    $("#endDate").val($("#startDate").val());
  }
})

/* 이벤트들은 밖으로 빼준당 왜냐면 호출될 때마다 클릭되기를 기다리고 있다가... 쌓이는 듯...*/
document.querySelectorAll("input[name='allDay']")[0].addEventListener("click",function(){
  console.log("allDay에 '예'를 클릭하셨나요...?");  
  allDayTrue();
});
/* 이벤트들은 밖으로 빼준당 */
document.querySelectorAll("input[name='allDay']")[1].addEventListener("click",function(){
  console.log("allDay에 '아니오'를 클릭하셨나요...?");  
  allDayFalse()
});

/* [함수] 팝업 2개 (등록 or 수정) 공통 */
function commonInPop(){
  /* 공통되니까 함수로 묶으면 안 돼? */

    //allDay = true 일 때의 세팅 : 하루종일이기 때문에, [(1)시작날짜 = 끝날짜 & (2) 시간은 없음]
    //redio버튼 클릭 이벤트
    //$("#allDay2").prop("checked", true); 
    /* 제목값 세팅 */
    let oldTitle = document.getElementById("title").value;
    document.getElementById("title").addEventListener("keyup",function(){
      if(document.getElementById("title").value.length > 100){
        alert("제목은 100글자 이하만 입력할 수 있습니다.");
        document.getElementById("title").value = oldTitle;
      }
    })
    
    

    //종료<시작이라면...
    //제목이 ㅇㅇ자 이상이라면...
    //내용이 oo자 이상이라면....

}//[함수] 팝업 2개 (등록 or 수정) 공통 끝

/* [이벤트] :모달창 내에서 취소버튼 눌렀을 때 팝업 닫기 */
document.getElementById("cancleBtn").addEventListener("click",function(){
  // popDisplayNone();
  document.getElementById("popup_layer").style.display = "none";
})

/* [함수] : 팝업 모달창 = (1) 이벤트 수정  & (2) 신규 이벤트 등록 */
function popup(arg){

  document.getElementById("popup_layer").style.display = "block";

  /* (1)이벤트 값이 있는 경우(수정) */
  if(arg.event != undefined){
    /* 등록버튼 숨기기 */
    document.getElementById("mainBtn").style.display = "none";
    /* 수정/삭제버튼 띄우기 */
    document.getElementById("updateBtn").style.display = "block";
    document.getElementById("deleteBtn").style.display = "block";
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
        document.getElementById("description").value = arg.event.extendedProps.description;
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
    commonInPop();
    
    /* ajax로 이제 수정한 값을 보내줘야지!!!![update] */
    /* 그와 동시에, event도 addEvent되어야 하는데... */

  }else{ /* (2)이벤트 값이 없는 경우(생성) */
    /* 등록버튼 띄우기 */
    document.getElementById("mainBtn").style.display = "block";
    /* 수정,삭제버튼 숨기기 */
    document.getElementById("updateBtn").style.display = "none";
    document.getElementById("deleteBtn").style.display = "none";

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
    //8. 종일 여부 (이거 '아니오'를 택하도록 하고 싶은데 못하겠넴)
    $("#allDay2").prop("checked", true); 
    allDayFalse();
    commonInPop();
  }
}/* [함수] : 팝업 모달창 = (1) 이벤트 수정  & (2) 신규 이벤트 등록 끝 */

/* ● calendar자체의 addEvent함수를 쓰고 싶어서 전역변수를 먼저 만든 다음, fullCalendar 값을 넣고 걔의 함수를 씀. ● */
var calendar;
/* ▲ 이벤트 수정 시 사용 */
var selectEvent;

/* ■ DB값을 defaultEvents라는 변수에 담아서 calendar에 넣어야 되기 때문에 캘린더 만드는 걸 createCalendar() 함수에 넣음 ■  */
// document.addEventListener('DOMContentLoaded', function() {
function createCalendar(){

  /* 캘린더 시작 */
    var calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
      
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            // right: 'dayGridMonth,dayGridWeek,dayGridDay'
            right: 'dayGridMonth'
        },
        // initialDate: '2020-09-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
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

        /* 이벤트 클릭 시 모달 호출 */
        /* arg = 클릭한 그 이벤트의 내용임. 얘를 모달에 담고, 수정버튼을 눌렀을 때, 수정되도록... */
        eventClick : function (arg){ 
          popup(arg);
          selectEvent = arg;
        },
        events : defaultEvents,

        eventMouseEnter : function(arg){
          
        },

        // eventResize: function(info) {
        //   alert(info.event.title + " end is now " + info.event.end.toISOString());
      
        //   if (!confirm("is this okay?")) {
        //     info.revert();
        //   }
        // }
/* ****************************************************************************** */
        eventDragStart: function (event, jsEvent, ui, view) {
          //alert("eventDragStart 이건 언제 발생?")
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
          // 드랍시 수정된 날짜반영
          // var newDates = calDateWhenDragnDrop(event);
      
          // //드롭한 일정 업데이트
          // $.ajax({
          //   type: "get",
          //   url: "",
          //   data: {
          //     //...
          //   },
          //   success: function (response) {
          //     alert('수정: ' + newDates.startDate + ' ~ ' + newDates.endDate);
          //   }
          // });
          
        }
        /* ****************************************************************************** */
        
        
    });
    calendar.render();
}

/* [함수] 일정 등록 = 모달창에 있는 값을 화면에 뿌리기 & DB에 저장하기 */
function addEvent(){
  const category = document.getElementById("category").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
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
  } else {
    backgroundColor = "#FFCAC8"
  }
  
  /* db에 추가할 데이터 */
  let addEventdata;
  if(allDay =="true"){
    allDayvariable = "Y";
  } else {
    allDayvariable = "N";
  }
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
        console.log(result);
        /* ● calendar자체의 addEvent함수를 쓰고 싶어서 전역변수를 먼저 만든 다음, fullCalendar 값을 넣고 걔의 함수를 씀. ● */
        if(allDay =="true"){
          console.log("allday가 trueㅋ")
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
  
} /* [함수] 일정 등록  끝*/

/* [함수] 수정하기 */
function updateEvent(){
  console.log("안녕...");
  
  const planId = document.getElementById("number").value;
  const category = document.getElementById("category").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("title").value;
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
    } else {
      backgroundColor = "#FFCAC8"
    }

  let updateData;
  if(allDay =="true"){
    updateData = {
        "planNo" : document.getElementById("number").value,
        "planCategory": document.getElementById("category").value,
        "planTitle" : document.getElementById("title").value,
        "planDescription" : document.getElementById("title").value,
        "startDate" : document.getElementById("startDate").value+" "+document.getElementById("startTime").value,
        "endDate": document.getElementById("endDate").value+" "+document.getElementById("endTime").value,
        "allDayFlag" : 'Y'
        
      }
  } else {
    updateData = {
      "planNo" : document.getElementById("number").value,
      "planCategory": document.getElementById("category").value,
      "planTitle" : document.getElementById("title").value,
      "planDescription" : document.getElementById("title").value,
      "startDate" : document.getElementById("startDate").value+" "+document.getElementById("startTime").value,
      "endDate": document.getElementById("endDate").value+" "+document.getElementById("endTime").value,
      "allDayFlag" : 'N'
    }
  }
  console.log("수정할 일정 잘 담겼니?");
  console.log(updateData);
  $.ajax({
    url: "/diary/calendar/updateSchedule",
    contentType: 'application/json',
    type:'POST',
    data: JSON.stringify(updateData),
    success:function(result){

      if(result > 0){ //성공
        alert("일정이 수정되었습니다.");
      
        //1. 카테고리
        selectEvent.event.setExtendedProp("category", document.getElementById("category").value)
        console.log("카테고리실험1"+selectEvent.event.category);
        console.log("카테고리실험2"+selectEvent.event.extendedProps.category);
        //2. 제목
        selectEvent.event.setProp("title", document.getElementById("title").value)
        //3. 내용
        // if(document.getElementById("description").value = ""){
        //   selectEvent.event.setExtendedProp("description", undefined)
        // } else {
          selectEvent.event.setExtendedProp("description", document.getElementById("description").value);
        // }
        //4.5.6.7 시작 & 종료 날짜 & 시간
        selectEvent.event.setDates(document.getElementById("startDate").value+"T"+document.getElementById("startTime").value+":00",
                                  document.getElementById("endDate").value+"T"+document.getElementById("endTime").value+":00")
        //8. 종일 여부
          if(document.querySelector("input[name='allDay']:checked").value =="true"){
            selectEvent.event.setAllDay(true);
            // selectEvent.event.setExtendedProp("allDay","true");
            console.log("true임");
          } else {
            selectEvent.event.setAllDay(false);
          // selectEvent.event.setExtendedProp("allDay","false");
            console.log("false임");
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
  
}/* [함수] 수정하기 끝*/

function deleteEvent(){
  
  const planId = document.getElementById("number").value;

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
document.getElementById("popup_layer").style.display = "none";
}