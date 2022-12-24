package com.team.cubespace.diary.model.service;

import java.util.List;

import com.team.cubespace.diary.model.vo.Diary;

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

}
