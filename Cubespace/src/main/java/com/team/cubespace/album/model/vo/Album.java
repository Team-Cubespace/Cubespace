package com.team.cubespace.album.model.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Album {
	private int albumNo; 			// 사진첩 번호
	private int memberNo;			// 작성자 회원 번호
	private int folderNo;			// 폴더 번호
	private String thumbnailImage;	// 썸네일 이미지
	private String albumTitle; 		// 사진첩 제목
	private String albumContent;	// 사진첩 내용
	private String albumCreate;		// 사진첩 작성일
	private String latitude;		// 위도
	private String longitude;		// 경도
	private String locationName;	// 위치 이름
	private String albumScrapYN;	// 사진첩 스크랩 여부
	private String albumScrapAllowYN;	// 스크랩 가능 여부
	private int scrapAlbumNo;	// 스크랩할 사진첩 번호 
	private int openFlag;		// 사진첩 공개 여부 (1:모두공개, 2:일촌공개, 3:비공개)
	private int commentCount;	// 댓글 수
	private List<Comment> commentList;			// 댓글 목록
	private List<AlbumImage> albumImageList;	// 앨범 이미지 목록
}
