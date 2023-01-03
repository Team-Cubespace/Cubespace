package com.team.cubespace.common.interceptor;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.video.model.service.VideoService;
import com.team.cubespace.video.model.vo.Video;

public class VideoInterceptor implements HandlerInterceptor{

	@Autowired
	private VideoService service;

	@Autowired
	private HttpSession session;
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
		// 모델에서 비디오 객체 가져오기
		Video video = (Video)(modelAndView.getModel().get("board"));
		//
		int videoNo = video.getVideoNo();
		// 로그인한 회원 번호 가져오기
		int loginMemberNo = ((Member)session.getAttribute("loginMember")).getMemberNo();
		
		// 비디오 작성자와 로그인한 회원번호가 같지 않으면
		if(video.getMemberNo() != loginMemberNo) {
			// 쿠키 확인
			Cookie[] cookies = request.getCookies();
			Cookie c = null;
			// 쿠키 배열이 비어있지 않다면
			if(cookies != null) {
				// 쿠키배열에서 visitedMiniHome 쿠키 찾기
				for(Cookie temp : cookies) {
					if(temp.getName().equals("videoNo")) { // 찾으면
						c = temp;	// 대입
						break;		// 검색 중단
					}
				}
			}
			if(c != null) {
				// 쿠키에 videoNo가 없으면
				if(c.getValue().indexOf("|" + videoNo + "|") == -1) {
					int result = service.updateReadCount(videoNo);
					video.setVideoReadCount(video.getVideoReadCount() + 1);
//					modelAndView.addObject("readCount", video.getVideoReadCount());
					// 조회수 1 업데이트
					if(result > 0) {
						c.setValue(c.getValue() + "|" + videoNo + "|");
					}
				}
			} else {
				int result = service.updateReadCount(videoNo);
				video.setVideoReadCount(video.getVideoReadCount() + 1);
//				modelAndView.addObject("readCount", video.getVideoReadCount());
				if(result > 0 ) {
					c = new Cookie("videoNo", "|" + videoNo + "|");
				}
			}
			
			if(c != null) {
				c.setPath("/");
				Date a = new Date();
				Calendar cal = Calendar.getInstance();
				
				cal.add(cal.DATE, 1);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date temp = new Date(cal.getTimeInMillis());
				
				Date b = sdf.parse(sdf.format(temp));
				
				long diff = b.getTime() - a.getTime();
				
				c.setMaxAge((int)diff/1000);
				response.addCookie(c);
			}
		}
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}	
}
