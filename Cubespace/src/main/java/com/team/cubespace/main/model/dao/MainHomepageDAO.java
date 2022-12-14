package com.team.cubespace.main.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.main.model.vo.MainHomepage;

@Repository
public class MainHomepageDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 투데이 스타 및 랭킹 조회
	 * @param todayChoice
	 * @return
	 */
	public List<MainHomepage> mainTodaySelect(int todayChoice) {
		return sqlSession.selectList("mainHomepage.mainTodaySelect",todayChoice);

	}

	/** 숏츠영상 인기 및 신규 조회
	 * @param shortsChoice
	 * @return
	 */
	public List<MainHomepage> mainShortsSelect(int shortsChoice) {
		return sqlSession.selectList("mainHomepage.mainShortsSelect",shortsChoice);
	}

	/** 로그인 회원의 깐부수, TODAY 조회
	 * @param memberNo
	 * @return resultMap
	 */
	public Map<String, Integer> selectInfo(int memberNo) {
		return sqlSession.selectOne("mainHomepage.selectInfo", memberNo);
	}

}
