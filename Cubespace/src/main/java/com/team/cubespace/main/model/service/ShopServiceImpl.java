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
import com.team.cubespace.main.model.vo.ShopMiniroom;
import com.team.cubespace.main.model.vo.ShopMusic;

@Service
public class ShopServiceImpl  implements ShopService{

	@Autowired
	private ShopDAO dao;

	// 상점 최신상품 목록 조회
	@Override
	public List<ShopFont> shopNewGoods(int loginMemberNo, int shopCathNo) {
		
		
		if(shopCathNo==1){ // 1 최신 폰트 상품 목록 조회 
			return dao.shopNewFont(loginMemberNo);
		
		
		}else if (shopCathNo==2) { // 2 최신 배경음악 상품 목록 조회
			return dao.shopNewMusic(loginMemberNo);

		
		}else { // 3 최신 미니룸소품 상품 목록 조회
			return dao.shopNewMiniroom(loginMemberNo);

		}
	}


	// 상점 인기상품 목록 조회
	@Override
	public List<ShopFont> shopPopularGoods(int loginMemberNo) {
		
		// 1 폰트 상점 일때
		return dao.shopPopularFont(loginMemberNo);
		
		// 2 배경음윽 상점 일때
		
		// 3 미니룸 소품 상점 일때
	}

	// 상점 상품 추가(폰트,배경음악,소품)
	@Override
	@Transactional
	public int goodsAddButton(Map<String, Object> paramMap) {
		return dao.goodsAddButton(paramMap);
	}
	
	// 상점 상품 목록 조회
	@Override
	public Map<String, Object> selectGoodsList(int loginMemberNo, int cp, int shopCt) {
		
		int listCount;
		
		// 상점 번호에 따른 갯수 구하기 
		if(shopCt==1){ // 폰트 상점 상품 갯수 구하기
			listCount  = dao.shopFontCount();
			
		}else if (shopCt==2) { // 배경음악 상점 상품 갯수 구하기
			listCount  = dao.shopMusicCount();
			
		}else { // 미니룸소품 상점 상품 갯수 구하기
			listCount  = dao.shopMiniroomCount();
		}
		
		// 페이징 처리 객체 생성
		Pagination pagination = new Pagination(listCount, cp, 16, 5);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		
		// 페이징 처리객체 사용하여 상점 상품 목록 조회
		if(shopCt==1){ // 폰트 상점 상품 상품 목록 조회
			List<ShopFont> shopGoodsList = dao.selectFontList(pagination, loginMemberNo);
			resultMap.put("shopGoodsList", shopGoodsList);
			
		}else if (shopCt==2) { // 배경음악 상점 상품 상품 목록 조회
			List<ShopMusic> shopGoodsList = dao.selectShopMusicList(pagination, loginMemberNo);
			resultMap.put("shopGoodsList", shopGoodsList);
			
		}else { // 미니룸소품 상점 상품 상품 목록 조회
			List<ShopMiniroom> shopGoodsList = dao.selectShopMiniroomList(pagination, loginMemberNo);
			resultMap.put("shopGoodsList", shopGoodsList);
		}
		
		return resultMap;
	}
}
