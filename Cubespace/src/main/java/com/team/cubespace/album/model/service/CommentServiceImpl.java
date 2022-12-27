package com.team.cubespace.album.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.album.model.dao.CommentDAO;
import com.team.cubespace.album.model.vo.Comment;

@Service
public class CommentServiceImpl implements CommentService{
	@Autowired
	private CommentDAO dao;

	@Override
	public List<Comment> selectCommentList(Map<String, Integer> paramMap) {
		return dao.selectCommentList(paramMap);
	}
}
