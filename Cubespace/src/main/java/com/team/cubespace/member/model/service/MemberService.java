package com.team.cubespace.member.model.service;

import com.team.cubespace.member.model.vo.Member;

/**
 * @author sue
 *
 */
public interface MemberService {


	String selectMember(int memberNo);

	int reportMember(Member reportMember);

}
