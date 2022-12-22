package com.team.cubespace.member.model.service;

import com.team.cubespace.member.model.vo.Member;

public interface MemberService {

	/** 로그인
	 * @param inputMember
	 * @return loginMember
	 */
	Member login(Member inputMember);

}
