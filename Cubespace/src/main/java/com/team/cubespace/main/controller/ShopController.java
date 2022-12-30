package com.team.cubespace.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.team.cubespace.main.model.service.ShopService;
import com.team.cubespace.main.model.vo.Shop;

@Controller
public class ShopController {

	@Autowired
	private ShopService service;
	
	
	/** 상점페이지 이동(기본 폰트상점)
	 * @return
	 */
	@GetMapping("/cubespace/shop")
	public String shopFontMove() {
		return "/webmain/main-shopFont";
	}
	
	
	/** 상점 최신폰트 목록 조회
	 * @return
	 */
	@GetMapping("/shopNewFont")
	@ResponseBody
	public String shopNewFont(int loginMemberNo) {
		
		List<Shop> shopNewFontList = service.shopNewFont(loginMemberNo);
		
		return new Gson().toJson(shopNewFontList); 
	}
	
	
	
}

