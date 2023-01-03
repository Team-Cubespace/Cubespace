// 아이템 사용하기 클릭 시 (비동기) 
// 1. 상품번호, 카테고리 번호, 회원번호 매개변수로 가져옴
// 2. 해당 카테고리 일 시 INSERT 구문으로 넘어감 
// 3. 업데이트 성공시 버튼 보유중으로 변경
// 4. 인기/최신 눌러고 아래 목록에서도 보유중으로 변경같이 되게(반대도 해당)
/* 사용하기 버튼 클릭 시 */
const goodsAdd=(goodsNo,shopCathNo,btn)=>{
    $.ajax({
        url:"/goodsAddButton",
        data: {"loginMemberNo":loginMemberNo,"goodsNo":goodsNo,"shopCathNo":shopCathNo},
        success : goodsAddBtn =>{

            if(goodsAddBtn==1){// 상품추가 성공
                const goodsBtn = btn
                const goodsBtnGoodsNo0 = document.querySelectorAll(".goods_"+goodsNo+"")[0]
                const goodsBtnGoodsNo1 = document.querySelectorAll(".goods_"+goodsNo+"")[1]

                goodsBtn.removeAttribute("onclick");
                goodsBtn.classList.add("goods-holding")
                goodsBtn.classList.remove("goods-btn")
                goodsBtn.innerText="보유중"

                goodsBtnGoodsNo0.removeAttribute("onclick");
                goodsBtnGoodsNo0.classList.add("goods-holding")
                goodsBtnGoodsNo0.classList.remove("goods-btn")
                goodsBtnGoodsNo0.innerText="보유중"

                if(goodsBtnGoodsNo1!=null){
                    goodsBtnGoodsNo1.removeAttribute("onclick");
                    goodsBtnGoodsNo1.classList.add("goods-holding")
                    goodsBtnGoodsNo1.classList.remove("goods-btn")
                    goodsBtnGoodsNo1.innerText="보유중"
                }

            }else{ 
                alert("상품추가 실패")
            }
        }
    })
}
