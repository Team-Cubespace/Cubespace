package com.team.cubespace.guestbook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.team.cubespace.guestbook.model.service.GuestBookService;

@Controller
public class GuestBookController {

	@Autowired
	private GuestBookService service;
	
	@GetMapping("/guestBook")
	public String guestBook() {
		
		return "/minihome/guestBook/minihome-guestBook";
	}
	
	
}
