// 볼륨 화면
(()=>{
    let val = $('#musicVolume').val();
    $('#musicVolume').css('background', 'linear-gradient(to right, #2e2e2e 0%, #2e2e2e '+ val +'%, #d5d4d3 ' + val + '%, #d5d4d3 100%)');
})();

$('#musicVolume').on('input', function(){
    let val = $(this).val();
    $(this).css('background', 'linear-gradient(to right, #2e2e2e 0%, #2e2e2e '+ val +'%, #d5d4d3 ' + val + '%, #d5d4d3 100%)');
});



// 폰트 적용 위해 로드되자마자 한번더 실행
// (() =>{location.href = location.href;})();
