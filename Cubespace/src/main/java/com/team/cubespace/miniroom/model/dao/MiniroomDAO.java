package com.team.cubespace.miniroom.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.common.Pagination;
import com.team.cubespace.main.model.vo.ShopMiniroom;
import com.team.cubespace.miniroom.model.vo.Minimee;
import com.team.cubespace.miniroom.model.vo.Miniroom;
import com.team.cubespace.miniroom.model.vo.MiniroomPlace;

/**
 * @author HJ
 */
@Repository
public class MiniroomDAO {
	@Autowired
	private SqlSessionTemplate sqlSession;

	/**
	 * 미니룸 벽지, 바닥 조회
	 * @param memberNo
	 * @return
	 */
	public Miniroom selectRoom(int memberNo) {
		return sqlSession.selectOne("miniroomMapper.selectRoom", memberNo);
	}

	/**
	 * 배치된 소품 좌표 조회
	 * @param memberNo
	 * @return placeList
	 */
	public List<MiniroomPlace> selectPlaceList(int memberNo) {
		return sqlSession.selectList("miniroomMapper.selectPlaceList", memberNo);
	}
	
	/**
	 * 미니미 수 조회
	 * @return listCount
	 */
	public int minimeeCount() {
		return sqlSession.selectOne("miniroomMapper.minimeeCount");
	}

	/**
	 * 미니미 목록 조회
	 * @return minimeeList
	 */
	public List<Minimee> selectMinimeeList(Pagination pagination) {
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
        RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("miniroomMapper.selectMinimeeList", rowBounds);
	}
	
	/**
	 * 소유한 소품 수 조회
	 * @param memberNo
	 * @return listCount
	 */
	public int goodsListCount(int memberNo) {
		return sqlSession.selectOne("miniroomMapper.goodsListCount", memberNo);
	}

	/**
	 * 소유한 소품 목록 조회
	 * @param memberNo
	 * @return goodsList
	 */
	public List<ShopMiniroom> selectGoodsList(Pagination pagination, int memberNo) {
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
        RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("miniroomMapper.selectGoodsList", memberNo, rowBounds);
	}
	
	/**
	 * 소품 삭제
	 * @param paramMap
	 * @return result
	 */
	public int deleteGoods(Map<String, Object> paramMap) {
		return sqlSession.delete("miniroomMapper.deleteGoods", paramMap);
	}

	/**
	 * 미니미, 소품 좌표 저장
	 * @param memberNo
	 */
	public void deleteProps(int memberNo) {
		sqlSession.delete("miniroomMapper.deleteProps", memberNo);
	}

	/**
	 * 미니미, 소품 좌표 저장
	 * @param miniroomPlace
	 */
	public void insertProps(MiniroomPlace miniroomPlace) {
		sqlSession.insert("miniroomMapper.insertProps", miniroomPlace);
	}
	
	/**
	 * 벽지, 바닥 저장
	 * @param miniroom
	 * @return result
	 */
	public int updateRoom(Miniroom miniroom) {
		return sqlSession.update("miniroomMapper.updateRoom", miniroom);
	}
}