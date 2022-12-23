package com.team.cubespace.minihome.model.service;

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
}
