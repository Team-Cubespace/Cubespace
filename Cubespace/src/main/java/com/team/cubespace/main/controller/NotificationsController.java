package com.team.cubespace.main.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.team.cubespace.main.model.service.NotificationsService;
import com.team.cubespace.main.model.vo.Notifications;

@Controller
public class NotificationsController {

	@Autowired
	private NotificationsService service;
	
	
	
	/** 내가 받은 깐부 신청 알림 목록조회
	 * @param loginMemberNo
	 * @return
	 */
	@GetMapping("/memberNotifications")
	@ResponseBody
	public String memberNotifications(int loginMemberNo) {
		
		List<Notifications> memberNotificationsList = service.memberNotifications(loginMemberNo);
		
		return new Gson().toJson(memberNotificationsList); 
	}
	
	
	/** 요청받은 깐부신청 수락
	 * @param paramMap
	 * @return
	 */
	@GetMapping("/memberAcceptBtn")
	@ResponseBody
	public int memberAcceptBtn(@RequestParam Map<String, Object> paramMap) {
		int result = service.memberAcceptBtn(paramMap);
		return result;
	}
	
	
	
	
	
}
