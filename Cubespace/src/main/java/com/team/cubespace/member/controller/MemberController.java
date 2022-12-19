package com.team.cubespace.member.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.team.cubespace.member.model.Member;
import com.team.cubespace.member.model.service.MemberService;

@Controller
@SessionAttributes({"loginMember", "message"})
@RequestMapping("/member")
public class MemberController {
	
	@Autowired
	private MemberService service;
	
	
	@PostMapping("/login")
	public String login(Member inputMember,
			Model model,
			RedirectAttributes ra,
			HttpServletResponse resp,
			@RequestParam(value="saveId", required=false) String saveId,
			@RequestHeader(value="referer") String referer,
			@RequestParam(value="loginType", required=false, defaultValue = "1") String loginType) {
		
		
		Member loginMember = new Member();
		
		if(loginType.equals("3")) {
//			loginMember = service.kakaoLogin(inputMember);
		}
		
		
//	loginMember = service.login(inputMember);
	
	
	return null;
	}

}
