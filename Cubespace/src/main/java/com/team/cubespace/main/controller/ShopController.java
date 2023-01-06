package com.team.cubespace.main.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;
import com.team.cubespace.main.model.service.ShopService;
import com.team.cubespace.main.model.vo.ShopFont;
import com.team.cubespace.member.model.vo.Member;

@Controller
public class ShopController {

	@Autowired
	private ShopService service;
	
	
	/** 상점페이지 이동(기본 폰트상점) + 상품 목록조회
	 * @return
	 */
	@GetMapping("/cubespace/shop/{shopCt}")
	public String shopMove(Model model,
			@PathVariable("shopCt") int shopCt,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@SessionAttribute(value="loginMember", required=false) Member loginMember,
			@RequestParam Map<String,Object> pm) {
		int loginMemberNo = loginMember.getMemberNo();
		
		System.out.println("pm = "+ pm);
		pm.put("loginMemberNo", loginMemberNo);
		
		// 상점 목록 조회 서비스 호출
		Map<String, Object> shopMap = service.selectGoodsList(cp ,pm,shopCt); 
		shopMap.put("shopCt", shopCt);
		model.addAttribute("shopMap", shopMap);
		
		return "/webmain/main-shop";
	}
	
	/** 상점 최신상품 목록 조회
	 * @return
	 */
	@GetMapping("/shopNewGoods")
	@ResponseBody
	public String shopNewGoods(int loginMemberNo,int shopCathNo) {
		
		List<ShopFont> shopNewGoodsList = service.shopNewGoods(loginMemberNo,shopCathNo);
		
		
		return new Gson().toJson(shopNewGoodsList); 
	}
	
	/** 상점 인기상품 목록 조회
	 * @return
	 */
	@GetMapping("/shopPopularGoods")
	@ResponseBody
	public String shopPopularGoods(int loginMemberNo,int shopCathNo) {
		
		List<ShopFont> popularFontList = service.shopPopularGoods(loginMemberNo,shopCathNo);
		
		return new Gson().toJson(popularFontList); 
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
	
	/** 음악재생 목록 조회(보류)
	 * @return
	 */
	@GetMapping("/miniMusicPlyer")
	@ResponseBody
	public String miniMusicPlyer(@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			int loginMemberNo) {
		
		Map<String,Object> paramMap = new HashMap<String, Object>();
		paramMap.put("loginMemberNo", loginMemberNo);
		paramMap.put("cp", cp);

		List<ShopFont> miniMusicPlyerList = service.miniMusicPlyer(loginMemberNo,cp); 

		
		return new Gson().toJson(miniMusicPlyerList); 

	}
	
	
	
}

