package com.team.cubespace.main.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.team.cubespace.main.model.service.MemberSearchService;
import com.team.cubespace.main.model.vo.MemberSearch;

@Controller
public class MemberSearchController {
	
	@Autowired
	private MemberSearchService service;

	
	
	/** 깐부찾기 자동완성 조회
	 * @param loginMemberNo
	 * @param leftChoice
	 * @return
	 */
	@GetMapping("/memberAllSearch")
	@ResponseBody
	public String memberSearchAll(int loginMemberNo, String leftChoiceInput) {
		
		Map<String, Object> map =new HashMap<String, Object>();
		map.put("loginMemberNo", loginMemberNo);
		map.put("leftChoiceInput", leftChoiceInput);
		
		List<MemberSearch> memberSearchList =  service.memberSearchAll(map);
		
		return new Gson().toJson(memberSearchList); 
	}
	
	
	/** 깐부 신청하기
	 * @param loginMemberNo
	 * @param memberNo
	 * @return
	 */
	@GetMapping("/memberAddFriend")
	@ResponseBody
	public int memberAddFriend(@RequestParam Map<String, Object> paramMap) {
		int result = service.memberAddFriend(paramMap);
		return result;
	}
	
	
	/** 내가 신청한 회원 목록 조회
	 * @param loginMemberNo
	 * @param leftChoiceInput
	 * @return
	 */
	@GetMapping("/memberAddFriendList")
	@ResponseBody
	public String memberAddFriendList(@RequestParam Map<String, Object> paramMap) {
		
		List<MemberSearch> memberAddFriendList =  service.memberAddFriendList(paramMap);
		
		return new Gson().toJson(memberAddFriendList); 
	}
	
	
	
	
	
	
}
