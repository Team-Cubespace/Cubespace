<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!-- 임시로 만든 변수 -->
<c:set var="loginMember" value="a"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cubespace</title>
    <link rel="stylesheet" href="/resources/css/reset.css">
    <link rel="stylesheet" href="/resources/css/variables.css">
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/common/main.css">
    <link rel="stylesheet" href="/resources/css/common/header.css">
    <link rel="stylesheet" href="/resources/css/common/footer.css">
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
</head>
<body>
    <jsp:include page="/WEB-INF/views/include/header.jsp"/>
    
    <main>
        <section>
            <!-- 투데이 인기 스타, 누적 투데이 랭킹 -->
            <div class="star-container">
                <div class="star-select">
                    <span id="todayStar"><i class="fa-solid fa-star"></i> 투데이 인기 스타</span>
                    <span id="todayRank"><i class="fa-solid fa-ranking-star"></i> 누적 투데이 랭킹</span>
                </div>
                
                <div class="star-profile-container">
                    <div class="star-profile">
                        <img src="../../resources/images/crown.png">
                        <a href="#" class="star-profile-img"><img src="../../resources/images/zz.png"></a>
                        <a href="#">1. 기묘동</a>
                        <span>Today 400</span>
                    </div>
    
                    <div class="star-profile">
                        <img src="../../resources/images/crown.png">
                        <a href="#" class="star-profile-img"><img src="../../resources/images/zz.png"></a>
                        <a href="#">2. 기묘동2</a>
                        <span>Today 300</span>
                    </div>
    
                    <div class="star-profile">
                        <img src="../../resources/images/crown.png">
                        <a href="#" class="star-profile-img"><img src="../../resources/images/zz.png"></a>
                        <a href="#">3. 기묘동3</a>
                        <span>Today 200</span>
                    </div>

                    <div class="star-profile">
                        <a href="#" class="star-profile-img"><img src="../../resources/images/zz.png"></a>
                        <a href="#">4. 기묘동4</a>
                        <span>Today 100</span>
                    </div>
                </div>
            </div>

            <!-- 로그인, 프로필, 미니홈피 -->
            <div class="profile-container">
                <c:choose>
                    <c:when test="${loginMember == ''}">
                        <div class="login">
                            <img src="../../resources/images/common/cubes.png">
                            <span>로그인 후 이용해주세요.</span>
                        </div>
                        <a href="#" id="loginBtn"><i class="fa-solid fa-right-to-bracket"></i>&nbsp;Login</a>
                    </c:when>

                    <c:otherwise>
                        <div class="profile">
                            <div class="profile-img">
                                <img src="../../resources/images/zz.png">
                                <div class="dropdown-btn"><i class="fa-solid fa-caret-down dropdown-btn-icon"></i></div>
                                
                                <!-- dropdown -->
                                <div class="dropdown">
                                    <a href="#">내 정보 수정</a>
                                    <a href="#">로그아웃</a>
                                </div>
                            </div>
        
                            <div class="profile-info">
                                <span>김효동2</span>
                                <span><a href="#">알림</a> : <a href="#">0</a></span>
                                <span>Today : 0</span>
                                <span>일촌 : 1,000명</span>
                            </div>
                        </div>

                        <a href="/minihome" id="homeBtn" onclick="return openMinihome(this.href)"><i class="fa-solid fa-house"></i>&nbsp;Minihomepage</a>
                    </c:otherwise>
                </c:choose>
            </div>
        </section>

        <!-- 인기 shorts, 최신 shorts -->
        <section class="place-list-area">
            <div class="place-area" id="placeArea">
                <div class="shorts-select">
                    <span id="popular-shorts" class="place-area-title"><i class="fa-brands fa-gratipay"></i> 인기 shorts</span>
                    <span id="new-shorts" class="place-area-title"><i class="fa-solid fa-circle-play"></i> 최신 shorts</span>
                </div>

                <div class="slide-container">
                    <span class="prev-arrow"><i class="fa-solid fa-arrow-left"></i></span>
                    <span class="next-arrow"><i class="fa-solid fa-arrow-right"></i></span>

                    <ul class="place-list">
                        <li class="place-item place-item">
                            <a href="해당 장소에 대한 상세페이지(자바스크립트로 queryString 생성)">
                                <img src="../../resources/images/toy.jpg">
                                <span class="place-title">형이 인형 뽑는 방법 알려준다</span>
                                <span>김효동2</span>
                                <span>조회수 5,000</span>
                            </a>
                        </li>

                        <li class="place-item">
                            <a href="해당 장소에 대한 상세페이지(자바스크립트로 queryString 생성)">
                                <img src="../../resources/images/toy.jpg">
                                <span class="place-title">형이 인형 뽑는 방법 알려준다</span>
                                <span>김효동2</span>
                                <span>조회수 5,000</span>
                            </a>
                        </li>

                        <li class="place-item">
                            <a href="해당 장소에 대한 상세페이지(자바스크립트로 queryString 생성)">
                                <img src="../../resources/images/toy.jpg">
                                <span class="place-title">형이 인형 뽑는 방법 알려준다</span>
                                <span>김효동2</span>
                                <span>조회수 5,000</span>
                            </a>
                        </li>

                        <li class="place-item">
                            <a href="해당 장소에 대한 상세페이지(자바스크립트로 queryString 생성)">
                                <img src="../../resources/images/toy.jpg">
                                <span class="place-title">형이 인형 뽑는 방법 알려준다</span>
                                <span>김효동2</span>
                                <span>조회수 5,000</span>
                            </a>
                        </li>

                        <li class="place-item">
                            <a href="해당 장소에 대한 상세페이지(자바스크립트로 queryString 생성)">
                                <img src="../../resources/images/toy.jpg">
                                <span class="place-title">형이 인형 뽑는 방법 알려준다</span>
                                <span>김효동2</span>
                                <span>조회수 5,000</span>
                            </a>
                        </li>

                        <li class="place-item">
                            <a href="해당 장소에 대한 상세페이지(자바스크립트로 queryString 생성)">
                                <img src="../../resources/images/toy.jpg">
                                <span class="place-title">형이 인형 뽑는 방법 알려준다</span>
                                <span>김효동2</span>
                                <span>조회수 5,000</span>
                            </a>
                        </li>

                        <li class="place-item">
                            <a href="해당 장소에 대한 상세페이지(자바스크립트로 queryString 생성)">
                                <img src="../../resources/images/toy.jpg">
                                <span class="place-title">형이 인형 뽑는 방법 알려준다</span>
                                <span>김효동2</span>
                                <span>조회수 5,000</span>
                            </a>
                        </li>

                        <li class="place-item">
                            <a href="해당 장소에 대한 상세페이지(자바스크립트로 queryString 생성)">
                                <img src="../../resources/images/toy.jpg">
                                <span class="place-title">형이 인형 뽑는 방법 알려준다</span>
                                <span>김효동2</span>
                                <span>조회수 5,000</span>
                            </a>
                        </li>

                        <li class="place-item">
                            <a href="해당 장소에 대한 상세페이지(자바스크립트로 queryString 생성)">
                                <img src="../../resources/images/toy.jpg">
                                <span class="place-title">형이 인형 뽑는 방법 알려준다</span>
                                <span>김효동2</span>
                                <span>조회수 5,000</span>
                            </a>
                        </li>

                        <li class="place-item">
                            <a href="해당 장소에 대한 상세페이지(자바스크립트로 queryString 생성)">
                                <img src="../../resources/images/toy.jpg">
                                <span class="place-title">형이 인형 뽑는 방법 알려준다</span>
                                <span>김효동2</span>
                                <span>조회수 5,000</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </main>

    <jsp:include page="/WEB-INF/views/include/footer.jsp"/>

    <script>
        const loginMember = "${loginMember}";
    </script>
    <script src="/resources/js/common/main.js"></script>
</body>
</html>