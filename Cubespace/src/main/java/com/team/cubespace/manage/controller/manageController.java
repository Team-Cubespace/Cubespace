package com.team.cubespace.manage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.team.cubespace.manage.model.service.ManageService;
import com.team.cubespace.manage.model.vo.CategoryOrder;
import com.team.cubespace.manage.model.vo.Folder;
import com.team.cubespace.member.model.vo.Member;

@Controller
@RequestMapping("/manage")
@SessionAttributes({"folderList"})
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
	@GetMapping("/friend")
	public String changeFriend() {
		return "manage/friend";
	}
	@GetMapping("/menu")
	public String changeMenu(@SessionAttribute("loginMember") Member inputMember, 
			Model model) {
		
		// folderList 얻어옴
		List<Folder> folderList = service.getFolderList(inputMember.getMemberNo());
		
		// categoryOrder 얻어옴
		CategoryOrder categoryOrder = service.getCategoryOrder(inputMember.getMemberNo());
		String realOrder = "";
		realOrder += categoryOrder.getDiary() + "" + categoryOrder.getAlbum() + "" + 
				categoryOrder.getVideo() + "" + categoryOrder.getGuestBook();
		
		
		model.addAttribute("folderList", folderList);
		model.addAttribute("realOrder", realOrder);
		
		return "manage/menu";
	}
	@GetMapping("/background")
	public String changeBackground() {
		return "manage/background";
	}

}
