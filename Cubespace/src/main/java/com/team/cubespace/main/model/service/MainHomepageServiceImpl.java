package com.team.cubespace.main.model.service;

import java.util.List;

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
}
