package com.team.cubespace;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.team.cubespace.manage.model.service.ManageService;


@Controller
@SessionAttributes("allFontList")
public class HomeController {
	
	@Autowired
	private ManageService mService;
	
	@GetMapping("/")
	public String home(Model model) {
		
		// 상점에 등록된 전체 폰트 리스트 조회
		List<Map<String, Object>> allFontList = mService.getAllFontList();
		model.addAttribute("allFontList", allFontList); // 모두의 사용을 위해 세션에 등록
		
		return "home";
	}
}
