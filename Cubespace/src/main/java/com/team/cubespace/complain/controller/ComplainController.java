package com.team.cubespace.complain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.team.cubespace.complain.model.service.ComplainService;

@Controller
public class ComplainController {
	
	@Autowired
	private ComplainService service;

}
