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

}
