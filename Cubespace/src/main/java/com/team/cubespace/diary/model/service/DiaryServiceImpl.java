package com.team.cubespace.diary.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.diary.model.dao.DiaryDAO;
import com.team.cubespace.diary.model.vo.Diary;


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

}
