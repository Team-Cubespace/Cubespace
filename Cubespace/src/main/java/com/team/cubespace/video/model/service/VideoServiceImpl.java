package com.team.cubespace.video.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.video.model.dao.VideoDAO;

@Service
public class VideoServiceImpl implements VideoService{
	@Autowired
	private VideoDAO dao;
}
