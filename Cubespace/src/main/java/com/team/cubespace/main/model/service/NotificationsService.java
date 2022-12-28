package com.team.cubespace.main.model.service;

import java.util.List;

import com.team.cubespace.main.model.vo.Notifications;

public interface NotificationsService {

	/** 내가 받은 깐부 신청 알림 목록조회
	 * @param loginMemberNo
	 * @return
	 */
	List<Notifications> memberNotifications(int loginMemberNo);

}
