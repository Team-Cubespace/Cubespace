package com.team.cubespace.minihome.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.minihome.model.dao.MinihomeMainDAO;
import com.team.cubespace.minihome.model.vo.FriendMessage;
import com.team.cubespace.minihome.model.vo.NewPost;

/**
 * @author HJ
 */
@Service
public class MinihomeMainServiceImpl implements MinihomeMainService{
	@Autowired
	private MinihomeMainDAO dao;

	// 프로필 + 깐부 목록 조회
	@Override
	public Map<String, Object> profile(int memberNo) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		Member profile = dao.selectProfile(memberNo);
		List<Member> friendList = dao.selectFriendList(memberNo);
		
		map.put("profile", profile);
		map.put("friendList", friendList);
		
		return map;
	}

	// 최근 게시물 조회
	@Override
	public List<NewPost> newPost(Map<String, Integer> paramMap) {
		int friendFlag = dao.selectFriendFlag(paramMap);
		
		paramMap.put("friendFlag", friendFlag);
		
		return dao.selectNewPost(paramMap);
	}
	
	// 깐부 메시지 조회
	@Override
	public List<FriendMessage> friendMessage(int memberNo) {
		return dao.selectFriendMessage(memberNo);
	}

	// 기분 변경
	@Transactional
	@Override
	public int emotion(Map<String, Object> paramMap) {
		return dao.updateEmotion(paramMap);
	}
}