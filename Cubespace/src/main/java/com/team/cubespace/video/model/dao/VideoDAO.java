package com.team.cubespace.video.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class VideoDAO {
	@Autowired
	private SqlSessionTemplate sqlSession;
}
