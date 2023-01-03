package com.team.cubespace.guestbook.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.cubespace.guestbook.model.dao.GuestBookDAO;
@Service
public class GuestBookServiceImpl implements GuestBookService{

	
	@Autowired
	private GuestBookDAO dao;

	// 방명록 작성
	@Override
	@Transactional
	public int writeGuestbook(Map<String, Object> paramMpa) {
		return dao.writeGuestbook(paramMpa);
	}
}
