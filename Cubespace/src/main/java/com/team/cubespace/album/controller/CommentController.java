package com.team.cubespace.album.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;
import com.team.cubespace.album.model.service.CommentService;
import com.team.cubespace.album.model.vo.Comment;
import com.team.cubespace.main.model.vo.Notifications;
import com.team.cubespace.minihome.model.vo.Minihome;

@RestController
@RequestMapping("/comment")
public class CommentController {
	@Autowired
	private CommentService service;

	/** 댓글 목록 조회
	 * @param paramMap
	 * @return commentList
	 */
	@GetMapping("/selectCommentList")
	public String selectCommentList(@RequestParam Map<String, Integer> paramMap) {
		
		// 서비스 호출
		List<Comment> commentList = service.selectCommentList(paramMap);
		
		return new Gson().toJson(commentList);
	}
	
	/** 댓글 등록
	 * @param comment
	 * @return result
	 */
	@PostMapping("/insert")
	public int insertComment(Comment comment, @SessionAttribute("minihome") Minihome minihome) {
		
		// 댓글 등록
		int result = service.insertComment(comment);
		
		// 댓글 등록 성공 시 그리고 댓글 작성자가 미니홈피 주인이 아닐 때
		if(result > 0 && minihome.getMemberNo() != comment.getMemberNo()) {
			Notifications alarm = new Notifications();
			alarm.setSenderNo(comment.getMemberNo());
			alarm.setReceiverNo(minihome.getMemberNo());
			alarm.setBoardTypeNo(comment.getBoardTypeNo());
			alarm.setBoardNo(comment.getBoardNo());
			alarm.setAlarmType(1);
			
			result = service.sendAlarm(alarm);
			System.out.println("알람 보내기 성공");
		}
		return result;
	}
	
	/** 댓글 삭제
	 * @param commentNo
	 * @return result
	 */
	@PostMapping("/delete")
	public int deleteComment(int commentNo) {
		return service.deleteComment(commentNo);
	}
	
	/** 댓글 수정
	 * @param commentNo
	 * @return result
	 */
	@PostMapping("/update")
	public int updateComment(Comment comment) {
		return service.updateComment(comment);
	}
}
