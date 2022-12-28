package com.team.cubespace.manage.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.manage.model.dao.ManageDAO;
import com.team.cubespace.manage.model.vo.CategoryOrder;

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
	public int changeCategory(int memberNo) {
		
		return dao.changeCategory(memberNo);
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
		
		return dao.addFolder(paramMap);
	}



}
