package com.team.cubespace.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.team.cubespace.member.model.dao.MemberDAO;
import com.team.cubespace.member.model.vo.Member;

@Service
public class MemberServiceImpl implements MemberService{
	

	@Autowired
	private MemberDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;

	/**
	 * 로그인 서비스
	 */
	@Override
	public Member login(Member inputMember) {
		
		Member loginMember = dao.login(inputMember.getMemberEmail());
		
		if(loginMember != null) {
			if(bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
				loginMember.setMemberPw(null);
			} else {
				loginMember = null;
			}
		}
		
		return loginMember;
	}

}
