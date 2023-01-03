package com.team.cubespace.admin.model.service;

import java.util.Map;

import com.team.cubespace.admin.model.vo.Block;
import com.team.cubespace.complain.model.vo.Complain;
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

	/** 처리 상태 변경
	 * @param inputComplain
	 * @return
	 */
	int updateStatusToggle(Complain inputComplain);

	/** 회원 차단하기
	 * @param block
	 * @return
	 */
	int blockMember(Block inputBlock);

}
