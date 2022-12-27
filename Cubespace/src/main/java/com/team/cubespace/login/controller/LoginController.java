package com.team.cubespace.login.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.cubespace.email.model.service.EmailService;
import com.team.cubespace.login.model.service.LoginService;
import com.team.cubespace.member.model.vo.Member;

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
			@RequestHeader(value="referer") String referer) {
		

		Member loginMember = service.login(inputMember);
		String path = null;
		
		if(loginMember != null) {
			if(loginMember.getMemberBlockYN().equals("Y")){
				path = referer;
				String message = "차단된 회원은 이용할 수 없습니다\n" 
						+ loginMember.getBlockStart() + "부터\n" 
						+ loginMember.getBlockEnd() + "까지 이용할 수 없습니다.\n"
						+ "자세한 사항은 고객센터를 참고하세요";
				ra.addFlashAttribute("message", "차단된 회원은 이용할 수 없습니다");
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
	
	
		/** 카카오 로그인
		 * @param inputMember
		 * @param model
		 * @param ra
		 * @param resp
		 * @param saveId
		 * @param referer
		 * @param loginType
		 * @return loginMember
		 */
		@PostMapping("/member/kakaoLogin")
		@ResponseBody
		public String login(Model model,
				RedirectAttributes ra,
				@RequestHeader(value="referer") String referer,
				String kakaoLoginMember) {
			
			
			ObjectMapper objectMapper = new ObjectMapper();
			Member inputMember = new Member();
			
			// JSON String -> Map
			try {
				Map<String, Object> jsonMap = objectMapper.readValue(kakaoLoginMember, new TypeReference<Map<String, Object>>() {
				});
				Map<String, Object> properties = (Map<String, Object>) jsonMap.get("properties");
				Map<String, Object> kakao_account = (Map<String, Object>) jsonMap.get("kakao_account");
				
				inputMember.setMemberNickname(properties.get("nickname").toString());
				inputMember.setProfileImage(properties.get("profile_image").toString());
				if(properties.containsKey("birthday")) {
					inputMember.setBirthDay(properties.get("birthday").toString());
				}
				inputMember.setMemberEmail(kakao_account.get("email").toString());
				
			} catch (Exception e) {
				e.printStackTrace();
			} 
							
				
			Member loginMember = service.kakaoLogin(inputMember);
			String path = null;
			
			
			
			if(loginMember.getMemberBlockYN().equals("Y")){
				path = referer;
				String message = "차단된 회원은 이용할 수 없습니다\n" 
						+ loginMember.getBlockStart() + "부터" 
						+ loginMember.getBlockEnd() + "까지 이용할 수 없습니다.\n"
						+ "자세한 사항은 고객센터를 참고하세요";
				
				return message;
				
			} 
			
			if(loginMember.getMemberTel().equals("010-0000-0000")) { // 처음 카카오 회원가입시
				Member tempMember = loginMember;
				ra.addFlashAttribute(tempMember);
				
				return "1"; // 페이지 이동
				
			} else {
				model.addAttribute("loginMember", loginMember);
			}
			return "0";
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
			message = "회원가입 되었습니다!";
			 
		} else { //회원가입 실패
			path = referer;
			message = "회원가입 도중 문제가 발생하여 실패하였습니다.";
			
			inputMember.setMemberPw(null); 
			ra.addFlashAttribute("tempMember", inputMember);
		}
		
		ra.addFlashAttribute("message",message);
		return "redirect:"+ path;
	} 
	
	
	
	/** 회원 ID 찾기 페이지로 이동
	 * @return
	 */
	@GetMapping("/member/findId")
	public String infoFindId() {
		return "member/login/findId";
	}
	
	/** 회원 PW 찾기 페이지로 이동
	 * @return
	 */
	@GetMapping("/member/findPw")
	public String infoFindPw() {
		return "member/login/findPw";
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

	   
	   
	// 내 회원 정보 수정 페이지 이동
		@GetMapping("/member/updateInfo")
		public String updateInfo() {
			return "member/login/updateInfo";
		}

		// 내 회원 정보 수정
		@PostMapping("/member/updateInfo")
		public String updateInfo(Member inputMember, 
				@SessionAttribute("loginMember") Member loginMember,
				RedirectAttributes ra) {

			inputMember.setMemberNo(loginMember.getMemberNo());

			

			int result = service.updateInfo(inputMember);

			String message = null;
			String path = null;

			if (result > 0) {
				message = "회원 정보가 수정 되었습니다.";
				path = "/";

				loginMember.setMemberNickname(inputMember.getMemberNickname());
				loginMember.setMemberTel(inputMember.getMemberTel());
				loginMember.setMemberName(inputMember.getMemberName());
				// birthYear가 있다->생년월일 8자리가 다 있으므로 전부 업데이트
				if(inputMember.getBirthYear() != null) {
					loginMember.setBirthYear(inputMember.getBirthYear());
					loginMember.setBirthDay(inputMember.getBirthDay());
				}

			} else {
				message = "회원 정보 수정 실패";
				path = "updateInfo";
			}
			ra.addFlashAttribute("message", message);
			return "redirect:" + path;
		}
		
		
		/** 비밀번호 변경 페이지 이동
		 * @param loginMember
		 * @return
		 */
		@GetMapping("/member/changePw")
		public String changePw() {
			return "member/login/changePw";
		}
		
		/** 비밀번호 변경
		 * @param paramMap
		 * @param loginMember
		 * @param ra
		 * @return
		 */
		@PostMapping("/member/changePw")
		public String changePw(Member inputMember,
				@SessionAttribute("loginMember") Member loginMember,
				RedirectAttributes ra) {
			
			inputMember.setMemberNo(loginMember.getMemberNo());
			int result = service.changePw(inputMember);
			
			
			String message = null;
			String path = null;
			
			if (result > 0) {
				message = "비밀번호가 변경되었습니다";
				path = "/";

			} else {
				message = "비밀번호 변경 실패";
				path = "changePw";
			}
			ra.addFlashAttribute("message", message);
			return "redirect:" + path;
		}
		
		/**
		 * 회원탈퇴 페이지 이동
		 * 
		 * @return
		 */
		@GetMapping("/member/secession")
		public String secessionPage() {
			return "member/login/secession";
		}

		/** 회원 탈퇴
		 * @param parMap
		 * @param referer
		 * @param loginMember
		 * @param status
		 * @param ra
		 * @return
		 */
		@PostMapping("/member/secession")
		public String secession(Member inputMember,
				@RequestHeader("referer") String referer,
				@SessionAttribute("loginMember") Member loginMember, 
				SessionStatus status, 
				HttpServletResponse resp,
				RedirectAttributes ra) {

			String path = null;
			String message = null;

			// 입력받은 값 로그인한 정보 비교 확인 및 탈퇴
			int result = service.secessionSelect(loginMember.getMemberNo(), inputMember);

			if (result > 0) { // 탈퇴 성공
				
				path = "/";
				message = "회원 탈퇴되었습니다.";
				
				
				// 쿠키 삭제
				Cookie cookie = new Cookie("saveId", "");
				cookie.setMaxAge(0);
				cookie.setPath("/");
				resp.addCookie(cookie);
				
				status.setComplete(); 


			} else { // 탈퇴 실패
				
				path = referer;
				message = "회원정보를 다시 확인해 주세요.";
			}

			ra.addFlashAttribute("message", message);
			return "redirect:" + path;
		}
		
		

		
}
