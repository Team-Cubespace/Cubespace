
/* 이벤트를 DB에서 조회해서 캘린더에 뿌려주기 */
let loginMember = 1;
let defaultEvents =[] ;
$.ajax({
  url: "/diary/calendar",
  type:'GET',
  dataType: 'json',
  data:{"loginMember":loginMember},
  aysnc : false,
  success:function(data){
    console.log("스케줄리스트가 잘 불러져 왔니?");
    console.log(data);

    var events=[];
        $(data).each(function(index){
          
            if(data[index].allDayFlag == "Y"){
              events.push({
              title: data[index].planTitle, //내 vo에서 넘어온 이름이 이거임
              /* subSting(0,10): 날짜 subString(11,19) */
              //start: data[index].startDate.substring(0,10), //내 vo에서 넘어온 이름이 이거임
              start : data[index].startDate,
              end : data[index].endDate,
              allDay : true,
              category : data[index].planCategory,
              color : data[index].color,
              textColor : 'black'
              // repeat : 2
              // end: data[index].end,
              // textColor:'white',
              // backgroundColor:'#'+data[index].css,
              // url:'day_md_popup/'+data[index].day_pk
              });
            } else {
              events.push({
                title: data[index].planTitle, //내 vo에서 넘어온 이름이 이거임
                /* subSting(0,10): 날짜 subString(11,19) */
                //start: data[index].startDate.substring(0,10), //내 vo에서 넘어온 이름이 이거임
                start : data[index].startDate,
                end : data[index].endDate,
                allDay : false,
                category : data[index].planCategory,
                color : data[index].color,
                textColor : 'black'
                // repeat : 2
                // end: data[index].end,
                // textColor:'white',
                // backgroundColor:'#'+data[index].css,
                // url:'day_md_popup/'+data[index].day_pk
                });
            }

        });
    console.log("이벤트 목록입니다.");
    // console.log(events);
    defaultEvents = events;
    console.log(defaultEvents);
    createCalendar();
  },
  error:function(status, request, error){
  alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error"+error);
  }
});//ajax

 /* [함수] : 팝업 닫기 */
function popDisplayNone(){
  document.getElementById("popup_layer").style.display = "none";
  initModal();
}
/* 모달창 내에서 취소버튼 눌렀을 때 팝업 닫기 */
document.getElementById("cancleBtn").addEventListener("click",function(){
  popDisplayNone();
})
/* [함수] : 모달 초기화 */
function initModal(){
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

/* 팝업(모달창) 열기 */
function popup(arg){

  document.getElementById("popup_layer").style.display = "block";

  /* (1)이벤트 값이 있는 경우(수정) */
  if(arg.event != undefined){
    document.getElementById("mainBtn").innerText = "수정";
    /* 날짜 세팅 =  (월은 1 더해줘야 하고 / 월&일 둘다 1자리수일 경우 세팅 필요함.*/
    console.log("시작" +arg.event.start);
    console.log("종료" +arg.event.end);
    let startMonth = ("0" + (arg.event.start.getMonth() + 1)).slice(-2);
    let startDate= ("0" + arg.event.start.getDate()).slice(-2);
    let startHour = ("0" + arg.event.start.getHours()).slice(-2);
    let startMinute = ("0" + arg.event.start.getMinutes()).slice(-2);
    let endMonth = ("0" + (arg.event.end.getMonth() + 1)).slice(-2);
    let endDate= ("0" + arg.event.end.getDate()).slice(-2);
    let endHour = ("0" + arg.event.end.getHours()).slice(-2);
    let endMinute = ("0" + arg.event.end.getMinutes()).slice(-2);

    //1. 카테고리
    //2. 제목
    document.getElementById("title").value = arg.event.title;
    //3. 내용
    //4. 시작 날짜
    document.getElementById("startDate").value = arg.event.start.getFullYear() +"-"+startMonth+"-"+startDate;
    //5. 시작 시간
    document.getElementById("startTime").value = startHour+":"+startMinute;
    //6. 종료 날짜
    document.getElementById("endDate").value = arg.event.end.getFullYear() +"-"+endMonth+"-"+endDate;
    //7. 종료 시간
    document.getElementById("endTime").value = endHour+":"+endMinute;
    //8. 종일 여부

    /* 공통되니까 함수로 묶으면 안 돼? */

    //만약 allDay가 true면 시간 선택X
    //redio버튼 클릭 이벤트
    document.querySelectorAll("input[name='allDay']")[0].addEventListener("click",function(){
      if(document.querySelector("input[name='allDay']:checked").value == "true"){
        console.log("적용1");
        $("#startTime").attr("disabled",true)
        $("#endTime").attr("disabled",true)
        $("#startTime").val("00:00");
        $("#endTime").val("00:00");
      }
    });
    document.querySelectorAll("input[name='allDay']")[1].addEventListener("click",function(){
      console.log("적용2");
      if(document.querySelector("input[name='allDay']:checked").value == "false"){
        $("#startTime").attr("disabled",false)
        $("#endTime").attr("disabled",false)
      }
    });
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
    
    /* ajax로 이제 수정한 값을 보내줘야지!!!![update] */
    /* 그와 동시에, event도 addEvent되어야 하는데... */

  }else{ /* (2)이벤트 값이 없는 경우(생성) */
  document.getElementById("mainBtn").innerText = "등록";
    
  }
  
  

}

console.log("test");
console.log(defaultEvents);
// document.addEventListener('DOMContentLoaded', function() {
function createCalendar(){

  /* 캘린더 시작 */
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        // initialDate: '2020-09-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        /* 마우스를 올렸을 때, description이 보이도록 하자. */
        // eventMouseEnter : function(arg){
        //     /* 더 추가하는 법 알아냈다...! */
        //     alert(arg.event.extendedProps.description + "안녕");
        // },
        
        // forceEventDuration : true,
        // defaultAllDayEventDuration : {days :2},
        selectable : true,

        /* 일자 클릭 시 모달 호출 */
        select : function (arg){  
          popup(arg);
          // calendar.addEvent({
          //   title : "실험용",
          //   start: arg.start,
          //   allDay : true,
          //   color : "#E6E6FA",
          //   eventTextColor : "white"
          // });
        },

        /* 이벤트 클릭 시 모달 호출 */
        eventClick : function (arg){ 
          popup(arg);
        },

        /* 이게 뭔지 모르겠음 */
        // eventClassNames: function(arg) {
        //     if (arg.event.extendedProps.isUrgent == 1) {
        //       return [ 'urgent' ]
        //     } else {
        //       return [ 'normal' ]
        //     }
        //   },

        /* 이걸 쓰면 모든 이벤트에 some text라고 쓰여지네 */
        // eventContent: function(arg) {
        //     let italicEl = document.createElement('div')
          
        //     if (arg.event.extendedProps.isUrgent) {
        //       italicEl.innerHTML = "<i class='fa-regular fa-bell'></i>"
        //     } else {
        //       italicEl.innerHTML = arg.event.title;
        //     }
          
        //     let arrayOfDomNodes = [ italicEl ]
        //     return { domNodes: arrayOfDomNodes }
        //   },
          
        //   eventDidMount: function(eventObj, el) {
        //     el.popover({
        //       title: eventObj.title,
        //       content: eventObj.description,
        //       trigger: 'hover',
        //       placement: 'top',
        //       container: 'body'
        //     });
        //   },
        // eventDidMount : function (arg) {
        //     arg.el.addEventListener("popover",function(e){

        //         $("#popover").popover({ trigger: "hover" , content : arg.event.extendedProps.description});
        //     });
        //     // let i = document.createElement("div");
        //     // i.setAttribute("id","popover");
        //     // let arrayOfDomNodes = [ i ]
        //     //     return { domNodes: arrayOfDomNodes }
        // },
        
        /* try실패 : eventContent로 모든 애에게 div를 걸어주고, 그걸 popover로 호출하자. */
        
        // eventContent: function(arg) {
        //     let all = document.createElement('div')
        //     all.classList.add("popover");
        //     if (arg.event.extendedProps.isUrgent) {
              
        //         all.innerHTML = "<i class='fa-regular fa-bell'></i>"
        //     } else {
        //         all.innerHTML = arg.event.title;
        //     }
          
        //     let arrayOfDomNodes = [ all ]
        //     return { domNodes: arrayOfDomNodes }
        //   },
        // eventDidMount: function(arg){
        //     $("#popover").popover({ trigger: "hover" , content : arg.event.extendedProps.description});
        // },
    
        
        // eventDidMount: function(info) {
        //     alert(info.event.extendedProps.description);
        //     console.log(info.event.extendedProps);
        //   },
        
        events : defaultEvents
        // [
        //   {
        //     title: 'BCH237',
        //     start: '2022-12-12T10:30:00',
        //     end: '2022-12-14T11:30:00',
        //     // extendedProps: {
        //     //   department: 'BioChemistry'
        //     // },
        //     description: 'Lecture'
        //   }
        // ]
        // [
            // {
            //     title: 'BCH237',
            //     start: '2022-12-12T10:30:00',
            //     end: '2022-12-14T11:30:00',
            //     // extendedProps: {
            //     //   department: 'BioChemistry'
            //     // },
            //     description: 'Lecture'
            //   },
        //     {
        //         title : '하루종일 이벤트를 할 경우에',
        //         start : '2022-12-22',
        //         // end : '2022-12-23'
        //         description : '상세내용'

        //     },
        //     {
        //     title: 'UrgentEvent',
        //     start: '2022-12-01',
        //     isUrgent :1
        //     },
        //     {
        //     title: 'Long Event',
        //     start: '2020-09-07',
        //     end: '2020-09-10'
        //     },
        //     {
        //     groupId: 999,
        //     title: 'Repeating Event',
        //     start: '2020-09-09T16:00:00'
        //     },
        //     {
        //     groupId: 999,
        //     title: 'Repeating Event',
        //     start: '2020-09-16T16:00:00'
        //     },
        //     {
        //     title: 'Conference',
        //     start: '2020-09-11',
        //     end: '2020-09-13'
        //     },
        //     {
        //     title: 'Meeting',
        //     start: '2020-09-12T10:30:00',
        //     end: '2020-09-12T12:30:00'
        //     },
        //     {
        //     title: 'Lunch',
        //     start: '2020-09-12T12:00:00'
        //     },
        //     {
        //     title: 'Meeting',
        //     start: '2020-09-12T14:30:00'
        //     },
        //     {
        //     title: 'Happy Hour',
        //     start: '2020-09-12T17:30:00'
        //     },
        //     {
        //     title: 'Dinner',
        //     start: '2020-09-12T20:00:00'
        //     },
        //     {
        //     title: 'Birthday Party',
        //     start: '2020-09-13T07:00:00'
        //     },
        //     {
        //     title: 'Click for Google',
        //     url: 'http://google.com/',
        //     start: '2020-09-28'
        //     }
        // ]
    });

    calendar.render();
}
  // });

