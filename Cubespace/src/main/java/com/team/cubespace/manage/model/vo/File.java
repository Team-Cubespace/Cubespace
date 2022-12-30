package com.team.cubespace.manage.model.vo;

import lombok.Getter;
import lombok.ToString;
import lombok.Setter;

@Getter
@Setter
@ToString
public class File { // manage-menu에서 한 폴더의 파일들을 읽어오기 위해 필요한 vo
	
	private int fileNo; // 해당 파일 번호
	private int memberNo;
	private String fileTitle;
	private int openFlag;
	private int folderNo; // 해당 파일이 위치하는 폴더의 번호
	private String folderName; // 해당 파일이 위치하는 폴더의 이름
	

}
