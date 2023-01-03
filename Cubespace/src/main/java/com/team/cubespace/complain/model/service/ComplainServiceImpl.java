package com.team.cubespace.complain.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.complain.model.dao.ComplainDAO;

@Service
public class ComplainServiceImpl {
	
	@Autowired
	private ComplainDAO dao;

}
