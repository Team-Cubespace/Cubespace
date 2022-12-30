package com.team.cubespace.main.model.service;

import java.util.List;

import com.team.cubespace.main.model.vo.Shop;

public interface ShopService {

	/** 상점 최신폰트 목록 조회
	 * @param loginMemberNo
	 * @return
	 */
	List<Shop> shopNewFont(int loginMemberNo);

}
