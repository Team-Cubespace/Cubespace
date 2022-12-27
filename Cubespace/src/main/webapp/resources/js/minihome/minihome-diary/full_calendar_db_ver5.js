

document.addEventListener('DOMContentLoaded', function () {
    $(function () {
        var request = $.ajax({
            url: "/full-calendar/calendar-admin", // 변경하기
            method: "GET",
            dataType: "json"
        });

        request.done(function (data) {
            console.log(data); // log 로 데이터 찍어주기.

            var calendarEl = document.getElementById('calendar');

            var calendar = new FullCalendar.Calendar(calendarEl, {
                // initialDate: '2022-02-07',
                initialView: 'timeGridWeek',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                },
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar
                drop: function (arg) {
                    // is the "remove after drop" checkbox checked?
                    if (document.getElementById('drop-remove').checked) {
                        // if so, remove the element from the "Draggable Events" list
                        arg.draggedEl.parentNode.removeChild(arg.draggedEl);
                    }
                },
                /**
                 * data 로 값이 넘어온다. log 값 전달.
                 */
                events: data
            });

            calendar.render();
        });

        request.fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    });

});





var calendar = null;
var initialLocaleCode = 'ko';
var localeSelectorEl = document.getElementById('locale-selector');

    $(document).ready(function (){

            var calendarEl = document.getElementById('calendar');
            calendar = new FullCalendar.Calendar(calendarEl, {
                // initialDate: '2022-02-07',
                initialView: 'timeGridWeek',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                },
                navLinks: true,
                editable: true,
                selectable: true,
                droppable: true, // this allows things to be dropped onto the calendar

                eventAdd: function () { // 이벤트가 추가되면 발생하는 이벤트
                    console.log()
                },

                // eventChange: function (obj) { // 이벤트가 수정되면 발생하는 이벤트
                //     allEvent = calendar.getEvents();
                //     console.log(allEvent);
                // },
                // eventRemove: function (obj) { // 이벤트가 삭제되면 발생하는 이벤트
                //     console.log(obj);
                // },
                /**
                 * 드래그로 이벤트 추가하기
                 */
                select: function (arg) { // 캘린더에서 드래그로 이벤트를 생성할 수 있다.


                    var title = prompt('일정을 입력해주세요.');
                    if (title) {
                        calendar.addEvent({
                            title: title,
                            start: arg.start,
                            end: arg.end,
                            allDay: arg.allDay,
                        })
                    }
                    var allEvent = calendar.getEvents(); // .getEvents() 함수로 모든 이벤트를 Array 형식으로 가져온다. (FullCalendar 기능 참조)

                    var events = new Array(); // Json 데이터를 받기 위한 배열 선언
                    for (var i = 0; i < allEvent.length; i++) {
                        var obj = new Object();     // Json 을 담기 위해 Object 선언
                        // alert(allEvent[i]._def.title); // 이벤트 명칭 알람
                        obj.title = allEvent[i]._def.title; // 이벤트 명칭  ConsoleLog 로 확인 가능.
                        obj.start = allEvent[i]._instance.range.start; // 시작
                        obj.end = allEvent[i]._instance.range.end; // 끝

                        events.push(obj);
                    }
                    var jsondata = JSON.stringify(events);
                    console.log(jsondata);
                    // saveData(jsondata);

                    $(function saveData(jsondata) {
                        $.ajax({
                            url: "/full-calendar/calendar-admin-update",
                            method: "POST",
                            dataType: "json",
                            data: JSON.stringify(events),
                            contentType: 'application/json',
                            /* contentType = 보내는 데이터의 타입 */
                        })
                            .done(function (result) {
                                // alert(result);
                            })
                            .fail(function (request, status, error) {
                                    alert("에러 발생" + error);
                            });
                        calendar.unselect()
                    });
                },

                // drop: function (arg) {
                //     // is the "remove after drop" checkbox checked?
                //     if (document.getElementById('drop-remove').checked) {
                //         // if so, remove the element from the "Draggable Events" list
                //         arg.draggedEl.parentNode.removeChild(arg.draggedEl);
                //     }
                // }
            });
            calendar.render();
});





