package com.team.cubespace.minihome.model.vo;

import java.util.List;

import com.team.cubespace.folder.model.vo.Folder;
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
	private int maxTotal;			// 전체회원중 가장 높은 total
	private String musicPath;		// 음악 경로
	private String musicName;		// 음악 이름
	private String frameColor;		// 프레임 색
	private String frameMenuColor;	// 프레임 메뉴 색
	private String frameFontColor;	// 프레임 글자 색
	private CategoryOrder categoryOrder;	// 메뉴 카테고리 순서
	private int fontNo; // "내" 폰트번호
	private int musicNo; // "내" 배경음악 번호
	
	private List<Folder> diaryFolderList;	//	다이어리 폴더 목록
	private List<Folder> albumFolderList;	// 	사진첩 폴더 목록
	private List<Folder> videoFolderList;	//	동영상 폴더 목록
}
