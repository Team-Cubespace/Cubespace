package com.team.cubespace.video.model.service;

import java.util.Map;

import com.team.cubespace.video.model.vo.Video;

public interface VideoService {

	/** 동영상 목록 조회
	 * @param paramMap
	 * @param cp
	 * @return resultMap
	 */
	Map<String, Object> selectVideoList(Map<String, Integer> paramMap, int cp);

	/** 동영상 상세 조회
	 * @param videoNo
	 * @return video
	 */
	Video selectVideo(int videoNo);
}
