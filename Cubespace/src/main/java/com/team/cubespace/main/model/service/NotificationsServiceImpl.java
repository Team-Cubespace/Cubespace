package com.team.cubespace.main.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.cubespace.main.model.dao.MemberSearchDAO;
import com.team.cubespace.main.model.dao.NotificationsDAO;
import com.team.cubespace.main.model.vo.Notifications;

@Service
public class NotificationsServiceImpl implements NotificationsService {

	@Autowired
	private NotificationsDAO dao;
	@Autowired
	private MemberSearchDAO daoMemberSear;

	
	// 내가 받은 깐부 신청 알림 목록조회
	@Override
	public List<Notifications> memberNotifications(int loginMemberNo) {
		return daoMemberSear.memberNotifications(loginMemberNo);
	}

	// 요청받은 깐부신청 수락
	@Override
	@Transactional
	public int memberAcceptBtn(Map<String, Object> paramMap) {
		return daoMemberSear.memberAcceptBtn(paramMap);
	}

	// 신청받은 깐부 요청 거절
	@Override
	@Transactional
	public int memberCancelBtn(Map<String, Object> paramMap) {
		return daoMemberSear.memberCancelBtn(paramMap);

	}

	// 활동알림 목록 조회
	@Override
	public List<Notifications> activityNotification(int loginMemberNo) {
		return dao.activityNotification(loginMemberNo);
	}

	// 알람 개별삭제
	@Override
	public int messageDelete(int alarmNo) {
		return dao.messageDelete(alarmNo);
	}

	// 알림 전체삭제
	@Override
	public int messageDeleteAll(String alarmNoList) {
		return dao.messageDeleteAll(alarmNoList);
	}

	// 확인된 알림 값 변경
	@Override
	public int alarmRead(String aList) {
		return dao.alarmRead(aList);
	}


}
