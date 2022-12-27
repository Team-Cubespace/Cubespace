package com.team.cubespace.member.model.vo;

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
	private String birthDay;
	private int emotion;
	private int ownFontNo;
	
	// 회원 정지여부
	private String memberBlockYN;
	private String blockStart; // 형식 : 2022년 12월 17일 17시 59분
	private String blockEnd;
	
	private String fontPath; // 폰트경로
	private String emotionPath; // 기분 경로
	private String emotionName; // 기분 이름
	
	private int alarmCount; // 알람 수
	private int today; // 투데이 방문자수
	private int friendCount; // 친구수
	}
