package com.team.cubespace.album.model.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Comment {
	private int level;					// 댓글 계층 레벨
	private int commentNo;				// 댓글 번호
	private String commentContent;		// 댓글 내용
	private String commentCreate;		// 댓글 작성일
	private int boardNo;				// 댓글 작성된 게시글 번호
	private int memberNo;				// 댓글 작성한 회원 번호
	private String memberName;			// 댓글 작성한 회원 이름
	private String memberNickname;		// 댓글 작성한 회원 닉네임
	private String profileImage;		// 회원 프로필 이미지
	private int parentCommentNo;		// 부모 댓글 번호
	private int childCommentCount;		// 자식 댓글 갯수
	private String fontPath;			// 폰트 경로
}