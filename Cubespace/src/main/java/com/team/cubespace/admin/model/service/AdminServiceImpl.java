package com.team.cubespace.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.admin.model.dao.AdminDAO;
import com.team.cubespace.common.Pagination;
import com.team.cubespace.member.model.vo.Member;

@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	private AdminDAO dao;

	/**
	 * 회원 목록 조회
	 */
	@Override
	public Map<String, Object> memberSearch(Map<String, Object> paramMap, int cp) {
		
		// 조건에 맞는 회원 수
		int listCount = dao.getMemberListCount(paramMap);
		
		// 전체 회원수 
		int allMemberCount = dao.getAllMemberCount();
		
		// 전체 회원 수 + cp를 이용해 페이징처리
		Pagination pagination = new Pagination(listCount, cp, 30, 10);
		
		// sort 값 계산
		paramMap.put("order", "MEMBER_NO DESC");
		if(paramMap.get("sort").equals("1")) { // 가입일 역순
			paramMap.put("order", "MEMBER_NO DESC");
		}
		if(paramMap.get("sort").equals("2")) { // 가입일순
			paramMap.put("order", "MEMBER_NO ASC");
		}
		if(paramMap.get("sort").equals("3")) { // 일일방문자순
			paramMap.put("order", "TODAY DESC, MEMBER_NO DESC");
		}
		if(paramMap.get("sort").equals("4")) { // 총방문자순
			paramMap.put("order", "TOTAL DESC, MEMBER_NO DESC");
		}
		
		// 조건에 맞는 회원 목록
		List<Member> memberList = dao.memberSearch(pagination, paramMap);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("memberList", memberList);
		map.put("allMemberCount", allMemberCount);
		map.put("listCount", listCount);
		
		return map;
	}

	/** 
	 * 회원 정보 삭제
	 */
	@Override
	public int deleteMember(int memberNo) {
		
		return dao.deleteMember(memberNo);
	}

	/**
	 * 회원 정보 삭제 복구
	 */
	@Override
	public int deleteMemberBack(int memberNo) {
		
		return dao.deleteMemberBack(memberNo);
	}


	
	
	/**
	 * 신고 목록 조회
	 */
	@Override
	public Map<String, Object> complainSearch(Map<String, Object> paramMap, int cp) {
		
		// 조건에 맞는 신고 수
		int listCount = dao.getComplainListCount(paramMap);
		
		// 전체 신고수 
		int allComplainCount = dao.getAllComplainCount();
		
		// 전체 신고 수 + cp를 이용해 페이징처리
		Pagination pagination = new Pagination(listCount, cp, 30, 10);
		
		// sort 값 계산
		paramMap.put("order", "COMPLAIN_NO DESC");
		if(paramMap.get("sort").equals("1")) { // 신고일 최신순
			paramMap.put("order", "COMPLAIN_NO DESC");
		}
		if(paramMap.get("sort").equals("2")) { // 신고일 오래된순
			paramMap.put("order", "COMPLAIN_NO ASC");
		}
		
		// 조건에 맞는 신고 목록
		List<Member> complainList = dao.complainSearch(pagination, paramMap);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("memberList", complainList);
		map.put("allMemberCount", allComplainCount);
		map.put("listCount", listCount);
		
		return map;
	}
}
