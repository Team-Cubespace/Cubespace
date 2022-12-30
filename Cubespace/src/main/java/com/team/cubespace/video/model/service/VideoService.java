package com.team.cubespace.video.model.service;

import java.util.Map;

public interface VideoService {

	/** 동영상 목록 조회
	 * @param paramMap
	 * @param cp
	 * @return resultMap
	 */
	Map<String, Object> selectVideoList(Map<String, Integer> paramMap, int cp);

}
