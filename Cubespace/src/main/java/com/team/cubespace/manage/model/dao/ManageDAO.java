package com.team.cubespace.manage.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.manage.model.vo.CategoryOrder;
import com.team.cubespace.manage.model.vo.Folder;

@Repository
public class ManageDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 폴더 리스트 조회
	 * @param memberNo
	 * @return folderNo
	 */
	public List<Folder> getFolderList(int memberNo) {
		
		return sqlSession.selectList("ManageMapper.getFolderList", memberNo);
	}

	/** 카테고리 순서 조회
	 * @param memberNo
	 * @return categoryOrder
	 */
	public CategoryOrder getCategoryOrder(int memberNo) {
		
		return sqlSession.selectOne("ManageMapper.getCategoryOrder", memberNo);
	}

	/** 카테고리 순서 변경
	 * @param memberNo
	 * @return result
	 */
	public int changeCategory(int memberNo) {
		
		return sqlSession.update("ManageMapper.changeCategory", memberNo);
	}

	/** 카테고리 종류 원래대로
	 * @param memberNo
	 * @return result
	 */
	public int categorySelectCancel(int memberNo) {
		
		return sqlSession.update("ManageMapper.categorySelectCancel", memberNo);
	}

	/** 친구 목록 조회
	 * @param memberNo
	 * @return
	 */
	public List<Map<String, String>> getFriendList(Map<String, Object> paramMap) {
		
//		String query = "";
//		if(paramMap.containsKey("searchInput")){
//			query = "AND MEMBER_NICKNAME LIKE '%" + paramMap.get("searchInput") + "%'";
//		}
//		paramMap.put("query", query);
		
		return sqlSession.selectList("ManageMapper.getFriendList", paramMap);
	}

	/** 깐부끊기
	 * @param paramMap
	 * @return result
	 */
	public int deleteFriend(Map<String, Object> paramMap) {
		
		return sqlSession.delete("ManageMapper.deleteFriend", paramMap);
	}

}