package com.team.cubespace.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.team.cubespace.main.model.service.MainHomepageService;
import com.team.cubespace.main.model.vo.MainHomepage;

@Controller
public class MainHomepageController {

	@Autowired
	private MainHomepageService service;
	
	
	/** 투데이 스타 및 랭킹 조회
	 * @param todayChoice
	 * @return
	 */
	@GetMapping("/mainTodaySelect")
	@ResponseBody
	public String mainTodaySelect(int todayChoice) {
		
		List<MainHomepage> mainTodaylist = service.mainTodaySelect(todayChoice);
		
		return new Gson().toJson(mainTodaylist); 
	}

	
	
	
	
}
