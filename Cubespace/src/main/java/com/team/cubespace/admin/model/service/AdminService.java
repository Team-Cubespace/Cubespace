package com.team.cubespace.admin.model.service;

import java.util.Map;

import com.team.cubespace.member.model.vo.Member;

public interface AdminService {

	/** 회원 목록 조회
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> memberSearch(Map<String, Object> paramMap, int cp);

	/** 회원 정보 삭제
	 * @param memberNo
	 * @return
	 */
	int deleteMember(int memberNo);

	/** 회원 정보 삭제 복구
	 * @param memberNo
	 * @return
	 */
	int deleteMemberBack(int memberNo);


	/** 신고 목록 조회
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> complainSearch(Map<String, Object> paramMap, int cp);

}
