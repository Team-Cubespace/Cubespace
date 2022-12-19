package com.team.cubespace.member.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.member.model.service.MemberService;

@Controller
@SessionAttributes({"loginMember", "message"})
@RequestMapping("/member")
public class MemberController {
	
	@Autowired
	private MemberService service;
	
	/** 로그인
	 * @return
	 */
	@GetMapping("/member/login") 
	public String loginPage() {
		return "member/login"; 
	}
	
	
	/** 로그인
	 * @param inputMember
	 * @param model
	 * @param ra
	 * @param resp
	 * @param saveId
	 * @param referer
	 * @param loginType
	 * @return loginMember
	 */
	@PostMapping("/login")
	public String login(Member inputMember,
			Model model,
			RedirectAttributes ra,
			HttpServletResponse resp,
			@RequestParam(value="saveId", required=false) String saveId,
			@RequestHeader(value="referer") String referer,
			@RequestParam(value="loginType", required=false, defaultValue = "1") String loginType) {
		
		
		Member loginMember = new Member();
		
//		if(loginType.equals("3")) {
//			loginMember = service.kakaoLogin(inputMember);
//		}
		
		
	loginMember = service.login(inputMember);
	String path = null;
	
	if(loginMember != null) {
		if(loginMember.getMemberBlockYN().equals("Y")){
			path = referer;
			String message = "차단된 회원은 이용할 수 없습니다" 
					+ loginMember.getBlockStart() + "부터" 
					+ loginMember.getBlockEnd() + "까지 이용할 수 없습니다."
					+ "자세한 사항은 고객센터를 참고하세요";
			ra.addFlashAttribute("message", message);

		} else {
			
			path = "/";
			model.addAttribute("loginMember", loginMember);
			Cookie cookie = new Cookie("saveId", loginMember.getMemberEmail());
			
			if(saveId != null) {
				cookie.setMaxAge(60*60*24*365);
			} else {
				cookie.setMaxAge(0);
			}
			cookie.setPath("/");
			resp.addCookie(cookie);
		}

	} else {
		
		path = referer;
		ra.addFlashAttribute("message", "아이디 또는 비밀번호가 일치하지 않습니다");
	}
	
	
	return "redirect:" + path;
	}

}
