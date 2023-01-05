package com.team.cubespace.album.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.album.model.dao.CommentDAO;
import com.team.cubespace.album.model.vo.Comment;
import com.team.cubespace.common.Util;
import com.team.cubespace.main.model.vo.Notifications;

@Service
public class CommentServiceImpl implements CommentService{
	@Autowired
	private CommentDAO dao;

	// 댓글 목록 조회
	@Override
	public List<Comment> selectCommentList(Map<String, Integer> paramMap) {
		
		
		return dao.selectCommentList(paramMap);
	}

	// 댓글 등록
	@Override
	public int insertComment(Comment comment, int hostMemberNo) {
		
		comment.setCommentContent(Util.XSSHandling(comment.getCommentContent()));
		comment.setCommentContent(Util.newLineHandling(comment.getCommentContent()));
		int result = dao.insertComment(comment);
		
		// 댓글 등록 성공 그리고 댓글 작성자와 미니홈의 주인이 같지 않을 때
		if(result > 0 && hostMemberNo != comment.getMemberNo()) {
			Notifications alarm = new Notifications();
			alarm.setSenderNo(comment.getMemberNo());
			alarm.setReceiverNo(hostMemberNo);
			alarm.setBoardTypeNo(comment.getBoardTypeNo());
			alarm.setBoardNo(comment.getBoardNo());
			alarm.setAlarmType(1);
			
			result = this.sendAlarm(alarm);
			System.out.println("알람 보내기 성공");
		}
		
		
		return result;
	}

	// 댓글 삭제
	@Override
	public int deleteComment(int commentNo) {
		return dao.deleteComment(commentNo);
	}
	
	// 댓글 수정
	@Override
	public int updateComment(Comment comment) {
		comment.setCommentContent(Util.XSSHandling(comment.getCommentContent()));
		comment.setCommentContent(Util.newLineHandling(comment.getCommentContent()));
		
		return dao.updateComment(comment);
	}

	@Override
	public int sendAlarm(Notifications alarm) {
		return dao.sendAlarm(alarm);
	}
}
