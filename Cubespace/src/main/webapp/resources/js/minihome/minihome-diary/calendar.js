
// 공공데이터 포털 공휴일 조회 함수
const getRestDeInfo = (date) => {

    // 공공데이터 요청 주소
    const url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';

    // 인증키
    const serviceKey = 'jso%2FNOX3O3yrmRnnxBMkmUhxRnA5EsqS5APLGehJHT2hfWLCFnXRLa%2BUEETehTCci32S6q4YwR3pNQnjJdbg7A%3D%3D';

    // 요청 년도
    const solYear = new Date(date).getFullYear();

    // 요청 월
    const month = new Date(date).getMonth() + 1;
    const solMonth = month >= 10 ? month : "0" + month;

    // 완성된 요청 주소
    const requestUrl = `${url}?serviceKey=${serviceKey}&solYear=${solYear}&solMonth=${solMonth}`;
    // console.log(requestUrl);

    //  XML 결과를 저장할 변수
    let xmlDoc;

    $.ajax({
        url : requestUrl,
        dataType : 'xml', // 응답 데이터가 xml이라고 명시 -> XML DOM 형식으로 자동으로 변환
        async : false, // 동기식으로 동작 -> ajax 코드가 끝난 후 다음 코드 수행
        success :  result => {
            // 요청 성공 시 데이터를 텍스트 형식을 얻어옴
            xmlDoc = result;
        }, error : () => { 
            console.log("공공데이터 요청 실패"); 
            return;
        }
    })

    // ----- ajax 코드가 끝난 후 다음 수행되는 코드 -----

    // DOM형식은 HTML 요소 다루듯이 다루면 됨
    // console.log(xmlDoc);
    // console.log($(xmlDoc).find('locdate'));
    // console.log(xmlDoc.querySelectorAll("locdate"));
    // const locdate = xmlDoc.querySelectorAll("locdate");
    const locdate = $(xmlDoc).find('locdate');
    const arr = [];
    const ym = `${solYear}${solMonth}`; // 년도+월 (202212)
    for(let loc of locdate){
        // console.log(loc.textContent); // innerText가 없으므로 innerHTML/textContent로 얻어옴
        let content = loc.textContent + ""; // 문자열로 변환
        // console.log(content);
        
        let temp = content.replace(ym,'');
        arr.push(temp)
    }

    // console.log(arr);
    return arr;
}


// ---------------------------------------------------------


// 달력 생성 함수
const makeCalendar = (date) => {
    // 현재 년,월,일,요일
    const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentYear = new Date(date).getFullYear();
    const m = new Date(date).getMonth() + 1;
    const d = new Date(date).getDate()
    const currentMonth = m >= 10 ? m : "0" + m;
    const currentDate = d >= 10 ? d : "0" + d;
    const currentDay = weekDay[new Date(date).getDay()];

    // 날짜 변환
    document.querySelector(".today").innerText = `${currentMonth}.${currentDate}`;
    document.querySelector(".today-day").innerText = `${currentDay}`;
    document.querySelector(".year-month").innerText = `${currentYear}.${currentMonth}`;


    // 달력 변환

    // 첫날의 요일 구하기 - 초기 시작위치를 위해서
    const firstDay = new Date(date.setDate(1)).getDay();
    // 마지막 날짜 구하기
    const lastDay = new Date(currentYear, currentMonth, 0).getDate();


    // 이번달 날짜 표시하기
    const calendarDay = document.getElementsByClassName("calendar-day");
    calendarDay[0].innerHTML = "";
    calendarDay[1].innerHTML = "";

    let sunday = 8-firstDay; 
    if(firstDay == 0) sunday = 1;


    // -------------------------------------------------------------
    // + 해당 당 공휴일 얻어와 일치하는 날의 holiday 클래스 추가하기
    const restDay = getRestDeInfo(`${currentYear}-${currentMonth}`);
    // -------------------------------------------------------------


    for (let i = 1; i <= lastDay; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerText = i;
        li.append(a);

        // -------------------------------------------------------------
        // + 해당 당 공휴일 얻어와 일치하는 날의 holiday 클래스 추가하기
        const current = i >= 10 ? i+"" : "0" + i;
        if(restDay.indexOf(current) != -1){
            li.classList.add("holiday");
        }
        // -------------------------------------------------------------


        // 날짜 클릭 이벤트
        li.addEventListener("click", e => {

            // 클릭한 날짜가 10일 미만이면 앞에 "0" 추가
            const temp = i >= 10 ? i : "0" + i;

            // ** ajax 전달할 때 날짜 데이터로 사용 **
            // 클릭한 날짜(년-월-일)
            console.log(`${currentYear}-${currentMonth}-${temp}`);

            // !!!!!!!!!!!!!!요기다 해당 날짜 다이어리 조회 ajax 코드 작성!!!!!!!!!!!!!!!!!
            // $.ajax({}) 

            /* [나의 주석] 
            
                구현할 때 들고가야 하는 것 : 작성일 / 미니홈피 주인장 회원넘버 /
                만약에 loginmember와 (미니홈피 주인)이 같을 경우,
                만약에 loginmember와 (미니홈피 주인)이 깐부관계인 경우(둘의 관계를 select한다음에 번호를 줘야하나?)
                
                -> 그러면 불러오는 글 목록이 if문으로 달라지지 않을까?
                1. DB에 작성일을 들고, 작성일이 일치하는 목록을 불러온다.
                2. 글쓰기 할 때도 저 작성일넣어야됨
                
            
            */



            // ------- 여긴 ajax success 코드로 활용 -------------
            // 클릭된 날짜가 있을 경우 클릭 해제
            if(document.querySelector(".day-click") != null){
                document.querySelector(".day-click").classList.remove("day-click");
            }

            e.target.classList.add("day-click");

            // 클릭한 날짜에 클릭 표시
            document.querySelector(".today").innerText = `${currentMonth}.${temp}`;
            document.querySelector(".today-day").innerText = weekDay[new Date(`${currentYear}-${currentMonth}-${i}`).getDay()];
            // ------- 여긴 ajax success 코드로 활용 -------------


        })


        if(i == sunday){
            li.classList.add("holiday");
            sunday +=7;
        }

       




        if(i <= 13){
            calendarDay[0].append(li);
        }else{
            calendarDay[1].append(li);
        }
    }

}



// 이전 달
document.getElementById("prevMonth").addEventListener("click", ()=>{
   let date = new Date(document.querySelector(".year-month").innerText);
   makeCalendar(new Date(date.setMonth(date.getMonth() - 1)));
});

// 다음 달
document.getElementById("nextMonth").addEventListener("click", ()=>{
    let date = new Date(document.querySelector(".year-month").innerText);
    makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
});



// 화면 로딩 시 현재 날짜 출력 및 선택
(()=>{
    makeCalendar(new Date());
    
    const m = new Date().getMonth() + 1;
    const d = new Date().getDate()
    const currentMonth = m >= 10 ? m : "0" + m;
    const currentDate = d >= 10 ? d : "0" + d;

    const arr = document.querySelectorAll(".calendar-day > li");

    for(let a of arr){
        if(a.innerText == d){
            a.classList.add("day-click");
            document.querySelector(".today").innerText = `${currentMonth}.${currentDate}`;
            break;
        }
    }
})()
