package com.team.cubespace.diary.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.common.Util;
import com.team.cubespace.diary.model.dao.DiaryDAO;
import com.team.cubespace.diary.model.vo.Diary;
import com.team.cubespace.diary.model.vo.Emoji;
import com.team.cubespace.diary.model.vo.Plan;


/**
 * @author sue
 *
 */
@Service
public class DiaryServiceImpl implements DiaryService {
	
	@Autowired
	private DiaryDAO dao;

	//
	@Override
	public int checkFriend(int homepageMemberNo, int loginMemberNo) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("homepageMemberNo", homepageMemberNo);
		map.put("loginMemberNo", loginMemberNo);
		return dao.checkFriend(map);
	}
	
	//
	@Override
	public List<Integer> selectDateList(Map<String, Object> map) {
		
		return dao.selectDateList(map);
	}

	//
	@Override
	public List<Diary> selectDiaryList(int homepageMemberNo, String diaryDate, int folderNumber, int openFlag) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("homepageMemberNo", homepageMemberNo);
		map.put("diaryDate", diaryDate);
		map.put("folderNumber", folderNumber);
		map.put("openFlag", openFlag);
		return dao.selectDiaryList(map);
	}

	//
	@Override
	public List<Emoji> selectEmojiList(int diaryNo) {
		// TODO Auto-generated method stub
		return dao.selectEmojiList(diaryNo);
	}

	//
	@Override
	public List<Emoji> selectEmojiPeopleList(int diaryNo, int emojiNo) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("diaryNo", diaryNo);
		map.put("emojiNo", emojiNo);
		
		return dao.selectEmojiPeopleList(map);
	}
	
	/**
	 *
	 */
	@Override
	public Emoji selectLike(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.selectLike(map);
	}
	
	@Override
	public int insertLike(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.insertLike(map);
	}

	@Override
	public int deleteLike(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.deleteLike(map);
	}

	@Override
	public int updateLike(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.updateLike(map);
	}

	//???????????? ??????
	@Override
	public int diaryWrite(Diary diary) {
		
		int diaryNo = dao.diaryWrite(diary);
		
		return diaryNo;
	}
	
	//???????????? ?????? ????????? ??????
	@Override
	public Diary selectDiaryDetail(int diaryNo) {
		
		return dao.selectDiaryDetail(diaryNo);
	}
	
	//???????????? ??????
	@Override
	public int diaryUpdate(Diary diary) {
		
		int result = dao.diaryUpdate(diary);
		
		return result;
	}
	
	//???????????? ??????
	@Override
	public int diaryDelete(int diaryNo) {
		
		return dao.diaryDelete(diaryNo);
	}

	/*[ ?????? ?????? ]*/
	
	/** ????????????_??????
	 *
	 */
	@Override
	public List<Plan> selectSchedule(int memberNo) {
		// TODO Auto-generated method stub
		return dao.selectSchedule(memberNo);
	}

	/** ????????????_?????? ??????
	 *
	 */
	@Override
	public int addSchedule(Plan plan) {
				
//				plan.setPlanTitle(Util.XSSHandling(plan.getPlanTitle()));
//				//????????? null??? ?????? ??????...
//				if(plan.getPlanDescription() != null) {
//					plan.setPlanDescription(Util.XSSHandling(plan.getPlanDescription()));
//					plan.setPlanDescription(Util.newLineHandling(plan.getPlanDescription()));
//				}
		
		return dao.addSchedule(plan);
	}

	/** ????????????_?????? ??????
	 *
	 */
	@Override
	public int updateSchedule(Plan plan) {
		
//		plan.setPlanTitle(Util.XSSHandling(plan.getPlanTitle()));
//		//????????? null??? ?????? ??????...
//		if(plan.getPlanDescription() != null) {
//			plan.setPlanDescription(Util.XSSHandling(plan.getPlanDescription()));
//			plan.setPlanDescription(Util.newLineHandling(plan.getPlanDescription()));
//		}

		
		return dao.updateSchedule(plan);
	}

	// ????????????_?????? ??????
	@Override
	public int deleteSchedule(int planId) {
		
		return dao.deleteSchedule(planId);
	}

	// ????????????_?????? ??????_?????? ??? ?????? ??????
	@Override
	public int updateScheduleDrop(Plan plan) {
		// TODO Auto-generated method stub
		return dao.updateScheduleDrop(plan);
	}



	

	

	




}
