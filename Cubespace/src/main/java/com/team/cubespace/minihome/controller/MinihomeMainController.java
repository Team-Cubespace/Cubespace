package com.team.cubespace.minihome.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.minihome.model.service.MinihomeMainService;
import com.team.cubespace.minihome.model.vo.FriendMessage;
import com.team.cubespace.minihome.model.vo.NewPost;

/** 
 * 미니홈피 홈 기능 관련 컨트롤러
 * @author HJ
 */
@Controller
public class MinihomeMainController {
	@Autowired
	private MinihomeMainService service;
	
	// 미니홈피 홈 이동
	@GetMapping("/minihome/home/{memberNo}")
	public String minihomeMain(@SessionAttribute(value="loginMember", required=false) Member loginMember,
						       @PathVariable("memberNo") int memberNo, Model model) {
		
		// 프로필 + 깐부 목록 조회
		Map<String, Object> profileMap = service.profile(memberNo);
		
		// 최근 게시물 조회
		Map<String, Integer> paramMap = new HashMap<String, Integer>();
		
		paramMap.put("loginNo", loginMember.getMemberNo());
		paramMap.put("homeNo", memberNo);
		
		List<NewPost> newPost = service.newPost(paramMap);
		
		// 깐부 메시지 조회
		List<FriendMessage> friendMessage = service.friendMessage(memberNo);
		
		model.addAttribute("profileMap", profileMap);
		model.addAttribute("newPost", newPost);
		model.addAttribute("friendMessage", friendMessage);
		
		return "minihome/home/minihome-home";
	}
	
	// 기분 변경
	@GetMapping("/emotion")
	@ResponseBody
	public int emotion(@RequestParam Map<String, Object> paramMap) {
		return service.emotion(paramMap);
	}
	
	// 프로필 수정
	@PostMapping("/updateProfile")
	@ResponseBody
	public int updateProfile(@RequestParam(value="profileImage") MultipartFile profileImage,
							 @RequestParam(value="comment") String comment,
							 @RequestParam(value="updateFlag") String updateFlag,
            		   		 @SessionAttribute("loginMember") Member loginMember,
            		   		 HttpServletRequest req) throws Exception {
		
		loginMember.setComment(comment);
		String webPath = "/resources/images/memberProfile/";
		String filePath = req.getSession().getServletContext().getRealPath(webPath);
		
		int result = service.updateProfile(webPath, filePath, profileImage, updateFlag, loginMember);
		return result;
	}
	
	// 깐부 상태 확인 (최근 게시물 공개 여부, 깐부 메시지 등록)
	@GetMapping("/friendFlag")
	@ResponseBody
	public int friendFlag(@RequestParam Map<String, Integer> paramMap) {
		return service.friendFlag(paramMap);
	}
	
	// 깐부 메시지 등록
	@GetMapping("/insertMessage")
	@ResponseBody
	public FriendMessage insertMessage(@RequestParam Map<String, Object> paramMap,
									   @SessionAttribute("loginMember") Member loginMember) {
		FriendMessage friendMessage = service.insertMessage(paramMap, loginMember);
		return friendMessage;
	}
	
	// 깐부 메시지 삭제
	@GetMapping("/deleteMessage")
	@ResponseBody
	public int deleteMessage(int commentNo) {
		return service.deleteMessage(commentNo);
	}
}