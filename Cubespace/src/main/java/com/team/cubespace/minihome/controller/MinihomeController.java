package com.team.cubespace.minihome.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.google.gson.Gson;
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
	
	@PostMapping("/updateMinihomeTitle")
	@ResponseBody
	public int updateMinihomeName(@RequestParam Map<String, Object> paramMap,
			@SessionAttribute("minihome") Minihome minihome) {
		paramMap.put("memberNo", minihome.getMemberNo());
		return minihomeService.updateMinihomeName(paramMap);
	}
	
	@ResponseBody
	@GetMapping("/selectMusic")
	public String selectMusic(int musicNo) {
		Map<String, String> resultMap = minihomeService.selectMusic(musicNo);
		return new Gson().toJson(resultMap);
	}
}