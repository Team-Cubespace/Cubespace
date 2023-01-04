package com.team.cubespace.main.model.service;

import java.util.List;

import com.team.cubespace.main.model.vo.MainHomepage;

public interface MainHomepageService {

	/** 투데이 스타 및 랭킹 조회
	 * @param todayChoice
	 * @return
	 */
	List<MainHomepage> mainTodaySelect(int todayChoice);

	/** 숏츠영상 인기 및 신규 조회
	 * @param shortsChoice
	 * @return
	 */
	List<MainHomepage> mainShortsSelect(int shortsChoice);

}
