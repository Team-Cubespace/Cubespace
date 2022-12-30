package com.team.cubespace.main.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.main.model.vo.Shop;

@Repository
public class ShopDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 상점 최신폰트 목록 조회
	 * @param loginMemberNo
	 * @return
	 */
	public List<Shop> shopNewFont(int loginMemberNo) {
		return sqlSession.selectList("shop.shopNewFont",loginMemberNo);
	}

	/** 상점 상품 추가(폰트,배경음악,소품)
	 * @param paramMap
	 * @return
	 */
	public int goodsAddButton(Map<String, Object> paramMap) {
		return sqlSession.insert("shop.goodsAddButton",paramMap);
	}
}
