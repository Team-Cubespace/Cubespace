package com.team.cubespace.minihome.model.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.minihome.model.vo.Minihome;

@Repository
public class MinihomeDAO {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public Minihome selectMinihome(int memberNo) {
		return sqlSession.selectOne("minihomeMapper.selectMinihome", memberNo);
	}

	public int updateMinihomeName(Map<String, Object> paramMap) {
		return sqlSession.update("minihomeMapper.updateMinihomeName", paramMap);
	}
}
