package com.team.cubespace.main.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ShopMusic {
	private int goodsCount;				// 상품 사용횟수
	private int useGoodsNo;				// 사용중인 폰트번호
	
	//배경음악 테이블
	private int goodsNo;				// 배경음악 번호
	private String goodsName;			// 배경음악 이름
	private String goodsPath;			// 배경음악 경로
	private String goodsImagePath;		// 배경음악 썸네일경로
	private String goodsCreater;		// 배경음악 제작자
}
