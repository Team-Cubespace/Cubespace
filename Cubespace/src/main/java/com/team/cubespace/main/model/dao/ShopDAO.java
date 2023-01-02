package com.team.cubespace.main.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.common.Pagination;
import com.team.cubespace.main.model.vo.ShopFont;
import com.team.cubespace.main.model.vo.ShopMiniroom;
import com.team.cubespace.main.model.vo.ShopMusic;

@Repository
public class ShopDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	
	/** 상점 상품 추가(폰트,배경음악,소품)
	 * @param paramMap
	 * @return
	 */
	public int goodsAddButton(Map<String, Object> paramMap) {
		return sqlSession.insert("shop.goodsAddButton",paramMap);
	}
	
	/** 최신 폰트 상품 목록 조회 
	 * @param loginMemberNo
	 * @return
	 */
	public List<ShopFont> shopNewFont(int loginMemberNo) {
		return sqlSession.selectList("shop.shopNewFont",loginMemberNo);
	}
	
	/** 최신 배경음악 상품 목록 조회
	 * @param loginMemberNo
	 * @return
	 */
	public List<ShopFont> shopNewMusic(int loginMemberNo) {
		return sqlSession.selectList("shop.shopNewMusic",loginMemberNo);
	}

	/** 최신 미니룸소품 상품 목록 조회
	 * @param loginMemberNo
	 * @return
	 */
	public List<ShopFont> shopNewMiniroom(int loginMemberNo) {
		return sqlSession.selectList("shop.shopNewMiniroom",loginMemberNo);
	}


	/** 인기 폰트 상품 목록 조회 
	 * @param loginMemberNo
	 * @return
	 */
	public List<ShopFont> shopPopularFont(int loginMemberNo) {
		return sqlSession.selectList("shop.shopPopularFont",loginMemberNo);
	}
	
	/** 인기 배경음악 상품 목록 조회
	 * @param loginMemberNo
	 * @return 
	 */
	public List<ShopFont> shopPopularMusic(int loginMemberNo) {
		return sqlSession.selectList("shop.shopPopularMusic",loginMemberNo);
	}
	
	/** 인기 미니룸소품 상품 목록 조회
	 * @param loginMemberNo
	 * @return
	 */
	public List<ShopFont> shopPopularMiniroom(int loginMemberNo) {
		return sqlSession.selectList("shop.shopPopularMiniroom",loginMemberNo);
	}
	

	/** 폰트 상점 상품 갯수 구하기
	 * @return
	 */
	public int shopFontCount() {
		return sqlSession.selectOne("shop.shopFontCount");
	}

	/** 배경음악 상점 상품 갯수 구하기
	 * @return
	 */
	public int shopMusicCount() {
		return sqlSession.selectOne("shop.shopMusicCount");
	}
	
	/** 미니룸소품 상점 상품 갯수 구하기
	 * @return
	 */
	public int shopMiniroomCount() {
		return sqlSession.selectOne("shop.shopMiniroomCount");
	}
	
	/** 페이징 처리객체 사용하여 폰트 상점 상품 상품 목록 조회
	 * @param pagination
	 * @param pm
	 * @return
	 */
	public List<ShopFont> selectFontList(Pagination pagination, Map<String, Object> pm) {
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("shop.selectFontList",pm,rowBounds);
	}

	/** 페이징 처리객체 사용하여 배경음악 상점 상품 상품 목록 조회
	 * @param pagination
	 * @param pm
	 * @return
	 */
	public List<ShopMusic> selectShopMusicList(Pagination pagination, Map<String, Object> pm) {
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("shop.selectShopMusicList",pm,rowBounds);
	}

	/** 페이징 처리객체 사용하여 미니룸소품 상점 상품 상품 목록 조회
	 * @param pagination
	 * @param pm
	 * @return
	 */
	public List<ShopMiniroom> selectShopMiniroomList(Pagination pagination, Map<String, Object> pm) {
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("shop.selectShopMiniroomList",pm,rowBounds);
	}

	/** 음악재생 목록 조회
	 * @param cp
	 * @param loginMemberNo
	 * @return
	 */
	public List<ShopFont> miniMusicPlyer(Pagination pagination, int loginMemberNo) {
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("shop.miniMusicPlyer",loginMemberNo,rowBounds);
	}







	
}
