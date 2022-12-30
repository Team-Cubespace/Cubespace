package com.team.cubespace.main.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
