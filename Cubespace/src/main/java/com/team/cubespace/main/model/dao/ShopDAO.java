package com.team.cubespace.main.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.common.Pagination;
import com.team.cubespace.main.model.vo.ShopFont;

@Repository
public class ShopDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 상점 최신폰트 목록 조회
	 * @param loginMemberNo
	 * @return
	 */
	public List<ShopFont> shopNewFont(int loginMemberNo) {
		return sqlSession.selectList("shop.shopNewFont",loginMemberNo);
	}

	/** 상점 상품 추가(폰트,배경음악,소품)
	 * @param paramMap
	 * @return
	 */
	public int goodsAddButton(Map<String, Object> paramMap) {
		return sqlSession.insert("shop.goodsAddButton",paramMap);
	}

	/** 상점 인기폰트 목록 조회
	 * @param loginMemberNo
	 * @return
	 */
	public List<ShopFont> shopPopularFont(int loginMemberNo) {
		return sqlSession.selectList("shop.shopPopularFont",loginMemberNo);
	}

	/** 폰트 상점 상품 갯수 구하기
	 * @return
	 */
	public int shopFontCount() {
		return sqlSession.selectOne("shop.shopFontCount");
	}

	/** 페이징 처리객체 사용하여 폰트 상점 상품 목록 조회
	 * @param pagination
	 * @param loginMemberNo
	 * @return
	 */
	public List<ShopFont> selectFontList(Pagination pagination, int loginMemberNo) {
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("shop.selectFontList",loginMemberNo,rowBounds);
	}
}
