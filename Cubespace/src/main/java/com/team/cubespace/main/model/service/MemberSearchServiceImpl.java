package com.team.cubespace.main.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.cubespace.main.model.dao.MemberSearchDAO;
import com.team.cubespace.main.model.vo.MemberSearch;

@Service
public class MemberSearchServiceImpl implements MemberSearchService{
	
	@Autowired
	private MemberSearchDAO dao;

	// 깐부찾기 자동완성 조회
	@Override
	public List<MemberSearch> memberSearchAll(Map<String, Object> map) {
		return dao.memberSearchAll(map);
	}

	// 깐부 신청하기
	@Override
	@Transactional
	public int memberAddFriend(Map<String, Object> paramMap) {
		
		// 깐부 서로 신청 여부 확인
		int result=dao.memberFriendCheck(paramMap);
	
		if(result==0) { // 서로 친구요청이 없을 경우 친구요청보낵기
			return dao.memberAddFriend(paramMap);
			
		}else { // 서로 친구요청이 1개라도 있을 경우
			return  0;
		}
	}

	// 내가 신청한 회원 목록 조회
	@Override
	public List<MemberSearch> memberAddFriendList(Map<String, Object> paramMap) {
		return  dao.memberAddFriendList(paramMap);
	}

	// 깐부 신청취소 하기
	@Override
	@Transactional
	public int memberAddCancel(Map<String, Object> paramMap) {
		return dao.memberAddCancel(paramMap);
	}

}
