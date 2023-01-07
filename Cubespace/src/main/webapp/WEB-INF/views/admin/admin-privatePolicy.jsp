<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<c:set var="pagination" value="${map.pagination}"/>
<c:set var="fontList" value="${map.fontList}"/>
<c:set var="allFontCount" value="${map.allFontCount}"/>
<c:set var="listCount" value="${map.listCount}"/>

<c:set var="sURL" value="sort=${param.sort}&key=${param.key}&query=${param.query}"/>

<jsp:include page="/WEB-INF/views/include/allFontMusic.jsp" />

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cubespace</title>
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/common/header.css">
    <link rel="stylesheet" href="/resources/css/common/footer.css">
    <link rel="stylesheet" href="/resources/css/admin/admin-all.css">
    <link rel="stylesheet" href="/resources/css/admin/admin-FAQ.css">

    <script src="https://kit.fontawesome.com/3fe30a9b47.js"></script>

    </head>
    <style>

        .touContent{
            width: 1140px;
            height: auto;
        }
            pre {    
    white-space: pre-wrap;
    word-break: break-all;
    overflow: auto;    
  }

    </style>
    <body>
        <main>
            
            <jsp:include page="/WEB-INF/views/include/header.jsp" />
            <section class="main-class">
                <div class="member-title">
                    <h3>개인정보처리방침</h3>
                    
                </div>

                <div class="search-result-area">
                    <div class="touArea">
                        <div class="touTitle"></div>
                        <pre class="touContent">
큐브스페이스(이하 ‘회사’)는 저희 서비스를 이용해주시는 이용자분들이 회사를 신뢰하고 정보를 제공하고 있다는 것을 인지하고 있습니다. 따라서 이용자분들의 신뢰에 대한 책임을 갖고 개인정보를 보호하고, 필요에 따라 활용하실 수 있도록 노력하고 있습니다.

회사는 정보통신망 이용촉진 및 정보보호에 관한 법률 및 개인정보 보호법 등 관련 법령상의 개인정보 보호 규정을 준수하고 있습니다.

회사는 개인정보 처리방침을 통하여 고객님으로부터 제공받는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.

회사는 ｢개인정보 보호법｣ 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.

 

제1조(개인정보의 처리목적)

제2조(개인정보의 처리 및 보유기간)

제3조(개인정보의 제3자 제공)

제4조(개인정보처리의 위탁)

제5조(정보주체와 법정대리인의 권리∙의무 및 행사방법)

제6조(처리하는 개인정보 항목)

제7조(개인정보의 파기)

제8조(개인정보의 안전성 확보조치)

제9조(개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항)

제10조(개인정보 보호책임자)

제11조(추가적인 이용∙제공 판단기준)

제12조(개인정보 열람청구)

제13조(권익침해 구제방법)

제14조(영상정보처리기기 설치∙운영)

제15조(개인정보 처리방침 변경)

 

제1조(개인정보의 처리목적) 회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 ｢개인정보 보호법｣ 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

  1. 홈페이지 회원 가입 및 관리

     회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별.인증, 회원자격 유지∙관리, 서비스 부정이용 방지, 만 14세 미만 아동의 개인정보 처리 시 법정대리인의 동의 여부 확인, 각종 고지.통지, 고충 처리 목적으로 개인정보를 처리합니다.

  2. 재화 또는 서비스 제공

     물품 배송, 서비스 제공, 계약서.청구서 발송, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 연령인증, 요금결제∙정산, 채권추심을 목적으로 개인정보를 처리합니다.

  3. 고충처리

     민원인의 신원 확인, 민원사항 확인, 사실 조사를 위한 연락∙통지, 처리결과 통보의 목적으로 개인정보를 처리합니다.

 

제2조(개인정보의 처리 및 보유기간) ① 회사는 법령에 따른 개인정보 보유∙이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유∙이용기간 내에서 개인정보를 처리∙보유합니다.

 

② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.

  1. 홈페이지 회원 가입 및 관리 : 회원 탈퇴 시까지

     다만, 다음의 사유에 해당하는 때에는 해당 사유 종료 시까지

     1) 관계 법령 위반에 따른 수사.조사 등이 진행 중인 때에는 해당 수사∙조사 종료 시까지

     2) 서비스 이용에 따른 채권.채무관계 잔존 시에는 해당 채권∙채무관계 정산 시까지

 

  2. 재화 또는 서비스 제공 : 재화∙서비스 공급 완료 및 요금결제∙정산 완료 시까지

     다만, 다음의 사유에 해당하는 때에는 해당 기간 종료 시까지

     1) 「전자상거래 등에서의 소비자 보호에 관한 법률」

         - 계약 또는 청약철회, 대금결제, 재화 등의 공급기록 : 5년

         - 소비자 불만 또는 분쟁처리에 관한 기록 : 3년

         - 표시∙광고에 관한 기록 : 6개월

     2) 「국세기본법」

         - 국세의 부과제척기간 : 10년

     3) 「전자금융거래법」

         - 건당 거래금액이 1만원을 초과하는 전자금융 거래에 관한 기록 : 5년

         - 건당 거래금액이 1만원 이하인 전자금융 거래에 관한 기록 : 1년

     4) 「통신비밀보호법」

         - 로그인 기록 : 3개월

     5) 회사 내부방침

         - 부정이용 등에 관한 기록 : 5년

 

제3조(개인정보의 제3자 제공) ① 회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 ｢개인정보 보호법｣ 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.


제4조(개인정보처리의 위탁) ① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.



② 회사는 위탁계약 체결 시 ｢개인정보 보호법｣ 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.

③ 위탁업무의 내용이나 수탁자가 변경될 때에는 지체 없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.

 

제5조(정보주체와 법정대리인의 권리·의무 및 행사방법) ① 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.

② 제1항에 따른 권리 행사는 회사에 대해 개인정보보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.

③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.

④ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.

⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.

⑥ 회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.

 

제6조(처리하는 개인정보 항목) 회사는 다음의 개인정보 항목을 처리하고 있습니다.

  [개인정보 수집 항목]

  [큐브스페이스 회원 가입 시]

  ㆍ필수 : 성명, 이메일, 휴대전화번호, 비밀번호, 닉네임, 암호화된 이용자 확인값(CI), 중복가입확인정보(DI)

  ㆍ선택 : 생년월일, 성별, 프로필 사진

 



  [개인정보 수집 방법]

  회사는 아래의 방법을 통해 개인정보를 수집합니다.

  ㆍ회원 가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 동의하고 직접 정보를 입력할 때 해당 개인정보를 수집합니다.

  ㆍ고객센터 또는 1:1 문의를 통한 상담 과정에서 웹페이지, 모바일 앱, 전화, 이메일 등을 통해 이용자의 개인정보가 수집될 수 있습니다.

  ㆍ온·오프라인에서 진행되는 이벤트에 참여하는 이용자가 동의할 때 해당 개인정보를 수집합니다.

  ㆍ회사와 제휴한 외부 기업이나 단체 등으로부터 이용자의 동의를 받아 개인정보를 제공받을 때 개인정보가 수집될 수 있습니다.

 

  서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 다음과 같습니다.

  ㆍ인터넷 서비스 이용 과정에서 IP주소, MAC주소, 쿠키, 단말기정보(OS, 휴대폰 기종, 모델명, 방문일시, 서비스 이용기록, 방문기록 등), 부정 이용기록 등의 정보가 자동으로 생성되어 수집될 수 있습니다.

     ※ 회사는 원칙적으로 고객의 사생활을 침해할 우려가 있는 민감정보는 수집하지 않습니다.

      필요한 경우 별도의 동의를 받아 수집하고 동의한 목적을 위해서만 제한적으로 이용합니다.

 

  [개인정보 이용]

  ㆍ회원 가입 의사 확인, 본인 및 연령확인, 만 14세 미만 아동 개인정보 수집 시 법정대리인 동의 여부 확인, 법정대리인의 권리행사 시 본인 확인

  ㆍ이용자 간 메시지 전송, 미니미, 일촌등록, 일촌추천 및 파도타기 기능의 제공

  ㆍ이용자 간에 활동 내역을 알리거나 이용자 검색, 등록 등의 기능 제공

  ㆍ싸이타운 서비스 제공

  ㆍ다양한 서비스 제공, 신규 서비스 개발, 공지사항 전달, 문의 사항 또는 불만 처리

  ㆍ유료서비스 제공 시 컨텐츠나 상품 등의 전송·배송 및 결제·요금 정산

  ㆍ이벤트 정보 제공, 광고성 정보 제공 등 마케팅 목적으로 이용

  ㆍ서비스의 원활한 운영에 지장을 주는 행위(부정 이용 행위 등)에 대한 방지 및 제재

  ㆍ인구통계학적 특성과 이용자의 관심, 기호, 성향에 기반한 맞춤형 컨텐츠 추천 및 마케팅에 활용

  ㆍ서비스 이용기록, 접속 빈도 및 서비스 이용에 대한 통계, 보안 및 프라이버시 보호 측면의 서비스 환경 구축, 서비스 개선에 활용

 

제7조(개인정보의 파기) ① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.

② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 때에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.

③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.

  1. 파기절차

  회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.

  2. 파기방법

  회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.

 

제8조(개인정보의 안전성 확보조치) 회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.

  1. 관리적 조치 : 내부관리계획 수립·시행, 정기적 직원 교육 등

  2. 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치

  3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제

 

제9조(개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항) ① 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.

② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.

  가. 쿠키의 사용목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.

  나. 쿠키의 설치·운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.

    [이용자 통제권 행사 방법]

    고객이 브라우저 설정을 조정하여 쿠키 저장 거부 등을 통해 이용을 거부할 수 있습니다.

     * 예시

    ㆍ웹브라우저

       Internet Explore : 도구 → 인터넷옵션 → 개인정보 → 고급 → 쿠키 차단 또는 처리안함

       Chrome : 설정 → 고급 → 개인정보 및 보안 → 사이트 설정 → 쿠키 및 사이트 데이터 → 타사 쿠키 차단

    ㆍ스마트폰

       안드로이드폰 : 설정 → 개인정보 보호 → 광고 → 광고 개인 최적화 선택 또는 해제

       아이폰 : 설정 → 개인 정보 보호 → 광고 → 광고 추적 제한

       (※ OS버전에 따라 방법이 다소 상이할 수 있습니다)

  다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.

 

제10조(개인정보 보호책임자) ① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.


② 정보주체께서는 회사의 서비스(또는 사업)를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.

 

제11조(추가적인 이용·제공 판단기준) ① 회사는 ｢개인정보 보호법｣ 제15조제3항 및 제17조제4항에 따라 ｢개인정보 보호법 시행령｣ 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다.

이에 따라 회사는 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다.

   ▶ 개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부

   ▶ 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부

   ▶ 개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부

   ▶ 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부

 

제12조(개인정보 열람청구) 정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다.

회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.

 

제13조(권익침해 구제방법) 정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.

  1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)

  2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)

  3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)

  4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)

 

제14조(영상정보처리기기 설치·운영) ① 회사는 아래와 같이 영상정보처리기기를 설치.운영하고 있습니다.

  1. 영상정보처리기기 설치근거·목적 : 회사의 시설안전·화재예방

  2. 설치 대수, 설치 위치, 촬영 범위 : 사옥·주차장 등 주요시설물에 5대 설치, 촬영범위는 주요시설물의 전 공간을 촬영

  3. 관리책임자, 담당부서 및 영상정보에 대한 접근권한자 : 경영전략팀 전우상 팀장

  4. 영상정보 촬영시간, 보관기간, 보관장소, 처리방법

      - 촬영시간 : 24시간 촬영

      - 보관기간 : 촬영시부터 30일

      - 보관장소 및 처리방법 : 회사 영상정보처리기기 통제실에 보관·처리

  5. 영상정보 확인 방법 및 장소 : 관리책임자에 요구 (경영전략팀)

  6. 정보주체의 영상정보 열람 등 요구에 대한 조치 : 개인영상정보 열람·존재확인 청구서로 신청하여야 하며, 정보주체 자신이 촬영된 경우 또는 명백히 정보주체의 생명·신체·재산 이익을 위해 필요한 경우에 한해 열람을 허용함

  7. 영상정보 보호를 위한 기술적·관리적·물리적 조치 : 내부관리계획 수립, 접근통제 및 접근권한 제한, 영상정보의 안전한 저장·전송기술 적용, 처리기록 보관 및 위·변조 방지조치, 보관시설 마련 및 잠금장치 설치 등·화재예방

 

제15조(개인정보 처리방침 변경)

① 이 개인정보 처리방침은 2023년 01월 11일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.

 
                        </pre>
                    </div>
                    
                </div>

                



               
            </section>
        </main>

        <jsp:include page="/WEB-INF/views/include/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

        <script src="/resources/js/admin/admin-FAQ.js"></script>
    </body>
</html>


