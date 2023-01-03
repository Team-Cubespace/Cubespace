package com.team.cubespace.guestbook.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GuestBookDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
}
