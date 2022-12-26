package com.team.cubespace.album.model.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AlbumDAO {
	@Autowired
	private SqlSessionTemplate sqlSession;

	public int checkFriend(Map<String, Integer> paramMap) {
		return sqlSession.selectOne("albumMapper.checkFriend", paramMap);
	}
	
	
}
