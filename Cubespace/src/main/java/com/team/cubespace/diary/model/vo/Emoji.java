package com.team.cubespace.diary.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class Emoji {
	
	int diaryNo;
	int memberNo;
	int emojiNo;
	String emojiPath;
	
	int emojiCount; //테이블에 없지만 추가

}
