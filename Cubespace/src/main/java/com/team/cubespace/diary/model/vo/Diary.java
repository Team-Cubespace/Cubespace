package com.team.cubespace.diary.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class Diary {
	
	private int diaryNo; 				// 다이어리 번호
	private int memberNo;				// 회원 번호
	private String diaryTitle;			// 다이어리 제목
	private String diaryContent;		// 다이어리 내용
	private String diaryCreateDate;		// 다이어리 작성일
	private String diaryDeleteFlag ;		// 다이어리 삭제 여부
	private int diaryOpenFlag;			// 다이어리 공개 여부 (1,2,3)
	private int folderNo;				// 다이어리 폴더 번호
	private String yearMonth;
	
	

}
