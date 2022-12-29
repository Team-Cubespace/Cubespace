package com.team.cubespace.manage.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.manage.model.service.ManageService;
import com.team.cubespace.manage.model.vo.CategoryOrder;
import com.team.cubespace.member.model.vo.Member;

@Controller
@RequestMapping("/manage")
@SessionAttributes({"folderList", "friendList"})
public class manageController {
	
	@Autowired
	private ManageService service;
	
	@GetMapping("/font")
	public String changeFont() {
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
		List<Map<String, String>> friendList = service.getFriendList(paramMap);
		model.addAttribute(friendList);
		if(paramMap.containsKey("searchInput")) {
			model.addAttribute("searchInput", paramMap.get("searchInput"));
		}
		
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
	
	/** 카테고리 순서 변경
	 * @param categoryOrder
	 * @return
	 */
	@GetMapping("/menu/changeCategory")
	@ResponseBody
	public int changeMenu(CategoryOrder categoryOrder) {
		return service.changeCategory(categoryOrder.getMemberNo());
	}
	
	/** 카테고리 종류 원래대로
	 * @return result
	 */
	@GetMapping("/menu/categorySelectCancel")
	@ResponseBody
	public int categorySelectCancel(int memberNo) {
		return service.categorySelectCancel(memberNo);
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
}
