<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" sizes="16x16 32x32 64x64" href="https://i.ibb.co/4tCGZqD/Banana.png">
    <title>바꾸고 나누자 나랑: 바나나 마켓</title>
    <link rel="stylesheet" href="/resources/css/pay/bananaPay.css">
    <link rel="stylesheet" href="/resources/css/style.css">
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/1023652dd4.js" crossorigin="anonymous"></script>
</head>
<body>
    <main>
        <div class="popup_layer5" id="popup_layer5" style="display: none;">
            <div class="popup_box5 scroll">
                <div style="height: 10px; width: 500px; float: top;">
                    <a href="javascript:closePop5();"><i class="fa-solid fa-x allClose"></i></a>
                </div>

                <!--팝업 컨텐츠 영역-->
                <div class="popup_cont5">
                    <div class="payRemainArea">
                        <h1><span>내 바나나페이 : </span><span id="payRemain">65000</span><span>원</span></h1>
                        <div class="payButton">
                            <button type="button" class="fa-solid fa-database" id="logBtn"> 내 페이 사용내역</button>
                            <button type="button" class="fa-solid fa-store" id="chargeBtn"> 충전</button>
                            <button type="button" class="fa-solid fa-rotate-right" id="refundBtn"> 환불</button>
                        </div>
                    </div>

                    <div name="payCharge" id="payCharge">
                        <div class="charge">
                            <div class="chargeHeader">
                                <p>충전 (만원 단위)</p>
                                <p class="fa-solid fa-x close closeCharge"></p>
                            </div>

                            <div class="chargeMain">
                                <p class="charge1"> + 1만원</p>
                                <p class="charge5"> + 5만원</p>
                                <p class="charge10"> + 10만원</p>
                                <div class="resetPrice">금액 초기화하기</div>

                                <div>
                                    직접 입력&nbsp;
                                    <input type="text" id="chargePrice">
                                    <span id="inputSelf">원</span>
                                    <span id="chargeMessage">숫자만 입력하세요</span>
                                </div>
                            </div>
                        </div>

                        <div class="payBtnArea">
                            <button type="button" id="chargeSubmitBtn">충전하기</button>
                        </div>
                    </div>

                    <div name="payRefund" id="payRefund">
                        <div class="charge">
                            <div class="chargeHeader">
                                <p>환불하기</p>
                                <p><i class="fa-solid fa-x close closeRefund"></i></p>
                            </div>

                            <div class="chargeMain">
                                <p class="charge1"> + 1만원</p>
                                <p class="charge5"> + 5만원</p>
                                <p class="charge10"> + 10만원</p>
                                <p id="chargeAll">전액</p>
                                <div class="resetPrice">금액 초기화하기</div>
                                <div>
                                    직접 입력&nbsp;
                                    <input type="text" id="refundPrice">
                                    <span id="inputSelf">원</span>
                                    <span id="refundMessage">숫자만 입력하세요</span>
                                </div>
                            </div>
                        </div>

                        <div class="payBtnArea">
                            <button type="button" id="refundSubmitBtn">환불하기</button>
                        </div>
                    </div>

                    <section id="payLogArea">
                        <div class="charge">
                            <div class="chargeHeader">
                                <p>내 페이 사용내역</p>
                                <p class="fa-solid fa-x close closeLog"></p>
                            </div>

                            <div class="payMain">
                                <div class="payCtg2">
                                    <div class="payCtg2__div">전체</div>
                                    <div class="payCtg2__div">입금</div>
                                    <div class="payCtg2__div">출금</div>
                                </div>

                                <div class="selectDataArea">
                                    <div class="selectDataBar">
                                        <div id="monthBefore" class="fa-solid fa-chevron-left"></div>

                                        <div class="selectDate">
                                            <div class="dropdown1">
                                                <div id="selectYear" class="dropbtn1"></div>

                                                <div class="dropdown-content1">
                                                    <div id="year1">2022년</div>
                                                    <div id="year2">2023년</div>
                                                    <div id="year3">2024년</div>
                                                </div>
                                            </div>

                                            <div class="dropdown2">
                                                <div id="selectMonth" class="dropbtn2"></div>

                                                <div class="dropdown-content2">
                                                    <div id="month1">01월</div>
                                                    <div id="month2">02월</div>
                                                    <div id="month3">03월</div>
                                                    <div id="month4">04월</div>
                                                    <div id="month5">05월</div>
                                                    <div id="month6">06월</div>
                                                    <div id="month7">07월</div>
                                                    <div id="month8">08월</div>
                                                    <div id="month8">09월</div>
                                                    <div id="month10">10월</div>
                                                    <div id="month11">11월</div>
                                                    <div id="month12">12월</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="monthAfter" class="fa-solid fa-chevron-right"></div>
                                    </div>
                                </div>

                                <div id="payLL"></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </main>

    <!-- jQuery CDN 방식으로 추가-->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <script>
        const memberNo = "${loginMember.memberNo}";
        const buyerEmail = "${loginMember.memberEmail}";
        const buyerName = "${loginMember.memberName}";
        const memberTel = "${loginMember.memberTel}";
        const memberAddress = "${loginMember.memberAddress}";
    </script>

    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>
    <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js"></script>
    <script src="/resources/js/pay/bananaPay.js"></script>
    <script src="/resources/js/pay/iamport.js"></script>
</body>
</html>