$(document).ready(function () {
    console.log($.summernote.options);
    // 실행시 언어 설정을 한글로 설정 
    $.summernote.options.lang = 'ko-KR';
    $.summernote.options.airMode = false;
});

var a = $('#summernote');

//수정버튼
var edit = function () {
    a.summernote({ 
        // 에디터 높이
        height: 500, 
        minHeight: 500,             // set minimum height of editor
        maxHeight: 500,             // set maximum height of editor
        disableResizeEditor : true,
        // 에디터 너비
        // width: 300, 
        // 에디터 한글 설정
        // 에디터에 커서 이동 (input창의 autofocus라고 생각하시면 됩니다.)
        focus : true,

        toolbar: [
        // 글꼴 설정
        ['fontname', ['fontname']],
        // 글자 크기 설정
        ['fontsize', ['fontsize']],
        // 굵기, 기울임꼴, 밑줄,취소 선, 서식지우기
        ['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
        // 글자색
        ['color', ['forecolor','color']],
        // 표만들기
        ['table', ['table']],
        // 글머리 기호, 번호매기기, 문단정렬
        ['para', ['ul', 'ol', 'paragraph']],
        // 줄간격
        ['height', ['height']],
        // 그림첨부, 링크만들기, 동영상첨부(그림과 동영상은 없앴음)
        ['insert',['link']],
        // 코드보기, 확대해서보기, 도움말
        ['view', ['codeview','fullscreen', 'help']]
        ],
        // 추가한 글꼴
        fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New','맑은 고딕','궁서','굴림체','굴림','돋음체','바탕체'],
        // 추가한 폰트사이즈
        fontSizes: ['8','9','10','11','12','14','16','18','20','22','24','28','30','36','50','72']


});
};

// 수정 종료
var save = function () {
    var markup = a.summernote('code');
    a.summernote('destroy');
};

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
    // 굵기, 기울임꼴, 밑줄,취소 선, 서식지우기
    ['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
    // 글자색
    ['color', ['forecolor','color']],
    // 표만들기
    ['table', ['table']],
    // 글머리 기호, 번호매기기, 문단정렬
    ['para', ['ul', 'ol', 'paragraph']],
    // 줄간격
    ['height', ['height']],
    // 그림첨부, 링크만들기, 동영상첨부(그림과 동영상은 없앴음)
    ['insert',['link']],
    // 코드보기, 확대해서보기, 도움말
    ['view', ['codeview','fullscreen', 'help']]
    ],
     // 추가한 글꼴
    fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New','맑은 고딕','궁서','굴림체','굴림','돋음체','바탕체'],
    // 추가한 폰트사이즈
    fontSizes: ['8','9','10','11','12','14','16','18','20','22','24','28','30','36','50','72']

});
    
    
    


