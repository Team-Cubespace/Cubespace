package com.team.cubespace.video.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.team.cubespace.video.model.service.VideoService;

@Controller
public class VideoController {
	@Autowired
	private VideoService service;
}
