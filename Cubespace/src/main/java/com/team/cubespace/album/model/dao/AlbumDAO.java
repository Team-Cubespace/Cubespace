package com.team.cubespace.album.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AlbumDAO {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
}
