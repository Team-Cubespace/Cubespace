package com.team.cubespace.minihome.model.service;

import java.util.Map;

import com.team.cubespace.minihome.model.vo.Minihome;

/**
 * @author Tonic
 *
 */
public interface MinihomeService {
	/**	미니홈 조회
	 * @param memberNo
	 * @return minihome
	 */
	public Minihome selectMinihome(int memberNo);

	/** 미니홈 이름 수정
	 * @param paramMap
	 * @return result
	 */
	public int updateMinihomeName(Map<String, Object> paramMap);
}
