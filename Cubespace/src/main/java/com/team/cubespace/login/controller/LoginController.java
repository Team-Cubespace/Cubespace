package com.team.cubespace.login.controller;

import java.util.Map;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.team.cubespace.email.model.service.EmailService;
import com.team.cubespace.login.model.service.LoginService;
import com.team.cubespace.member.model.vo.Member;

import lombok.Getter;

@Controller
@SessionAttributes({"loginMember", "message"})
public class LoginController {
	
	@Autowired
	private LoginService service;
	
	@Autowired
    private EmailService eService;
	
	/** 로그인
	 * @return
	 */
	@GetMapping("/member/login") 
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
	@PostMapping("/member/login")
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
	@GetMapping("/member/logout")
	public String logout(SessionStatus status) {
		status.setComplete();
		return "redirect:/";
	}
	
	
	/** 회원가입 동의 페이지 이동
	 * @return
	 */
	@GetMapping("/member/signUp/agreement")
	public String signUpAgreement() {
		return "member/login/signUpAgree";
	}
	
	/** 회원가입 정보입력 페이지 이동
	 * @return
	 */
	@GetMapping("/member/signUp/info")
	public String signUpInfo() {
		return "member/login/signUpInfo";
	}
	
	
	/** 회원가입 입력 정보 제출
	 * @return
	 */
	@PostMapping("/member/signUp/info")
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
	
	
	
	/** 회원 ID/PW 찾기 페이지로 이동
	 * @return
	 */
	@GetMapping("/member/findId")
	public String infoFind() {
		return "member/login/findId";
	}
	
	
	/** 회원 ID 찾기
	 * @return
	 */
	@PostMapping("/member/findId")
	public String infoFindId(@RequestParam Map<String, Object> paramMap,
							@RequestHeader("referer") String referer,
							RedirectAttributes ra) {
		// 회원 조회
		String result = service.infoFindSelect(paramMap);
		
		String path = null;
		String message = null;
		
		// 조회된 회원 메일로 보내기
		 eService.findEmailId(result,paramMap);
		
		
		if (result != null) { // 등록된 회원 있음 
			path="/member/login";
			message="등록된 회원이 있어 이메일을 발송했습니다.";
			
			
		} else { // 등록된 회원 없음
			path=referer;
			message="등록된 회원이 없습니다. 이름과 전화번호를 확인해주세요.";
			
			ra.addFlashAttribute("tempMember", paramMap);
		}
		
		ra.addFlashAttribute("message",message);
		return "redirect:"+ path;
	}
	
	
	
	
	/** 회원 PW 찾기
	 * @return
	 */
	@PostMapping("/member/findPw")
	public String infoFindPw(@RequestParam Map<String, Object> paramMap,
							@RequestHeader("referer") String referer,
							RedirectAttributes ra) {
		// 회원 조회
		String result = service.infoFindSelect(paramMap);
		
		String path = null;
		String message = null;
		
		if (result != null) { // 등록된 회원 있음 
			// 조회된 회원 메일로 보내기
			int result1 = eService.findEmailPw(result,paramMap);
			
			if (result1> 0) {
				path="/member/login";
				message="등록된 회원이 있어 이메일로 임시 비밀번호를 발송했습니다.";
			}
			
		} else { // 등록된 회원 없음
			path=referer;
			message="등록된 회원이 없습니다. 이름과 전화번호를 확인해주세요.";
			
			ra.addFlashAttribute("tempMember", paramMap);
		}
		
		ra.addFlashAttribute("message",message);
		return "redirect:"+ path;
	}
	
	
//  이메일 중복 검사
	
	   @GetMapping("/emailDupCheck")
	   @ResponseBody 
	   public int emailDupCheck(String memberEmail) {
	      
		      int result = service.emailDupCheck(memberEmail);
		      
		      System.out.println(result);
		      return result;
		   }
	   
	   // 닉네임 중복검사 
	   @GetMapping("/nicknameDupCheck")
	   @ResponseBody
	   public int nicknameDupCheck(String memberNickname) {
		   
		   int result = service.nicknameDupCheck(memberNickname);
		   
		   return result;
	   }
	   
	   // 전화번호 중복검사
	   @GetMapping("/telDupCheck")
	   @ResponseBody
	   public int telDupCheck(String memberTel) {
		   
		   int result = service.telDupCheck(memberTel);
		   
		   return result;
	   }

}
