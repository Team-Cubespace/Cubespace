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
	
}
