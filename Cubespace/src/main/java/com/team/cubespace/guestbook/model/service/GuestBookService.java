package com.team.cubespace.guestbook.model.service;

import java.util.Map;

public interface GuestBookService {

	/** 방명록 작성
	 * @param paramMpa
	 * @return
	 */
	int writeGuestbook(Map<String, Object> paramMpa);

}
