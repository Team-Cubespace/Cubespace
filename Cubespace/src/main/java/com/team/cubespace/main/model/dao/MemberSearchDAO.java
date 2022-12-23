package com.team.cubespace.main.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.main.model.vo.MemberSearch;

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
}
