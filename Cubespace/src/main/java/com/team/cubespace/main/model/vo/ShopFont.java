package com.team.cubespace.main.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ShopFont {
	private int goodsCount;				// 상품 사용횟수
	private int useGoodsNo;				// 사용중인 폰트번호
	
	//폰트 테이블
	private int goodsNo;				// 폰트번호
	private String goodsName;			// 폰트 이름
	private String goodsPath;			// 폰트 경로
	private String goodsCreater;		// 폰트 제작자
}
