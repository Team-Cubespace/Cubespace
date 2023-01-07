package com.team.cubespace.minihome.model.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendMessage {
	private int memberNo;			// 깐부 번호
	private int ownFontNo;			// 폰트 번호
	private int commentNo;			// 깐부 메시지 번호
	private String memberNickname;  // 깐부 닉네임
	private String content;			// 깐부 메시지 내용
	private String create;			// 메시지 작성 시간
}