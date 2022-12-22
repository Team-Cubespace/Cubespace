package com.team.cubespace.manage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/manage")
public class manageController {
	
	@GetMapping("/changeFont")
	public String changeFont() {
		return "manage/changeFont";
	}

}
