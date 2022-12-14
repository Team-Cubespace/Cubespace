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
	public List<Integer> selectDateList(Map<String, Object> map) {
		
		return sqlSession.selectList("diaryMapper.selectDateList",map);
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

	
	/**???????????? ??????
	 * @param diary
	 * @return
	 */
	public int diaryWrite(Diary diary) {
		
		int result = sqlSession.insert("diaryMapper.diaryWrite",diary);
		
		//board??? boardNo ??????
		//	-> <selectKey>??? ????????? ????????? ????????? ?????? ???????????? ??????.
		
		//?????? ??????(INSERT) ?????? ???
		if(result > 0) result = diary.getDiaryNo();
		
		
		return result; // 0 ?????? ????????? ????????? ??????
	}
	
	/**???????????? ?????? ????????? ??????
	 * @param diaryNo
	 * @return
	 */
	public Diary selectDiaryDetail(int diaryNo) {
		
		return sqlSession.selectOne("diaryMapper.selectDiaryDetail",diaryNo);
	}
	
	/**???????????? ??????
	 * @param diary
	 * @return
	 */
	public int diaryUpdate(Diary diary) {
		int result = sqlSession.update("diaryMapper.diaryUpdate",diary);
		
		//update ?????? ???..
		if(result > 0) {
			result = 1;
			System.out.println("update???????????????...result 1?????????...");
		}
		
		return result;
	}
	
	/** ???????????? ??????
	 * @param diaryNo
	 * @return
	 */
	public int diaryDelete(int diaryNo) {
		
		return sqlSession.update("diaryMapper.diaryDelete",diaryNo);
	}

	/** ????????????_??????
	 * @param memberNo
	 * @return
	 */
	public List<Plan> selectSchedule(int memberNo) {
		
		return sqlSession.selectList("diaryMapper.selectscheduleList",memberNo);
	}

	/** ????????????_?????? ??????
	 * @param params
	 * @return
	 */
	public int addSchedule(Plan plan) {
		
		//planNo??? ???????????????....!
		
		int result = sqlSession.insert("diaryMapper.addSchedule",plan);
		if(result > 0) {
			result = plan.getPlanNo();
		}
		System.out.println("planNo" + result);
		
		return result;
	}

	/** ????????????_?????? ??????
	 * @param params
	 * @return
	 */
	public int updateSchedule(Plan plan) {
		
		return sqlSession.update("diaryMapper.updateSchedule",plan);
	}

	/** ????????????_?????? ??????
	 * @param planId
	 * @return
	 */
	public int deleteSchedule(int planId) {
		
		return sqlSession.delete("diaryMapper.deleteSchedule",planId);
	}

	/** ????????????_?????? ??????_?????? ??? ?????? ??????
	 * @param plan
	 * @return
	 */
	public int updateScheduleDrop(Plan plan) {
		// TODO Auto-generated method stub
		return sqlSession.update("diaryMapper.updateScheduleDrop",plan);
	}

	

	


	



}
