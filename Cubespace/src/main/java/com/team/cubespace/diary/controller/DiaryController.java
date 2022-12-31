package com.team.cubespace.diary.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.team.cubespace.diary.model.service.DiaryService;
import com.team.cubespace.diary.model.vo.Diary;
import com.team.cubespace.diary.model.vo.Emoji;
import com.team.cubespace.diary.model.vo.Plan;
import com.team.cubespace.member.model.vo.Member;

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
		
		//다이어리part
//		return "/minihome/minihome-diary/minihome-rayout-copy";
		//월간달력part
		return "/minihome/minihome-diary/monthcalendar";
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
	/** 일기의 공감 목록 조회하기
	 * @param diaryNo
	 * @return
	 */
	@GetMapping("/diary/selectEmojiList")
	@ResponseBody
	public String selectEmojiList(int diaryNo) {
		
		List<Emoji> emojiList = service.selectEmojiList(diaryNo);
		
		return new Gson().toJson(emojiList);
	}
	/** 각각의 공감을 한 회원 목록 조회하기
	 * @param diaryNo
	 * @return
	 */
	@GetMapping("/diary/selectEmojiPeopleList")
	@ResponseBody
	public String selectEmojiPeopleList(int diaryNo, int emojiNo) {
		System.out.println("이게 컨트롤러까지 오나요?");
		List<Emoji> emojiPeopleList = service.selectEmojiPeopleList(diaryNo,emojiNo);
		
		return new Gson().toJson(emojiPeopleList);
	}
	 
//    /**일정 목록 조회하기
//     * @return
//     */
//    @GetMapping("/calendar")
//    @ResponseBody
//    public List<Map<String, Object>> monthPlan(@SessionAttribute("loginMember") Member loginMember) {
//    	
//        List<Plan> scheduleList = service.monthPlan(loginMember.getMemberNo());
// 
//        System.out.println(scheduleList);
//        
//        JsonObject jsonObj = new JsonObject();
//        JsonArray jsonArr = new JsonArray();
// 
//        HashMap<String, Object> hash = new HashMap<>();
// 
//        scheduleList.get(1).getClass()
//        for (int i = 0; i < scheduleList.size(); i++) {
//            hash.put("title", scheduleList.get(i).getPlanTitle);
//            hash.put("start", scheduleList.get(i).getStartDate());
////	            hash.put("time", listAll.get(i).getScheduleTime());
// 
//            jsonObj = new JsonObject(hash);
//            jsonArr.add(jsonObj);
//        }
//        log.info("jsonArrCheck: {}", jsonArr);
//        return jsonArr;
//    }
//	
	
//	@PostMapping("/calenderInput")
//	@ResponseBody
	
	/**
	 * @param loginMember
	 * @return
	 */
	@GetMapping("/diary/calendar")
	@ResponseBody
	public String selectSchedule(@SessionAttribute("loginMember") Member loginMember) {
		System.out.println("로그인한 멤버 넘버가 잘 넘어왔니? " +loginMember.getMemberNo());
		List<Plan> scheduleList = service.selectSchedule(loginMember.getMemberNo());
		System.out.println("스케쥴리스트 확인!");
		System.out.println(scheduleList);
		
		return new Gson().toJson(scheduleList);
	}
	
//	@GetMapping("/diary/addCalendar")
//	@ResponseBody
//	public int addCalendar() {
//		
//	}
	
	
	
	

}
