package com.team.cubespace.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.team.cubespace.main.model.service.ShopService;

@Controller
public class ShopController {

	@Autowired
	private ShopService service;
	
	@GetMapping("/cubespace/shop")
	public String shopFontMove() {
		return "/webmain/main-shopFont";
	}
	
	
	
	
}

