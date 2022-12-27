package com.team.cubespace.album.model.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlbumImage {
	private int imageNo;		// 이미지 번호
	private int albumNo;		// 앨범 번호
	private String imagePath;	// 이미지 경로
	private String imageRename;	// 이미지 변경명
	private int imageOrder;		// 이미지 정렬 순서
}
