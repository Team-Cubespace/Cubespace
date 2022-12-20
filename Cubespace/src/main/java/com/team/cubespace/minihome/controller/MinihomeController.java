package com.team.cubespace.minihome.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/** 미니홈피 프레임 기능 관련 컨트롤러
 * @author Tonic
 *
 */
@Controller
public class MinihomeController {
	
	
	/** 미니홈피 열기
	 * @return minihome/minihome-frame 포워드
	 */
	@GetMapping("/minihome")	// @pathVariable memberNo 필요
	public String minihome() {
		return "minihome/minihome-frame";
	}
}
