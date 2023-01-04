package com.team.cubespace.guestbook.model.service;

import java.util.List;
import java.util.Map;

import com.team.cubespace.guestbook.model.vo.GuestBook;

public interface GuestBookService {

	/** 방명록 작성
	 * @param paramMpa
	 * @return
	 */
	int writeGuestBook(Map<String, Object> paramMpa);

	/** 방명록 목록 조회
	 * @param minihomeNo 
	 * @return
	 */
	List<GuestBook> listGuestBook(int minihomeNo);

	
	/** 기존 방명록 비밀글로 변경
	 * @param gbNo
	 * @return
	 */
	int secretGuestBook(int gbNo);

	/** 방명록 삭제
	 * @param gbNo
	 * @return
	 */
	int deleteGuestBook(int gbNo);

	/** 방명록 수정
	 * @param paramMpa
	 * @return
	 */
	int modifyGuestBook(Map<String, Object> paramMpa);

}
