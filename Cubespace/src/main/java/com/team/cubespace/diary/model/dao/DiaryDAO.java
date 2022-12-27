package com.team.cubespace.diary.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.diary.model.vo.Diary;
import com.team.cubespace.diary.model.vo.Emoji;
import com.team.cubespace.diary.model.vo.Plan;

/**
 * @author sue
 *
 */
@Repository
public class DiaryDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/**
	 * @param map
	 * @return
	 */
	public int checkFriend(Map<String, Object> map) {
		
		return sqlSession.selectOne("diaryMapper.checkFriend",map);
	}

	/**
	 * @param map
	 * @return
	 */
	public List<Diary> selectDiaryList(Map<String, Object> map) {
		
		return sqlSession.selectList("diaryMapper.selectDiaryList",map);
	}

	/**
	 * @param diaryNo
	 * @return
	 */
	public List<Emoji> selectEmojiList(int diaryNo) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("diaryMapper.selectEmojiList",diaryNo);
	}

	/**
	 * @param map
	 * @return
	 */
	public List<Emoji> selectEmojiPeopleList(Map<String, Object> map) {
		
		return sqlSession.selectList("diaryMapper.selectEmojiPeopleList",map);
	}

	/**
	 * @param memberNo
	 * @return
	 */
	public List<Plan> selectSchedule(int memberNo) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("diaryMapper.selectscheduleList",memberNo);
	}

}
