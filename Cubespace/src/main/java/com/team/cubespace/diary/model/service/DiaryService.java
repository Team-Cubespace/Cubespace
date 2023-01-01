package com.team.cubespace.diary.model.service;

import java.util.List;

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

	/**
	 * @param memberNo
	 * @return
	 */
	List<Plan> selectSchedule(int memberNo);




}
