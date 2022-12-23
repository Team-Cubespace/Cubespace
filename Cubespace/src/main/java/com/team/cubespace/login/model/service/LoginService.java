package com.team.cubespace.login.model.service;

import com.team.cubespace.member.model.vo.Member;

public interface LoginService {

	/** 로그인
	 * @param inputMember
	 * @return loginMember
	 */
	Member login(Member inputMember);

}
