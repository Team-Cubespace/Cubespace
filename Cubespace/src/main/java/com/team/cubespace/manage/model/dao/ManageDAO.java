package com.team.cubespace.manage.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.manage.model.vo.CategoryOrder;
import com.team.cubespace.manage.model.vo.File;

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
	public int changeCategory(CategoryOrder categoryOrder) {
		
		int result =  sqlSession.update("ManageMapper.changeCategory", categoryOrder);
		return result;
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

	public List<Map<String, Object>> getFontList(Map<String, Object> paramMap) {
		
		return sqlSession.selectList("ManageMapper.getFontList", paramMap);
	}

	/** 새 폰트 적용하기
	 * @param paramMap
	 * @return
	 */
	public int useFont(Map<String, Object> paramMap) {
		
		return sqlSession.update("ManageMapper.useFont", paramMap);
	}

	/** 상점에 등록된 전체 폰트 리스트 조회
	 * @return allFontList
	 */
	public List<Map<String, Object>> getAllFontList() {
		
		return sqlSession.selectList("ManageMapper.getAllFontList");
	}

	/** 한 회원의 폰트 가져오기
	 * @param memberNo
	 * @return
	 */
	public int getMemberFontNo(int memberNo) {
		
		return sqlSession.selectOne("ManageMapper.getMemberFontNo", memberNo);
	}

	/**  카테고리 중 보여질것 선택
	 * @param paramMap
	 * @return
	 */
	public int categorySelect(Map<String, Object> paramMap) {
		
		return sqlSession.update("ManageMapper.categorySelect", paramMap);
	}

	/** 카테고리에 새 폴더 삽입
	 * @param paramMap
	 * @return result
	 */
	public int addFolder(Map<String, Object> paramMap) {
		
		return sqlSession.insert("ManageMapper.addFolder", paramMap);
	}

	/** 카테고리에서 폴더 삭제
	 * @param paramMap
	 * @return result
	 */
	public int deleteFolder(Map<String, Object> paramMap) {
		
		return sqlSession.delete("ManageMapper.deleteFolder", paramMap);
	}

	/** 폴더삭제 후 나머지 폴더순서 새로 정렬
	 * @param paramMap
	 * @return result
	 */
	public int updateFolderOrder(Map<String, Object> paramMap) {
		
		return sqlSession.delete("ManageMapper.updateFolderOrder", paramMap);
	}



	/** 폴더 순서, 이름 변경
	 * @param folder
	 * @return
	 */
	public int updateFolder(Folder folder) {
		
		return sqlSession.update("ManageMapper.updateFolder", folder);
	}

	/** (다이어리)해당 파일의 폴더목록 조회
	 * @param paramMap
	 * @return
	 */
	public List<File> selectDiaryFileList(Map<String, Object> paramMap) {
		
		return sqlSession.selectList("ManageMapper.selectDiaryFileList", paramMap);	
	}
	
	
	/** (앨범)해당 파일의 폴더목록 조회
	 * @param paramMap
	 * @return
	 */
	public List<File> selectAlbumFileList(Map<String, Object> paramMap) {
		
		return sqlSession.selectList("ManageMapper.selectAlbumFileList", paramMap);	
	}

	/** (비디오)해당 파일의 폴더목록 조회
	 * @param paramMap
	 * @return
	 */
	public List<File> selectVideoFileList(Map<String, Object> paramMap) {

		return sqlSession.selectList("ManageMapper.selectVideoFileList", paramMap);	
	}






}
