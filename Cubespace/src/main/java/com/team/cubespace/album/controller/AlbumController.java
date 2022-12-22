package com.team.cubespace.album.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/** 앨범 페이지 기능 관련 컨트롤러
 * @author Tonic
 *
 */
@Controller
public class AlbumController {
	
	
	/** 앨범 목록 조회 페이지
	 * @return minihome/album/album-list 포워드
	 */
	@GetMapping("/albumList")
	public String albumList() {
		return "minihome/album/album-list";
	}
	
	/** 앨범 작성 페이지
	 * @return minihome/album/album-write 포워드
	 */
	@GetMapping("/albumWrite")
	public String albumWrite() {
		return "minihome/album/album-write";
	}
	
	/** 앨범 상세조회
	 * @return minihome/album/album-write 포워드
	 */
	@GetMapping("/albumDetail")
	public String albumDetail() {
		return "minihome/album/album-detail";
	}
}
