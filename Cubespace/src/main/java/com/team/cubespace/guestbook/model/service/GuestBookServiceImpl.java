package com.team.cubespace.guestbook.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.cubespace.guestbook.model.dao.GuestBookDAO;
import com.team.cubespace.guestbook.model.vo.GuestBook;
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

	// 방명록 목록 조회
	@Override
	public List<GuestBook> listGuestbook(int minihomeNo) {
		return dao.listGuestbook(minihomeNo);
	}
	
	
}
