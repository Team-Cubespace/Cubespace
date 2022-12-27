package com.team.cubespace.album.model.service;

import java.util.List;
import java.util.Map;

import com.team.cubespace.album.model.vo.Comment;

public interface CommentService {

	/** 댓글 목록 조회 서비스
	 * @param albumNo
	 * @return commentList
	 */
	List<Comment> selectCommentList(Map<String, Integer> paramMap);

}
