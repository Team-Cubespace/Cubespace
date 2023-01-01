package com.team.cubespace.manage.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.manage.model.vo.Background;
import com.team.cubespace.manage.model.vo.CategoryOrder;
import com.team.cubespace.manage.model.vo.File;

public interface ManageService {

	/** 폴더 리스트 조회
	 * @param memberNo
	 * @return folderList
	 */
	List<Folder> getFolderList(int memberNo);

	/** 카테고리 순서 조회
	 * @param memberNo
	 * @return categoryOrder
	 */
	CategoryOrder getCategoryOrder(int memberNo);

	/** 카테고리 순서 변경
	 * @param memberNo
	 * @return result
	 */
	int changeCategory(CategoryOrder categoryOrder);

	/** 카테고리 종류 원래대로
	 * @return result
	 */
	int categorySelectCancel(int memberNo);

	/** 내 친구 목록 조회
	 * @param memberNo
	 * @return
	 */
	List<Map<String, String>> getFriendList(Map<String, Object> paramMap);

	/** 깐부끊기
	 * @param paramMap
	 * @return result
	 */
	int deleteFriend(Map<String, Object> paramMap);

	/** 내 폰트 목록 조회
	 * @param paramMap
	 * @return
	 */
	List<Map<String, Object>> getFontList(Map<String, Object> paramMap);

	/** 새 폰트 적용하기
	 * @param paramMap
	 * @return
	 */
	int useFont(Map<String, Object> paramMap);

	/** 상점에 등록된 전체 폰트 리스트 조회
	 * @return
	 */
	List<Map<String, Object>> getAllFontList();

	/** 한 회원의 폰트 가져오기
	 * @param memberNo
	 * @return
	 */
	int getMemberFontNo(int memberNo);

	/** 카테고리 중 보여질것 선택
	 * @param paramMap
	 * @return result
	 */
	int categorySelect(Map<String, Object> paramMap);

	/** 카테고리에 새 폴더 삽입
	 * @param paramMap
	 * @return result
	 */
	int addFolder(Map<String, Object> paramMap);

	/** 카테고리에서 폴더 삭제
	 * @param paramMap
	 * @return result
	 * @throws Exception 
	 */
	int deleteFolder(Map<String, Object> paramMap) throws Exception;


	
	/** 폴더 순서 변경
	 * @param paramMap
	 * @return result
	 * @throws Exception 
	 */
	int updateFolder(Map<String, Object> paramMap) throws Exception;

	/** 해당 파일의 폴더목록 조회
	 * @param file
	 * @return
	 */
	List<File> selectFileList(File file);

	/** 내 폴더의 파일 한개 삭제하기
	 * @param file
	 * @return
	 */
	int deleteFile(File file);

	/** 게시글 공개여부 설정
	 * @param file
	 * @return
	 */
	int updateOpenFlag(File file);

	
	/** 배경색/이미지 초기화하기
	 * @param backgroundInfo
	 * @return
	 */
	int resetBGColor(Background backgroundInfo);

	/** 프레임 초기화하기
	 * @param backgroundInfo
	 * @return
	 */
	int resetFrameColor(Background backgroundInfo);
	
	/** 프레임 메뉴 색 초기화하기
	 * @param backgroundInfo
	 * @return
	 */
	int resetFrameMenuColor(Background backgroundInfo);

	/** 배경색 변경
	 * @param backgroundInfo
	 * @return
	 */
	int updateBGColor(Background backgroundInfo);
	
	/** 배경 이미지 변경
	 * @param webPath
	 * @param folderPath
	 * @param memberNo
	 * @param multipartFile
	 * @return
	 * @throws Exception 
	 */
	int updateBGImage(String webPath, String folderPath, Background backgroundInfo, MultipartFile multipartFile) throws Exception;


	/** 프레임색 변경
	 * @param backgroundInfo
	 * @return
	 */
	int updateFrameColor(Background backgroundInfo);
	
	/** 프레임 메뉴색 변경
	 * @param backgroundInfo
	 * @return
	 */
	int updateFrameMenuColor(Background backgroundInfo);

	
	/** 내 배경음악 목록 조회
	 * @param paramMap
	 * @return
	 */
	List<Map<String, Object>> getMusicList(Map<String, Object> paramMap);

	


}
