package com.team.cubespace.main.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.main.model.dao.MainHomepageDAO;
import com.team.cubespace.main.model.vo.MainHomepage;

@Service
public class MainHomepageServiceImpl implements MainHomepageService {

	@Autowired
	private MainHomepageDAO dao;

	
	// 투데이 스타 및 랭킹 조회
	@Override
	public List<MainHomepage> mainTodaySelect(int todayChoice) {
		return  dao.mainTodaySelect(todayChoice);
	}

	// 숏츠영상 인기 및 신규 조회
	@Override
	public List<MainHomepage> mainShortsSelect(int shortsChoice) {
		return  dao.mainShortsSelect(shortsChoice);
	}

	// TODAY, FRIEND_COUNT 조회
	@Override
	public Map<String, Integer> selectInfo(int memberNo) {
		return dao.selectInfo(memberNo);
	}
}
