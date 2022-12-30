package com.team.cubespace.main.model.dao;

import java.util.List;

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
}
