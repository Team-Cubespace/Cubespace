package com.team.cubespace.main.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ShopDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
}
