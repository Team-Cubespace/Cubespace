package com.team.cubespace.minihome.model.vo;

import com.team.cubespace.manage.model.vo.CategoryOrder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Minihome {
	private int memberNo;			// 미니홈피 호스트회원 번호
	private String homepageName;	// 미니홈피 이름
	private String backgroundSkin;	// 배경 스킨 (색 or 이미지 경로)
	private String comment;			// 홈페이지 소개글
	private int today;				// 일일 방문자 수
	private int total;				// 총 방문자 수
	private String musicPath;		// 음악 경로
	private String musicName;		// 음악 이름
	private String frameColor;		// 프레임 색
	private String frameMenuColor;	// 프레임 메뉴 색
	private String frameFontColor;	// 프레임 글자 색
	private CategoryOrder categoryOrder;	// 메뉴 카테고리 순서
	
	private int fontNo; // 폰트번호
}
