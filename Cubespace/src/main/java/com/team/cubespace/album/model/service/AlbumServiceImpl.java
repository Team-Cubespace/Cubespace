package com.team.cubespace.album.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.album.model.dao.AlbumDAO;

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
}
