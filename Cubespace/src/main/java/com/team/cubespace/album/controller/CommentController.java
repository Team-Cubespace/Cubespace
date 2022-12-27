package com.team.cubespace.album.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.team.cubespace.album.model.service.CommentService;
import com.team.cubespace.album.model.vo.Comment;

@RestController
public class CommentController {
	@Autowired
	private CommentService service;
	
	@GetMapping("/selectCommentList")
	public String selectCommentList(@RequestParam Map<String, Integer> paramMap) {
		
		// 서비스 호출
		List<Comment> commentList = service.selectCommentList(paramMap);
		
		return new Gson().toJson(commentList);
	}
}
