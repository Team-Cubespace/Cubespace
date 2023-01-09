package com.team.cubespace;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.team.cubespace.admin.model.service.AdminService;
import com.team.cubespace.main.model.service.MainHomepageService;
import com.team.cubespace.manage.model.service.ManageService;
import com.team.cubespace.manage.model.vo.Background;
import com.team.cubespace.member.model.vo.Member;


@Controller
@SessionAttributes({"allFontList", "allMusicList"})
public class HomeController {
	
	@Autowired
	private ManageService mService;
	
	@Autowired
	private AdminService aService;
	
	@Autowired
	private MainHomepageService mainService;
	
	// application scope에 배경색/프레임정보를 담기 위한 객체 생성
	@Autowired
	ServletContext application;
	
	@GetMapping("/")
	public String home(Model model, @SessionAttribute(value="loginMember", required=false) Member loginMember) {
		
		// 상점에 등록된 전체 폰트 리스트 조회
		List<Map<String, Object>> allFontList = mService.getAllFontList();
		model.addAttribute("allFontList", allFontList); // 모두의 사용을 위해 세션에 등록
		
		// 상점에 등록된 전체 배경음악 리스트 조회
		List<Map<String, Object>> allMusicList = mService.getAllMusicList();
		model.addAttribute("allMusicList", allMusicList); // 모두의 사용을 위해 세션에 등록
	
		if(loginMember != null) {
			// TODAY, 깐부카운트 조회
			Map<String, Integer> resultMap = mainService.selectInfo(loginMember.getMemberNo());
			model.addAttribute("loginInfo", resultMap);
		}
		
		
		// DB에 저장된 전체 배경색정보 덩어옴
		Background backgroundColorInfo = aService.getBGColorInfo();
		
		application.setAttribute("backgroundColorInfo", backgroundColorInfo);

		
		return "home";
	}
}
