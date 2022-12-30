package com.team.cubespace.main.model.service;

import java.util.List;
import java.util.Map;

import com.team.cubespace.main.model.vo.Shop;

public interface ShopService {

	/** 상점 최신폰트 목록 조회
	 * @param loginMemberNo
	 * @return
	 */
	List<Shop> shopNewFont(int loginMemberNo);

	/** 상점 상품 추가(폰트,배경음악,소품)
	 * @param paramMap
	 * @return
	 */
	int goodsAddButton(Map<String, Object> paramMap);

}
