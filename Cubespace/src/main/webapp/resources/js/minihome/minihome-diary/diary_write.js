
/* 썸머노트 설정 */

$(document).ready(function () {
    console.log($.summernote.options);
    // 실행시 언어 설정을 한글로 설정 
    $.summernote.options.lang = 'ko-KR';
    $.summernote.options.airMode = false;
});

$('#summernote').summernote({
    // 에디터 높이
    height: 300, 
    minHeight: 300,             // set minimum height of editor
    maxHeight: 300,             // set maximum height of editor
    disableResizeEditor : true,
    // 에디터 너비
    width: 626,
   // 에디터 한글 설정
   // 에디터에 커서 이동 (input창의 autofocus라고 생각하시면 됩니다.)
    focus : true,

    toolbar: [
    // 글꼴 설정
    ['fontname', ['fontname']],
    // 글자 크기 설정
    ['fontsize', ['fontsize']],
    // 글자색
    ['color', ['color']],
    // 표만들기
    ['table', ['table']],
    // 글머리 기호, 번호매기기, 문단정렬
    ['para', ['ul', 'ol', 'paragraph']],
    // 줄간격
    ['height', ['height']],
    // 굵기, 기울임꼴, 밑줄,취소 선, 서식지우기
    ['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
    // 그림첨부, 링크만들기, 동영상첨부(그림과 동영상은 없앴음)
    ['insert',['link']],
    // 코드보기, 확대해서보기, 도움말
    ['view', ['codeview','fullscreen', 'help']]
    ],
    // lineHeights: ['0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    lineHeights: [ '1.2', '1.4', '1.5', '2.0', '3.0'],
     // 추가한 글꼴
    fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New','맑은 고딕','궁서','굴림체','굴림','돋음체','바탕체'],
    // 추가한 폰트사이즈
    fontSizes: ['8','9','10','11','12','14','16','18','20','22','24','28','30','36','50','72']
    ,
    callbacks: {
        onImageUpload: function (files) { //이미지 업로드 처리
            RealTimeImageUpdate(files, this);
        },
        onChange:function(contents, $editable){ //텍스트 글자수 및 이미지등록개수
            setContentsLength(contents, 0);
        }
    }
});
let contentLength;
//글자수 체크
//태그와 줄바꿈, 공백을 제거하고 텍스트 글자수만 가져옵니다.
	function setContentsLength(str, index) {
        contentLength = str.length;
        // if(str.length > 3878){
        //     alert("내용 길이가 너무 깁니다.")
        // }
        console.log("str.length"+str.length);
        console.log("contentLength"+contentLength);
	}


//게시글 작성 유효성 검사

let beforeDate = document.getElementById("diaryDate").value;
document.getElementById("diaryDate").addEventListener("change",function(){
    if(new Date(document.getElementById("diaryDate").value) > new Date()){
        alert("현재 이후의 다이어리를 작성하실 수 없습니다.");
        document.getElementById('diaryDate').value =  beforeDate;
    }
})

function writeValidate() {
    const diaryTitle = document.getElementById("diaryTitle");
    const diaryContent = document.getElementById("summernote");
    const diaryDate = document.getElementById("diaryDate").value;
    console.log("다이어리작성시"+diaryDate);
    if(diaryTitle.value.trim().length == 0){
        
        alert("제목을 입력해주세요.");
        diaryTitle.value = "";
        diaryTitle.focus();
        return false;
    }

    

    if(diaryContent.value.trim().length == 0){
        
        alert("내용을 입력해주세요.");
        diaryContent.value = "";
        diaryContent.focus();
        return false;
    }

    if(new Date(document.getElementById("diaryDate").value) > new Date()){
        alert("현재 이후의 다이어리를 작성하실 수 없습니다.");
        return false;
    }
    console.log("contentLength22"+contentLength);
    if(contentLength > 3878){
        console.log("contentLength"+contentLength);
        alert("내용 길이가 너무 깁니다.")
        return false;
    }



    return true;
}




    
    


