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
import com.team.cubespace.main.model.vo.ShopFont;

@Service
public class ShopServiceImpl  implements ShopService{

	@Autowired
	private ShopDAO dao;

	// 상점 최신상품 목록 조회
	@Override
	public List<ShopFont> shopNewGoods(int loginMemberNo) {
		
		
		// 1 폰트 상점 일때
//		if()
		return dao.shopNewFont(loginMemberNo);
		
		// 2 배경음윽 상점 일때
		
		// 3 미니룸 소품 상점 일때
		
	}

	// 상점 상품 추가(폰트,배경음악,소품)
	@Override
	@Transactional
	public int goodsAddButton(Map<String, Object> paramMap) {
		return dao.goodsAddButton(paramMap);
	}

	// 상점 인기상품 목록 조회
	@Override
	public List<ShopFont> shopPopularGoods(int loginMemberNo) {
		
		// 1 폰트 상점 일때
		return dao.shopPopularFont(loginMemberNo);
		
		// 2 배경음윽 상점 일때
		
		// 3 미니룸 소품 상점 일때
	}

	// 상점 폰트 목록 조회
	@Override
	public Map<String, Object> selectGoodsList(int loginMemberNo, int cp) {
		
		// if 상점 번호에 따른 갯수 구하기 
		// 폰트 상점 상품 갯수 구하기
		//if(==1){}
		int listCount  = dao.shopFontCount();
		
		// 배경음악 상점 상품 갯수 구하기
		
		// 미니룸소품 상점 상품 갯수 구하기

		
		
		// 페이징 처리 객체 생성
		Pagination pagination = new Pagination(listCount, cp, 16, 5);
		
		// 페이징 처리객체 사용하여 폰트 상점 상품 목록 조회
		List<ShopFont> shopFontList = dao.selectFontList(pagination, loginMemberNo);
				
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("shopFontList", shopFontList);
		
		return resultMap;
	}
}
