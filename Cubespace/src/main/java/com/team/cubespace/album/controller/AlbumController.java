package com.team.cubespace.album.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AlbumController {
	
	@GetMapping("/albumList")
	public String albumList() {
		return "minihome/album/album-list";
	}
}
