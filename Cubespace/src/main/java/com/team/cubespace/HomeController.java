package com.team.cubespace;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.team.cubespace.manage.model.service.ManageService;
import com.team.cubespace.manage.model.vo.Background;


@Controller
@SessionAttributes({"allFontList", "allMusicList"})
public class HomeController {
	
	@Autowired
	private ManageService mService;
	
	// application scope에 배경색/프레임정보를 담기 위한 객체 생성
	@Autowired
	ServletContext application;
	
	@GetMapping("/")
	public String home(Model model, HttpServletRequest req) {
		
		// 상점에 등록된 전체 폰트 리스트 조회
		List<Map<String, Object>> allFontList = mService.getAllFontList();
		model.addAttribute("allFontList", allFontList); // 모두의 사용을 위해 세션에 등록
		
		// 상점에 등록된 전체 배경음악 리스트 조회
		List<Map<String, Object>> allMusicList = mService.getAllMusicList();
		model.addAttribute("allMusicList", allMusicList); // 모두의 사용을 위해 세션에 등록
		
		
		
		// 모두가 공용으로 사용할 배경색 정보를 application scope에 올려놓음
		Background backgroundColorInfo = new Background();
		backgroundColorInfo.setBackgroundSkin("#DDD");
		backgroundColorInfo.setFrameColor("#82C9E8");
		backgroundColorInfo.setFrameMenuColor("#1A8DBF");
		backgroundColorInfo.setFrameFontColor("WHITE");
		
		application.setAttribute("backgroundColorInfo", backgroundColorInfo);

		
		return "home";
	}
}
