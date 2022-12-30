package com.team.cubespace.main.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	
	/** 상점 상품 추가(폰트,배경음악,소품)
	 * @param paramMap
	 * @return
	 */
	@GetMapping("/goodsAddButton")
	@ResponseBody
	public int goodsAddButton(@RequestParam Map<String, Object> paramMap) {
		
		int result = service.goodsAddButton(paramMap);
		
		return result;
	}
	
	
}

