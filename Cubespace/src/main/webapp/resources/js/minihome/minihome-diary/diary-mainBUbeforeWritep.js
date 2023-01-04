let peoplePopContainer;

/* 날짜를 담는 변수 */
let dateContainer;

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
//[나의 코드]

//1. 첫 화면

//2. 날짜 클릭 시 화면

    let flag ;
    //let today;
    if(flag != ""){
        //today = new Date(변수명)
    }else {
        //[ 현재 날짜 ]
        //var today = new Date();
    }
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    /*  */
    const diaryDate = year + '-' + month  + '-' + day;
    
    /* '글쓰기'버튼 누를 때, 어느 날짜에 글을 쓰는지 알기 위해서...  */
    dateContainer = diaryDate;
    selectDiary(diaryDate);


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

            
            //[나의 코드]
            /* 작성일 / 폴더 넘버 / 미니홈피 주인장 넘버 */
            const diaryDate = `${currentYear}-${currentMonth}-${temp}`;
            // const folderNumber = 1; /* 폴더 */
            // const homepageMemberNo = 1; /* 이슬이 다이어리를 조회해보겠다. */
            // const loginMemberNo = 7; 
            dateContainer = diaryDate;
            console.log("클릭한 날짜 : " +dateContainer);
            selectDiary(diaryDate);

            // ------- 여긴 ajax success 코드로 활용 -------------
            // 기존에 클릭된 날짜가 있을 경우 기존 날짜를 클릭 해제
            if(document.querySelector(".day-click") != null){
                document.querySelector(".day-click").classList.remove("day-click");
            }

            e.target.classList.add("day-click");

            // 새로 클릭한 날짜에 클릭 표시
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

function writeBtn(dateContainer){

}


function selectDiary(diaryDate){
    
    /* 일기 목록 조회하는 ajax */
    $.ajax({
        url : "/selectDiary",
        // data : {"diaryDate":diaryDate,"folderNumber":folderNumber,"homepageMemberNo":homepageMemberNo,"loginMemberNo":loginMemberNo},
        data : {"diaryDate":diaryDate,"folderNo":folderNo},
        dataType : "JSON",
        success :  (diaryList)  => {

            /*확인용*/console.log("해당 날짜의 다이어리 목록 받기 성공")
            /*확인용*/console.log(diaryList);
            /* diaryNo, diaryTitle, diaryContent, diaryCreateDate, diaryOpenFlag 가지고 옴. */
            
            /* 각각의 diary-section의 위치를 잡아주는 기준(부모) */
            const diarySectionContainer = document.querySelector(".diary-section-container");
            /* 기존에 목록 불러온거 지워주는 거..? 누적방지용? */
            diarySectionContainer.innerText = "";
            
            for(diary of diaryList){

                /*확인용*/console.log("각각의 다이어리");
                /*확인용*/console.log(diary);

                const div = document.createElement("div");
                div.classList.add("diary-section");
                
                    const div1 = document.createElement("div");
                    div1.classList.add("title-section");

                        const div1_1 = document.createElement("div");
                        div1_1.classList.add("title");
                        div1_1.innerText = diary.diaryTitle;
                        
                        const div1_2 = document.createElement("div");

                            const div1_2_1 = document.createElement("div");
                            div1_2_1.classList.add("disclosure-option")
                            if(diary.diaryOpenFlag == 1){
                                div1_2_1.innerText = "공개";
                            }
                            if(diary.diaryOpenFlag == 2){
                                div1_2_1.innerText = "깐부공개";
                            }
                            if(diary.diaryOpenFlag == 3){
                                div1_2_1.innerText = "비공개";
                            }
                            const div1_2_2 = document.createElement("div");
                            div1_2_2.classList.add("create-time")
                            div1_2_2.innerText = diary.diaryCreateDate;

                        div1_2.append(div1_2_1,div1_2_2);
                    
                    div1.append(div1_1,div1_2);

                    const div2 = document.createElement("div");
                    div2.classList.add("content");
                    // let diaryContentSetting = diary.diaryContent;
                    // var content = diary.diaryContent;
                    // console.log(content);
                    
                    // var current = /*[[${content} ]]*/{};

                    // console.log("야 제발 돼" +current);
                    
                
                    
                    div2.innerHTML =diary.diaryContent;
                    
                    const div3 = document.createElement("div");
                    div3.classList.add("under-section");

                        const div3_1 = document.createElement("div");
                        div3_1.classList.add("under1");

                            const div3_1_1 = document.createElement("div");
                            div3_1_1.classList.add("emoji-and-pop");

                                const div3_1_1_1 = document.createElement("div");
                                div3_1_1_1.classList.add("emoji-section");   
                                /* 클릭하면 나오는 함수의 기능 1. 이모지 목록 비동기로 불러오기 
                                2. 이모지를 누른 사람의 목록 비동기로 불러오기*/
                                //div3_1_1_1.setAttribute("onclick","selectEmojiPeopleList("+diary.diaryNo+")") 
                                // const input3_1_1_1_1 = document.createElement("input");
                                // input3_1_1_1_1.setAttribute("type","hidden");
                                
                                /* 얘가 원래 이 자리였는데 selectEmojiList함수 안에서 만들거야... */
                                // const div3_1_1_2 = document.createElement("div");
                                // div3_1_1_2.classList.add("people-pop-container");
                                
                                selectEmojiList(diary.diaryNo,div3_1_1_1,div3_1_1);

                                const div3_1_1_2 = document.createElement("div");
                                div3_1_1_2.classList.add("people-pop-container");
                                
                                console.log(div3_1_1_2);
                                peoplePopContainer = div3_1_1_2;
                            /* selectEmojiList가서 div3_1_1_2를 beforeend로 넣을 꺼야... */
                        
                            div3_1_1.append(div3_1_1_1,div3_1_1_2);
                            /* mouseover하면, div3_1_1_2에 beforeend로 div3_1_1_2_1를 넣어야될듯?*/
                            /* mouseout하면  div3_1_1_2.innertext = ""*/

                            const div3_1_2 = document.createElement("div");
                            div3_1_2.classList.add("choose-emoji-section");

                                const div3_1_2_1 = document.createElement("div");
                                div3_1_2_1.classList.add("emoji-btn");
                                div3_1_2_1.innerText="공감하기";
                                div3_1_2_1.setAttribute("onclick","chooseEmoji("+diary.diaryNo+",this)")
                                
                            /* 아직 미완성조각 */
                            div3_1_2.append(div3_1_2_1);
                        
                        div3_1.append(div3_1_1,div3_1_2);


                        const div3_2 = document.createElement("div");
                        div3_2.classList.add("under2");

                            const div3_2_1 = document.createElement("div");
                            // div3_2_1.setAttribute("onclick","updateDiary("+diary.diaryNo+")")
                            // div3_2_1.innerText = "ㄴㄷㄹ";
                                const div3_2_1_a = document.createElement("a");
                                div3_2_1_a.setAttribute("href","/diaryUpdate/"+diary.diaryNo+"");
                                div3_2_1_a.innerText = "수정";
                            div3_2_1.append(div3_2_1_a);
                            
                            const div3_2_2 = document.createElement("div");
                            div3_2_2.setAttribute("onclick","deleteDiary("+diary.diaryNo+")")
                            div3_2_2.innerText = "삭제";

                        div3_2.append(div3_2_1,div3_2_2);

                    div3.append(div3_1,div3_2);
                
                div.append(div1,div2,div3);

                diarySectionContainer.insertAdjacentElement("beforeend",div);
            }
            

        }, error : () => { 
            
        }
        
    });
}

/* 이 위치 바로 위였음.... */


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

function chooseEmoji(diaryNo,btn){
    /* 이모지 리스트가 만들어짐. */
    console.log(btn.parentElement);
    console.log("이게 choose-emoji-section이 맞냐?")
    const div3_1_2_2 = document.createElement("div");
    div3_1_2_2.classList.add("choose-emoji");

        /* 똑같이 생긴 놈 6개 */
        /* 동적 변수 생성.. window 함수 이용해야 되나 싶지만... (eval은 쓰지 말래...) */

        

        const div3_1_2_2_1 = document.createElement("div");
        div3_1_2_2_1.classList.add("emoji-box");

            const img1 = document.createElement("img");
            img1.classList.add("emoji");
            img1.setAttribute("src","/resources/images/diary/like.png");
            img1.setAttribute("onclick","likeUp("+1+","+diaryNo+",this)");
        div3_1_2_2_1.append(img1);

        const div3_1_2_2_2 = document.createElement("div");
        div3_1_2_2_2.classList.add("emoji-box");

            const img2 = document.createElement("img");
            img2.classList.add("emoji");
            img2.setAttribute("src","/resources/images/diary/heart.png");
            img2.setAttribute("onclick","likeUp("+2+","+diaryNo+",this)");
        div3_1_2_2_2.append(img2);

        const div3_1_2_2_3 = document.createElement("div");
        div3_1_2_2_3.classList.add("emoji-box");

            const img3 = document.createElement("img");
            img3.classList.add("emoji");
            img3.setAttribute("src","/resources/images/diary/smile.png");
            img3.setAttribute("onclick","likeUp("+3+","+diaryNo+",this)");
        div3_1_2_2_3.append(img3);

        const div3_1_2_2_4 = document.createElement("div");
        div3_1_2_2_4.classList.add("emoji-box");

            const img4 = document.createElement("img");
            img4.classList.add("emoji");
            img4.setAttribute("src","/resources/images/diary/tears.png");
            img4.setAttribute("onclick","likeUp("+4+","+diaryNo+",this)");
        div3_1_2_2_4.append(img4);

        const div3_1_2_2_5 = document.createElement("div");
        div3_1_2_2_5.classList.add("emoji-box");

            const img5 = document.createElement("img");
            img5.classList.add("emoji");
            img5.setAttribute("src","/resources/images/diary/cursing.png");
            img5.setAttribute("onclick","likeUp("+5+","+diaryNo+",this)");
        div3_1_2_2_5.append(img5);

        const div3_1_2_2_6 = document.createElement("div");
        div3_1_2_2_6.classList.add("emoji-box");

            const img6 = document.createElement("img");
            img6.classList.add("emoji");
            img6.setAttribute("src","/resources/images/diary/humm.png");
            img6.setAttribute("onclick","likeUp("+6+","+diaryNo+",this)");
        div3_1_2_2_6.append(img6);

    div3_1_2_2.append(div3_1_2_2_1,div3_1_2_2_2,div3_1_2_2_3,div3_1_2_2_4,div3_1_2_2_5,div3_1_2_2_6)
    btn.parentElement.insertAdjacentElement("beforeend",div3_1_2_2);


            /* 강사님 */
        // document.querySelector(".emoji-btn").addEventListener("click", e=>{
        //     console.log("음.../")
        //     console.log(e.target);
        //     console.log(e.target.parentElement.previousElementSibling);
        //     console.log(e.target.parentElement.previousElementSibling.children[0]);

        //     const popup = e.target.parentElement.previousElementSibling;
        //     const section = e.target.parentElement.previousElementSibling.children[0];
            
        //     selectEmojiList(35, section, popup);
        // })

      
        
}

/* [공감하기]에서 이모지를 누른 경우*/
function likeUp(number,diaryNo,btn){
    console.log("number"+number);
    console.log("diaryNo" + diaryNo);
    
    $.ajax({
        url : "/like",
        data : {"diaryNo":diaryNo,"emojiNo":number},
        success :  (result)  => {
            if(result>0){
                console.log("데이터베이스 저장 성공");
                    /* 변형 */
                    let imgList = document.querySelectorAll(".emoji");
                    for(let i = 0 ; i < imgList.length ; i++){
                        /* 요소 하나 */
                        let img = imgList.item(i);

                        // img.addEventListener("click",function(){
                            console.log("이게 emoji-btn이 맞음?");
                            console.log(btn.parentElement.parentElement.previousElementSibling);
                            const emojiBtn = btn.parentElement.parentElement.previousElementSibling;
                            const popup = emojiBtn.parentElement.previousElementSibling;
                            const section = emojiBtn.parentElement.previousElementSibling.children[0];

                            selectEmojiList(diaryNo,section,popup);
                        // })
                    }

            } else{
                console.log("저장 실패");
            }
        }, error : () => { 
                    
        }
    })

}

/* [ 클릭하면 나오는 함수의 기능 ] 
1. 이모지 목록 비동기로 불러오기 
2. 이모지를 누른 사람의 목록 비동기로 불러오기
*/
function selectEmojiList(diaryNo,div3_1_1_1,div3_1_1){

    
    /*확인용*/console.log("이모지목록 조회하는 함수가 실행됩니다.");
    /*확인용*/console.log("이모지 목록이 조회되는 다이어리 번호" + diaryNo);
    console.log(div3_1_1_1);
    console.log(div3_1_1);
    
    $.ajax({
        url : "/selectEmojiList",
        data : {"diaryNo":diaryNo},
        dataType : "JSON",
        success :  (emojiList)  => {

        /*확인용*/console.log(diaryNo+"번 다이어리의 이모지 목록");
        /*확인용*/console.log(emojiList);
        /* 가져오는 것 : emojiNo, emojiPath, emojiCount, diaryNo */

        /* 누적방지용? 이거 지우니까 첫번째만 됨 장난하냐? */
        // div3_1_1_1.innerText = "";
        /* 오 이게 필요한 게 맞았음! ㅋㅋ select재활용할 때, 필요함(by강사님) */
        div3_1_1_1.innerHTML = "";
        for(emoji of emojiList){
            const div3_1_1_1_1 = document.createElement("div");
            div3_1_1_1_1.classList.add("emoji-row");
                const div3_1_1_1_1_1 = document.createElement("div");
                div3_1_1_1_1_1.classList.add("emoji-box");
                /* mouseover하면, div3_1_1_2에 beforeend로 div3_1_1_2_1를 넣어야될듯?*/
                /* mouseout하면  div3_1_1_2.innertext = ""*/
                
                // 안됨...실험해보자...
                //1)
                
                div3_1_1_1_1_1.setAttribute("onmouseenter","selectEmojiPeopleList("+emoji.emojiNo+","+emoji.diaryNo+", this)");
                //2)
                // div3_1_1_1_1_1.setAttribute("onclick","selectEmojiPeopleList("+emoji.emojiNo,emoji.diaryNo,div3_1_1_2+")")
                //3)
                // div3_1_1_1_1_1.setAttribute("onclick","test("+emoji.emojiNo+","+emoji.diaryNo+")");
                // div3_1_1_1_1_1.setAttribute("onclick","test("+emoji.emojiNo+","+div3_1_1_2+")");

                div3_1_1_1_1_1.setAttribute("onmouseleave","mouseout(this)")
                const img = document.createElement("img");
                    img.classList.add("emoji");
                    img.setAttribute("src",emoji.emojiPath);
                div3_1_1_1_1_1.append(img);
                const div3_1_1_1_1_2 = document.createElement("div");
                div3_1_1_1_1_2.classList.add("emoji-number");
                div3_1_1_1_1_2.innerText = emoji.emojiCount;

            div3_1_1_1_1.append(div3_1_1_1_1_1,div3_1_1_1_1_2);    
            // div3_1_1_1.insertAdjacentElement("beforeend",div3_1_1_1_1);
            
            div3_1_1_1.append(div3_1_1_1_1);
        }

        

        }, error : () => { 
                    
        }
    })
}


// const selectEmojiPeopleList = (emojiNo,diaryNo,div3_1_1_2)=>{
function selectEmojiPeopleList(emojiNo,diaryNo,btn){
    /* div3_1_1_1_1_1 = btn */
    // btn.parentElement.parentElement.nextSibling
    console.log("안되냐?인식?")
    console.log(btn.parentElement.parentElement.nextSibling);
    peoplePopContainer=btn.parentElement.parentElement.nextSibling;
    /* div3_1_1_2 = peoplepopcontainer */
    /*확인용*/console.log("이모지를 누른 사람의 목록을 조회하는 함수가 실행됩니다.");
    /*확인용*/console.log("사람 목록이 조회되는 다이어리 번호" + diaryNo);

    $.ajax({
        url : "/selectEmojiPeopleList",
        data : {"diaryNo":diaryNo,"emojiNo":emojiNo},
        dataType : "JSON",
        success :  (emojiPeopleList)  => {
        
        /*확인용*/console.log(diaryNo+"번 다이어리의"+emojiNo+"번 이모지를 누른 사람들의 목록");
        /*확인용*/console.log(emojiPeopleList);
        /* 가져오는 것 : DIARY_NO, E.EMOJI_NO, EMOJI_PATH, E.MEMBER_NO, MEMBER_NICKNAME, PROFILE_IMG */

        const div3_1_1_2_1 = document.createElement("div");
        div3_1_1_2_1.classList.add("people-pop");
        
        /* 누적방지용 */
        peoplePopContainer.innerText = "";

        peoplePopContainer.append(div3_1_1_2_1);
            console.log("peoplePopContainer");
            console.log(peoplePopContainer);
            const div3_1_1_2_1_1 = document.createElement("div");
            div3_1_1_2_1_1.classList.add("people-list");
            div3_1_1_2_1_1.innerText = "공감을 누른 회원 목록";
            div3_1_1_2_1.append(div3_1_1_2_1_1,);

            for(emojiPeople of emojiPeopleList){
                const div3_1_1_2_1_2 = document.createElement("div");
                div3_1_1_2_1_2.classList.add("profile-box");

                    const div3_1_1_2_1_2_1 = document.createElement("div");
                        const img = document.createElement("img");
                        img.classList.add("profile-image");
                        img.setAttribute("src",emojiPeople.profileImage)
                    div3_1_1_2_1_2_1.append(img);
                        
                    const div3_1_1_2_1_2_2 = document.createElement("div");
                    div3_1_1_2_1_2_2.classList.add("name");
                    div3_1_1_2_1_2_2.innerText = emojiPeople.memberNickname;

                div3_1_1_2_1_2.append(div3_1_1_2_1_2_1,div3_1_1_2_1_2_2);
                div3_1_1_2_1.insertAdjacentElement("beforeend",div3_1_1_2_1_2)
                
            }
        
        

        }, error : () => { 
                    
        }
    })
}

function mouseout(btn){
    btn.parentElement.parentElement.nextSibling.innerText = "";
}

function writeBtn(){

}

