package com.team.cubespace.main.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.main.model.vo.Notifications;

@Repository
public class NotificationsDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

}
