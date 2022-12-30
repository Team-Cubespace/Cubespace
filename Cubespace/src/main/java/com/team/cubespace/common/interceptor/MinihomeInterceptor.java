package com.team.cubespace.common.interceptor;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.minihome.model.service.MinihomeService;

public class MinihomeInterceptor implements HandlerInterceptor {
	@Autowired
	private MinihomeService service;
	
	@Autowired
	private HttpSession session;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// pathVariable에서 memberNo 가져오기
		Map<String, String> pathVariable = (Map<String, String>)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		int memberNo = Integer.parseInt(pathVariable.get("memberNo"));
		int loginMemberNo = ((Member)session.getAttribute("loginMember")).getMemberNo();
		
		// 자신이 자신의 미니홈피를 방문할 때가 아니면
		if(loginMemberNo != memberNo) {
			// 쿠키배열 가져오기
			Cookie[] cookies = request.getCookies();
			Cookie c = null;
			// 쿠키 배열이 비어있지 않다면
			if(cookies != null) {
				// 쿠키배열에서 visitedMiniHome 쿠키 찾기
				for(Cookie temp : cookies) {
					if(temp.getName().equals("visitedMiniHome")) { // 찾으면
						c = temp;	// 대입
						break;		// 검색 중단
					}
				}
			}
			if(c != null) {	// visitedMiniHome를 찾았다면
				if(c.getValue().indexOf("|" + memberNo + "|") == -1) {	// 오늘 방문한 적이 없다면
					// 업데이트 서비스 호출
					int result = service.updateTodayTotal(memberNo);
					
					// 업데이트 완료 시
					if(result > 0) {
						c.setValue(c.getValue() + "|" + memberNo + "|");
					}
				}
			} else {		// 찾지 못했다면
				int result = service.updateTodayTotal(memberNo);
				// 업데이트 완료 시
				if(result > 0) {
					c = new Cookie("visitedMiniHome", "|" + memberNo + "|");
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
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}
	
}
