package com.team.cubespace.complain.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Complain {
	
	private int complainNo; // 신고번호
	private int complainerNo; // 신고한사람
	private int complainedNo; // 신고당한사람
	private String complainContent; // 신고내용
	private String complainCreate; // 작성일
	private int status; // 상태
	
	// resultMap에 필요해서 등록
	private String complainerNickname; // 신고한사람 닉네임
	private String complainedNickname; // 신고당한사람 닉네임
	private int complainerBlockFL; // 신고한사람 차단여부 // int입니다(memberNo or 0 조회)
	private int complainedBlockFL; // 신고당한사람 차단여부 // int입니다(memberNo or 0 조회)
	private String complainerDelYN; // 신고한사람 탈퇴여부
	private String complainedDelYN; // 신고당한사람 탈퇴여부
	private String blockStart; // 신고당한사람이 차단당했다면: 차단시작시간
	private String blockEnd; // 신고당한사람이 차단당했다면: 차단종료시간
	

}
