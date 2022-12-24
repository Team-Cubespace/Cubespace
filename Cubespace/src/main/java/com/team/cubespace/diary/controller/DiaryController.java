package com.team.cubespace.diary.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.team.cubespace.diary.model.service.DiaryService;
import com.team.cubespace.diary.model.vo.Diary;

/** 다이어리 컨트롤러
 * @author sue
 *
 */
@Controller
public class DiaryController {
	
	@Autowired
	private DiaryService service;
	
	@GetMapping("/miniroom")
	public String move() {
		
		return "/minihome/minihome-diary/minihome-rayout-copy";
	}
	
	
	
	/** 클릭한 날짜의 다이어리 목록 조회하기
	 * @return diaryList
	 */
	@GetMapping("/diary/selectDiary")
	@ResponseBody
	public String selectDiaryList(
			String diaryDate, int folderNumber,
			int homepageMemberNo,int loginMemberNo
			)  {
		
		int openFlag = 2;
		
		// 내 미니홈피라면, 전체 공개한다. (1,2,3)
		if (homepageMemberNo == loginMemberNo) {
			
			
		} else {
			int checkFreind = service.checkFriend(homepageMemberNo,loginMemberNo);
			
			// 깐부관계라면,( 조회하는 값 : 1,2 )
			if( checkFreind == 1) {
				openFlag = 0;
			} else {
				openFlag = 1;
			}
		}
		
		
		List<Diary> diaryList = service.selectDiaryList(homepageMemberNo,diaryDate,folderNumber,openFlag);
		
		
		return new Gson().toJson(diaryList);
	}
	

}
