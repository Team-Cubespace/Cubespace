package com.team.cubespace.manage.model.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.common.Util;
import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.manage.model.dao.ManageDAO;
import com.team.cubespace.manage.model.vo.Background;
import com.team.cubespace.manage.model.vo.CategoryOrder;
import com.team.cubespace.manage.model.vo.File;

@Service
public class ManageServiceImpl implements ManageService{
	
	@Autowired
	private ManageDAO dao;
	
	/**
	 * 상점에 등록된 전체 폰트 리스트 조회
	 */
	@Override
	public List<Map<String, Object>> getAllFontList() {
		
		return dao.getAllFontList();
	}
	
	/**
	 * 상점에 등록된 전체 배경음악 조회
	 */
	@Override
	public List<Map<String, Object>> getAllMusicList() {

		return dao.getAllMusicList();
	}

	

	/**
	 * 폴더 리스트 조회
	 */
	@Override
	public List<Folder> getFolderList(int memberNo) {
		
		return dao.getFolderList(memberNo);
	}

	/**
	 * 카테고리 순서 조회
	 */
	@Override
	public CategoryOrder getCategoryOrder(int memberNo) {
		
		return dao.getCategoryOrder(memberNo);
	}

	/**
	 * 카테고리 순서 변경
	 */
	@Override
	public int changeCategory(CategoryOrder categoryOrder) {
		
		
		
		return dao.changeCategory(categoryOrder);
	}

	/**
	 * 카테고리 종류 원래대로
	 */
	@Override
	public int categorySelectCancel(int memberNo) {
		
		return dao.categorySelectCancel(memberNo);
	}

	/**
	 * 내 친구 목록 조회
	 */
	@Override
	public List<Map<String, String>> getFriendList(Map<String, Object> paramMap) {
		
		return dao.getFriendList(paramMap);
	}

	/**
	 * 깐부끊기
	 */
	@Override
	public int deleteFriend(Map<String, Object> paramMap) {
		
		return dao.deleteFriend(paramMap);
	}

	/**
	 * 내 폰트 목록 조회
	 */
	@Override
	public List<Map<String, Object>> getFontList(Map<String, Object> paramMap) {
		
		return dao.getFontList(paramMap);
	}

	/**
	 * 새 폰트 적용하기
	 */
	@Override
	public int useFont(Map<String, Object> paramMap) {
		
		return dao.useFont(paramMap);
	}



	/**
	 * 한 회원의 폰트 가져오기
	 */
	@Override
	public int getMemberFontNo(int memberNo) {
		
		return dao.getMemberFontNo(memberNo);
	}

	/**
	 * 카테고리 중 보여질것 선택
	 */
	@Override
	public int categorySelect(Map<String, Object> paramMap) {
		
		return dao.categorySelect(paramMap);
	}

	/**
	 * 카테고리에 새 폴더 삽입
	 */
	@Override
	public int addFolder(Map<String, Object> paramMap) {
		

		
		int result= dao.addFolder(paramMap);
		if(result > 0) {
			result = (int) paramMap.get("folderNo");
		}
		return result;
	}

	/**
	 * 카테고리에서 폴더 삭제
	 * @throws Exception 
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int deleteFolder(Map<String, Object> paramMap) throws Exception {
		
		int result = dao.deleteFolder(paramMap);
		
		int subCategoryLength = Integer.parseInt((String)paramMap.get("subCategoryLength"));
		int folderOrder = Integer.parseInt((String)paramMap.get("folderOrder"));
		
		
		if(result > 0) {
			
			if(subCategoryLength > folderOrder) {
				
				// paramMap : boardTypeNo, memberNo, folderNewOrder(바꿀 순서)
				int updateFolderOrderResult = dao.updateFolderOrder(paramMap);
				
				
				// result가 폴더삭제 + 업데이트 갯수와 동일할경우
				if(updateFolderOrderResult <= 0) {
//				if(updateFolderOrderResult != (subCategoryLength - folderOrder)) {
					throw new Exception("폴더 삭제 중 오류 발생");
				}
			}

			
		// 폴더가 삭제되지 않은 경우
		} else { 
			throw new Exception("폴더 삭제 중 오류 발생");
		}
		
		return result;
	}



	/**
	 * 전체 폴더 순서 변경
	 * @throws Exception 
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateFolder(Map<String, Object> paramMap) throws Exception {
		
		String diaryFolderOrder = (String)paramMap.get("diaryFolderOrder");
		String albumFolderOrder = (String)paramMap.get("albumFolderOrder");
		String videoFolderOrder = (String)paramMap.get("videoFolderOrder");
		
		List<String>  diaryFolderOrderList = Arrays.asList(diaryFolderOrder.split(","));
		List<String>  albumFolderOrderList = Arrays.asList(albumFolderOrder.split(","));
		List<String>  videoFolderOrderList = Arrays.asList(videoFolderOrder.split(","));
		
		int result = 1;
		
		
		for(int i = 1; i <= diaryFolderOrderList.size()-1; i++) {
			// memberNo, folderNo, folderOrder(folder객체)
			
			Folder folder = new Folder();
			// memberNo
			folder.setMemberNo(Integer.parseInt((String)paramMap.get("memberNo")));
			int folderNo = Integer.parseInt(diaryFolderOrderList.get(i-1));
			
			// folderName
			String folderName = (String) paramMap.get(Integer.toString(folderNo));
			folderName = Util.XSSHandling(folderName);
			folder.setFolderName(folderName);
			
			folder.setFolderNo(folderNo); // folderNo
			folder.setFolderOrder(i); // folderOrder
			folder.setBoardTypeNo(1); // boardTypeNo
			result *= dao.updateFolder(folder);
		}
		
		
		for(int i = 1; i <= albumFolderOrderList.size()-1; i++) {
			
			Folder folder = new Folder();
			// memberNo
			folder.setMemberNo(Integer.parseInt((String)paramMap.get("memberNo")));
			int folderNo = Integer.parseInt(albumFolderOrderList.get(i-1));
			
			// folderName
			String folderName = (String) paramMap.get(Integer.toString(folderNo));
			folderName = Util.XSSHandling(folderName);
			folder.setFolderName(folderName);
			
			folder.setFolderNo(folderNo); // folderNo
			folder.setFolderOrder(i); // folderOrder
			folder.setBoardTypeNo(2); // boardTypeNo
			result *= dao.updateFolder(folder);
		}
		
		
		for(int i = 1; i <= videoFolderOrderList.size()-1; i++) {
			
			Folder folder = new Folder();
			// memberNo
			folder.setMemberNo(Integer.parseInt((String)paramMap.get("memberNo")));
			int folderNo = Integer.parseInt(videoFolderOrderList.get(i-1));
			
			// folderName
			String folderName = (String) paramMap.get(Integer.toString(folderNo));
			folderName = Util.XSSHandling(folderName);
			folder.setFolderName(folderName);
			
			folder.setFolderNo(folderNo); // folderNo
			folder.setFolderOrder(i); // folderOrder
			folder.setBoardTypeNo(3); // boardTypeNo
			result *= dao.updateFolder(folder);
		}
		
		if(result == 0) { // 하나라도 업데이트가 되지 않으면
			throw new Exception("폴더 순서 변경 중 오류 발생");
		}
		
		return result;
	}

	/**
	 * 해당 파일의 폴더목록 조회
	 */
	@Override
	public List<File> selectFileList(File file) {
		
		int categoryNo = file.getCategoryNo();
		
		if(categoryNo == 1) {
			return dao.selectDiaryFileList(file);
		}
		if(categoryNo == 2) {
			return dao.selectAlbumFileList(file);
		}
		if(categoryNo == 3) {
			return dao.selectVideoFileList(file);
		}
		
		return null;
	}

	/**
	 * 내 폴더의 파일 한개 삭제하기
	 */
	@Override
	public int deleteFile(File file) {
		
		if(file.getCategoryNo() == 1) {
			return dao.deleteDiaryFile(file);
		}
		if(file.getCategoryNo() == 2) {
			return dao.deleteAlbumFile(file);
		}
		if(file.getCategoryNo() == 3) {
			return dao.deleteVideoFile(file);
		}
		
		return 0;
	}

	/**
	 * 게시글 공개여부 설정
	 */
	@Override
	public int updateOpenFlag(File file) {

		if(file.getCategoryNo() == 1) {
			return dao.updateDiaryOpenFlag(file);
		}
		if(file.getCategoryNo() == 2) {
			return dao.updateAlbumOpenFlag(file);
		}
		if(file.getCategoryNo() == 3) {
			return dao.updateVideoOpenFlag(file);
		}
		return 0;
	}

	/**
	 * 배경색/이미지 초기화하기
	 */
	@Override
	public int resetBGColor(Background backgroundInfo) {
		
		return dao.resetBGColor(backgroundInfo);
	}
	
	/**
	 * 프레임 초기화하기
	 */
	@Override
	public int resetFrameColor(Background backgroundInfo) {
		
		return dao.resetFrameColor(backgroundInfo);
	}
	/**
	 * 프레임 메뉴 색 초기화하기
	 */
	@Override
	public int resetFrameMenuColor(Background backgroundInfo) {
		
		return dao.resetFrameMenuColor(backgroundInfo);
	}

	/**
	 * 배경색 변경
	 */
	@Override
	public int updateBGColor(Background backgroundInfo) {
		
		return dao.updateBGColor(backgroundInfo);
	}
	
	/**
	 * 프레임색 변경
	 */
	@Override
	public int updateFrameColor(Background backgroundInfo) {
		
		return dao.updateFrameColor(backgroundInfo);
	}
	
	/**
	 * 프레임 메뉴색 변경
	 */
	@Override
	public int updateFrameMenuColor(Background backgroundInfo) {
		
		return dao.updateFrameMenuColor(backgroundInfo);
	}

	/**
	 * 배경 이미지 변경
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@Override
	public int updateBGImage(String webPath, String folderPath, Background backgroundInfo, MultipartFile multipartFile) throws Exception {
		
		String rename = Util.fileRename(multipartFile.getOriginalFilename());
		backgroundInfo.setBackgroundSkin(webPath + rename);
		
		int result = dao.updateBGColor(backgroundInfo);
		
		if(result > 0) {
			multipartFile.transferTo(new java.io.File(folderPath + rename));
		}
		
		return result;
	}

	/**
	 * 내 배경음악 목록 조회
	 */
	@Override
	public List<Map<String, Object>> getMusicList(Map<String, Object> paramMap) {
		
		return dao.getMusicList(paramMap);
	}

	/** 
	 * 내 배경음악 설정하기
	 */
	@Override
	public int useMusic(Map<String, Object> paramMap) {
		
		return dao.useMusic(paramMap);
	}

	/**
	 * 내 배경음악 없애기
	 */
	@Override
	public int deleteMusic(int memberNo) {

		return dao.deleteMusic(memberNo);
	}

	/**
	 * // 삭제 뒤 새 폴더리스트 조회(boardTypeNo별로)
	 */
	@Override
	public List<Folder> selectFolderList(Map<String, Object> paramMap) {
		
		return dao.selectFolderList(paramMap);
	}





}
