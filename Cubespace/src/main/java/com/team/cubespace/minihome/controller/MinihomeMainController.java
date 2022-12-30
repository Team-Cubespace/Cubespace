package com.team.cubespace.minihome.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/** 
 * 미니홈피 홈 기능 관련 컨트롤러
 * @author HJ
 */
@Controller
public class MinihomeMainController {
	
	@GetMapping("/minihome/home/{memberNo}")
	public String minihomeMain(@PathVariable("memberNo") int memberNo, Model model) {
		return "minihome/home/minihome-home";
	}
}