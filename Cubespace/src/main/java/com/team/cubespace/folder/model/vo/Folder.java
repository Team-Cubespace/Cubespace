package com.team.cubespace.folder.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Folder {
	private int folderNo;			// 폴더 번호
	private int boardTypeNo;		// 메뉴 종류 번호
	private String folderName;		// 폴더 이름
	private int folderOrder;		// 폴더 순서
	private int memberNo;			// 회원 번호
	private String memberNickname;	// 회원 닉네임
	private String boardTypeName;	// 게시판 타입 이름 
	private int fileCount; // 폴더 안의 게시글 수
	private String folderDelYN; // 폴더 삭제 여부

}
