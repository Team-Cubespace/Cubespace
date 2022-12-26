package com.team.cubespace.album.model.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Album {
	private int albumNo; 			// 사진첩 번호
	private int memberNo;			// 작성자 회원 번호
	private String albumTitle; 		// 사진첩 제목
	private String albumContent;	// 사진첩 내용
	private String albumCreate;		// 사진첩 작성일
	private String latitude;		// 경도
	private String longitude;		// 위도
	private String locationName;	// 위치 이름
	private String albumScrapAllowYN;	// 스크랩 가능 여부
}
