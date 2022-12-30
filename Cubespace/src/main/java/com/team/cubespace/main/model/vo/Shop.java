package com.team.cubespace.main.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Shop {
	
	private int fontNo;					// 폰트번호
	private String fontName;			// 폰트 이름
	private String fontPath;			// 폰트 경로
	private int fontCount;				// 폰트 사용횟수
	private int goodsNo;				// 사용중인 폰트번호

}
