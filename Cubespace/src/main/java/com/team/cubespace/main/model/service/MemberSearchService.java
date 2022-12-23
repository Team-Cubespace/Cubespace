package com.team.cubespace.main.model.service;

import java.util.List;
import java.util.Map;

import com.team.cubespace.main.model.vo.MemberSearch;

public interface MemberSearchService {

	/** 깐부찾기 자동완성 조회
	 * @param map
	 * @return
	 */
	List<MemberSearch> memberSearchAll(Map<String, Object> map);

	/** 깐부 신청하기
	 * @param paramMap
	 * @return
	 */
	int memberAddFriend(Map<String, Object> paramMap);

}
