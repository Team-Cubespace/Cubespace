package com.team.cubespace.minihome.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.minihome.model.dao.MinihomeDAO;
import com.team.cubespace.minihome.model.vo.Minihome;

/** 
 * @author Tonic
 *
 */
@Service
public class MinihomeServiceImpl implements MinihomeService{
	@Autowired
	private MinihomeDAO dao;
	// 미니홈 조회
	@Override
	public Minihome selectMinihome(int memberNo) {
		return dao.selectMinihome(memberNo);
	}
	
	// 미니홈 이름 수정
	@Override
	public int updateMinihomeName(Map<String, Object> paramMap) {
		return dao.updateMinihomeName(paramMap);
	}
	
}
