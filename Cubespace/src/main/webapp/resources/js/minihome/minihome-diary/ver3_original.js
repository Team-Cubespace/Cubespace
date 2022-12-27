var loginMember = 1;
var defaultEvents =[] ;

/* 더 빠르게 불러오는? 이 이벤트들을 먼저 불러온 다음에 //캘린더 만들고//dayrender적용하고..  */
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
            id :1,
            title: data[index].planTitle, //내 vo에서 넘어온 이름이 이거임
            start: data[index].startDate, //내 vo에서 넘어온 이름이 이거임
            repeat : 2
            // end: data[index].end,
            // textColor:'white',
            // backgroundColor:'#'+data[index].css,
            // url:'day_md_popup/'+data[index].day_pk
            });
        });
    
    console.log("이벤트 목록입니다.");
    // console.log(events);
    defaultEvents = events;
    // console.log(defaultEvents);

    createCalendar(events)
  },
  error:function(status, request, error){
    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error"+error);
  }
});//ajax



function createCalendar(events){
  // Any value represanting monthly repeat flag
  var REPEAT_MONTHLY = 1;
  // Any value represanting yearly repeat flag
  var REPEAT_YEARLY = 2;
      
  $('#calendar').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    editable: true,
    // defaultDate: '2017-02-16',
    /* db에 있는 events를 가져온다. */
    // events: [
    //   $.ajax({

    //   })
    // ],

    // select : function(){

    // },
    /* 이건 뭔가 v5에서 쓰일 것 같군... */
    // select : function(arg){
    //   var title = prompt("일정을 입력하세요");
    //   if(title){
    //     calender.addEvent({
    //       title : title,
    //       start : arg.start
    //     })
    //     $.ajax({
    //       type : "POST",
    //       url : "/calenderInput",
    //       data : {"startDate":dateFormat(arg.start),"title":title},
    //       success:(result) => {
    
    //         if(result > 0){ 

    //             alert("이벤트가 등록되었습니다.");

    //         } else { 
    //             console.log("서버에 저장 실패");
    //         }

    //       },
    //       error : () => {console.log("동작에러남");},

    //       complete : () => { 
    //           console.log("아무때나 나타나는 친구");
    //       }

    //     })
    //   }
    // },
  // select : function(){

    // },
    dayClick: function(date, jsEvent, view) {

      alert('Clicked on: ' + date.format());

      alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

      alert('Current view: ' + view.name);

      var titlee = prompt("일정이름을 입력해주세요");
      var endDateStr = prompt("끝나는 날짜를 지정해주세요");
      var endDate = new Date(endDateStr + 'T12:00:00'); // will be in local time
      var startDate = date.format();
      if (date.isValid()) {
            $('#calendar').fullCalendar('renderEvent', {
              title: titlee,
              start: startDate,
              end : endDate,
              backgroundColor: "red",
              repeat : 2
              // allDay: true
            });
            alert('Great. Now, update your database...');
          } else {
            alert('Invalid date.');
          }
        console.log(startDate);
        console.log(endDate);
        //console.log(endDate.format()); -> 맞지 않는 듯
        


      // change the day's background color just for fun
      // $(this).css('background-color', 'red');

    },
    
    select: function(startDate, endDate) {
      alert('selected ' + startDate.format() + ' to ' + endDate.format());
    },
        
    // select: function(startDate,endDate) {
    //   alert('selected ' + startDate.format() + ' to ' + endDate.format());
    //   var titlee = prompt('Enter a date in YYYY-MM-DD format');
    //   var date = moment(dateStr);

    //   if (date.isValid()) {
    //     $('#calendar').fullCalendar('renderEvent', {
    //       title: titlee,
    //       start: startDate,
    //       allDay: true
    //     });
    //     alert('Great. Now, update your database...');
    //   } else {
    //     alert('Invalid date.');
    //   }
    // },
    // eventSources: [defaultEvents],
    //어떤 사람이 성공했다는 바로 그 함수!! 시도해보겠어요
    events : function(start, end, timezone, callback){//이벤트 출력부분
      callback(defaultEvents);
      console.log(defaultEvents);
    },
    
    dayRender: function( date, cell ) {
      // Get all events
      console.log("dayrender가 실행...")
      console.log(defaultEvents);

      // var events = $('#calendar').fullCalendar(events).length ? $('#calendar').fullCalendar(events) : events;
      var events = $('#calendar').fullCalendar('clientEvents').length ? $('#calendar').fullCalendar('clientEvents') : defaultEvents;
          // Start of a day timestamp
      var dateTimestamp = date.hour(0).minutes(0);
      var recurringEvents = new Array();

        // find all events with monthly repeating flag, having id, repeating at that day few months ago  
      var monthlyEvents = events.filter(function (event) {
      return event.repeat === REPEAT_MONTHLY &&
          event.id &&
          moment(event.start).hour(0).minutes(0).diff(dateTimestamp, 'months', true) % 1 == 0
      });

      // find all events with monthly repeating flag, having id, repeating at that day few years ago  
      var yearlyEvents = events.filter(function (event) {
      return event.repeat === REPEAT_YEARLY &&
        event.id &&
          moment(event.start).hour(0).minutes(0).diff(dateTimestamp, 'years', true) % 1 == 0
      });
      recurringEvents = monthlyEvents.concat(yearlyEvents);

      $.each(recurringEvents, function(key, event) {
      var timeStart = moment(event.start);

      // Refething event fields for event rendering 
      var eventData = {
          id: event.id,
          allDay: event.allDay,
          title: event.title,
          description: event.description,
          /* 기존 : 이거였는데 */
          start: date.hour(timeStart.hour()).minutes(timeStart.minutes()).format("YYYY-MM-DD"),
          /* 12a 안 뜨게 하려고 바꿔봄... 소용 없었다고 한다. */
          // start: date.format("YYYY-MM-DD"),
          end: event.end ? event.end.format("YYYY-MM-DD") : "",
          url: event.url,
          className: 'scheduler_basic_event',
          repeat: event.repeat
      };
          
      // Removing events to avoid duplication
      $('#calendar').fullCalendar( 'removeEvents', function (event) {
          console.log("하잉");
          return eventData.id === event.id && 
          moment(event.start).isSame(date, 'day');    
          
      });
      // Render event
      $('#calendar').fullCalendar('renderEvent', eventData, true);
        console.log("render?");
      });

    }
  });
}

