package com.team.cubespace.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.member.model.vo.Member;

/**
 * @author sue
 *
 */
@Repository

public class MemberDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public String selectMember(int memberNo) {
		
		return sqlSession.selectOne("memberMapper.selectMember",memberNo);
	}

	public int reportMember(Member reportMember) {
		
		return sqlSession.insert("memberMapper.reportMember",reportMember);
	}
	

}
