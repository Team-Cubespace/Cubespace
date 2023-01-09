package com.team.cubespace.miniroom.model.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Miniroom {
	private int memberNo;	   // 회원 번호
	private String wall;	   // 벽지 경로
	private String floor;	   // 바닥 경로
	private int wallPattern;   // 벽지 패턴
	private int floorPattern;  // 바닥 패턴
}