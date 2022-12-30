<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>홈</title>
    <link rel="stylesheet" href="/resources/css/style.css">
    <link rel="stylesheet" href="/resources/css/minihome/minihome-rayout.css">
    <link rel="stylesheet" href="/resources/css/minihome/home/minihome-home.css">
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
</head>
<body>
    <div class="content-area">
        <section class="minihome-rayout">
            <jsp:include page="/WEB-INF/views/minihome/home/minihome-profile.jsp"/>
        </section>

        <section class="minihome-rayout">
            <div id="homeArea">
                <header>최근 게시물</header>
        
                <div class="new-post-container">
                    <div class="new-post">
                        <div class="post-content">
                            <span class="post-category"><a href="#">다이어리</a></span>
                            <span>::</span>
                            <span>
                                <a href="#" class="post-title" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                    메로나 먹고싶어... 딸기 투게더도 맛있는데...
                                </a>
                            </span>
                        </div>
                        <div class="post-time">5일 전</div>
                    </div>

                    <div class="new-post">
                        <div class="post-content">
                            <span class="post-category"><a href="#">사진첩</a></span>
                            <span>::</span>
                            <span>
                                <a href="#" class="post-title" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                    메로나 먹고싶어... 딸기 투게더도 맛있는데...
                                </a>
                            </span>
                        </div>
                        <div class="post-time">5일 전</div>
                    </div>

                    <div class="new-post">
                        <div class="post-content">
                            <span class="post-category"><a href="#">동영상</a></span>
                            <span>::</span>
                            <span>
                                <a href="#" class="post-title" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                    메로나 먹고싶어... 딸기 투게더도 맛있는데...
                                </a>
                            </span>
                        </div>
                        <div class="post-time">5일 전</div>
                    </div>
                </div>
        
                <header class="miniroom-header">
                    <span>미니룸</span>
                    <a href="#" class="miniroom-deco"><i class="fa-solid fa-gear"></i>&nbsp;미니룸 꾸미기</a>
                </header>

                <div class="miniroom-container">
                    <div class="miniroom">
                        <div class="left"></div>
                        <div class="right"></div>
                        <div class="bottom"></div>
                    </div>
                </div>
        
                <header>깐부 메시지</header>

                <div class="write-message">
                    <span>메시지 남기기</span>
                    <input type="text" id="dearFriend" placeholder="깐부에게 메시지를 남겨보세요!">
                    <span id="writeBtn">등록</span>
                </div>

                <div class="friend-message-container">
                    <div class="friend-message">
                        <div class="message-content">
                            <span class="friend-name"><span>고먐미</span></span>
                            <span>::</span>
                            <span class="message" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                메로나 먹고싶어... 딸기 투게더도 맛있는데...
                            </span>
                        </div>
                        <div class="message-time">5일 전</div>
                    </div>

                    <div class="friend-message">
                        <div class="message-content">
                            <span class="friend-name"><span>고먐미</span></span>
                            <span>::</span>
                            <span class="message" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                메로나 먹고싶어... 딸기 투게더도 맛있는데...
                            </span>
                        </div>
                        <div class="message-time">5일 전</div>
                    </div>

                    <div class="friend-message">
                        <div class="message-content">
                            <span class="friend-name"><span>고먐미</span></span>
                            <span>::</span>
                            <span class="message" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                메로나 먹고싶어... 딸기 투게더도 맛있는데...
                            </span>
                        </div>
                        <div class="message-time">5일 전</div>
                    </div>

                    <div class="friend-message">
                        <div class="message-content">
                            <span class="friend-name"><span>고먐미</span></span>
                            <span>::</span>
                            <span class="message" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                메로나 먹고싶어... 딸기 투게더도 맛있는데...
                            </span>
                        </div>
                        <div class="message-time">5일 전</div>
                    </div>

                    <div class="friend-message">
                        <div class="message-content">
                            <span class="friend-name"><span>고먐미</span></span>
                            <span>::</span>
                            <span class="message" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                메로나 먹고싶어... 딸기 투게더도 맛있는데...
                            </span>
                        </div>
                        <div class="message-time">5일 전</div>
                    </div>

                    <div class="friend-message">
                        <div class="message-content">
                            <span class="friend-name"><span>고먐미</span></span>
                            <span>::</span>
                            <span class="message" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                메로나 먹고싶어... 딸기 투게더도 맛있는데...
                            </span>
                        </div>
                        <div class="message-time">5일 전</div>
                    </div>

                    <div class="friend-message">
                        <div class="message-content">
                            <span class="friend-name"><span>고먐미</span></span>
                            <span>::</span>
                            <span class="message" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                메로나 먹고싶어... 딸기 투게더도 맛있는데...
                            </span>
                        </div>
                        <div class="message-time">5일 전</div>
                    </div>

                    <div class="friend-message">
                        <div class="message-content">
                            <span class="friend-name"><span>고먐미</span></span>
                            <span>::</span>
                            <span class="message" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                메로나 먹고싶어... 딸기 투게더도 맛있는데...
                            </span>
                        </div>
                        <div class="message-time">5일 전</div>
                    </div>

                    <div class="friend-message">
                        <div class="message-content">
                            <span class="friend-name"><span>고먐미</span></span>
                            <span>::</span>
                            <span class="message" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                메로나 먹고싶어... 딸기 투게더도 맛있는데...
                            </span>
                        </div>
                        <div class="message-time">5일 전</div>
                    </div>

                    <div class="friend-message">
                        <div class="message-content">
                            <span class="friend-name"><span>고먐미</span></span>
                            <span>::</span>
                            <span class="message" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                메로나 먹고싶어... 딸기 투게더도 맛있는데...
                            </span>
                        </div>
                        <div class="message-time">5일 전</div>
                    </div>

                    <div class="friend-message">
                        <div class="message-content">
                            <span class="friend-name"><span>고먐미</span></span>
                            <span>::</span>
                            <span class="message" title="메로나 먹고싶어... 딸기 투게더도 맛있는데...">
                                메로나 먹고싶어... 딸기 투게더도 맛있는데...
                            </span>
                        </div>
                        <div class="message-time">5일 전</div>
                    </div>
                </div>

                <div id="btnArea">
                    <span id="moreBtn">메시지 더보기</span>
                    <span id="topBtn">상단으로 가기</span>
                </div>
            </div>
        </section>
    </div>
</body>

<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
<script src="/resources/js/minihome/home/minihome-content.js"></script>
</html>