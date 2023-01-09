package com.team.cubespace.miniroom.model.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MiniroomPlace {
	private int memberNo;    // 회원 번호
	private int goodsNo;	 // 소품 번호
	private int shopCathNo;  // 카테고리 번호
	private int locationNo;  // 자리 번호
	private double top;		 // top 좌표
	private double left;	 // left 좌표
	private String path;	 // 소품 경로
}