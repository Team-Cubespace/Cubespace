
/* 이벤트를 DB에서 조회해서 캘린더에 뿌려주기 */
let loginMember = 1;
let defaultEvents =[] ;

    /* 더 빠르게 불러오는? 이 이벤트들을 먼저 불러온 다음에 //캘린더 만들고//dayrender적용하고..  */
// aysnc : false를 쓰는 이유 : 이거 먼저 수행해야 뒤에 캘린더 먼저 안 나타나거든..    
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
        //alert(val.start);
            events.push({
            // id: data[index].day_pk,
            // title: data[index].title,
            // start: data[index].start,
            // id :1,
            title: data[index].planTitle, //내 vo에서 넘어온 이름이 이거임
            start: data[index].startDate, //내 vo에서 넘어온 이름이 이거임
            // repeat : 2
            // end: data[index].end,
            // textColor:'white',
            // backgroundColor:'#'+data[index].css,
            // url:'day_md_popup/'+data[index].day_pk
            });
        });

    console.log("이벤트 목록입니다.");
    // console.log(events);
    defaultEvents = events;
    console.log(defaultEvents);

    // createCalendar(events)
    },
    error:function(status, request, error){
    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error"+error);
    }
    });//ajax
// let selectEvents=[];
// let select = [];



document.addEventListener('DOMContentLoaded', function() {
  console.log("test");
  console.log(defaultEvents)
  /* 팝업 닫기 */
  function popDisplayNone(){
    document.getElementById("popup_layer").style.display = "none";
  }
  /* 모달창 내에서 취소버튼 눌렀을 때 팝업 닫기 */
  document.getElementById("cancleBtn").addEventListener("click",function(){
    document.getElementById("popup_layer").style.display = "none";
  })

  /* 팝업(모달창) 열기 */
  function popup(arg){
    document.getElementById("popup_layer").style.display = "block";
    console.log(arg.startStr);
    document.getElementById("startDate").value = arg.startStr;

    /* (1)이벤트 값이 있는 경우(생성) */

    /* (2)이벤트 값이 없는 경우(수정) */


  }

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
        select : function (arg){  /* 일자 클릭 시 모달 호출 */
          popup(arg);
          // calendar.addEvent({
          //   title : "실험용",
          //   start: arg.start,
          //   allDay : true,
          //   color : "#E6E6FA",
          //   eventTextColor : "white"
          // });
        },
        
        eventClick : function (arg){ /* 이벤트 클릭 시 모달 호출 */
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
        //     // {description: "Lecture", department: "BioChemistry"}
        //   },
        
        events : defaultEvents
        // [
        //     {
        //         title: 'BCH237',
        //         start: '2022-12-12T10:30:00',
        //         end: '2022-12-14T11:30:00',
        //         // extendedProps: {
        //         //   department: 'BioChemistry'
        //         // },
        //         description: 'Lecture'
        //       },
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
  });

