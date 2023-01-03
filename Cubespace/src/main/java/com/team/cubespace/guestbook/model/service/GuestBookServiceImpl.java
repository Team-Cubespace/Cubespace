package com.team.cubespace.guestbook.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.guestbook.model.dao.GuestBookDAO;
@Service
public class GuestBookServiceImpl implements GuestBookService{

	
	@Autowired
	private GuestBookDAO dao;
}
