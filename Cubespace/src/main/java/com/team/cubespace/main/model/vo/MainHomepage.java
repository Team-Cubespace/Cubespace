package com.team.cubespace.main.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MainHomepage {
	
	
	int memberNo; 			// 멤버넘버
	String profileImage;	// 멤버프로필사진 경로
	String memberNickname;	// 멤버닉네임
	
	int today;				// 투데이
	int total;				// 누적투데이
	
	private int folderNo;			// 비디오가 속한 폴더 번호
	private int videoNo;			// 영상 번호
	private String videoTitle;			// 영상 제목
	private String videoThumbnail;	// 비디오 썸네일 이미지 경로
	private int videoReadCount;		// 비디오 조회 수

	
}
