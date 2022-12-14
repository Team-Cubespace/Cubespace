package com.team.cubespace.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.team.cubespace.member.model.vo.Member;

@WebFilter(filterName = "loginFilter")
public class LoginFilter extends HttpFilter implements Filter{
	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		// 로그인 상태를 검사하는 방법
		// == session에 loginMember가 null이 아닌지 검사
		
		// Session 객체는 HttpServletRequest에서만 얻어올 수 있다
		// ->다운캐스팅 필요
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		
		HttpSession session = req.getSession();
		

		
		if(session.getAttribute("loginMember") == null) { // 로그아웃 상태이면
			session.setAttribute("message", "로그인 후 이용할 수 있습니다");
			
			
			resp.sendRedirect("/member/login");
		} else { 
			chain.doFilter(request, response);
		}
	}

}
