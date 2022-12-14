package com.team.cubespace.main.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.main.model.vo.MemberSearch;
import com.team.cubespace.main.model.vo.Notifications;

/**
 * @author gyehd
 *
 */
@Repository
public class MemberSearchDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 깐부찾기 자동완성 조회
	 * @param map
	 * @return
	 */
	public List<MemberSearch> memberSearchAll(Map<String, Object> map) {
		return sqlSession.selectList("memberSearch.memberSearchAll",map);
	}

	/** 깐부 신청하기
	 * @param paramMap
	 * @return
	 */
	public int memberAddFriend(Map<String, Object> paramMap) {
		return sqlSession.insert("memberSearch.memberAddFriend",paramMap);
	}

	/** 내가 신청한 회원 목록 조회
	 * @param paramMap
	 * @return
	 */
	public List<MemberSearch> memberAddFriendList(Map<String, Object> paramMap) {
		return sqlSession.selectList("memberSearch.memberAddFriendList",paramMap);
	}

	/** 깐부 신청취소 하기
	 * @param paramMap
	 * @return
	 */
	public int memberAddCancel(Map<String, Object> paramMap) {
		return sqlSession.delete("memberSearch.memberAddCancel",paramMap);
	}

	/** 내가 받은 깐부 신청 알림 목록조회
	 * @param loginMemberNo
	 * @return
	 */
	public List<Notifications> memberNotifications(int loginMemberNo) {
		return sqlSession.selectList("memberSearch.memberNotifications", loginMemberNo);
	}

	/** 요청받은 깐부신청 수락
	 * @param paramMap
	 * @return
	 */
	public int memberAcceptBtn(Map<String, Object> paramMap) {
		return sqlSession.update("memberSearch.memberAcceptBtn",paramMap);

	}

	/** 신청받은 깐부 요청 거절
	 * @param paramMap
	 * @return
	 */
	public int memberCancelBtn(Map<String, Object> paramMap) {
		return sqlSession.delete("memberSearch.memberCancelBtn",paramMap);
	}

	/** 깐부 서로 신청 여부 확인
	 * @param paramMap
	 * @return
	 */
	public int memberFriendCheck(Map<String, Object> paramMap) {
		return sqlSession.selectOne("memberSearch.memberFriendCheck",paramMap);
	}
}
