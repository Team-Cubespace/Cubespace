package com.team.cubespace.main.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;
import com.team.cubespace.main.model.service.NotificationsService;
import com.team.cubespace.main.model.vo.Notifications;
import com.team.cubespace.member.model.vo.Member;

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
	
	/** 신청받은 깐부 요청 수락
	 * @param paramMap
	 * @return
	 */
	@GetMapping("/memberAcceptBtn")
	@ResponseBody
	public int memberAcceptBtn(@RequestParam Map<String, Object> paramMap,
						@SessionAttribute("loginMember") Member loginMember) {
		int result = service.memberAcceptBtn(paramMap);			
		return result;
	}
	
	/** 신청받은 깐부 요청 거절
	 * @param paramMap
	 * @return
	 */
	@GetMapping("/memberCancelBtn")
	@ResponseBody
	public int memberCancelBtn(@RequestParam Map<String, Object> paramMap) {
		int result = service.memberCancelBtn(paramMap);
		return result;
	}
	
	
	/** 활동알림 목록 조회
	 * @return
	 */
	@GetMapping("/activityNotification")
	@ResponseBody
	public String activityNotification(int loginMemberNo) {
		
		List<Notifications> NotificationsList =service.activityNotification(loginMemberNo);
		
		return new Gson().toJson(NotificationsList); 
	}
	
	/** 알람 개별삭제
	 * @param alarmNo
	 * @return
	 */
	@GetMapping("/messageDelete")
	@ResponseBody
	public int messageDelete(int alarmNo) {
		
		int result = service.messageDelete(alarmNo);
		
		return result;
	}
	
	/** 알람 전체 삭제 
	 * @param alarmNoList
	 * @return
	 */
	@GetMapping("/messageDeleteAll")
	@ResponseBody
	public int messageDeleteAll(@RequestParam(value = "alarmNoList[]") List<String> alarmNoList) {
		
		String aList = String.join(",",alarmNoList);
		
		int result =service.messageDeleteAll(aList);
		
		return result;
		
	}
	
	/** 확인된 알림 값 변경
	 * @param alarmNoList
	 * @return
	 */
	@GetMapping("/alarmRead")
	@ResponseBody
	public int alarmRead(@RequestParam(value = "alarmNoList[]") List<String> alarmNoList) {
		
		String aList = String.join(",",alarmNoList);
		
		int result =service.alarmRead(aList);
		
		return result;
	}
	
	
	/** 알림 카운트 확인
	 * @param loginMemberNo
	 * @return
	 */
	@GetMapping("/notificationsCount")
	@ResponseBody
	public int  notificationsCount(int loginMemberNo) {
		
		int result = service.notificationsCount(loginMemberNo);
		
		return result;
	}
	
	
	
	
	
	
}
