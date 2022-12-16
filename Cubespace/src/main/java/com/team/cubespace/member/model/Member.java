package com.team.cubespace.member.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Member {
	
	
	private int memberNo;
	private String memberEmail;
	private String memberPw;
	private String memberName;
	private String memberNickname;
	private String introduce;
	private String memberTel;
	private String profileImage;
	private String enrollDate;
	private String memberDeleteYN;
	private int authority;
	private String birthYear;
	private int loginType;
	private String birthday;
	private int emotion;
	private int fontNo;
	
}
