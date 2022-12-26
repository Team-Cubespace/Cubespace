package com.team.cubespace.common.interceptor;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import com.team.cubespace.minihome.model.vo.Minihome;

public class FolderInterceptor implements HandlerInterceptor{

	@Autowired
	ServletContext application;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		// 미니홈의 주인 회원번호 가져오기
		int hostMemberNo = ((Minihome)application.getAttribute("minihome")).getMemberNo();
		
		// 카테고리타입 번호 가져오기
		Map<String, Integer>
		
		
		
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}
	
}
