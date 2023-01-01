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

	//다이어리 작성
	@Override
	public int diaryWrite(Diary diary) {
		
		//1. 게시글만 먼저 삽입을 해볼게!
				// 1) ~~처리  (xss크로스 사이트 스크립트 공격)처리하고 그 후에 개행문자 처리하기!!!!
				//왜냐면 개행문자 먼저 처리해버리면, 그 후에xss처리하면서 이제 <br>이 안 먹을 수 있음.
//		diary.setDiaryTitle(Util.XSSHandling(diary.getDiaryTitle()));
//				//board.getBoardTitle()를 얻어와서 handling처리하고 그걸 다시 title에 집어 넣는다....
//		diary.setDiaryContent(Util.XSSHandling(diary.getDiaryContent()));
//				
//		diary.setDiaryContent(Util.newLineHandling(diary.getDiaryContent()));
		
		int diaryNo = dao.diaryWrite(diary);
		
		return diaryNo;
	}
	
	//다이어리 수정 페이지 이동
	@Override
	public Diary selectDiaryDetail(int diaryNo) {
		
		return dao.selectDiaryDetail(diaryNo);
	}
	
	//다이어리 수정
	@Override
	public int diaryUpdate(Diary diary) {
		
		int result = dao.diaryUpdate(diary);
		
		return result;
	}

	/*[ 월간 달력 ]*/
	/**
	 *
	 */
	@Override
	public List<Plan> selectSchedule(int memberNo) {
		// TODO Auto-generated method stub
		return dao.selectSchedule(memberNo);
	}




}
