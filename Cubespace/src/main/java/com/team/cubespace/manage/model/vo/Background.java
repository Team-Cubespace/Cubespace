package com.team.cubespace.manage.model.vo;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.ToString;
import lombok.Setter;

@Getter
@Setter
@ToString
public class Background {
	
	private String backgroundSkin;
	private String frameColor;
	private String frameMenuColor;
	private String frameFontColor;
	private int backgroundNo; // 그냥 구분자

	// 배경/프레임색 설정을 위한 정보.
	// application scope에 올라갈땐 포함되지 않음
	private int memberNo; 
	
	}
