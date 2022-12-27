package com.team.cubespace.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.team.cubespace.admin.model.service.AdminService;

@Controller
@RequestMapping("/admin")
@SessionAttributes({"loginMember", "message"})
public class AdminController {

//	@Autowired
	private AdminService service;
	
	
	// 관리자/일반회원 구분 필터 추가
	// 관리자이면 관리자페이지 접근 가능하도록(별도의 로그인 없이)
	
	
	
	
	/** 회원관리 페이지 이동
	 * @return
	 */
	@GetMapping("/member")
	public String adminMember() {
		return "admin/admin-member";
	}
	
	/** 회원 신고/정지 페이지 이동
	 * @return
	 */
	@GetMapping("/goods")
	public String adminGoods() {
		return "admin/admin-goods";
	}
}
