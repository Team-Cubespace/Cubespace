package com.team.cubespace.miniroom.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
	 * 미니미 목록 조회
	 * @return minimeeList
	 */
	public List<Minimee> selectMinimeeList() {
		return sqlSession.selectList("miniroomMapper.selectMinimeeList");
	}

	/**
	 * 소유한 소품 목록 조회
	 * @param memberNo
	 * @return goodsList
	 */
	public List<ShopMiniroom> selectGoodsList(int memberNo) {
		return sqlSession.selectList("miniroomMapper.selectGoodsList", memberNo);
	}
}