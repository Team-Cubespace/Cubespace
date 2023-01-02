package com.team.cubespace.video.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.album.model.vo.Album;
import com.team.cubespace.common.Pagination;
import com.team.cubespace.video.model.dao.VideoDAO;
import com.team.cubespace.video.model.vo.Video;

@Service
public class VideoServiceImpl implements VideoService{
	@Autowired
	private VideoDAO dao;

	@Override
	public Map<String, Object> selectVideoList(Map<String, Integer> paramMap, int cp) {
		
		// 특정 폴더의 동영성 갯수 구하기
		int listCount = dao.getListCount(paramMap);
		
		// 페이징 처리 객체 생성
		Pagination pagination = new Pagination(listCount, cp, 9, 10);
		
		// 페이징 처리객체 사용하여 앨범 게시글 목록 조회
		List<Album> videoList = dao.selectVideoList(pagination, paramMap);
			
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("videoList", videoList);
		
		return resultMap;
	}

	@Override
	public Video selectVideo(int videoNo) {
		return dao.selectVideo(videoNo);
	}
}
