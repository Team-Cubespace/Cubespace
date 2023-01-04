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
	public int writeGuestBook(Map<String, Object> paramMpa) {
		return dao.writeGuestBook(paramMpa);
	}

	// 방명록 목록 조회
	@Override
	public List<GuestBook> listGuestBook(int minihomeNo) {
		return dao.listGuestBook(minihomeNo);
	}

	// 기존 방명록 비밀글로 변경
	@Override
	public int secretGuestBook(int gbNo) {
		return dao.secretGuestBook(gbNo);
	}

	// 방명록 삭제
	@Override
	public int deleteGuestBook(int gbNo) {
		return dao.deleteGuestBook(gbNo);
	}

	// 방명록 수정
	@Override
	public int modifyGuestBook(Map<String, Object> paramMpa) {
		return dao.modifyGuestBook(paramMpa);
	}
	
	
}
