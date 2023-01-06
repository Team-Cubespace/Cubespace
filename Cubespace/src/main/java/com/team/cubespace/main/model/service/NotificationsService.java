package com.team.cubespace.main.model.service;

import java.util.List;
import java.util.Map;

import com.team.cubespace.main.model.vo.Notifications;

public interface NotificationsService {

	/** 내가 받은 깐부 신청 알림 목록조회
	 * @param loginMemberNo
	 * @return
	 */
	List<Notifications> memberNotifications(int loginMemberNo);

	/** 요청받은 깐부신청 수락
	 * @param paramMap
	 * @return
	 */
	int memberAcceptBtn(Map<String, Object> paramMap);

	/** 신청받은 깐부 요청 거절
	 * @param paramMap
	 * @return
	 */
	int memberCancelBtn(Map<String, Object> paramMap);

	/** 활동알림 목록 조회
	 * @param loginMemberNo
	 * @return
	 */
	List<Notifications> activityNotification(int loginMemberNo);

	/** 알람 개별삭제
	 * @param alarmNo
	 * @return
	 */
	int messageDelete(int alarmNo);

	/** 알림 전체 삭제
	 * @param alarmNoList
	 * @return
	 */
	int messageDeleteAll(String alarmNoList);

	/** 확인된 알림 값 변경
	 * @param aList
	 * @return
	 */
	int alarmRead(String aList);

	/** 알림 카운트 확인
	 * @param loginMemberNo
	 * @return
	 */
	int notificationsCount(int loginMemberNo);



}
