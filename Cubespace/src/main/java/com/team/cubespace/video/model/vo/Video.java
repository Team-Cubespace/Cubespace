package com.team.cubespace.video.model.vo;

import java.util.List;

import com.team.cubespace.album.model.vo.Comment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Video {
	private int videoNo;			// 영상 번호
	private int memberNo;			// 작성자 회원 번호
	private String videoTitle;			// 영상 제목
	private String videoContent;
	private String videoCreate;		// 영상 작성일
	private String videoPath;		// 영상 경로
	private String videoRename;		// 영상 변경명
	private String videoOriginalName;	// 영상 원본명
	private String openFlag;		// 영상 공개 여부 (1:모두공개, 2:일촌공개, 3:비공개)
	private String videoScrapYN;	// 비디오 스크랩 여부
	private String videoScrapAllowYN;	// 비디오 스크랩 가능 여부
	private int folderNo;			// 비디오가 속한 폴더 번호
	private String videoThumbnail;	// 비디오 썸네일 이미지 경로
	private int videoReadCount;		// 비디오 조회 수
	
	private List<Comment> commentList;			// 댓글 목록
	
}
