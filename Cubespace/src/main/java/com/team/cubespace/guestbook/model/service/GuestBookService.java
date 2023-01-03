package com.team.cubespace.guestbook.model.service;

import java.util.List;
import java.util.Map;

import com.team.cubespace.guestbook.model.vo.GuestBook;

public interface GuestBookService {

	/** 방명록 작성
	 * @param paramMpa
	 * @return
	 */
	int writeGuestbook(Map<String, Object> paramMpa);

	/** 방명록 목록 조회
	 * @param minihomeNo 
	 * @return
	 */
	List<GuestBook> listGuestbook(int minihomeNo);

}
