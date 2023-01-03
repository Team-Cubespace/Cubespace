package com.team.cubespace.guestbook.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.guestbook.model.vo.GuestBook;

@Repository
public class GuestBookDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	
	/** 방명록 작성
	 * @param paramMpa
	 * @return
	 */
	public int writeGuestbook(Map<String, Object> paramMpa) {
		return sqlSession.insert("guestBook.writeGuestbook",paramMpa);
	}


	/** 방명록 목록 조회
	 * @return
	 */
	public List<GuestBook> listGuestbook(int minihomeNo) {
		return sqlSession.selectList("guestBook.listGuestbook",minihomeNo);
	}
}
