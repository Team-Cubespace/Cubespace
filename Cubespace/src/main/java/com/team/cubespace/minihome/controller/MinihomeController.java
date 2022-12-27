package com.team.cubespace.minihome.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.team.cubespace.manage.model.service.ManageService;
import com.team.cubespace.manage.model.vo.CategoryOrder;
import com.team.cubespace.minihome.model.service.MinihomeService;
import com.team.cubespace.minihome.model.vo.Minihome;

/** 미니홈피 프레임 기능 관련 컨트롤러
 * @author Tonic
 *
 */
@SessionAttributes("minihome")
@Controller
public class MinihomeController {
	
	@Autowired
	private MinihomeService minihomeService;
	
	@Autowired
	private ManageService manageService;
	/** 미니홈피 열기
	 * @return minihome/minihome-frame 포워드
	 */
	@GetMapping("/minihome/{memberNo}")	// @pathVariable memberNo 필요
	public String minihome(@PathVariable("memberNo") int memberNo, Model model) {
		Minihome minihome = minihomeService.selectMinihome(memberNo);
		
		CategoryOrder co = manageService.getCategoryOrder(memberNo);
		minihome.setCategoryOrder(co);
		
		model.addAttribute("minihome", minihome);
		
		return "minihome/minihome-frame";
	}
}