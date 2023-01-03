package com.team.cubespace.admin.controller;

import java.text.ParseException;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.team.cubespace.admin.model.service.AdminService;
import com.team.cubespace.admin.model.vo.Block;
import com.team.cubespace.complain.model.vo.Complain;
import com.team.cubespace.login.model.service.LoginService;
import com.team.cubespace.manage.model.vo.Background;
import com.team.cubespace.member.model.vo.Member;

@Controller
@RequestMapping("/admin")
@SessionAttributes({"loginMember", "message"})
public class AdminController {

	@Autowired
	private AdminService service;
	
	@Autowired
	private LoginService loginService;
	
	// application scope에 배경색/프레임정보를 가져오기 위한 객체 생성
	@Autowired
	ServletContext application;
	
	
	
	/** 회원관리 페이지 이동
	 * @return
	 */
	@GetMapping("/member")
	public String adminMember() {
		return "admin/admin-member";
	}
	
	/** 회원 차단, 신고관리 페이지 이동
	 * @return
	 */
	@GetMapping("/complain")
	public String adminComplain() {
		return "admin/admin-complain";
	}
	
	/** 회원 신고/정지 페이지 이동
	 * @return
	 */
	@GetMapping("/goods/font")
	public String adminGoods_font() {
		return "admin/admin-font";
	}
	/** 배경음악 등록 페이지 이동
	 * @return
	 */
	@GetMapping("/goods/music")
	public String adminGoods_music() {
		return "admin/admin-music";
	}
	/** 소품등록 이동
	 * @return
	 */
	@GetMapping("/goods/goods")
	public String adminGoods_goods() {
		return "admin/admin-goods";
	}
	
	
//	-------------------------------------------------------------------------------
	/** 회원 목록 조회
	 * @param paramMap
	 * @param model
	 * @return
	 */
	@GetMapping("/member/memberSearch")
	public String memberSearch(@RequestParam Map<String, Object> paramMap,
			@RequestParam(value="cp", required=false, defaultValue="1" ) int cp,
			Model model
			) {
		
		// 회원 목록 조회
		Map<String, Object> map = service.memberSearch(paramMap, cp);
		model.addAttribute("map", map);

		return "admin/admin-member";
	}
	
	/** 회원 정보 삭제
	 * @param memberNo
	 * @return
	 */
	@PostMapping("/member/deleteMember")
	@ResponseBody
	public int deleteMember(int memberNo) {
		
		return service.deleteMember(memberNo);
	}
	
	
	/** 회원 정보 삭제 복구
	 * @param memberNo
	 * @return
	 */
	@PostMapping("/member/deleteMemberBack")
	@ResponseBody
	public int deleteMemberBack(int memberNo) {
		
		return service.deleteMemberBack(memberNo);
	}
	

	
	
	/** 새로운 회원 등록하기
	 * @param inputMember
	 * @return
	 * @throws Exception 
	 */
	@PostMapping("/member/insertNewMember")
	@ResponseBody
	public int insertNewMember(Member inputMember) throws Exception {
		
		// 배경색, 프레임색 정보를 담고 있는 객체
		Background backgroundInfo = (Background) application.getAttribute("backgroundColorInfo");

		
		return loginService.signUp(inputMember, backgroundInfo);
	}
	
	
	
//	-------------------------------------------------------------------------------

	/** 신고 목록 조회
	 * @param paramMap
	 * @param model
	 * @return
	 */
	@GetMapping("/complain/complainSearch")
	public String blockSearch(@RequestParam Map<String, Object> paramMap,
			@RequestParam(value="cp", required=false, defaultValue="1" ) int cp,
			Model model
			) {
		
		// 회원 목록 조회
		Map<String, Object> map = service.complainSearch(paramMap, cp);
		model.addAttribute("map", map);

		return "admin/admin-complain";
	}
	
	// 처리 상태 변경
	@GetMapping("/complain/updateStatusToggle")
	@ResponseBody
	public int updateStatusToggle(Complain inputComplain) {
		// inputComplain : complainNo, status(0/1)
		return service.updateStatusToggle(inputComplain);
	}
	
	
	// 회원 차단하기
	@GetMapping("/complain/blockMember")
	@ResponseBody
	public int blockMember(Block inputBlock) throws ParseException {
		// block : memberNo, blockStart, blockEnd
		return service.blockMember(inputBlock);
	}
	
}
