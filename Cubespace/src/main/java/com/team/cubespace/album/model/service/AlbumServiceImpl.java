package com.team.cubespace.album.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.album.model.dao.AlbumDAO;
import com.team.cubespace.album.model.vo.Album;
import com.team.cubespace.common.Pagination;

/**
 * @author Tonic
 *
 */
@Service
public class AlbumServiceImpl implements AlbumService{
	@Autowired
	private AlbumDAO dao; 

	// 친구 상태 확인 서비스
	@Override
	public int checkFriend(Map<String, Integer> paramMap) {
		return dao.checkFriend(paramMap);
	}

	// 앨범 목록 조회
	@Override
	public Map<String, Object> selectAlbumList(Map<String, Integer> paramMap, int cp) {
		// 특정 폴더의 앨범 게시글 갯수 구하기
		int listCount  = dao.getListCount(paramMap);
		
		// 페이징 처리 객체 생성
		Pagination pagination = new Pagination(listCount, cp, 12, 10);
		
		// 페이징 처리객체 사용하여 앨범 게시글 목록 조회
		List<Album> albumList = dao.selectAlbumList(pagination, paramMap);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("albumList", albumList);
		
		return resultMap;
	}
}
