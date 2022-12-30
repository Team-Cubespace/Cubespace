package com.team.cubespace.main.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
