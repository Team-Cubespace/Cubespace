package com.team.cubespace.main.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Notifications {
	private int alarmNo;			// 알람 시퀀스 번호
	private int senderNo;			// 보내는 회원 번호
	private int receiverNo;			// 받는 회원 번호
	private int boardTypeNo;		// 게시글 타입 번호 (2:사진첩, 3:동영상)
	private int boardNo;			// 게시글 번호
	private int alarmType;			// 알람 타입 번호 (1:댓글, 2:스크랩)
	private String alarmCreate;		// 알람 생성일
	private String readYN;			// 읽음 여부
}
