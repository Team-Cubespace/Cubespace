package com.team.cubespace.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.member.model.dao.MemberDAO;
import com.team.cubespace.member.model.vo.Member;

/**
 * @author sue
 *
 */
@Service
public class MemberServiceImpl implements MemberService {
	
	@Autowired
	private MemberDAO dao;

	@Override
	public String selectMember(int memberNo) {
		
		return dao.selectMember(memberNo);
	}

	@Override
	public int reportMember(Member reportMember) {
		// TODO Auto-generated method stub
		return dao.reportMember(reportMember);
	}

}
