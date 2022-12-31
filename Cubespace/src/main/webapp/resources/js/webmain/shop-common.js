// 아이템 사용하기 클릭 시 (비동기) 
// 1. 상품번호, 카테고리 번호, 회원번호 매개변수로 가져옴
// 2. 해당 카테고리 일 시 INSERT 구문으로 넘어감 
// 3. 업데이트 성공시 버튼 보유중으로 변경
/* 사용하기 버튼 클릭 시 */
const goodsAdd=(goodstNo,shopCathNo,btn)=>{
    $.ajax({
        url:"/goodsAddButton",
        data: {"loginMemberNo":loginMemberNo,"goodstNo":goodstNo,"shopCathNo":shopCathNo},
        success : goodsAddBtn =>{

            if(goodsAddBtn==1){// 상품추가 성공
                const goodsBtn = btn
                const goodsBtnGoodsNo = document.querySelector(".goods_"+goodstNo+"")

                goodsBtn.removeAttribute("onclick");
                goodsBtn.classList.add("goods-holding")
                goodsBtn.classList.remove("goods-btn")
                goodsBtn.innerText="보유중"

                goodsBtnGoodsNo.removeAttribute("onclick");
                goodsBtnGoodsNo.classList.add("goods-holding")
                goodsBtnGoodsNo.classList.remove("goods-btn")
                goodsBtnGoodsNo.innerText="보유중"
                
            }else{ 
                alert("상품추가 실패")
            }
        }
    })
}