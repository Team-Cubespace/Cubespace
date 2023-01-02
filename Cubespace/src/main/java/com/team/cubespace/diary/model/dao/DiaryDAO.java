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
	 * @param map
	 * @return
	 */
	public Emoji selectLike(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("diaryMapper.selectLike",map);
	}
	

	public int insertLike(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return sqlSession.insert("diaryMapper.insertLike", map);
	}

	public int deleteLike(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return sqlSession.delete("diaryMapper.deleteLike", map);
	}

	public int updateLike(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return sqlSession.update("diaryMapper.updateLike", map);
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
	
	/**다이어리 수정 페이지 이동
	 * @param diaryNo
	 * @return
	 */
	public Diary selectDiaryDetail(int diaryNo) {
		
		return sqlSession.selectOne("diaryMapper.selectDiaryDetail",diaryNo);
	}
	
	/**다이어리 수정
	 * @param diary
	 * @return
	 */
	public int diaryUpdate(Diary diary) {
		int result = sqlSession.update("diaryMapper.diaryUpdate",diary);
		
		//update 성공 시..
		if(result > 0) {
			result = 1;
			System.out.println("update성공했다면...result 1이란다...");
		}
		
		return result;
	}

	/** 월간달력_조회
	 * @param memberNo
	 * @return
	 */
	public List<Plan> selectSchedule(int memberNo) {
		
		return sqlSession.selectList("diaryMapper.selectscheduleList",memberNo);
	}

	/** 월간달력_일정 등록
	 * @param params
	 * @return
	 */
	public int addSchedule(Map<String, Object> params) {
		
		return sqlSession.insert("diaryMapper.addSchedule",params);
	}

	/** 월간달력_일정 수정
	 * @param params
	 * @return
	 */
	public int updateSchedule(Map<String, Object> params) {
		
		return sqlSession.insert("diaryMapper.updateSchedule",params);
	}


	



}
