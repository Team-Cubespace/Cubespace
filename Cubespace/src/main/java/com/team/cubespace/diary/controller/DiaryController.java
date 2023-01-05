package com.team.cubespace.diary.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;
import com.team.cubespace.diary.model.service.DiaryService;
import com.team.cubespace.diary.model.vo.Diary;
import com.team.cubespace.diary.model.vo.Emoji;
import com.team.cubespace.diary.model.vo.Plan;
import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.minihome.model.vo.Minihome;

/** 다이어리 컨트롤러
 * @author sue
 *
 */
@Controller
public class DiaryController {
	
	@Autowired
	private DiaryService service;
	
	@GetMapping("/diary/{boardTypeNo}")
	public String move(
			@PathVariable ("boardTypeNo") int boardTypeNo,
			@SessionAttribute("folderList") List<Folder> folderList,
			@RequestParam(value="folderNo", required=false, defaultValue="-1") int folderNo,
			@SessionAttribute("minihome") Minihome minihome,
			@SessionAttribute("loginMember") Member loginMember,
			Model model
			) {
		//탭 누를 때 설정
		if(folderNo == -1) {	// 폴더 번호가 -1이면
			// 폴더리스트를 가져와
			// 폴더리스트의 0번째 인덱스의 폴더번호를
			// folderNo로 지정
			
			//무조건 탭 누를 때는 '나의다이어리'띄우고 싶다면, 설정하기
			if(folderList.get(0).getFolderName().equals("나의 월간달력")) {
				folderNo = folderList.get(1).getFolderNo();
			} else {
				folderNo = folderList.get(0).getFolderNo();
			}
		}
		// 폴더 이름 찾기
		String folderName = "";
		for(Folder folder : folderList) {
			if(folder.getFolderNo() == folderNo) {
				folderName = folder.getFolderName();
				break;
			}
		}
		model.addAttribute("folderNo", folderNo);
		model.addAttribute("folderName", folderName);
		//다이어리part
		return "minihome/minihome-diary/minihome-diary";
	}
	
	@GetMapping("/monthCalendar")
	public String calendarMove(
			@SessionAttribute("minihome") Minihome minihome,
			Model model
			) {
		model.addAttribute("hostMemberNo", minihome.getMemberNo());
		return "minihome/minihome-diary/monthcalendar";
	}
	
	/*[ 다이어리 메인 페이지 ]*/
	
	/**
	 * @param yearMonth
	 * @return
	 */
	@GetMapping("/selectDate")
	@ResponseBody
	public String selectDateList(
			@SessionAttribute("minihome") Minihome minihome,
			String yearMonth
			) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("yearMonth", yearMonth);
		map.put("memberNo", minihome.getMemberNo());
		List<Integer> dateList = service.selectDateList(map);
		return new Gson().toJson(dateList);
	}
	
	
	/** 클릭한 날짜의 다이어리 목록 조회하기
	 * @return diaryList
	 */
	@GetMapping("/selectDiary")
	@ResponseBody
	public String selectDiaryList(
			@SessionAttribute("minihome") Minihome minihome,
			@SessionAttribute("loginMember") Member loginMember,
			String diaryDate, int folderNo
			)  {
		int openFlag = 2;
		int loginMemberNo = loginMember.getMemberNo();
		int homepageMemberNo = minihome.getMemberNo();
		
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
		List<Diary> diaryList = service.selectDiaryList(homepageMemberNo,diaryDate,folderNo,openFlag);
		return new Gson().toJson(diaryList);
	}
	/** 일기의 공감 목록 조회하기
	 * @param diaryNo
	 * @return
	 */
	@GetMapping("/selectEmojiList")
	@ResponseBody
	public String selectEmojiList(int diaryNo) {
		
		List<Emoji> emojiList = service.selectEmojiList(diaryNo);
		
		return new Gson().toJson(emojiList);
	}
	/** 각각의 공감을 한 회원 목록 조회하기
	 * @param diaryNo
	 * @return
	 */
	@GetMapping("/selectEmojiPeopleList")
	@ResponseBody
	public String selectEmojiPeopleList(int diaryNo, int emojiNo) {
		List<Emoji> emojiPeopleList = service.selectEmojiPeopleList(diaryNo,emojiNo);
		
		return new Gson().toJson(emojiPeopleList);
	}
	
	@GetMapping("/like")
	@ResponseBody
	public int like(int diaryNo, int emojiNo,
			@SessionAttribute("loginMember") Member loginMember
			) {
		
		int result = 0;
		int memberNo = loginMember.getMemberNo();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("diaryNo", diaryNo);
		map.put("memberNo", memberNo);
		map.put("emojiNo", emojiNo);
		Emoji emoji = service.selectLike(map);
		if (emoji == null) {
			result = service.insertLike(map);
		} else {
			if (emoji.getEmojiNo() == emojiNo) {
				result = service.deleteLike(map);
			} else {
				result = service.updateLike(map);
			}
		}
		
		
		return result;
	}
	
	
	/*[ 작성 페이지 ]*/
	
	//게시글 작성 페이지 이동
   @GetMapping("/diaryWrite")
   public String diaryWrite(
		   @RequestParam(value = "date") String date,
		   Model model
		   ) {
	   model.addAttribute("date", date);
	   return "minihome/minihome-diary/diary-write";
	   ///prefix :WEB-INF/views/
	   // suffix : .jsp
   }
   
   //게시글 작성
   @PostMapping("/diaryWrite")
   public String diaryWrite(
		   Diary diary,
		   @SessionAttribute("loginMember") Member loginMember,
		   Model model
		   ) throws IOException {
	   
	   	//INSERT -> 회원번호/제목/내용/작성일/삭제여부/공개여부/폴더번호
	   	//folderNo, loginMember의 memberNo 필요해
	   
	   	//회원번호 -> loginMember의 memberNo 필요해
	   	//제목 (o)
	   	//내용 (o)
	   	//작성일 (o)
	   	//삭제여부 DEFAULT
	   	//공개여부 (o)
	   	//폴더번호 (o)
	   	//회원 번호
	   	diary.setMemberNo(loginMember.getMemberNo());
	   	//2023-01-27T11:28 형태를 T빼주고 DB날짜형식으로 바꿔주는 설정
	   	diary.setDiaryCreateDate(
	   			diary.getDiaryCreateDate().substring(0, 10) + " "+
	   			diary.getDiaryCreateDate().substring(11, 16) 
	   			);
	   	//게시글 삽입 
	   	int diaryNo = service.diaryWrite(diary);
	    
	   	if (diaryNo > 0) {
	   		//글을 작성하고 나면 돌아가는 페이지에서
	   		//글이 있는 폴더, 쓴 날짜가 필요함. 그리고 flag도...!
	   		model.addAttribute("folderNo", diary.getFolderNo());
	   		model.addAttribute("datedatedate", diary.getDiaryCreateDate().substring(0, 10));
	   		model.addAttribute("flagNo", 1);
	   	}
	   	//다이어리part
		return "minihome/minihome-diary/minihome-diary";
   }
   
   	@GetMapping("/diaryCancle/{date}")
   	public String diaryCancle(@PathVariable("date") String date
   			, Model model) {
   		model.addAttribute("datedatedate",date);
   		model.addAttribute("flagNo", 1);
   		return "minihome/minihome-diary/minihome-diary";
   	}
   
    /*[수정 페이지]*/

   	//다이어리 수정 페이지 이동
   	@GetMapping("/diaryUpdate/{diaryNo}")
   	public String diaryUpdate(
   			@PathVariable("diaryNo") int diaryNo,
		   Model model
		   ) {
   		//다이어리를 불러와
   		Diary diary = service.selectDiaryDetail(diaryNo);
	   
//   		//개행문자 처리 해제 
//   		board.setBoardContent(Util.newLineClear(board.getBoardContent()));
	   
   		//불러와서 수정페이지에 뿌려줘야지.
   		model.addAttribute("diary", diary);
   		return "minihome/minihome-diary/diary-update";
   	}
   
   	//다이어리 수정(수정페이지에서 [수정]버튼 누를 때...)
   	@PostMapping("/diaryUpdate/{diaryNo}")
    public String diaryUpdate(
 		   Diary diary, 
 		   Model model
 		   ) throws IOException {
 	   
 	   	//INSERT -> 회원번호/제목/내용/작성일/삭제여부/공개여부/폴더번호
 	   	//folderNo, loginMember의 memberNo 필요해
 	   
 	   	//회원번호 -> loginMember의 memberNo 필요해
 	   	//제목 (o)
 	   	//내용 (o)
 	   	//작성일 (o)
 	   	//삭제여부 DEFAULT
 	   	//공개여부 (o)
 	   	//폴더번호 -> folderNo 어케 불러와...?
// 	   	System.out.println("이슬이니...? :"+loginMember.getMemberNo());
// 	   	diary.setMemberNo(loginMember.getMemberNo());
 	   	diary.setDiaryCreateDate(
	   			diary.getDiaryCreateDate().substring(0, 10) + " "+
	   			diary.getDiaryCreateDate().substring(11, 16) 
	   			);
 	   	//[임시 설정]
// 	   	diary.setFolderNo(1);
 	   	// 4. 게시글 삽입 서비스를 호출한다.
 	   	int result = service.diaryUpdate(diary);
 	   
 		if (result > 0) {
	   		//글을 작성하고 나면 돌아가는 페이지에서
	   		//글이 있는 폴더, 쓴 날짜가 필요함. 그리고 flag도...!
	   		model.addAttribute("folderNo", diary.getFolderNo());
	   		model.addAttribute("datedatedate", diary.getDiaryCreateDate().substring(0, 10));
	   		model.addAttribute("flagNo", 1);
	   	}
	   	//다이어리part
		return "minihome/minihome-diary/minihome-diary";
 	 
    }
   	
   	/** 다이어리 삭제
   	 * @param diaryNo
   	 * @return
   	 */
   	@PostMapping("/diaryDelete")
   	@ResponseBody
   	public int diaryDelete(int diaryNo) {
   		
   		int result = service.diaryDelete(diaryNo);
   		return result;
   	}
   	
   	

	   
	/*[ 월간 달력 ]*/
	
	/**월간달력_조회
	 * @param loginMember
	 * @return
	 */
	@PostMapping("/diary/calendar/selectSchedule")
	@ResponseBody
	public String selectSchedule(
			@SessionAttribute("minihome") Minihome minihome,
			@SessionAttribute("loginMember") Member loginMember) {
		List<Plan> scheduleList = service.selectSchedule(minihome.getMemberNo());
		
		return new Gson().toJson(scheduleList);
	}
	
	/** 월간달력_일정 등록
	 * @param loginMember
	 * @param params
	 * @return
	 */
	@PostMapping("/diary/calendar/addSchedule")
	@ResponseBody
	public int addSchedule(
			@SessionAttribute("loginMember") Member loginMember,
//			@RequestBody Map<String, Object> params
			Plan plan
			) {
		plan.setMemberNo(loginMember.getMemberNo());
		int result = service.addSchedule(plan);
		return result;
	}
	
	/** 월간달력_일정 수정
	 * @param loginMember
	 * @param params
	 * @return
	 */
	@PostMapping("/diary/calendar/updateSchedule")
	@ResponseBody
	public int updateSchedule(
			@SessionAttribute("loginMember") Member loginMember,
			@RequestBody Map<String, Object> params
			) {
		params.put("memberNo", loginMember.getMemberNo());
		int result = service.updateSchedule(params);
		return result;
	}
	
	
	/**월간달력_일정 삭제
	 * @param planId
	 * @return
	 */
	@PostMapping("/diary/calendar/deleteSchedule")
	@ResponseBody
	public int deleteSchedule(int planId) {
		
		int result = service.deleteSchedule(planId);
		
		return result;
	}
	
	/** 월간달력_일정 수정_드롭 시 날짜 수정
	 * @return
	 */
	@PostMapping("/diary/calendar/updateScheduleDrop")
	@ResponseBody
	public int updateScheduleDrop(Plan plan) {
		int result = service.updateScheduleDrop(plan);
		
		return result;
	}

	
	
	
	
	
	

}
