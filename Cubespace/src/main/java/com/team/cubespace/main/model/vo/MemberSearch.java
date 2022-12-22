package com.team.cubespace.main.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberSearch {
	
	private int memberNo;			// 회원 번호
	private String memberNickname;	// 회원 닉네임
	private String profileImage;	// 회원 프로필사진
	private int friendAcceptFl;		// 깐부 수락여부 ( 0대기 1수락)


}
