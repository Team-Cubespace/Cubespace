package com.team.cubespace.main.model.service;

import java.util.List;

import com.team.cubespace.main.model.vo.MainHomepage;

public interface MainHomepageService {

	/** 투데이 스타 및 랭킹 조회
	 * @param todayChoice
	 * @return
	 */
	List<MainHomepage> mainTodaySelect(int todayChoice);

}
