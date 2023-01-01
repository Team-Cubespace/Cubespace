package com.team.cubespace.manage.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Music {
	
	private int musicNo;
	private String musicName;
	private String musicPath;
	private String musicThumnail;
	private String musicCreater;
	
	private int memberNo;

}
