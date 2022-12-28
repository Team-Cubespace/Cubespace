package com.team.cubespace.main.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
