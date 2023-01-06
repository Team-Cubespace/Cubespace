package com.team.cubespace.member.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;
import com.team.cubespace.member.model.service.MemberService;
import com.team.cubespace.member.model.vo.Member;

/**
 * @author sue
 *
 */
@Controller
public class MemberController {
	
	@Autowired
	private MemberService service;
	
	/** 회원 이름 조회하기
	 * @param loginMember
	 * @param reportedMemberNo
	 * @return
	 */
	@PostMapping("/selectreportedMember")
	@ResponseBody
	public String selectMember(
			int memberNo
			) {
		
		String result = service.selectMember(memberNo);
		
		return result; 
	}
	
	/** 회원 신고하기
	 * @param loginMember
	 * @param reportMember
	 * @return
	 */
	@PostMapping("/reportingMember")
	@ResponseBody
	public int reportMember(
			@SessionAttribute("loginMember") Member loginMember,
			Member reportMember
			) {
		reportMember.setComplainerNo(loginMember.getMemberNo());
		
		int result = service.reportMember(reportMember);
		
		return result;
	}

}
