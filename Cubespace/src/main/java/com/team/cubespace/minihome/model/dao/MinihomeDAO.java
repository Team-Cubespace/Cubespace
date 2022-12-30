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
	
	/** 미니홈 조회
	 * @param memberNo
	 * @return minihome
	 */
	public Minihome selectMinihome(int memberNo) {
		return sqlSession.selectOne("minihomeMapper.selectMinihome", memberNo);
	}

	/** 미니홈 이름 수정
	 * @param paramMap
	 * @return result
	 */
	public int updateMinihomeName(Map<String, Object> paramMap) {
		return sqlSession.update("minihomeMapper.updateMinihomeName", paramMap);
	}

	/** 미니홈 today, total 증가
	 * 
	 * @param memberNo
	 * @return result
	 */
	public int updateTodayTotal(int memberNo) {
		return sqlSession.update("minihomeMapper.updateTodayTotal", memberNo);
	}

	/** 미니홈 Today 초기화
	 * @return result
	 */
	public int initToday() {
		return sqlSession.update("minihomeMapper.initToday");
	}

	/** 특정 음악 조회 (이름, 경로)
	 * @param musicNo
	 * @return result
	 */
	public Map<String, String> selectMusic(int musicNo) {
		return sqlSession.selectOne("minihomeMapper.selectMusic", musicNo);
	}	
}
