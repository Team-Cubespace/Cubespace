package com.team.cubespace.minihome.model.vo;

import com.team.cubespace.manage.model.vo.CategoryOrder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewPost {
	private String category; // 카테고리
	private int postNo;		 // 글 번호
	private int folderNo;	 // 폴더 번호	
	private String title;	 // 글 제목
	private String scrapYN;  // 스크랩 여부
	private String openFL;   // 글 공개 여부
	private String create;   // 글 작성 시간
}