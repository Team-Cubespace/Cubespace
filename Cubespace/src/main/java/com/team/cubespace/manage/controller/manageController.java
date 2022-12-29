package com.team.cubespace.manage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.login.model.service.LoginService;
import com.team.cubespace.manage.model.service.ManageService;
import com.team.cubespace.manage.model.vo.CategoryOrder;
import com.team.cubespace.member.model.vo.Member;

@Controller
@RequestMapping("/manage")
@SessionAttributes({ "folderList", "fontList" /* , "friendList", "fontList" */})
public class manageController {
	
	@Autowired
	private ManageService service;
	
	
	@GetMapping("/font")
	public String changeFont(@SessionAttribute("loginMember") Member inputMember, 
			@RequestParam Map<String, Object> paramMap, /*searchInput*/
			Model model) {
		
		paramMap.put("memberNo", inputMember.getMemberNo());
		if(paramMap.containsKey("searchInput")) {
			model.addAttribute("searchInput", paramMap.get("searchInput"));
		}
		
		List<Map<String, Object>> fontList = service.getFontList(paramMap);
		model.addAttribute("fontList", fontList);
		
		return "manage/font";
	}
	@GetMapping("/music")
	public String changeMusic() {
		return "manage/music";
	}
	
	/** 깐부관리 페이지 이동
	 * @param inputMember
	 * @param paramMap
	 * @param model
	 * @return
	 */
	@GetMapping("/friend")
	public String changeFriend(@SessionAttribute("loginMember") Member inputMember, 
			@RequestParam Map<String, Object> paramMap, /*searchInput*/
			Model model) {
		
		paramMap.put("memberNo", inputMember.getMemberNo());
		if(paramMap.containsKey("searchInput")) {
			model.addAttribute("searchInput", paramMap.get("searchInput"));
		}
		List<Map<String, String>> friendList = service.getFriendList(paramMap);
		model.addAttribute(friendList);
		
		return "manage/friend";
	}
	
	
//	메뉴 관련-------------------------------------------------------------------------------
	@GetMapping("/menu")
	public String changeMenu(@SessionAttribute("loginMember") Member inputMember, 
			Model model) {
		
		// folderList 얻어옴
		List<Folder> folderList = service.getFolderList(inputMember.getMemberNo());
		
		// categoryOrder 얻어옴
		CategoryOrder categoryOrder = service.getCategoryOrder(inputMember.getMemberNo());
		String realOrder = "";
		realOrder += categoryOrder.getDiary() + "," + categoryOrder.getAlbum() + "," + 
				categoryOrder.getVideo() + "," + categoryOrder.getGuestBook();
		
		
		model.addAttribute("folderList", folderList);
		model.addAttribute("realOrder", realOrder);
		model.addAttribute("categoryOrder", categoryOrder);
		
		return "manage/menu";
	}
	@GetMapping("/background")
	public String changeBackground() {
		return "manage/background";
	}
	
	/** 카테고리 순서 변경, 폴더순서 변경, 폴더이름 변경
	 * @param categoryOrder
	 * @return
	 * @throws Exception 
	 */
	@PostMapping("/menu/changeCategory")
	public String changeMenu(CategoryOrder categoryOrder,
			@RequestParam Map<String, Object> paramMap,
			@SessionAttribute("folderList") List<Folder> folderList,
			RedirectAttributes ra) throws Exception {
		
		
		int categoryOrderResult= service.changeCategory(categoryOrder); // 카테고리 순서 변경
		int folderNameResult = service.updateFolderName(paramMap, folderList); // 폴더이름 변경
		
		String message = null;
		
		if(categoryOrderResult * folderNameResult > 0) {
			message = "카테고리, 폴더 설정 변경 성공";
		} else {
			message = "카테고리, 폴더 설정 변경 실패";
		}
		ra.addFlashAttribute("message", message);
		
		return "redirect:/manage/menu";
	}
	
	/** 카테고리 종류 원래대로
	 * @return result
	 */
	@GetMapping("/menu/categorySelectCancel")
	@ResponseBody
	public int categorySelectCancel(int memberNo) {
		return service.categorySelectCancel(memberNo);
	}

	/** 카테고리 중 보여질것 선택
	 * @param useCategory
	 * @return
	 */
	@GetMapping("/menu/categorySelect")
	@ResponseBody
	public int categorySelect(@RequestParam Map<String, Object> paramMap) {
		
		// paramMap : diary, album, video, guestBook, memberNo
		return service.categorySelect(paramMap);
	}
	
	/** 카테고리에 새 폴더 삽입
	 * @param paramMap
	 * @return
	 */
	@GetMapping("/menu/addFolder")
	@ResponseBody
	public int addFolder(@RequestParam Map<String, Object> paramMap) {
		
		// paramMap : boardTypeNo, folderName, memberNo
		return service.addFolder(paramMap);
	}
	
	/** 카테고리에서 폴더 삭제
	 * @param folderList
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	@GetMapping("/menu/deleteFolder")
	@ResponseBody
	public int deleteFolder(@SessionAttribute("folderList") List<Folder> folderList,
			@RequestParam Map<String, Object> paramMap) throws Exception {
		
		// paramMap : boardTypeNo, folderOrder, folderNo, subCategoryLength, memberNo
		return service.deleteFolder(paramMap);
	}
	
//	친구(깐부) 관련-------------------------------------------------------------------------------

	/** 깐부끊기
	 * @param paramMap
	 * @return result
	 */
	@GetMapping("/friend/deleteFriend")
	@ResponseBody
	public int deleteFriend(@RequestParam Map<String, Object> paramMap) {
		return service.deleteFriend(paramMap);
	}
	
	
	
//	폰트 관련-------------------------------------------------------------------------------
	
	/** 새 폰트 적용하기
	 * @param paramMap
	 * @return
	 */
	@GetMapping("/font/useFont")
	@ResponseBody
	public int useFont(@RequestParam Map<String, Object> paramMap,
			@SessionAttribute("loginMember") Member loginMember,
			Model model) {
		int result =  service.useFont(paramMap);
		if(result > 0) {
			loginMember.setOwnFontNo(Integer.parseInt((String)paramMap.get("fontNo")));
			model.addAttribute("loginMember", loginMember);
		}
		
		
		
		return result;
	}

}
