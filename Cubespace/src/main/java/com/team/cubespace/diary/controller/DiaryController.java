package com.team.cubespace.diary.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
		return "minihome/minihome-diary/minihome-diary";
		
		//월간달력part
//		return "minihome/minihome-diary/monthcalendar";
		
		
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
	
	/*[ 작성 페이지 ]*/
	
	//게시글 작성 페이지 이동
   @GetMapping("/diary/write")
   public String diaryWrite() {
	   return "minihome/minihome-diary/diary-write";
	   ///prefix :WEB-INF/views/
	   // suffix : .jsp
   }
   //게시글 작성
   @PostMapping("/diary/write")
   public String diaryWrite(
		   Diary diary,
		   @SessionAttribute("loginMember") Member loginMember,
		   // 필요한가?
		   RedirectAttributes ra, 
		   @RequestHeader("referer") String referer
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
	   	System.out.println("다이어리 객체 :"+ diary);
	   	System.out.println("이슬이니...? :"+loginMember.getMemberNo());
	   	diary.setMemberNo(loginMember.getMemberNo());
	   	// [임시 설정]
	   	diary.setFolderNo(1);
	   	diary.setDiaryCreateDate(
	   			diary.getDiaryCreateDate().substring(0, 10) + " "+
	   			diary.getDiaryCreateDate().substring(11, 16) 
	   			);
	   	System.out.println(diary.getDiaryCreateDate());
	   	//System.out.println(diary.getDiaryCreateDate().substring(0, 10));
	   	//System.out.println(diary.getDiaryCreateDate().substring(11, 16));
	   	
	   	// 4. 게시글 삽입 서비스를 호출한다.
	   	int diaryNo = service.diaryWrite(diary);
	   
	    String message = null;
	    String path = null;
	    
	    if(diaryNo > 0) {
	    	message = "게시글이 등록되었습니다.";
	    	
	    	path = "/miniroom";
	    	
	    	//path = "/board/" + boardCode + "/" + diaryNo;
	    			// /board/1/2003 (상세조회 요청 주소)
	    } else {
	    	message = "게시글 작성 실패";
	    	path = referer;
	    	
	    }
	    
	    ra.addFlashAttribute("message",message);
	    
		return "redirect:" + path;
   }
   
    /*[수정 페이지]*/

   	//다이어리 수정 페이지 이동
   	@GetMapping("/diary/update/{diaryNo}")
   	public String diaryUpdate(
   			@PathVariable("diaryNo") int diaryNo,
		   Model model
		   ) {
   		System.out.println("수정 페이지로 넘어왔니?");
   		Diary diary = service.selectDiaryDetail(diaryNo);
	   
//   		//개행문자 처리 해제 
//   		board.setBoardContent(Util.newLineClear(board.getBoardContent()));
	   
   		model.addAttribute("diary", diary);
   		return "minihome/minihome-diary/diary-update";
   	}
   
   	//다이어리 수정
   	@PostMapping("/diary/update/{diaryNo}")
    public String diaryUpdate(
 		   Diary diary,
 		   @SessionAttribute("loginMember") Member loginMember,
 		   // 필요한가?
 		   RedirectAttributes ra, 
 		   @RequestHeader("referer") String referer
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
 	   	System.out.println("수정 다이어리 객체 :"+ diary);
 	   	System.out.println("이슬이니...? :"+loginMember.getMemberNo());
 	   	diary.setMemberNo(loginMember.getMemberNo());
 	   	diary.setDiaryCreateDate(
	   			diary.getDiaryCreateDate().substring(0, 10) + " "+
	   			diary.getDiaryCreateDate().substring(11, 16) 
	   			);
 	   	//[임시 설정]
 	   	diary.setFolderNo(1);
 	   	// 4. 게시글 삽입 서비스를 호출한다.
 	   	int result = service.diaryUpdate(diary);
 	   
 	    String message = null;
 	    String path = null;
 	    
 	    if(result > 0) {
 	    	message = "게시글이 수정되었습니다.";
 	    	
 	    	path = "/miniroom";
 	    	
 	    	//path = "/board/" + boardCode + "/" + diaryNo;
 	    			// /board/1/2003 (상세조회 요청 주소)
 	    } else {
 	    	message = "게시글 수정 실패";
 	    	path = referer;
 	    	
 	    }
 	    
 	    ra.addFlashAttribute("message",message);
 	    
 		return "redirect:" + path;
    }

	   
	/*[ 월간 달력 ]*/
	
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
