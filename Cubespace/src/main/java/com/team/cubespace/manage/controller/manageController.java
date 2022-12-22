package com.team.cubespace.manage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/manage")
public class manageController {
	
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
	public String changeMenu() {
		return "manage/menu";
	}
	@GetMapping("/background")
	public String changeBackground() {
		return "manage/background";
	}

}
