package com.team.cubespace.complain.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ComplainDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

}
