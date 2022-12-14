package com.team.cubespace.admin.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.team.cubespace.admin.model.service.AdminService;
import com.team.cubespace.admin.model.vo.Block;
import com.team.cubespace.admin.model.vo.FAQ;
import com.team.cubespace.common.Util;
import com.team.cubespace.complain.model.vo.Complain;
import com.team.cubespace.login.model.service.LoginService;
import com.team.cubespace.main.model.vo.ShopMiniroom;
import com.team.cubespace.manage.model.vo.Background;
import com.team.cubespace.manage.model.vo.Font;
import com.team.cubespace.manage.model.vo.Music;
import com.team.cubespace.member.model.vo.Member;

/**
 * @author User
 *
 */
/**
 * @author User
 *
 */
@Controller
@SessionAttributes({"loginMember", "message", "allFontList", "allMusicList"})
public class AdminController {

	@Autowired
	private AdminService service;
	
	@Autowired
	private LoginService loginService;
	
	// application scope에 배경색/프레임정보를 가져오기 위한 객체 생성
	@Autowired
	ServletContext application;
	
	
	
	/** 회원관리 페이지 이동
	 * @return
	 */
	@GetMapping("/admin/member")
	public String adminMember() {
		return "admin/admin-member";
	}
	
	/** 회원 차단, 신고관리 페이지 이동
	 * @return
	 */
	@GetMapping("/admin/complain")
	public String adminComplain() {
		return "admin/admin-complain";
	}
	
	
	/** FAQ 목록 조회, 이동
	 * @return
	 */
	@GetMapping("/faq")
	public String gotoFAQ(Model model) {
		
		List<FAQ> faqList = service.selectFAQList();
		model.addAttribute("faqList", faqList);
		
		return "admin/admin-FAQ";
	}
	
	/** 이용약관 페이지 이동
	 * @return
	 */
	@GetMapping("/termsOfUse")
	public String gotoTermsOfUse() {
		return "admin/admin-termsOfUse";
	}
	
	/** 개인정보처리방침 페이지 이동
	 * @return
	 */
	@GetMapping("/privatePolicy")
	public String gotoPrivatePolicy() {
		return "admin/admin-privatePolicy";
	}
	
	/** 저작권소개 페이지 이동
	 * @return
	 */
	@GetMapping("/copyrightPolicy")
	public String gotoCopyrightPolicy() {
		return "admin/admin-copyrightPolicy";
	}
	


	
//	-------------------------------------------------------------------------------
	/** 회원 목록 조회
	 * @param paramMap
	 * @param model
	 * @return
	 */
	@GetMapping("/admin/member/memberSearch")
	public String memberSearch(@RequestParam Map<String, Object> paramMap,
			@RequestParam(value="cp", required=false, defaultValue="1" ) int cp,
			Model model
			) {
		
		// 회원 목록 조회
		Map<String, Object> map = service.memberSearch(paramMap, cp);
		model.addAttribute("map", map);

		return "admin/admin-member";
	}
	
	/** 회원 정보 삭제
	 * @param memberNo
	 * @return
	 */
	@PostMapping("/admin/member/deleteMember")
	@ResponseBody
	public int deleteMember(int memberNo) {
		
		return service.deleteMember(memberNo);
	}
	
	
	/** 회원 정보 삭제 복구
	 * @param memberNo
	 * @return
	 */
	@PostMapping("/admin/member/deleteMemberBack")
	@ResponseBody
	public int deleteMemberBack(int memberNo) {
		
		return service.deleteMemberBack(memberNo);
	}
	

	
	
	/** 새로운 회원 등록하기
	 * @param inputMember
	 * @return
	 * @throws Exception 
	 */
	@PostMapping("/admin/member/insertNewMember")
	@ResponseBody
	public int insertNewMember(Member inputMember) throws Exception {
		
		// 배경색, 프레임색 정보를 담고 있는 객체
		Background backgroundInfo = (Background) application.getAttribute("backgroundColorInfo");

		
		return loginService.signUp(inputMember, backgroundInfo);
	}
	
	
	
//	-------------------------------------------------------------------------------

	/** 신고 목록 조회
	 * @param paramMap
	 * @param model
	 * @return
	 */
	@GetMapping("/admin/complain/complainSearch")
	public String blockSearch(@RequestParam Map<String, Object> paramMap,
			@RequestParam(value="cp", required=false, defaultValue="1" ) int cp,
			Model model
			) {
		
		// 회원 목록 조회
		Map<String, Object> map = service.complainSearch(paramMap, cp);
		model.addAttribute("map", map);

		return "admin/admin-complain";
	}
	
	// 처리 상태 변경
	@GetMapping("/admin/complain/updateStatusToggle")
	@ResponseBody
	public int updateStatusToggle(Complain inputComplain) {
		// inputComplain : complainNo, status(0/1)
		return service.updateStatusToggle(inputComplain);
	}
	
	
	// 회원 차단하기
	@GetMapping("/admin/complain/blockMember")
	@ResponseBody
	public int blockMember(Block inputBlock) throws ParseException {
		// block : memberNo, blockStart, blockEnd
		return service.blockMember(inputBlock);
	}
	
	
	
//	-------------------------------------------------------------------------------
	
	/** 폰트 페이지 이동
	 * @return
	 */
	@GetMapping("/admin/goods/font")
	public String adminGoods_font(@RequestParam Map<String, Object> paramMap,
			@RequestParam(value="cp", required=false, defaultValue="1" ) int cp,
			Model model) {
		
		// paramMap : fontName
		
		// 폰트 목록 조회
		Map<String, Object> map = service.fontSearch(paramMap, cp);
		model.addAttribute("map", map);

		return "admin/admin-font";
	}
	
	
	/** 새 폰트 등록
	 * @param inputFont
	 * @param file
	 * @return
	 * @throws Exception 
	 */
	@PostMapping("/admin/font/insertFont")
	public String insertFont(Font inputFont, MultipartFile fontFile, 
			HttpSession session, Model model,
			RedirectAttributes ra) throws Exception {
		
		String webPath = "/resources/font/";
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		String rename = Util.fileRename(fontFile.getOriginalFilename());
		inputFont.setFontPath(webPath + rename);
		
		
		int result =  service.insertFont(rename, folderPath, inputFont, fontFile);
		String message = null;
		
		if(result > 0) {
			
			message = "새 폰트가 등록되었습니다";
			
			// session의 allFontList에 추가
			List<Font> allFontList = (List<Font>) model.getAttribute("allFontList");
			allFontList.add(inputFont);
			model.addAttribute("allFontList", allFontList);
			
		} else {
			message = "폰트 등록 실패";
		}
		ra.addFlashAttribute("message", message);
		
		return "redirect:/admin/goods/font";
	}
	
	/** 폰트 삭제
	 * @param fontNo
	 * @param model
	 * @return
	 */
	@GetMapping("/admin/font/deleteFont")
	public String deleteFont(@RequestParam Map<String, Object> paramMap, Model model,
			RedirectAttributes ra) {
		
		
		int fontNo = Integer.parseInt((String)paramMap.get("fontNo"));
		int result = service.deleteFont(fontNo);
		if(result > 0) {
			
			// session의 allFontList에서 폰트 삭제
			List<Font> allFontList = (List<Font>) model.getAttribute("allFontList");;
			for(int i = 0; i < allFontList.size(); i++) {
				if(allFontList.get(i).getFontNo() == fontNo) {
					allFontList.remove(i);
					break;
				}
			ra.addFlashAttribute("message", "폰트가 삭제되었습니다");		
			}
			model.addAttribute("allFontList", allFontList);
		}
		return "redirect:/admin/goods/font";
	}
	
	
	
//	-------------------------------------------------------------------------------

	/** 배경음악 페이지 
	 * @return
	 */
	@GetMapping("/admin/goods/music")
	public String adminGoods_music(@RequestParam Map<String, Object> paramMap,
			@RequestParam(value="cp", required=false, defaultValue="1" ) int cp,
			Model model) {
		
		// paramMap : musicName
		
		// 폰트 목록 조회
		Map<String, Object> map = service.musicSearch(paramMap, cp);
		model.addAttribute("map", map);
	
		return "admin/admin-music";
	}
	
	
	/** 새 배경음악 등록
	 * @param inputMusic
	 * @param musicFileList
	 * @param session
	 * @param model
	 * @param ra
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/admin/goods/insertMusic")
	public String insertMusic(Music inputMusic, 
			@RequestParam(name = "musicThumnailFile") MultipartFile musicThumnailFile,
			@RequestParam(name = "musicPathFile") MultipartFile musicPathFile,
			HttpSession session, Model model,
			RedirectAttributes ra) throws Exception {
		
		List<String> renameList = new ArrayList<>();
		List<String> folderPathList = new ArrayList<>();
		
		// 썸네일
		String webPath = "/resources/musicThumnail/";
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		String rename = Util.fileRename(musicThumnailFile.getOriginalFilename());
		inputMusic.setMusicThumnail(webPath + rename);
		renameList.add(0, rename);
		folderPathList.add(0, folderPath);
		
		
		// 음악파일
		webPath = "/resources/music/";
		folderPath = session.getServletContext().getRealPath(webPath);
		
		rename = Util.fileRename(musicPathFile.getOriginalFilename());
		inputMusic.setMusicPath(webPath + rename);
		renameList.add(1, rename);
		folderPathList.add(1, folderPath);
		
		
		
		int result =  service.insertMusic(renameList, folderPathList, inputMusic, musicThumnailFile, musicPathFile);
		String message = null;
		
		if(result > 0) {
			
			message = "새 음악이 등록되었습니다";
			
			// session의 allFontList에 추가
			List<Music> allMusicList = (List<Music>) model.getAttribute("allMusicList");
			allMusicList.add(inputMusic);
			model.addAttribute("allMusicList", allMusicList);
			
		} else {
			message = "음악 등록 실패";
		}
		ra.addFlashAttribute("message", message);
		
		return "redirect:/admin/goods/music";
	}
	
	/** 배경음악 삭제
	 * @param musicNo
	 * @param model
	 * @return
	 */
	@GetMapping("/admin/music/deleteMusic")
	public String deleteMusic(int musicNo, Model model,
			RedirectAttributes ra) {
		
	
		int result = service.deleteMusic(musicNo);
		if(result > 0) {
			
			// session의 allFontList에서 폰트 삭제
			List<Music> allMusicList = (List<Music>) model.getAttribute("allMusicList");;
			for(int i = 0; i < allMusicList.size(); i++) {
				if(allMusicList.get(i).getMusicNo() == musicNo) {
					allMusicList.remove(i);
					break;
				}
			ra.addFlashAttribute("message", "배경음악이 삭제되었습니다");		
			}
			model.addAttribute("allMusicList", allMusicList);
		}
		return "redirect:/admin/goods/music";
	}
	
	
//	-------------------------------------------------------------------------------

	/** 소품등록 이동
	 * @return
	 */
	@GetMapping("/admin/goods/goods")
	public String adminGoods_goods(@RequestParam Map<String, Object> paramMap,
			@RequestParam(value="cp", required=false, defaultValue="1" ) int cp,
			Model model) {
		
		// paramMap : goodsName
		
		// 폰트 목록 조회
		Map<String, Object> map = service.goodsSearch(paramMap, cp);
		model.addAttribute("map", map);
	
		return "admin/admin-goods";
	}
	
	/** 새 소품 등록
	 * @param inputFont
	 * @param file
	 * @return
	 * @throws Exception 
	 */
	@PostMapping("/admin/goods/insertGoods")
	public String insertGoods(ShopMiniroom inputGoods, MultipartFile goodsPathFile, 
			HttpSession session, Model model,
			RedirectAttributes ra) throws Exception {
		
		String webPath = "/resources/miniroomGoods/";
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		String rename = Util.fileRename(goodsPathFile.getOriginalFilename());
		inputGoods.setGoodsPath(webPath + rename);
		
		
		int result =  service.insertGoods(rename, folderPath, inputGoods, goodsPathFile);
		String message = null;
		
		if(result > 0) {
			message = "새 소품이 등록되었습니다";
		} else {
			message = "소품 등록 실패";
		}
		ra.addFlashAttribute("message", message);
		
		return "redirect:/admin/goods/goods";
	}
	
	/** 소품 삭제
	 * @param goodsNo
	 * @param model
	 * @return
	 */
	@GetMapping("/admin/goods/deleteGoods")
	public String deleteGoods(int goodsNo, RedirectAttributes ra) {
		
		int result = service.deleteGoods(goodsNo);
		if(result > 0) {
			ra.addFlashAttribute("message", "소품이 삭제되었습니다");		
		}
		
		return "redirect:/admin/goods/goods";
	}
	
	
	/** 미니홈피 전체 배경색 변경
	 * @param background
	 * @return
	 * @throws Exception 
	 */
	@GetMapping("/admin/goods/updateAllColor")
	public String updateAllColor(Background background, RedirectAttributes ra) throws Exception {
				
		Background originalBGColor = (Background) application.getAttribute("backgroundColorInfo");
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("originalBackgroundSkin", originalBGColor.getBackgroundSkin());
		map.put("originalFrameColor", originalBGColor.getFrameColor());
		map.put("originalFrameMenuColor", originalBGColor.getFrameMenuColor());
		map.put("originalFrameFontColor", originalBGColor.getFrameFontColor());
		
		map.put("backgroundSkin", background.getBackgroundSkin());
		map.put("frameColor", background.getFrameColor());
		map.put("frameMenuColor", background.getFrameMenuColor());
		map.put("frameFontColor", background.getFrameFontColor());
		
		
		// 전체 회원의 미니홈피 배경색 변경
		// 회원의 기존 미니홈피 색이 "모두" 처음 설정된 것과 같으면 새로 변경
		int result = service.updateAllColor(map);
		
		String message = null;
		if(result > 0) {
			message = "미니홈피 전체 배경색을 변경하였습니다";
		} else {
			message = "미니홈피 전체 배경색 변경 실패";
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:/admin/goods/goods";
	
	}
}
