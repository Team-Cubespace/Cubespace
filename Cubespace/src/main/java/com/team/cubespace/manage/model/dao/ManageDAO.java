package com.team.cubespace.manage.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.manage.model.vo.Background;
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
		
		return sqlSession.update("ManageMapper.deleteFolder", paramMap);
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
	 * @param file
	 * @return
	 */
	public List<File> selectDiaryFileList(File file) {
		
		return sqlSession.selectList("ManageMapper.selectDiaryFileList", file);	
	}
	
	
	/** (앨범)해당 파일의 폴더목록 조회
	 * @param file
	 * @return
	 */
	public List<File> selectAlbumFileList(File file) {
		
		return sqlSession.selectList("ManageMapper.selectAlbumFileList", file);	
	}

	/** (비디오)해당 파일의 폴더목록 조회
	 * @param file
	 * @return
	 */
	public List<File> selectVideoFileList(File file) {

		return sqlSession.selectList("ManageMapper.selectVideoFileList", file);	
	}

	/** (다이어리)내 폴더의 파일 한개 삭제하기
	 * @param file
	 * @return
	 */
	public int deleteDiaryFile(File file) {
		
		return sqlSession.update("ManageMapper.deleteDiaryFile", file);	
	}
	
	/** (앨범)내 폴더의 파일 한개 삭제하기
	 * @param file
	 * @return
	 */
	public int deleteAlbumFile(File file) {
		
		return sqlSession.update("ManageMapper.deleteAlbumFile", file);	
	}
	
	/** (비디오)내 폴더의 파일 한개 삭제하기
	 * @param file
	 * @return
	 */
	public int deleteVideoFile(File file) {
		
		return sqlSession.update("ManageMapper.deleteVideoFile", file);	
	}

	/** 게시글 공개여부 설정(다이어리)
	 * @param file
	 * @return
	 */
	public int updateDiaryOpenFlag(File file) {
		
		return sqlSession.update("ManageMapper.updateDiaryOpenFlag", file);	
	}

	/** 게시글 공개여부 설정(앨범)
	 * @param file
	 * @return
	 */
	public int updateAlbumOpenFlag(File file) {
		
		return sqlSession.update("ManageMapper.updateAlbumOpenFlag", file);	
	}

	/** 게시글 공개여부 설정(비디오)
	 * @param file
	 * @return
	 */
	public int updateVideoOpenFlag(File file) {
		
		return sqlSession.update("ManageMapper.updateVideoOpenFlag", file);	
	}

	/** 배경색/이미지 초기화하기
	 * @param backgroundInfo
	 * @return
	 */
	public int resetBGColor(Background backgroundInfo) {
		
		return sqlSession.update("ManageMapper.updateBGColor", backgroundInfo);	
	}

	/** 프레임 초기화하기
	 * @param backgroundInfo
	 * @return
	 */
	public int resetFrameColor(Background backgroundInfo) {
		
		return sqlSession.update("ManageMapper.resetFrameColor", backgroundInfo);	
	}

	/** 배경색 변경
	 * @param backgroundInfo
	 * @return
	 */
	public int updateBGColor(Background backgroundInfo) {
		
		return sqlSession.update("ManageMapper.updateBGColor", backgroundInfo);	
	}






}
