package com.team.cubespace.main.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
