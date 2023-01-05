package com.team.cubespace.main.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ShopMiniroom {
	private int goodsCount;				// 상품 사용횟수
	private int useGoodsNo;				// 사용중인 폰트번호
	
	//미니룸소품 테이블
	private int goodsNo;				// 미니룸소품 번호
	private String goodsName;			// 미니룸소품 이름
	private String goodsPath;			// 미니룸소품경로
	private String goodsCreater;		// 미니룸소품 제작자
	
	private int goodsUseCount; // 몇명이 이 소품을 사용하는지
}
