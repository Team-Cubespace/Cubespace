package com.team.cubespace.diary.model.service;

import java.util.List;
import java.util.Map;

import com.team.cubespace.diary.model.vo.Diary;
import com.team.cubespace.diary.model.vo.Emoji;
import com.team.cubespace.diary.model.vo.Plan;

/**
 * @author sue
 *
 */
public interface DiaryService {

	/**
	 * @param homepageMemberNo
	 * @param loginMemberNo
	 * @return
	 */
	int checkFriend(int homepageMemberNo, int loginMemberNo);

	/**
	 * @param homepageMemberNo
	 * @param diaryDate
	 * @param folderNumber
	 * @param openFlag
	 * @return
	 */
	List<Diary> selectDiaryList(int homepageMemberNo, String diaryDate, int folderNumber, int openFlag);

	/**
	 * @param diaryNo
	 * @return
	 */
	List<Emoji> selectEmojiList(int diaryNo);

	/**
	 * @param diaryNo
	 * @param emojiNo
	 * @return
	 */
	List<Emoji> selectEmojiPeopleList(int diaryNo, int emojiNo);
	
	/**
	 * @param map
	 * @return
	 */
	Emoji selectLike(Map<String, Object> map);
	
	int insertLike(Map<String, Object> map);

	int deleteLike(Map<String, Object> map);

	int updateLike(Map<String, Object> map);

	/**다이어리 작성
	 * @param diary
	 * @return
	 */
	int diaryWrite(Diary diary);
	
	/** 다이어리 수정 페이지 이동
	 * @param diaryNo
	 * @return
	 */
	Diary selectDiaryDetail(int diaryNo);
	
	/** 다이어리 수정
	 * @param diary
	 * @return
	 */
	int diaryUpdate(Diary diary);

	/** 월간달력_조회
	 * @param memberNo
	 * @return
	 */
	List<Plan> selectSchedule(int memberNo);

	/** 월간달력_일정 등록
	 * @param params
	 * @return
	 */
	int addSchedule(Map<String, Object> params);

	/** 월간달력_일정 수정
	 * @param params
	 * @return
	 */
	int updateSchedule(Map<String, Object> params);

	

	




}
