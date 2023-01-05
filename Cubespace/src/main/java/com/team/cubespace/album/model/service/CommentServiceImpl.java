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
	public int insertComment(Comment comment) {
		
		comment.setCommentContent(Util.XSSHandling(comment.getCommentContent()));
		comment.setCommentContent(Util.newLineHandling(comment.getCommentContent()));
		
		return dao.insertComment(comment);
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
