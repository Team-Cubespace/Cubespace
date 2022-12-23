package com.team.cubespace.login.controller;

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
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.team.cubespace.login.model.service.LoginService;
import com.team.cubespace.member.model.vo.Member;

@Controller
@SessionAttributes({"loginMember", "message"})
@RequestMapping("/member")
public class LoginController {
	
	@Autowired
	private LoginService service;
	
	/** 로그인
	 * @return
	 */
	@GetMapping("/login") 
	public String loginPage() {
		return "member/login/login"; 
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
//			@RequestParam(value="profile_image_url", required=false) String profile_image_url,
//			@RequestParam(value="nickname", required=false) String nickname,
//			@RequestParam(value="email", required=false) String email,
//			@RequestParam(value="birthday", required=false) String birthday,
			@RequestHeader(value="referer") String referer,
			@RequestParam(value="loginType", required=false, defaultValue = "1") String loginType) {
		
		
		Member loginMember = new Member();
//		
//
//		
//		if(loginType.equals("3")) {
//			
//			loginMember.setMemberEmail(kakaoLoginMember.email);
//			
//			loginMember = service.kakaoLogin(inputMember);
//		}
		
		
	loginMember = service.login(inputMember);
	String path = null;
	
	if(loginMember != null) {
		if(loginMember.getMemberBlockYN().equals("Y")){
			path = referer;
			String message = "차단된 회원은 이용할 수 없습니다\n" 
					+ loginMember.getBlockStart() + "부터" 
					+ loginMember.getBlockEnd() + "까지 이용할 수 없습니다.\n"
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
	
	/** 로그아웃
	 * @param status
	 * @return
	 */
	@GetMapping("/logout")
	public String logout(SessionStatus status) {
		status.setComplete();
		return "redirect:/";
	}
	
	
	/** 회원가입 동의 페이지 이동
	 * @return
	 */
	@GetMapping("/signUp/agreement")
	public String signUpAgreement() {
		return "member/login/signUpAgree";
	}
	
	/** 회원가입 정보입력 페이지 이동
	 * @return
	 */
	@GetMapping("/signUp/info")
	public String signUpInfo() {
		return "member/login/signUpInfo";
	}
	
	
	/** 회원가입 입력 정보 제출
	 * @return
	 */
	@PostMapping("/signUp/info")
	public String signUp(/* @ModelAttribute */ Member inputMember,
						RedirectAttributes ra,
						@RequestHeader("referer") String referer) {
		 

		
		int result = service.signUp(inputMember);
		
		String path = null;
		String message = null;
		
		if (result > 0) { //회원가입 성공
			path = "/";
			message = "회원가입 성공했습니다.";
			 
		} else { //회원가입 실패
			path = referer;
			message = "회원가입 도중 문제가 발생하여 실패하였습니다.";
			
			inputMember.setMemberPw(null); 
			ra.addFlashAttribute("tempMember", inputMember);
		}
		
		ra.addFlashAttribute("message",message);
		return "redirect:"+ path;
	} 


}
