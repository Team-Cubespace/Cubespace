package com.team.cubespace.miniroom.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.main.model.vo.ShopMiniroom;
import com.team.cubespace.miniroom.model.dao.MiniroomDAO;
import com.team.cubespace.miniroom.model.vo.Minimee;
import com.team.cubespace.miniroom.model.vo.Miniroom;
import com.team.cubespace.miniroom.model.vo.MiniroomPlace;

/**
 * @author HJ
 */
@Service
public class MiniroomServiceImpl implements MiniroomService {
	@Autowired
	private MiniroomDAO dao;

	// 미니룸 벽지, 바닥 조회
	@Override
	public Miniroom room(int memberNo) {
		Miniroom room = dao.selectRoom(memberNo);
		return room;
	}

	// 배치된 소품 좌표 조회
	@Override
	public List<MiniroomPlace> placeList(int memberNo) {
		List<MiniroomPlace> placeList = dao.selectPlaceList(memberNo);
		return placeList;
	}

	// 미니미 목록 조회
	@Override
	public List<Minimee> minimeeList() {
		List<Minimee> minimeeList = dao.selectMinimeeList();
		return minimeeList;
	}

	// 소유한 소품 목록 조회
	@Override
	public List<ShopMiniroom> goodsList(int memberNo) {
		List<ShopMiniroom> goodsList = dao.selectGoodsList(memberNo);
		return goodsList;
	}
}