package com.team.cubespace.minihome.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MinihomeController {
	
	@GetMapping("/minihome")
	public String minihome() {
		return "minihome/minihome-frame";
	}
}
