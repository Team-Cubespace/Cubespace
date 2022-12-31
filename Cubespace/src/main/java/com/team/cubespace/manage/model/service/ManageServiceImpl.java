package com.team.cubespace.manage.model.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.cubespace.common.Util;
import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.manage.model.dao.ManageDAO;
import com.team.cubespace.manage.model.vo.CategoryOrder;
import com.team.cubespace.manage.model.vo.File;

@Service
public class ManageServiceImpl implements ManageService{
	
	@Autowired
	private ManageDAO dao;

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
	 * 상점에 등록된 전체 폰트 리스트 조회
	 */
	@Override
	public List<Map<String, Object>> getAllFontList() {
		
		return dao.getAllFontList();
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
		
		if(result > 0) {
			
			int subCategoryLength = Integer.parseInt((String)paramMap.get("subCategoryLength"));
			int folderOrder = Integer.parseInt((String)paramMap.get("folderOrder"));
;			
			for(int i = 0; i < (subCategoryLength - folderOrder); i++) {
				
				// 새로바뀔 폴더의 순서
				paramMap.put("folderNewOrder", folderOrder + i);
				
				// boardTypeNo, memberNo, folderNewOrder+1(원래 순서), folderNewOrder(바꿀 순서)
				result += dao.updateFolderOrder(paramMap);
			}
			
			// result가 폴더삭제 + 업데이트 갯수와 동일할경우
			if(result != (subCategoryLength - folderOrder) + 1) {
				throw new Exception("폴더 삭제 중 오류 발생");
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



}
