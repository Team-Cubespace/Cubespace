package com.team.cubespace.main.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.main.model.vo.Notifications;

@Repository
public class NotificationsDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 활동알림 목록 조회
	 * @param loginMemberNo
	 * @return
	 */
	public List<Notifications> activityNotification(int loginMemberNo) {
		return sqlSession.selectList("notifications.activityNotification",loginMemberNo);
	}

	/** 알람 개별삭제
	 * @param alarmNo
	 * @return
	 */
	public int messageDelete(int alarmNo) {
		return sqlSession.delete("notifications.messageDelete",alarmNo);
	}

	/** 알림 전체삭제
	 * @param alarmNoList
	 * @return
	 */
	public int messageDeleteAll(String alarmNoList) {
		return sqlSession.delete("notifications.messageDeleteAll",alarmNoList);
	}

	/** 확인된 알림 값 변경
	 * @param aList
	 * @return
	 */
	public int alarmRead(String aList) {
		return sqlSession.update("notifications.alarmRead",aList);
	}

	/** 알림 카운트 확인
	 * @param loginMemberNo
	 * @return
	 */
	public int notificationsCount(int loginMemberNo) {
		return sqlSession.selectOne("notifications.notificationsCount",loginMemberNo);
	}

}
