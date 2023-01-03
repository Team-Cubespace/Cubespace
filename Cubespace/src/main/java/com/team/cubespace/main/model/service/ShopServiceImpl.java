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
	public List<ShopFont> shopPopularGoods(int loginMemberNo, int shopCathNo) {
		
		if(shopCathNo==1){ // 1 인기 폰트 상품 목록 조회 
			return dao.shopPopularFont(loginMemberNo);
		
		}else if (shopCathNo==2) { // 2 인기 배경음악 상품 목록 조회
			return dao.shopPopularMusic(loginMemberNo);

		
		}else { // 3 인기 미니룸소품 상품 목록 조회
			return dao.shopPopularMiniroom(loginMemberNo);
		}
	}

	// 상점 상품 추가(폰트,배경음악,소품)
	@Override
	@Transactional
	public int goodsAddButton(Map<String, Object> paramMap) {
		return dao.goodsAddButton(paramMap);
	}
	
	// 상점 상품 목록 조회
	@Override
	public Map<String, Object> selectGoodsList(int cp, Map<String, Object> pm,int shopCt) {
		
		int listCount;
		
		// 상점 번호에 따른 갯수 구하기 
		if(shopCt==1){ // 폰트 상점 상품 갯수 구하기
			listCount  = dao.shopFontCount(pm);
			
		}else if (shopCt==2) { // 배경음악 상점 상품 갯수 구하기
			listCount  = dao.shopMusicCount(pm);
			
		}else { // 미니룸소품 상점 상품 갯수 구하기
			listCount  = dao.shopMiniroomCount(pm);
		}
		
		// 페이징 처리 객체 생성
		Pagination pagination = new Pagination(listCount, cp, 16, 5);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		
		// 페이징 처리객체 사용하여 상점 상품 목록 조회
		if(shopCt==1){ // 폰트 상점 상품 상품 목록 조회
			List<ShopFont> shopGoodsList = dao.selectFontList(pagination, pm);
			resultMap.put("shopGoodsList", shopGoodsList);
			
		}else if (shopCt==2) { // 배경음악 상점 상품 상품 목록 조회
			List<ShopMusic> shopGoodsList = dao.selectShopMusicList(pagination, pm);
			resultMap.put("shopGoodsList", shopGoodsList);
			
		}else { // 미니룸소품 상점 상품 상품 목록 조회
			List<ShopMiniroom> shopGoodsList = dao.selectShopMiniroomList(pagination, pm);
			resultMap.put("shopGoodsList", shopGoodsList);
		}
		
		return resultMap;
	}

	// 음악재생 목록 조회
	@Override
	public List<ShopFont> miniMusicPlyer(int loginMemberNo, int cp) {
		
		int listCount;
		listCount  = dao.shopMusicPlyerCount();
		
		// 페이징 처리 객체 생성
		Pagination pagination = new Pagination(listCount, cp, 16, 5);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		

		return dao.miniMusicPlyer(pagination, loginMemberNo);
	}


}
