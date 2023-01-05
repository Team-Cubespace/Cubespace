package com.team.cubespace.guestbook.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GuestBook {

	int gbNo;			// 방명록 번호
	int senderNo;		// 방명록 보낸 회원
	int receiverNo;		// 방명록 받은 회원
	String gbCreate;	// 방명록 작성 시간
	String gbSecret;	// 비밀글여부
	String gbContent;	// 방명록 내용
	
	private String memberNickname;		// 회원 닉네임
	private String profileImage;		// 회원 프로필사진
	private int memberFontNo;			// 회원 적용중인 폰트
	
}
