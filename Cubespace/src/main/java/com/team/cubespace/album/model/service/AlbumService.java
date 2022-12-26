package com.team.cubespace.album.model.service;

import java.util.List;
import java.util.Map;

import com.team.cubespace.album.model.vo.Album;

/**
 * @author Tonic
 *
 */
public interface AlbumService {


	/** 친구 상태 확인 서비스
	 * @param paramMap
	 * @return result
	 */
	public int checkFriend(Map<String, Integer> paramMap);

	/** 앨범 목록 조회
	 * @param paramMap
	 * @param cp
	 * @return albumList
	 */
	public Map<String, Object> selectAlbumList(Map<String, Integer> paramMap, int cp);

}
