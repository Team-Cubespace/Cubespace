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

	
	/**다이어리 작성
	 * @param diary
	 * @return
	 */
	public int diaryWrite(Diary diary) {
		
		int result = sqlSession.insert("diaryMapper.diaryWrite",diary);
		
		//board의 boardNo 필드
		//	-> <selectKey>로 인해서 생성된 시퀀스 값이 세팅되어 있음.
		
		//메인 쿼리(INSERT) 성공 시
		if(result > 0) result = diary.getDiaryNo();
		
		
		return result; // 0 또는 삽입된 게시글 번호
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
