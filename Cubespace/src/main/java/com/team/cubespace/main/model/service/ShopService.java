package com.team.cubespace.main.model.service;

import java.util.List;
import java.util.Map;

import com.team.cubespace.main.model.vo.ShopFont;

public interface ShopService {

	/** 상점 최신상품 목록 조회
	 * @param loginMemberNo
	 * @param shopCt 
	 * @return
	 */
	List<ShopFont> shopNewGoods(int loginMemberNo, int shopCathNo);

	/** 상점 인기상품 목록 조회
	 * @param loginMemberNo
	 * @param shopCathNo 
	 * @return
	 */
	List<ShopFont> shopPopularGoods(int loginMemberNo, int shopCathNo);
	
	/** 상점 상품 추가(폰트,배경음악,소품)
	 * @param paramMap
	 * @return
	 */
	int goodsAddButton(Map<String, Object> paramMap);

	/** 상점 상품 목록 조회
	 * @param loginMemberNo
	 * @param cp
	 * @param shopCt 
	 * @param shopCt 
	 * @return
	 */
	Map<String, Object> selectGoodsList(int cp, Map<String, Object> pm, int shopCt);


}
