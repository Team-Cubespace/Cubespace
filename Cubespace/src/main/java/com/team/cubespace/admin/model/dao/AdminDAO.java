package com.team.cubespace.admin.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.common.Pagination;
import com.team.cubespace.member.model.vo.Member;

@Repository
public class AdminDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 특정 조건 회원수 조회
	 * @param paramMap
	 * @return listCount
	 */
	public int getMemberListCount(Map<String, Object> paramMap) {
		
		return sqlSession.selectOne("loginMapper.getMemberListCount", paramMap);
	}

	/** 전체 회원수 조회
	 * @return allMemberCount
	 */
	public int getAllMemberCount() {
		
		return sqlSession.selectOne("loginMapper.getAllMemberCount");
	}

	/** 조건에 맞는 회원 목록
	 * @param pagination
	 * @param paramMap
	 * @return memberList
	 */
	public List<Member> memberSearch(Pagination pagination, Map<String, Object> paramMap) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		
		return sqlSession.selectList("loginMapper.memberSearch", paramMap, rowBounds);
	}

	/** 회원 정보 삭제
	 * @param memberNo
	 * @return
	 */
	public int deleteMember(int memberNo) {
		
		return sqlSession.update("loginMapper.secessionDelete", memberNo);
	}

	/** 회원 정보 삭제 복구
	 * @param memberNo
	 * @return
	 */
	public int deleteMemberBack(int memberNo) {
		
		return sqlSession.update("loginMapper.deleteMemberBack", memberNo);
	}

	
}
