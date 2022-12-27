package com.team.cubespace.album.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.album.model.vo.Comment;

@Repository
public class CommentDAO {
	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<Comment> selectCommentList(Map<String, Integer> paramMap) {
		return sqlSession.selectList("commentMapper.selectCommentList", paramMap);
	}
}
