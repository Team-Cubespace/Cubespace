package com.team.cubespace.main.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.cubespace.album.model.vo.Album;
import com.team.cubespace.common.Pagination;
import com.team.cubespace.main.model.dao.ShopDAO;
import com.team.cubespace.main.model.vo.Shop;

@Service
public class ShopServiceImpl  implements ShopService{

	@Autowired
	private ShopDAO dao;

	// 상점 최신폰트 목록 조회
	@Override
	public List<Shop> shopNewFont(int loginMemberNo) {
		return dao.shopNewFont(loginMemberNo);
	}

	// 상점 상품 추가(폰트,배경음악,소품)
	@Override
	@Transactional
	public int goodsAddButton(Map<String, Object> paramMap) {
		return dao.goodsAddButton(paramMap);
	}

	// 상점 인기폰트 목록 조회
	@Override
	public List<Shop> shopPopularFont(int loginMemberNo) {
		return dao.shopPopularFont(loginMemberNo);
	}

	// 상점 폰트 목록 조회
	@Override
	public Map<String, Object> selectFontList(int loginMemberNo, int cp) {
		
		// 폰트 상점 상품 갯수 구하기
		int listCount  = dao.shopFontCount();
		
		// 페이징 처리 객체 생성
		Pagination pagination = new Pagination(listCount, cp, 16, 5);
		
		// 페이징 처리객체 사용하여 폰트 상점 상품 목록 조회
		List<Shop> shopFontList = dao.selectFontList(pagination, loginMemberNo);
				
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("shopFontList", shopFontList);
		
		return resultMap;
	}
}
