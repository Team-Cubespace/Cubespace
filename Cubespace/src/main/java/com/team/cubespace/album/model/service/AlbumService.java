package com.team.cubespace.album.model.service;

import java.util.Map;

/**
 * @author Tonic
 *
 */
public interface AlbumService {


	/** 친구 상태 확인 서비스
	 * @param paramMap
	 * @return result
	 */
	int checkFriend(Map<String, Integer> paramMap);

}
