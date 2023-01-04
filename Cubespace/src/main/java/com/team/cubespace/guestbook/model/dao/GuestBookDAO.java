package com.team.cubespace.guestbook.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.guestbook.model.vo.GuestBook;

/**
 * @author gyehd
 *
 */
@Repository
public class GuestBookDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	
	/** 방명록 작성
	 * @param paramMpa
	 * @return
	 */
	public int writeGuestBook(Map<String, Object> paramMpa) {
		return sqlSession.insert("guestBook.writeGuestBook",paramMpa);
	}


	/** 방명록 목록 조회
	 * @return
	 */
	public List<GuestBook> listGuestBook(int minihomeNo) {
		return sqlSession.selectList("guestBook.listGuestBook",minihomeNo);
	}


	/** 기존 방명록 비밀글로 변경
	 * @param gbNo
	 * @return
	 */
	public int secretGuestBook(int gbNo) {
		return sqlSession.update("guestBook.secretGuestBook",gbNo);
	}


	/** 방명록 삭제
	 * @param gbNo
	 * @return
	 */
	public int deleteGuestBook(int gbNo) {
		return sqlSession.delete("guestBook.deleteGuestBook",gbNo);
	}


	/** 방명록 수정
	 * @param paramMpa
	 * @return
	 */
	public int modifyGuestBook(Map<String, Object> paramMpa) {
		return sqlSession.update("guestBook.modifyGuestBook",paramMpa);
	}
}
