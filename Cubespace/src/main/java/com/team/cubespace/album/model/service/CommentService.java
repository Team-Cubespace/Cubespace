package com.team.cubespace.album.model.service;

import java.util.List;
import java.util.Map;

import com.team.cubespace.album.model.vo.Comment;
import com.team.cubespace.main.model.vo.Notifications;

public interface CommentService {

	/** 댓글 목록 조회 서비스
	 * @param albumNo
	 * @return commentList
	 */
	List<Comment> selectCommentList(Map<String, Integer> paramMap);

	/** 댓글 등록
	 * @param comment
	 * @return result
	 */
	int insertComment(Comment comment, int hostMemberNo);

	/** 댓글 삭제
	 * @param commentNo
	 * @return result
	 */
	int deleteComment(int commentNo);

	/** 댓글 수정
	 * @param comment
	 * @return result
	 */
	int updateComment(Comment comment);

	/** 알람 보내기
	 * @param alarm
	 * @return result
	 */
	int sendAlarm(Notifications alarm);

}
