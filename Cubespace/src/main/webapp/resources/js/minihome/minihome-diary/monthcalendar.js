
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
              /* 시발 */
              // console.log("끝날짜"+ data[index].endDate);
              // const oldEndDate = new Date(data[index].endDate.substr(0,4),data[index].endDate.substr(5,2),data[index].endDate(8,2))
              // const newEndDate = new Date();
              // newEndDate.setDate = oldEndDate.getDate() + 1;
              // console.log("끝날짜 변형" + newEndDate);

              events.push({
              title: data[index].planTitle, //내 vo에서 넘어온 이름이 이거임
              /* subSting(0,10): 날짜 subString(11,19) */
              //start: data[index].startDate.substring(0,10), //내 vo에서 넘어온 이름이 이거임
              start : data[index].startDate,
              end : data[index].endDate,
              allDay : true,
              category : data[index].planCategory,
              color : data[index].color,
              description : data[index].planDescription,
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


function commonInPop(){
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
}
/* 모달창 내에서 취소버튼 눌렀을 때 팝업 닫기 */
document.getElementById("cancleBtn").addEventListener("click",function(){
  // popDisplayNone();
  document.getElementById("popup_layer").style.display = "none";
})

/* 팝업(모달창) 열기 */
function popup(arg){


  document.getElementById("popup_layer").style.display = "block";

  console.log(arg);
  /* (1)이벤트 값이 있는 경우(수정) */
  if(arg.event != undefined){
    /* 날짜 세팅 =  (월은 1 더해줘야 하고 / 월&일 둘다 1자리수일 경우 세팅 필요함.*/
    let startFullYear = arg.event.start.getFullYear();
    let startMonth = ("0" + (arg.event.start.getMonth() + 1)).slice(-2);
    let startDate= ("0" + arg.event.start.getDate()).slice(-2);
    let startHour = ("0" + arg.event.start.getHours()).slice(-2);
    let startMinute = ("0" + arg.event.start.getMinutes()).slice(-2);
    /* 시작 = 끝이 완전 똑같을 경우 end가 null이 되기 때문에....세팅을 해줘야해..... */
    let endFullYear;
    let endMonth; 
    let endDate;
    let endHour;
    let endMinute;
      if(arg.event.end != null){
        endFullYear = arg.event.end.getFullYear();
        endMonth = ("0" + (arg.event.end.getMonth() + 1)).slice(-2);
        endDate = ("0" + arg.event.end.getDate()).slice(-2);
        /* allDay = false인 경우, 원상태로 돌려놔야 됨... */
        // if(arg.event.allDay){
        //   endDate = ("0" + arg.event.end.getDate()).slice(-2);
        // }{
        //   endDate = ("0" + arg.event.end.getDate()-1).slice(-2);
        // }
        endHour = ("0" + arg.event.end.getHours()).slice(-2);
        endMinute  = ("0" + arg.event.end.getMinutes()).slice(-2);
      } else {
        endFullYear = arg.event.start.getFullYear();
        endMonth = startMonth;
        endDate = startDate;
        endHour = startHour;
        endMinute = startMinute;
      }

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

    commonInPop();

   
    
    /* ajax로 이제 수정한 값을 보내줘야지!!!![update] */
    /* 그와 동시에, event도 addEvent되어야 하는데... */

  }else{ /* (2)이벤트 값이 없는 경우(생성) */

    //버튼 이름 변경
    document.getElementById("mainBtn").innerText = "등록";
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
    // document.querySelector("input[name='allDay']:checked").value = "false";
    // document.querySelectorAll("input[name='allDay']")[0].attr("checked",checked);
    commonInPop();

  
    
    
  }
  
  
  
}


console.log("test");
console.log(defaultEvents);
var calendar;
var selectEvent;
// document.addEventListener('DOMContentLoaded', function() {
function createCalendar(){

  /* 캘린더 시작 */
    var calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
      
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        // initialDate: '2020-09-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        selectable : true,

        /* 일자 클릭 시 모달 호출 */
        select : function (arg){  
          console.log("날짜 클릭")
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
          console.log("이벤트클릭");
          popup(arg);
          selectEvent = arg;
        },

        
        
        events : defaultEvents
       
    });

    calendar.render();
}
  // });

/* 모달창에 있는 값을 화면에 뿌리기 & DB에 저장하기 */
function addEvent(){
  const category = document.getElementById("category");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const startDate = document.getElementById("startDate");
  const startTime = document.getElementById("startTime");
  const endDate = document.getElementById("endDate");
  const endTime = document.getElementById("endTime");
  const allDay =  document.querySelector("input[name='allDay']:checked");


  console.log(startDate.value);
  console.log(startTime.value);
  console.log(startDate.value+"T"+startTime.value+":00");
  console.log(allDay.value);
  

  /* calendar를 전역변수로 선언해줬기 떄문에 가져올 수 있었다... */
  if(allDay.value =="true"){

    calendar.addEvent({
      category: category.value,
      title : title.value,
      description : description.value,
      start: startDate.value+"T"+startTime.value+":00",
      end: endDate.value+"T"+endTime.value+":00",
      allDay : true,
      color : "red",
      eventTextColor : "white"
    });
  } else {
    calendar.addEvent({
      category: category.value,
      title : title.value,
      description : description.value,
      start: startDate.value+"T"+startTime.value+":00",
      end: endDate.value+"T"+endTime.value+":00",
      allDay : false,
      color : "blue",
      eventTextColor : "white"
    });
  }

  document.getElementById("popup_layer").style.display = "none";

  // $.ajax({
  //   url: "/diary/calendar",
  //   type:'GET',
  //   dataType: 'json',
  //   data: {},
  //   aysnc : false,
  //   success:function(data){
      
  
      
  //   },
  //   error:function(status, request, error){
    
  //   }
  
  
  // });

  
}

 /* 수정하고 싶어.... */
 document.getElementById("updateBtn").addEventListener("click",function(){
  console.log(selectEvent);
  alert("수정..?");
   //1. 카테고리
   selectEvent.event.extendedProps.category = document.getElementById("category").value;
  //2. 제목
  selectEvent.event.title = document.getElementById("title").value;
 selectEvent.event.setProp("title", document.getElementById("title").value)
  //3. 내용
  if(document.getElementById("description").value = ""){
    selectEvent.event.extendedProps.description = undefined;
  } else {
    selectEvent.event.extendedProps.description = document.getElementById("description").value;
  }
  //4. 시작 날짜
  selectEvent.event.start = document.getElementById("startDate").value+"T"+document.getElementById("startTime").value+":00"
  //6. 종료 날짜
  selectEvent.event.end = document.getElementById("endDate").value+"T"+document.getElementById("endTime").value+":00"
  //7. 종료 시간
  //8. 종일 여부

  console.log(selectEvent.event.start);
  
  document.getElementById("popup_layer").style.display = "none";
  
})